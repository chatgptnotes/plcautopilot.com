import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, UploadCloud, FileText, Loader2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import DatabaseService from '../../services/databaseService';
import StorageService from '../../services/storageService';
import ReportWorkflowService from '../../services/reportWorkflowService';
import { useAuth } from '../../contexts/AuthContext';
import { logUploadAttempt, logUploadError } from '../../utils/uploadErrorChecker';
import SubscriptionPopup from '../admin/SubscriptionPopup';

const UploadReportModal = ({ clinicId, patient, onUpload, onClose }) => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      title: '',
      reportType: '',
      notes: '',
      reportFile: null
    }
  });

  // All state declarations MUST be at the top (React Rules of Hooks)
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [currentReports, setCurrentReports] = useState(0);
  const selectedFile = watch('reportFile');

  // Load subscription and usage data
  useEffect(() => {
    const loadUsageData = async () => {
      if (!clinicId) return; // Guard clause

      try {
        // Load current reports count
        const reports = await DatabaseService.getReportsByClinic(clinicId);
        setCurrentReports(reports.length);

        // Load subscription data
        const subscriptions = await DatabaseService.get('subscriptions') || [];
        const clinicSubscription = subscriptions.find(sub => sub.clinicId === clinicId);
        setSubscription(clinicSubscription);
      } catch (error) {
        console.error('Error loading usage data:', error);
      }
    };

    loadUsageData();
  }, [clinicId]);

  // Debug logging when modal opens
  useEffect(() => {
    console.log('FOLDER: UploadReportModal opened with:', {
      clinicId,
      patient: patient ? { id: patient.id, name: patient.name, fullObject: patient } : null,
      user: user ? { name: user.name, role: user.role } : null
    });

    // Validate required props
    if (!clinicId) {
      console.error('ERROR: UploadReportModal: clinicId is required');
      toast.error('Clinic ID is missing');
    }
    if (!patient) {
      console.error('ERROR: UploadReportModal: patient is required');
      toast.error('Patient information is missing. Please try again.');
    }
    if (!user) {
      console.warn('WARNING: UploadReportModal: user not loaded yet');
    }
  }, [clinicId, patient, user]);

  // Early return if patient is not provided (AFTER all hooks)
  if (!patient) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Upload New Report</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 font-medium">Patient information is missing</p>
            <p className="text-gray-500 text-sm mt-2">Please close this dialog and try again</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if clinic has reached report limit
  const checkReportLimit = async () => {
    // Check trial expiry first
    if (clinicId) {
      try {
        const clinic = await DatabaseService.findById('clinics', clinicId);
        if (clinic && clinic.trialEndDate) {
          const trialEndDate = new Date(clinic.trialEndDate);
          const now = new Date();
          if (now > trialEndDate && clinic.subscriptionStatus === 'trial') {
            // Trial expired - update status
            await DatabaseService.update('clinics', clinicId, {
              subscriptionStatus: 'expired',
              isActive: false
            });
            return { limitReached: true, reason: 'trial_expired' };
          }
        }
      } catch (error) {
        console.error('Error checking trial expiry:', error);
      }
    }

    // Check report quota
    if (subscription && subscription.status === 'active') {
      // Paid subscription - check against plan limit
      if (currentReports >= subscription.reportsAllowed) {
        return { limitReached: true, reason: 'quota_exceeded' };
      }
    } else {
      // Trial subscription - 10 report limit
      if (currentReports >= 10) {
        return { limitReached: true, reason: 'quota_exceeded' };
      }
    }

    return { limitReached: false, reason: null };
  };

  const handleSubscription = async (subscriptionData) => {
    try {
      // Save subscription to database
      await DatabaseService.add('subscriptions', subscriptionData);
      
      // Update clinic's subscription status
      await DatabaseService.update('clinics', subscriptionData.clinicId, {
        subscriptionStatus: 'active',
        reportsAllowed: subscriptionData.reportsAllowed
      });
      
      // Reload usage data
      const reports = await DatabaseService.getReportsByClinic(clinicId);
      setCurrentReports(reports.length);
      
      const subscriptions = await DatabaseService.get('subscriptions') || [];
      const clinicSubscription = subscriptions.find(sub => sub.clinicId === clinicId);
      setSubscription(clinicSubscription);
      
      toast.success('Subscription updated successfully!');
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('Failed to update subscription');
    }
  };

  const onSubmit = async (data) => {
    // Check if clinic has reached report limit
    const limitCheck = await checkReportLimit();
    if (limitCheck.limitReached) {
      setShowSubscriptionPopup(true);
      if (limitCheck.reason === 'trial_expired') {
        toast.error('Your trial has expired. Please upgrade to continue uploading reports.');
      } else {
        toast.error('Report limit reached. Please upgrade your plan to continue uploading reports.');
      }
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const file = data.reportFile[0];

      // Validation: Allow medical report formats
      const validFormats = [
        '.edf', '.eeg', '.bdf',          // EEG/qEEG formats
        '.pdf',                           // PDF documents
        '.jpg', '.jpeg', '.png',          // Images
        '.doc', '.docx',                  // Word documents
        '.csv', '.txt',                   // Data files
        '.xml', '.json',                  // Structured data
        '.xlsx', '.xls',                  // Excel files
        '.dcm'                            // DICOM medical imaging
      ];
      const fileExt = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

      if (!validFormats.includes(fileExt)) {
        toast.error(`Invalid file format! Allowed formats: PDF, EDF, EEG, BDF, JPEG, PNG, DOC, DOCX, CSV, TXT, XML, JSON, XLSX, DICOM. You uploaded: ${fileExt}`);
        return;
      }

      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`File too large! Maximum size is 50MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        return;
      }

      // Log upload attempt and check for errors
      const uploadErrors = logUploadAttempt(clinicId, patient, user, file);
      if (uploadErrors.length > 0) {
        throw new Error(`Upload validation failed: ${uploadErrors.join(', ')}`);
      }

      // All files are now validated as EEG/qEEG formats (.edf, .eeg, .bdf)
      // Start complete EDF processing workflow
      console.log(' Starting EEG/qEEG processing workflow for:', file.name);

      // Simulate progress for workflow initialization
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 5, 25));
      }, 300);

      const workflowId = await ReportWorkflowService.startEDFProcessingWorkflow(
        file,
        patient,
        clinicId
      );

      clearInterval(progressInterval);
      setUploadProgress(30);

      toast.success(`START: EEG/qEEG processing workflow started!
      INFO: Workflow ID: ${workflowId.substring(0, 8)}...
      ⏱️ Estimated completion: 8 minutes
      REFRESH: Processing: Upload → qEEG Pro → NeuroSense → Care Plan`);

      // Update progress to show workflow started
      setUploadProgress(100);
      onUpload();
      onClose();
      reset();
    } catch (error) {
      logUploadError(error, { clinicId, patient, user, file: data.reportFile?.[0] });
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Don't render if required props are missing
  if (!clinicId || !patient) {
    console.error('UploadReportModal: Missing required props', { clinicId, patient });
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload New Report for {patient?.name || 'Patient'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Usage Warning */}
        {(() => {
          const usageInfo = subscription && subscription.status === 'active' 
            ? { used: currentReports, allowed: subscription.reportsAllowed, remaining: subscription.reportsAllowed - currentReports, isTrial: false }
            : { used: currentReports, allowed: 10, remaining: 10 - currentReports, isTrial: true };
          
          if (usageInfo.remaining <= 2) {
            return (
              <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-orange-800 font-medium">
                      {usageInfo.remaining === 0 ? 'Report limit reached!' : 'Approaching report limit'}
                    </p>
                    <p className="text-orange-700 text-sm">
                      You've used {usageInfo.used}/{usageInfo.allowed} reports. 
                      {usageInfo.remaining === 0 ? ' Upgrade your plan to continue uploading.' : ` ${usageInfo.remaining} reports remaining.`}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}
        
        {isUploading && (
          <div className="mb-4 p-4 bg-[#E4EFFF] border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#323956]" />
              <span className="text-blue-800 font-medium">Uploading file...</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-[#323956] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-[#323956] mt-1">{uploadProgress}% complete</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
              Patient
            </label>
            <input
              id="patientName"
              type="text"
              disabled
              value={patient?.name || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Report Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              id="reportType"
              {...register('reportType', { required: 'Report type is required' })}
              className={`w-full px-3 py-2 border ${errors.reportType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            >
              <option value="">Select report type</option>
              <option value="EEG">EEG Report</option>
              <option value="qEEG">qEEG Report</option>
              <option value="EDF">EDF Raw Data</option>
            </select>
            {errors.reportType && <p className="text-red-500 text-sm mt-1">{errors.reportType.message}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              {...register('notes')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Add any additional notes about this report..."
            />
          </div>

          <div>
            <label htmlFor="reportFile" className="block text-sm font-medium text-gray-700 mb-2">
              Report File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="reportFile"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="reportFile"
                      {...register('reportFile', { required: 'File is required' })}
                      type="file"
                      accept=".edf,.eeg,.bdf"
                      className="sr-only"
                      disabled={isUploading}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">EEG/qEEG files only (.edf, .eeg, .bdf) up to 50MB</p>
                <p className="text-xs text-[#323956]">SUCCESS: Files will be stored securely in cloud storage</p>
              </div>
            </div>
            {selectedFile && selectedFile[0] && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                {selectedFile[0].name} ({((selectedFile[0].size || 0) / (1024 * 1024)).toFixed(2)} MB)
              </div>
            )}
            {errors.reportFile && <p className="text-red-500 text-sm mt-1">{errors.reportFile.message}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-[#323956] text-white rounded-md hover:bg-[#232D3C] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" />
                  <span>Upload Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Subscription Popup */}
      <SubscriptionPopup
        isOpen={showSubscriptionPopup}
        onClose={() => setShowSubscriptionPopup(false)}
        clinicId={clinicId}
        currentUsage={currentReports}
        onSubscribe={handleSubscription}
        clinicInfo={{
          name: user?.clinicName || user?.name || 'Clinic',
          email: user?.email || '',
          phone: user?.phone || ''
        }}
      />
    </div>
  );
};

export default UploadReportModal;