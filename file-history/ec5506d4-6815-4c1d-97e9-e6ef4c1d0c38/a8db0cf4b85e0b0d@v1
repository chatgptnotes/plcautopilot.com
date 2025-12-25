// Upload Error Checker Utility
export const checkUploadRequirements = (clinicId, patient, user, file) => {
  const errors = [];
  
  // Check required parameters
  if (!clinicId) {
    errors.push('Clinic ID is missing');
  }
  
  if (!patient) {
    errors.push('Patient object is missing');
  } else if (!patient.id) {
    errors.push('Patient ID is missing');
  }
  
  if (!user) {
    errors.push('User object is missing');
  } else if (!user.name) {
    errors.push('User name is missing');
  }
  
  if (!file) {
    errors.push('File is missing');
  } else {
    // File validation
    if (!file.name) {
      errors.push('File name is missing');
    }

    if (file.size === 0) {
      errors.push('File is empty');
    }

    if (file.size > 50 * 1024 * 1024) {
      errors.push('File size exceeds 50MB limit');
    }

    // Validate file extension for EEG/qEEG files
    const validExtensions = ['.edf', '.eeg', '.bdf'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
      const fileExt = fileName.substring(fileName.lastIndexOf('.'));
      errors.push(`Invalid file format: ${fileExt}. Only EEG/qEEG files (.edf, .eeg, .bdf) are allowed`);
    }
  }
  
  return errors;
};

export const logUploadAttempt = (clinicId, patient, user, file) => {
  console.group('DEBUG: Upload Requirements Check');
  console.log('Clinic ID:', clinicId);
  console.log('Patient:', patient);
  console.log('User:', user);

  if (file) {
    const fileExt = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    console.log('File:', {
      name: file.name,
      extension: fileExt,
      type: file.type || '(not detected - this is normal for EEG files)',
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      sizeBytes: file.size,
      lastModified: new Date(file.lastModified).toISOString()
    });
  } else {
    console.log('File: No file');
  }

  const errors = checkUploadRequirements(clinicId, patient, user, file);
  if (errors.length > 0) {
    console.error('ERROR: Upload Errors Found:', errors);
  } else {
    console.log('SUCCESS: All requirements met - proceeding with upload');
  }

  console.groupEnd();

  return errors;
};

export const logUploadError = (error, context = {}) => {
  console.group('ALERT: Upload Error Details');
  console.error('Error:', error);
  console.log('Error message:', error.message);
  console.log('Error stack:', error.stack);
  console.log('Context:', context);
  console.log('Timestamp:', new Date().toISOString());
  console.groupEnd();
};