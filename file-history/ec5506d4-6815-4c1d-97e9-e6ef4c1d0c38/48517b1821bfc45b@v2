import { v4 as uuidv4 } from 'uuid';
import SupabaseService from './supabaseService';

// Enhanced database service - uses Supabase only, no localStorage fallback
class DatabaseService {
  constructor() {
    this.useSupabase = true;
    this.supabaseService = SupabaseService;
    this.checkSupabaseAvailability();
  }

  async checkSupabaseAvailability() {
    try {
      console.log('CONFIG: Checking Supabase availability...');

      // Test Supabase connection with clinics table (which we know exists)
      const testResult = await this.supabaseService.get('clinics');
      if (testResult !== undefined) {
        this.useSupabase = true;
        console.log('START: Using Supabase for data storage');
      } else {
        throw new Error('Supabase connection failed');
      }
    } catch (error) {
      console.error('ERROR: Supabase connection failed:', error);
      throw new Error('Database connection required. Please check your internet connection and try again.');
    }
  }

  // Map legacy table names to Supabase schema
  mapTableName(table) {
    const tableMapping = {
      'clinics': 'clinics',              // Use existing clinics table
      'superAdmins': 'profiles',
      'patients': 'patients',
      'reports': 'reports',              // Fixed: Use 'reports' not 'eeg_reports'
      'subscriptions': 'subscriptions',
      'payments': 'payment_history',
      'usage': 'organizations',          // Temporary mapping to existing table
      'alerts': 'organizations'          // Temporary mapping to existing table
    };

    return tableMapping[table] || table;
  }

