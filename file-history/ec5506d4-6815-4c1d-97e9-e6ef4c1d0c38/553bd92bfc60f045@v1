import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search,
  Filter,
  Calendar,
  Users,
  Upload,
  X,
  AlertTriangle,
  CheckCircle,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import DatabaseService from '../../services/databaseService';
import SubscriptionPopup from '../admin/SubscriptionPopup';

const ReportViewer = ({ clinicId, patients = [], reports: initialReports, onUpdate }) => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Log props on mount
  console.log('INFO: ReportViewer mounted with:', {
    clinicId,
    patientsCount: patients?.length || 0,
    initialReportsCount: initialReports?.length || 0
  });

  // Error boundary-like error handling
  const handleError = (error, context) => {
    console.error(`ERROR: ReportViewer Error in ${context}:`, error);
    const errorMessage = error?.message || 'Unknown error occurred';
    setError(`Error in ${context}: ${errorMessage}`);
    toast.error(`Failed to ${context}. Please try again.`);
  };

  // Load reports directly from database
  useEffect(() => {
    loadReports();
  }, [clinicId]);

  // Check limit status whenever reports or clinicId changes
  useEffect(() => {
    const checkLimit = async () => {
      const limitCheck = await checkReportLimit();
      setIsLimitReached(limitCheck.limitReached);
    };
    checkLimit();
  }, [reports, clinicId]);

  // Also use initialReports if provided
  useEffect(() => {
    if (initialReports && initialReports.length > 0) {
      setReports(initialReports);
    }
  }, [initialReports]);

  const loadReports = async () => {
    if (!clinicId) {
      console.warn('WARNING: No clinicId provided to loadReports');
      return;
    }

    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      console.log('========================================');
      console.log('INFO: LOADING REPORTS FOR CLINIC:', clinicId);
      console.log('========================================');

      // Load reports from database (async to handle both database and localStorage)
      const reportsData = await DatabaseService.getReportsByClinic(clinicId);
      console.log('INFO: Reports loaded from database:', reportsData?.length || 0);

      if (reportsData && reportsData.length > 0) {
        console.log('INFO: ALL REPORTS DATA:', JSON.stringify(reportsData, null, 2));
        console.log('INFO: First report structure:', reportsData[0]);
      } else {
        console.log('ERROR: NO REPORTS RETURNED FROM DATABASE');
      }

      // Load subscription data (async)
      const subscriptions = await DatabaseService.get('subscriptions') || [];
      const clinicSubscription = subscriptions.find(sub => sub.clinicId === clinicId);
      setSubscription(clinicSubscription);

      // Ensure reportsData is an array
      const validReports = Array.isArray(reportsData) ? reportsData : [];
      console.log('INFO: Setting reports state with', validReports.length, 'reports');
      setReports(validReports);

      if (validReports.length === 0) {
        console.log('WARNING: No reports found for clinic:', clinicId);
      }
    } catch (error) {
      console.error('ERROR: Error loading reports:', error);
      console.error('ERROR: Error stack:', error.stack);
      handleError(error, 'load reports');
      setReports([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      applyFilters();
    } catch (error) {
      console.error('ERROR: Error in applyFilters:', error);
      setFilteredReports([]);
    }
  }, [reports, searchTerm, selectedPatient, dateFilter]);

  const applyFilters = () => {
    console.log('DEBUG: Applying filters - Total reports:', reports.length);
    console.log('DEBUG: Current filters:', { searchTerm, selectedPatient, dateFilter });
    console.log('DEBUG: Patients available:', patients?.length || 0);

    let filtered = [...reports];
    console.log('DEBUG: Starting with reports:', filtered.length);

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report => {
        const patient = (patients || []).find(p => p.id === report.patientId);
        return (
          report.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      console.log('DEBUG: After search filter:', filtered.length);
    }

    // Patient filter
    if (selectedPatient) {
      console.log('DEBUG: Filtering by patient:', selectedPatient);
      console.log('DEBUG: Reports before patient filter:', filtered.map(r => ({
        id: r.id,
        patientId: r.patientId,
        fileName: r.fileName
      })));
      filtered = filtered.filter(report => report.patientId === selectedPatient);
      console.log('DEBUG: After patient filter:', filtered.length);
    }

    // Date filter
    if (dateFilter) {
      const today = new Date();
      let filterDate = new Date();

      switch (dateFilter) {
        case '7days':
          filterDate.setDate(today.getDate() - 7);
          break;
        case '30days':
          filterDate.setDate(today.getDate() - 30);
          break;
        case '90days':
          filterDate.setDate(today.getDate() - 90);
          break;
        default:
          filterDate = null;
      }

      if (filterDate) {
        filtered = filtered.filter(report => new Date(report.createdAt) >= filterDate);
        console.log('DEBUG: After date filter:', filtered.length);
      }
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log('DEBUG: Final filtered reports:', filtered.length);
    setFilteredReports(filtered);
  };

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

        // Check report quota using actual clinic data
        if (clinic) {
          if (clinic.subscriptionStatus === 'active') {
            if (clinic.reportsUsed >= clinic.reportsAllowed) {
              return { limitReached: true, reason: 'quota_exceeded' };
            }
          } else {
            // Trial subscription - 10 report limit
            if (clinic.reportsUsed >= 10) {
              return { limitReached: true, reason: 'quota_exceeded' };
            }
          }
        }
      } catch (error) {
        console.error('Error checking report limit:', error);
      }
    }

    return { limitReached: false, reason: null };
  };

  // Get clinic's current usage info
  const getClinicUsageInfo = () => {
    if (subscription && subscription.status === 'active') {
      return {
        used: reports.length,
        allowed: subscription.reportsAllowed,
        remaining: subscription.reportsAllowed - reports.length,
        isTrial: false,
        planName: subscription.planName
      };
    } else {
      return {
        used: reports.length,
        allowed: 10,
        remaining: 10 - reports.length,
        isTrial: true,
        planName: 'Trial Plan'
      };
    }
  };

  const handleDownloadReport = async (report) => {
    try {
      // Validate report object
      if (!report) {
        toast.error('Invalid report data');
        return;
      }

      // Check if clinic has reached report limit
      const limitCheck = await checkReportLimit();
      if (limitCheck.limitReached) {
        setShowSubscriptionPopup(true);
        if (limitCheck.reason === 'trial_expired') {
          toast.error('Your trial has expired. Please upgrade to continue downloading reports.');
        } else {
          toast.error('Report limit reached. Please upgrade your plan to continue downloading reports.');
        }
        return;
      }

      setLoading(true);

      // Get file name from multiple possible sources
      const fileName = report.fileName || report.file_name || report.reportData?.file_name ||
                      report.report_data?.file_name || 'report.edf';

      console.log(' Downloading report:', fileName);
      console.log('INFO: Report data:', {
        id: report.id,
        fileName,
        filePath: report.filePath || report.file_path,
        reportData: report.reportData || report.report_data
      });

      let downloadSuccess = false;

      // NEW: Try Supabase Storage first (our current storage solution)
      const filePath = report.filePath || report.file_path ||
                       report.reportData?.file_path || report.report_data?.file_path;

      if (filePath) {
        try {
          console.log(' Attempting Supabase Storage download from:', filePath);

          // Import StorageService dynamically
          const StorageService = (await import('../../services/storageService')).default;

          // Download file from Supabase Storage
          const fileBlob = await StorageService.downloadFile(filePath);

          if (fileBlob) {
            // Create blob URL and download
            const blobUrl = URL.createObjectURL(fileBlob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up blob URL
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

            toast.success(` Downloaded ${fileName}`);
            downloadSuccess = true;
            console.log('SUCCESS: Supabase Storage download successful');
          }
        } catch (storageError) {
          console.error('ERROR: Supabase Storage download failed:', storageError);
          toast.error(`Storage error: ${storageError.message}`);
        }
      }

      // Legacy: Try file URL if Supabase download failed
      if (!downloadSuccess && (report.fileUrl || report.file_url)) {
        try {
          const fileUrl = report.fileUrl || report.file_url;
          console.log(' Attempting URL download from:', fileUrl);

          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = fileName;
          link.target = '_blank';
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          toast.success(` Downloaded ${fileName}`);
          downloadSuccess = true;
          console.log('SUCCESS: URL download successful');
        } catch (urlError) {
          console.error('ERROR: URL download failed:', urlError);
        }
      }

      // Final fallback
      if (!downloadSuccess) {
        console.error('WARNING: No valid download method found for report:', {
          id: report.id,
          filePath: report.filePath || report.file_path,
          fileUrl: report.fileUrl || report.file_url,
          fileName
        });
        toast.error(`File not found in storage. Report: ${fileName}. Please check if file was uploaded correctly.`);
      } else {
        // Increment download counter (shared quota with uploads)
        try {
          const clinic = await DatabaseService.findById('clinics', clinicId);
          if (clinic) {
            await DatabaseService.update('clinics', clinicId, {
              reportsUsed: (clinic.reportsUsed || 0) + 1
            });
            console.log('SUCCESS: Incremented download counter for clinic:', clinicId);

            // Reload reports to update usage display
            await loadReports();
          }
        } catch (counterError) {
          console.error('WARNING: Failed to increment download counter:', counterError);
          // Don't show error to user - download was successful
        }
      }
    } catch (error) {
      console.error('ERROR: Error downloading report:', error);
      toast.error(`Failed to download report: ${error?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportDetails(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPatient('');
    setDateFilter('');
  };

  const refreshReports = async () => {
    try {
      setError(null);
      await loadReports();
      if (onUpdate) onUpdate();
      toast.success('Reports refreshed successfully');
    } catch (error) {
      console.error('ERROR: Error refreshing reports:', error);
      handleError(error, 'refresh reports');
    }
  };

  const repairDataAndReload = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate and repair data
      const result = await DatabaseService.validateAndRepairData();
      if (result.success) {
        toast.success(`Data validation complete${result.repairCount > 0 ? ` (repaired ${result.repairCount} issues)` : ''}`);
      }
      
      // Refresh connection
      await DatabaseService.refreshConnection();
      
      // Reload reports
      await loadReports();
      
      toast.success('Data repair and reload completed successfully');
    } catch (error) {
      console.error('ERROR: Error during data repair:', error);
      handleError(error, 'repair data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = (subscriptionData) => {
    try {
      // Save subscription to database (synchronous)
      DatabaseService.add('subscriptions', subscriptionData);
      
      // Update clinic's subscription status (synchronous)
      DatabaseService.update('clinics', subscriptionData.clinicId, {
        subscriptionStatus: 'active',
        reportsAllowed: subscriptionData.reportsAllowed
      });
      
      // Reload data to reflect changes
      loadReports();
      
      toast.success('Subscription updated successfully!');
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('Failed to update subscription');
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    
    if (!patient) {
      console.log(`WARNING: Patient lookup failed for ID: ${patientId}`);
      console.log('DEBUG: Available patients:', patients.map(p => ({ id: p.id, name: p.name })));
      
      // Try to find in localStorage as fallback
      const localStoragePatients = JSON.parse(localStorage.getItem('patients') || '[]');
      const fallbackPatient = localStoragePatients.find(p => p.id === patientId);
      
      if (fallbackPatient) {
        console.log(`SUCCESS: Found patient in localStorage fallback: ${fallbackPatient.name}`);
        return fallbackPatient.name;
      }
      
      return 'Unknown Patient';
    }
    
    return patient.name;
  };

  if (showReportDetails && selectedReport) {
    // Find patient with multiple field name variations
    const modalPatient = (patients || []).find(p =>
      p.id === selectedReport.patientId ||
      p.id === selectedReport.patient_id ||
      p.id === selectedReport.reportData?.patientId
    );

    console.log('INFO: Report Details Modal - Patient lookup:', {
      reportPatientId: selectedReport.patientId,
      report_patient_id: selectedReport.patient_id,
      foundPatient: modalPatient ? {
        id: modalPatient.id,
        name: modalPatient.name || modalPatient.fullName || modalPatient.full_name
      } : null
    });

    return (
      <ReportDetails
        report={selectedReport}
        patient={modalPatient}
        onBack={() => {
          setShowReportDetails(false);
          setSelectedReport(null);
        }}
        onDownload={handleDownloadReport}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Reports</h2>
          <p className="text-gray-600">View and download EEG reports for your patients</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            Total Reports: <span className="font-semibold">{reports.length}</span>
          </div>
        </div>
      </div>

      {/* Usage Summary */}
      <div className="bg-gradient-to-r from-[#E4EFFF] to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Your Usage Summary</h3>
            {(() => {
              const usageInfo = getClinicUsageInfo();
              return (
                <div className="mt-2 space-y-1">
                  <p className="text-blue-700">
                    <strong>Plan:</strong> {usageInfo.planName}
                  </p>
                  <p className="text-blue-700">
                    <strong>Usage:</strong> {usageInfo.used}/{usageInfo.allowed} reports
                  </p>
                  <p className="text-blue-700">
                    <strong>Remaining:</strong> {usageInfo.remaining} reports
                  </p>
                  {usageInfo.remaining <= 2 && (
                    <div className="flex items-center space-x-2 mt-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="text-orange-700 text-sm font-medium">
                        {usageInfo.remaining === 0 ? 'Report limit reached!' : 'Approaching report limit'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
          <div className="text-right">
            {(() => {
              const usageInfo = getClinicUsageInfo();
              const percentage = (usageInfo.used / usageInfo.allowed) * 100;
              return (
                <div>
                  <div className="text-2xl font-bold text-blue-900">{usageInfo.used}</div>
                  <div className="text-sm text-blue-700">Reports Used</div>
                  <div className="w-24 h-2 bg-blue-200 rounded-full mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        percentage >= 90 ? 'bg-red-500' : 
                        percentage >= 75 ? 'bg-orange-500' : 'bg-[#323956]'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-black"
            style={{
              color: '#000000',
              backgroundColor: '#FFFFFF'
            }}
          >
            <option value="" className="text-gray-900 bg-white">
              All Patients
            </option>
            {(patients || []).map(patient => (
              <option
                key={patient.id}
                value={patient.id}
                className="text-gray-900 bg-white"
              >
                {patient.fullName || patient.full_name || patient.name || 'Unknown Patient'}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-black"
            style={{
              color: '#000000',
              backgroundColor: '#FFFFFF'
            }}
          >
            <option value="" style={{
              color: '#000000 !important',
              backgroundColor: '#FFFFFF !important',
              padding: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>All Time</option>
            <option value="7days" style={{
              color: '#000000 !important',
              backgroundColor: '#FFFFFF !important',
              padding: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>Last 7 days</option>
            <option value="30days" style={{
              color: '#000000 !important',
              backgroundColor: '#FFFFFF !important',
              padding: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>Last 30 days</option>
            <option value="90days" style={{
              color: '#000000 !important',
              backgroundColor: '#FFFFFF !important',
              padding: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>Last 90 days</option>
          </select>
          
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Reports Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">
            Reports ({filteredReports.length})
          </h3>
        </div>
        
        {filteredReports.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredReports.map((report) => {
              // Try multiple field name variations for patient lookup
              const patient = (patients || []).find(p =>
                p.id === report.patientId ||
                p.id === report.patient_id ||
                p.id === report.reportData?.patientId
              );

              // Log if patient not found
              if (!patient) {
                console.warn('WARNING: Patient not found for report:', {
                  reportId: report.id,
                  patientId: report.patientId,
                  patient_id: report.patient_id,
                  availablePatients: patients?.map(p => ({ id: p.id, name: p.name || p.fullName }))
                });
              }

              return (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-[#CAE0FF] flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#323956]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">
                          {report.fileName || 'EEG Report'}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {patient?.name || patient?.fullName || patient?.full_name || 'Unknown Patient'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          {report.fileSize && (
                            <span className="text-sm text-gray-500">
                              {report.fileSize}
                            </span>
                          )}
                        </div>
                        {report.title && report.title !== report.fileName && (
                          <p className="text-sm text-gray-600 mt-2">{report.title}</p>
                        )}
                        {report.notes && (
                          <p className="text-sm text-gray-500 mt-2 italic">
                            {report.notes.length > 100 
                              ? `${report.notes.substring(0, 100)}...`
                              : report.notes
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {isLimitReached ? (
                        <button
                          onClick={() => setShowSubscriptionPopup(true)}
                          className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Upgrade required to download"
                        >
                          <Lock className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDownloadReport(report)}
                          disabled={loading}
                          className="p-2 text-[#323956] hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Download Report"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error ? 'Failed to load reports' : (
                searchTerm || selectedPatient || dateFilter 
                  ? 'No reports match your filters' 
                  : 'No reports available'
              )}
            </h3>
            <p className="text-gray-600 mb-4">
              {error ? error : (
                searchTerm || selectedPatient || dateFilter
                  ? 'Try adjusting your search criteria'
                  : 'Reports will appear here once they are uploaded by your administrator'
              )}
            </p>
            <div className="space-x-4">
              {(searchTerm || selectedPatient || dateFilter) && !error && (
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  Clear all filters
                </button>
              )}
              {error && (
                <>
                  <button
                    onClick={refreshReports}
                    disabled={loading}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? 'Refreshing...' : 'Try Again'}
                  </button>
                  <button
                    onClick={repairDataAndReload}
                    disabled={loading}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? 'Repairing...' : 'Repair & Reload'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-[#E4EFFF] border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              About Report Access
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                • Reports are uploaded by your clinic administrator<br/>
                • You can view and download all reports for your patients<br/>
                • Reports are securely stored and only accessible by authorized personnel<br/>
                • For technical support, contact your system administrator
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Popup */}
      <SubscriptionPopup
        isOpen={showSubscriptionPopup}
        onClose={() => setShowSubscriptionPopup(false)}
        clinicId={clinicId}
        currentUsage={reports.length}
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

// Report Details Component
const ReportDetails = ({ report, patient, onBack, onDownload }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="text-primary-600 hover:text-primary-800 font-medium"
        >
          ← Back to Reports
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-[#CAE0FF] flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#323956]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {report.fileName || 'EEG Report'}
                </h2>
                <p className="text-sm text-gray-600">
                  Report Details and Information
                </p>
              </div>
            </div>
            <button
              onClick={() => onDownload(report)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Report Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">File Name:</span>
                    <span className="text-sm text-gray-900">{report.fileName}</span>
                  </div>
                  
                  {report.title && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">Title:</span>
                      <span className="text-sm text-gray-900">{report.title}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">File Type:</span>
                    <span className="text-sm text-gray-900">{report.fileType || 'PDF'}</span>
                  </div>
                  
                  {report.fileSize && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">File Size:</span>
                      <span className="text-sm text-gray-900">{report.fileSize}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">Created:</span>
                    <span className="text-sm text-gray-900">
                      {new Date(report.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  {report.uploadedBy && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">Uploaded by:</span>
                      <span className="text-sm text-gray-900">{report.uploadedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              {report.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">{report.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Patient Information */}
            {patient && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">Name:</span>
                      <span className="text-sm text-gray-900">
                        {patient.name || patient.fullName || patient.full_name || 'N/A'}
                      </span>
                    </div>

                    {(patient.age || patient.dateOfBirth || patient.date_of_birth) && (
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600">Age:</span>
                        <span className="text-sm text-gray-900">
                          {patient.age ? `${patient.age} years` :
                           patient.dateOfBirth || patient.date_of_birth ?
                           `${new Date().getFullYear() - new Date(patient.dateOfBirth || patient.date_of_birth).getFullYear()} years` :
                           'N/A'}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">Gender:</span>
                      <span className="text-sm text-gray-900 capitalize">{patient.gender || 'N/A'}</span>
                    </div>
                    
                    {patient.email && (
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600">Email:</span>
                        <span className="text-sm text-gray-900">{patient.email}</span>
                      </div>
                    )}
                    
                    {patient.phone && (
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600">Phone:</span>
                        <span className="text-sm text-gray-900">{patient.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {patient.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Patient Notes</h4>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-700">{patient.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Report Preview Placeholder */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">Report Preview</h4>
              <p className="text-gray-500 mb-4">
                Preview functionality will be available in a future update.
              </p>
              <button
                onClick={() => onDownload(report)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Download Report to View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;