  // Generic CRUD operations
  async get(table) {
    try {
      const actualTable = this.mapTableName(table);
      const data = await this.supabaseService.get(actualTable);
      console.log(`DATA: ${table} from Supabase (${actualTable}):`, data?.length || 0, 'items');

      // Ensure data is always an array
      if (!data) {
        console.warn(`WARNING: No data returned for ${table}, returning empty array`);
        return [];
      }

      if (!Array.isArray(data)) {
        console.warn(`WARNING: Data for ${table} is not an array:`, typeof data);
        return [];
      }

      // Transform data based on table type
      if (table === 'clinics' && actualTable === 'clinics') {
        // Transform clinics data to camelCase format
        return data.map(clinic => ({
          id: clinic.id,
          name: clinic.name,
          email: clinic.email,
          password: clinic.password,  // SUCCESS: CRITICAL: Include password for login authentication
          contactPerson: clinic.contact_person,
          contact_person: clinic.contact_person,  // Keep snake_case for compatibility
          clinicName: clinic.clinic_name,
          clinic_name: clinic.clinic_name,  // Keep snake_case for compatibility
          phone: clinic.phone,
          address: clinic.address,
          logoUrl: clinic.logo_url,
          logo_url: clinic.logo_url,  // Keep snake_case for compatibility
          avatar: clinic.logo_url,  // Map logo_url to avatar
          isActive: clinic.is_active,
          is_active: clinic.is_active,  // Keep snake_case for compatibility
          isActivated: clinic.is_active,  // Legacy compatibility
          reportsUsed: clinic.reports_used,
          reportsAllowed: clinic.reports_allowed,
          subscriptionStatus: clinic.subscription_status,
          subscription_status: clinic.subscription_status,  // Keep snake_case for compatibility
          subscriptionTier: clinic.subscription_tier,
          trialStartDate: clinic.trial_start_date,
          trialEndDate: clinic.trial_end_date,
          createdAt: clinic.created_at,
          updatedAt: clinic.updated_at
        }));
      }

      if (table === 'patients' && actualTable === 'patients') {
        // Extra safety check for patients data
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.warn('WARNING: No patients data to transform, returning empty array');
          console.warn('WARNING: Data value:', data);
          console.warn('WARNING: Is array:', Array.isArray(data));
          console.warn('WARNING: Length:', data?.length);
          return [];
        }

        console.log('SUCCESS: Transforming patients data, count:', data.length);
        console.log('SUCCESS: Raw patients data before transform:', data);

        // Transform patients data to camelCase format
        const transformed = data.map(patient => {
          if (!patient) {
            console.warn('WARNING: Null patient in data array, skipping');
            return null;
          }

          console.log('REFRESH: Transforming patient:', patient.email);

          return {
            id: patient.id,
            name: patient.name,
            fullName: patient.full_name || patient.name,
            full_name: patient.full_name || patient.name,  // Keep snake_case for compatibility
            email: patient.email,
            phone: patient.phone,
            address: patient.address,
            dateOfBirth: patient.date_of_birth,
            date_of_birth: patient.date_of_birth,  // Keep snake_case for compatibility
            gender: patient.gender,
            clinicId: patient.clinic_id || patient.org_id,
            clinic_id: patient.clinic_id || patient.org_id,  // Keep snake_case for compatibility
            orgId: patient.org_id || patient.clinic_id,
            org_id: patient.org_id || patient.clinic_id,  // Keep snake_case for compatibility
            medicalHistory: patient.medical_history,
            medical_history: patient.medical_history,  // Keep snake_case for compatibility
            emergencyContact: patient.emergency_contact,
            emergency_contact: patient.emergency_contact,  // Keep snake_case for compatibility
            improvementFocus: patient.improvement_focus,
            brainFitnessScore: patient.brain_fitness_score,
            createdAt: patient.created_at,
            updatedAt: patient.updated_at
          };
        }).filter(p => p !== null);

        console.log('SUCCESS: Transformed patients data, count:', transformed.length);
        console.log('SUCCESS: Transformed patients:', transformed);
        return transformed;
      }

      const result = this.convertToCamelCase(data);

      // Final safety check - ensure result is always an array
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error(`ERROR: Failed to get data from ${table}:`, error);
      // Return empty array instead of throwing to prevent crashes
      return [];
    }
  }

  async add(table, item) {
    try {
      const actualTable = this.mapTableName(table);

      // Handle clinic creation specially
      if (table === 'clinics') {
        return await this.createClinic(item);
      }

      // Ensure item has an ID
      if (!item.id) {
        item.id = uuidv4();
      }

      // Filter valid fields based on table
      const filteredItem = this.filterValidFields(actualTable, item);

      // Convert field names to snake_case for Supabase
      const supabaseItem = this.convertToSnakeCase(filteredItem);
      const result = await this.supabaseService.add(actualTable, supabaseItem);
      console.log(`DATA: Added to Supabase ${table}:`, item.name || item.id);

      return this.convertToCamelCase(result);
    } catch (error) {
      console.error(`ERROR: Failed to add to ${table}:`, error);
      throw error;
    }
  }

  // Filter valid fields for each table
  filterValidFields(table, item) {
    const validFields = {
      'clinics': [
        'id', 'name', 'clinic_name', 'email', 'contact_person', 'phone', 'address', 'logo_url', 'is_active',
        'reports_used', 'reports_allowed', 'subscription_status', 'subscription_tier',
        'trial_start_date', 'trial_end_date', 'created_at', 'updated_at',
        'password' // ONLY use password field for authentication
        // Note: avatar stored in logo_url field
      ],
      'organizations': [
        'id', 'name', 'description', 'website', 'logo_url', 'is_active',
        'created_at', 'updated_at', 'owner_user_id'
      ],
      'profiles': [
        'id', 'role', 'full_name', 'phone', 'avatar_url', 'created_at', 'updated_at'
      ],
      'org_memberships': [
        'org_id', 'user_id', 'role', 'created_at'
      ],
      'patients': [
        'id', 'org_id', 'clinic_id', 'owner_user', 'external_id', 'name', 'full_name', 'date_of_birth',
        'gender', 'phone', 'email', 'address', 'medical_history', 'improvement_focus',
        'brain_fitness_score', 'emergency_contact', 'created_at', 'updated_at',
        'avatar', 'profile_image', 'profileImage', 'avatar_url'
      ],
      'reports': [
        // Actual schema from 004_simple_clinic_tables.sql:
        'id', 'clinic_id', 'patient_id', 'file_name', 'file_path',
        'report_data', 'status', 'created_at', 'updated_at'
        // Note: report_type, file_size, etc. should be stored in report_data JSONB
      ],
      'payment_history': [
        'id', 'payment_id', 'order_id', 'signature', 'clinic_id', 'amount', 'currency', 'status',
        'package_id', 'package_name', 'reports', 'plan_details', 'subscription', 'payment_details',
        'provider', 'ip_address', 'user_agent', 'metadata', 'created_at', 'updated_at'
      ],
      'subscriptions': [
        'id', 'clinic_id', 'plan', 'status', 'amount', 'currency', 'package_name', 'payment_method',
        'payment_id', 'reports_allowed', 'environment', 'plan_details', 'subscription', 'payment_details',
        'created_at', 'updated_at'
      ]
    };

    const allowedFields = validFields[table];
    if (!allowedFields) {
      return item; // No filtering if table not defined
    }

    const filteredItem = {};
    for (const [key, value] of Object.entries(item)) {
      const snakeKey = this.toSnakeCase(key);
      if (allowedFields.includes(snakeKey) || allowedFields.includes(key)) {
        filteredItem[key] = value;
      } else {
        console.log(` Filtering out invalid field for ${table}: ${key}`);
      }
    }

    return filteredItem;
  }

  async update(table, id, updates) {
    try {
      const actualTable = this.mapTableName(table);
      console.log(`REFRESH: DatabaseService.update - Table: ${table}, ID: ${id}`);
      console.log(`REFRESH: Original updates:`, updates);

      // Filter valid fields based on table
      const filteredUpdates = this.filterValidFields(actualTable, updates);
      console.log(`REFRESH: Filtered updates:`, filteredUpdates);

      const supabaseUpdates = this.convertToSnakeCase(filteredUpdates);
      console.log(`REFRESH: Snake_case updates for Supabase:`, supabaseUpdates);

      const result = await this.supabaseService.update(actualTable, id, supabaseUpdates);
      console.log(`DATA: Updated in Supabase ${table}:`, id);
      console.log(`DATA: Supabase update result:`, result);

      return this.convertToCamelCase(result);
    } catch (error) {
      console.error(`ERROR: Failed to update ${table}:`, error);
      throw error;
    }
  }

  async delete(table, id) {
    console.log(`DELETE: DatabaseService.delete called:`, { table, id });

    if (!id) {
      throw new Error('Cannot delete: ID is required');
    }

    try {
      const actualTable = this.mapTableName(table);
      const result = await this.supabaseService.delete(actualTable, id);
      console.log('SUCCESS: Supabase delete successful:', result);
      return result;
    } catch (error) {
      console.error(`ERROR: Failed to delete from ${table}:`, error);
      throw error;
    }
  }

  async findById(table, id) {
    try {
      const actualTable = this.mapTableName(table);
      const result = await this.supabaseService.findById(actualTable, id);
      return this.convertToCamelCase(result);
    } catch (error) {
      console.error(`ERROR: Failed to find by ID in ${table}:`, error);
      throw error;
    }
  }

  async findBy(table, field, value) {
    try {
      const actualTable = this.mapTableName(table);
      const snakeField = this.toSnakeCase(field);
      const results = await this.supabaseService.findBy(actualTable, snakeField, value);
      return results.map(item => this.convertToCamelCase(item));
    } catch (error) {
      console.error(`ERROR: Failed to find by ${field} in ${table}:`, error);
      throw error;
    }
  }

  async findOne(table, field, value) {
    try {
      const actualTable = this.mapTableName(table);
      const snakeField = this.toSnakeCase(field);
      const result = await this.supabaseService.findOne(actualTable, snakeField, value);
      return this.convertToCamelCase(result);
    } catch (error) {
      console.error(`ERROR: Failed to find one in ${table}:`, error);
      throw error;
    }
  }

  // Case-insensitive search by field
  async findByNameIgnoreCase(table, name) {
    try {
      const actualTable = this.mapTableName(table);
      const results = await this.supabaseService.findByNameIgnoreCase(actualTable, name);
      return results.map(item => this.convertToCamelCase(item));
    } catch (error) {
      console.error(`ERROR: Failed to find by name (case-insensitive) in ${table}:`, error);
      throw error;
    }
  }

  // Convert between camelCase and snake_case
  toSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  toCamelCase(str) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  convertToSnakeCase(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(item => this.convertToSnakeCase(item));

    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = this.toSnakeCase(key);
      converted[snakeKey] = value;
    }
    return converted;
  }

  convertToCamelCase(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(item => this.convertToCamelCase(item));

    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = this.toCamelCase(key);
      converted[camelKey] = value;
    }
    return converted;
  }

  // Super Admin specific methods
  async authenticateAdmin(email, password) {
    // Check localStorage for super admin (development mode)
    const superAdmins = await this.get('superAdmins');
    const admin = superAdmins.find(a => a.email === email);
    if (admin && admin.password === password && admin.isActive) {
      return { ...admin, password: undefined };
    }

    // Try Supabase authentication
    if (this.useSupabase) {
      try {
        const result = await this.supabaseService.signIn(email, password);
        if (result?.user) {
          return {
            id: result.user.id,
            email: result.user.email,
            role: result.user.user_metadata?.role || 'user',
            name: result.user.user_metadata?.name || 'User'
          };
        }
      } catch (error) {
        console.error('Supabase auth failed:', error);
      }
    }

    return null;
  }

  // Patient authentication
  async createPatientAuth(email, password, metadata = {}) {
    try {
      console.log('AUTH: Creating patient authentication account:', email);

      // Use Supabase Auth to create user
      const { data, error } = await this.supabaseService.supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            ...metadata,
            role: 'patient',
            created_by: 'clinic_admin'
          }
        }
      });

      if (error) {
        console.error('ERROR: Supabase auth signup error:', error);
        throw error;
      }

      console.log('SUCCESS: Patient auth account created successfully:', data.user?.id);

      // Also create profile record in profiles table
      if (data.user) {
        try {
          await this.supabaseService.supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              role: 'patient',
              full_name: metadata.full_name || '',
              created_at: new Date().toISOString()
            });
          console.log('SUCCESS: Patient profile created');
        } catch (profileError) {
          console.error('WARNING: Profile creation failed (continuing anyway):', profileError);
        }
      }

      return data;
    } catch (error) {
      console.error('ERROR: Failed to create patient auth:', error);
      throw error;
    }
  }

  // Clinic specific methods
  async createClinic(clinicData) {
    try {
      console.log('CLINIC: Creating clinic with data:', clinicData);

      // Create clinic record matching the exact schema
      // Preserve the data passed from authService (including pending approval status)
      const clinicRecord = {
        name: clinicData.name || clinicData.clinicName,
        email: clinicData.email,
        phone: clinicData.phone || '',
        address: clinicData.address || '',
        logo_url: clinicData.logo_url || clinicData.logoUrl || null,
        is_active: clinicData.is_active !== undefined ? clinicData.is_active : true,
        reports_used: clinicData.reports_used || clinicData.reportsUsed || 0,
        reports_allowed: clinicData.reports_allowed || parseInt(clinicData.reportsAllowed) || 10,
        subscription_status: clinicData.subscription_status || clinicData.subscriptionStatus || 'trial',
        subscription_tier: clinicData.subscription_tier || 'free',
        trial_start_date: clinicData.trial_start_date || new Date().toISOString(),
        trial_end_date: clinicData.trial_end_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: clinicData.created_at || clinicData.createdAt || new Date().toISOString(),
        updated_at: clinicData.updated_at || new Date().toISOString()
      };

      // IMPORTANT: Preserve the ID if provided (for existing clinic records)
      if (clinicData.id) {
        clinicRecord.id = clinicData.id;
      }

      console.log('INFO: Clinic data to create:', clinicRecord);

      // Use direct Supabase insert to clinics table
      const { data: clinic, error } = await this.supabaseService.supabase
        .from('clinics')
        .insert(clinicRecord)
        .select()
        .single();

      if (error) {
        console.error('ERROR: Supabase insert error:', error);
        throw error;
      }

      console.log('SUCCESS: Clinic created:', clinic);

      // Return in camelCase format for consistency
      return {
        id: clinic.id,
        name: clinic.name,
        email: clinic.email,
        phone: clinic.phone,
        address: clinic.address,
        logoUrl: clinic.logo_url,
        contactPerson: clinicData.contactPerson,
        isActive: clinic.is_active,
        reportsUsed: clinic.reports_used,
        reportsAllowed: clinic.reports_allowed,
        subscriptionStatus: clinic.subscription_status,
        subscriptionTier: clinic.subscription_tier,
        trialStartDate: clinic.trial_start_date,
        trialEndDate: clinic.trial_end_date,
        createdAt: clinic.created_at,
        updatedAt: clinic.updated_at
        // Note: Using single 'password' field for authentication (adminPassword removed)
      };

    } catch (error) {
      console.error('ERROR: Failed to create clinic:', error);
      throw error;
    }
  }

  async getClinicUsage(clinicId) {
    const usage = await this.findBy('usage', 'clinicId', clinicId);
    const reports = await this.findBy('reports', 'clinicId', clinicId);

    return {
      totalReports: reports.length,
      reportsThisMonth: reports.filter(r => {
        const reportDate = new Date(r.createdAt);
        const now = new Date();
        return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear();
      }).length,
      usage: usage
    };
  }

  // Patient specific methods
  async getPatientsByClinic(clinicId) {
    return await this.findBy('patients', 'org_id', clinicId);
  }

  // Reports specific methods
  async getReportsByClinic(clinicId) {
    try {
      if (!clinicId) {
        console.warn('WARNING: getReportsByClinic: No clinicId provided');
        return [];
      }

      // Get all reports and filter in memory to handle both old and new formats
      try {
        const actualTable = this.mapTableName('reports');

        // Get all reports from the table
        const { data: allReports, error } = await this.supabaseService.supabase
          .from(actualTable)
          .select('*');

        if (error) {
          console.error('ERROR: Error querying all reports:', error);
          return [];
        }

        // Filter reports that belong to this clinic (check multiple field names)
        const clinicReports = (allReports || []).filter(report => {
          return report.clinic_id === clinicId ||
                 report.clinicId === clinicId ||
                 report.org_id === clinicId;
        });

        console.log(`INFO: Found ${clinicReports.length} reports for clinic ${clinicId} (from ${allReports?.length || 0} total reports)`);

        // Fix old reports by updating them with clinic_id field if missing
        for (const report of clinicReports) {
          let needsUpdate = false;
          const updates = {};

          // Fix missing clinic_id
          if (!report.clinic_id && (report.org_id || report.clinicId)) {
            console.log(`CONFIG: Fixing report ${report.id} - adding clinic_id field`);
            updates.clinic_id = clinicId;
            report.clinic_id = clinicId;
            needsUpdate = true;
          }

          // Fix missing patient_id - try to get from report_data or file_path
          if (!report.patient_id) {
            console.log(`CONFIG: Report ${report.id} has null patient_id, attempting to fix...`);
            console.log(`  FILE: Report file_path:`, report.file_path);
            console.log(`  FILE: Report report_data:`, report.report_data);

            // Check if report_data has patient info
            if (report.report_data && typeof report.report_data === 'object') {
              const patientIdFromData = report.report_data.patientId || report.report_data.patient_id;
              if (patientIdFromData) {
                console.log(`  SUCCESS: Found patient_id in report_data: ${patientIdFromData}`);
                updates.patient_id = patientIdFromData;
                report.patient_id = patientIdFromData;
                needsUpdate = true;
              } else {
                console.log(`  ERROR: No patient_id found in report_data`);
              }
            } else {
              console.log(`  ERROR: report_data is not an object or is null`);
            }

            // If still no patient_id, try to extract from file_path
            if (!updates.patient_id && report.file_path) {
              // file_path format: reports/{clinicId}/{patientId}/{filename}
              const pathParts = report.file_path.split('/');
              console.log(`  FOLDER: file_path parts:`, pathParts);
              if (pathParts.length >= 3 && pathParts[0] === 'reports') {
                const potentialPatientId = pathParts[2];
                console.log(`  SUCCESS: Found patient_id in file_path: ${potentialPatientId}`);
                updates.patient_id = potentialPatientId;
                report.patient_id = potentialPatientId;
                needsUpdate = true;
              } else {
                console.log(`  ERROR: file_path format doesn't match expected pattern`);
              }
            } else if (!report.file_path) {
              console.log(`  ERROR: No file_path available`);
            }

            if (!updates.patient_id) {
              console.warn(`  WARNING: Could not determine patient_id for report ${report.id}`);
            }
          }

          // Apply updates if needed
          if (needsUpdate && Object.keys(updates).length > 0) {
            try {
              await this.supabaseService.supabase
                .from(actualTable)
                .update(updates)
                .eq('id', report.id);
              console.log(`  SUCCESS: Successfully updated report ${report.id}`);
            } catch (updateError) {
              console.warn(`  WARNING: Could not update report ${report.id}:`, updateError);
            }
          }
        }

        return clinicReports.map(item => this.convertToCamelCase(item));
      } catch (error) {
        console.error(`ERROR: Error getting reports for clinic ${clinicId}:`, error);
        return [];
      }
    } catch (error) {
      console.error(`ERROR: Outer error getting reports for clinic ${clinicId}:`, error);
      return [];
    }
  }

  async getReportsByPatient(patientId) {
    try {
      if (!patientId) {
        console.warn('WARNING: getReportsByPatient: No patientId provided');
        return [];
      }

      const reports = await this.findBy('reports', 'patient_id', patientId);
      console.log(`INFO: Found ${reports?.length || 0} reports for patient ${patientId}`);
      return reports || [];
    } catch (error) {
      console.error(`ERROR: Error getting reports for patient ${patientId}:`, error);
      return [];
    }
  }

  async addReport(reportData) {
    const report = await this.add('reports', reportData);

    // Get clinic ID from reportData (could be clinicId, orgId, or org_id)
    const clinicId = reportData.clinicId || reportData.orgId || reportData.org_id;

    // Update clinic usage
    if (clinicId) {
      try {
        const clinic = await this.findById('clinics', clinicId);
        if (clinic) {
          await this.update('clinics', clinic.id, {
            reportsUsed: (clinic.reportsUsed || 0) + 1
          });
          console.log('SUCCESS: Updated clinic reports usage count');
        }
      } catch (updateError) {
        console.warn('WARNING: Could not update clinic usage:', updateError);
        // Continue anyway - report was created successfully
      }
    }

    // Skip usage tracking for now - 'usage' table doesn't exist yet
    // TODO: Create proper usage/analytics table in future
    console.log('INFO: Skipping usage tracking (table not configured)');

    return report;
  }

  // Analytics methods
  async getAnalytics() {
    const clinics = await this.get('clinics');
    const reports = await this.get('reports');
    const patients = await this.get('patients');

    const activeClinicCount = clinics.filter(c => c.isActive || c.is_active).length;
    const totalReportsCount = reports.length;
    const totalPatientsCount = patients.length;

    const revenueData = await Promise.all(clinics.map(async (clinic) => {
      const subscription = await this.findOne('subscriptions', 'clinicId', clinic.id);
      return subscription && subscription.amount ? subscription.amount : 0;
    }));

    const totalRevenue = revenueData.reduce((acc, amount) => acc + amount, 0);
    const usage = await this.get('usage');

    return {
      activeClinics: activeClinicCount,
      totalReports: totalReportsCount,
      totalPatients: totalPatientsCount,
      monthlyRevenue: totalRevenue,
      recentActivity: usage.slice(-10).reverse()
    };
  }

  // Force refresh data connection
  async refreshConnection() {
    console.log('REFRESH: Refreshing database connection...');
    await this.checkSupabaseAvailability();
  }

  // Check and update expired trials
  async checkTrialExpiry(clinicId) {
    try {
      const clinic = await this.findById('clinics', clinicId);
      if (!clinic) return { expired: false, clinic: null };

      // Check if trial has expired
      if (clinic.subscriptionStatus === 'trial' && clinic.trialEndDate) {
        const trialEndDate = new Date(clinic.trialEndDate);
        const now = new Date();

        if (now > trialEndDate) {
          console.log(`TIMER: Trial expired for clinic ${clinicId}`);

          // Update clinic status
          await this.update('clinics', clinicId, {
            subscriptionStatus: 'expired',
            isActive: false
          });

          return {
            expired: true,
            clinic: {
              ...clinic,
              subscriptionStatus: 'expired',
              isActive: false
            },
            expiredAt: trialEndDate
          };
        }
      }

      return { expired: false, clinic };
    } catch (error) {
      console.error('Error checking trial expiry:', error);
      return { expired: false, clinic: null, error };
    }
  }

  // Check all expired trials (can be run periodically)
  async checkAllExpiredTrials() {
    try {
      console.log('DEBUG: Checking all expired trials...');

      const clinics = await this.get('clinics');
      const expiredClinics = [];

      for (const clinic of clinics) {
        const result = await this.checkTrialExpiry(clinic.id);
        if (result.expired) {
          expiredClinics.push(clinic);
        }
      }

      console.log(`SUCCESS: Found ${expiredClinics.length} expired trials`);
      return expiredClinics;
    } catch (error) {
      console.error('Error checking expired trials:', error);
      return [];
    }
  }
}

export default new DatabaseService();