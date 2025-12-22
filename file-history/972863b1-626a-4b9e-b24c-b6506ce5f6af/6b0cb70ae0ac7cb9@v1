import { createClient } from '@supabase/supabase-js';

// Get Supabase environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Check if we have valid Supabase configuration
const hasValidSupabaseConfig = supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co' &&
                               supabaseAnonKey && supabaseAnonKey !== 'placeholder-anon-key';

// Initialize Supabase client only if we have valid config
let supabase = null;

if (hasValidSupabaseConfig) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: 'neuro360-auth',
    },
    global: {
      headers: {
        'x-application-name': 'neuro360-web',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    },
    db: {
      schema: 'public',
    },
  });
}

class SupabaseService {
  constructor() {
    this.supabase = supabase;
    this.hasValidConfig = hasValidSupabaseConfig;

    if (!this.hasValidConfig) {
      console.warn('WARNING: Supabase is not configured. Running in demo mode.');
      console.warn('To enable Supabase, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    } else {
      this.testConnection();
      this.initializeTables();
    }
  }

  // Check if Supabase is available
  isAvailable() {
    return this.hasValidConfig && this.supabase !== null;
  }

  async testConnection() {
    if (!this.isAvailable()) return;

    try {
      console.log(' Testing Supabase connection...');
      console.log(' Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('KEY: Anon Key (first 20 chars):', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...');

      // Test basic connection using clinics table (which we know exists)
      const { data, error } = await this.supabase
        .from('clinics')
        .select('id')
        .limit(1);

      if (error) {
        console.log('WARNING: Connection test failed:', error.message);
      } else {
        console.log('SUCCESS: Supabase connection test successful');
      }
    } catch (error) {
      console.error('ERROR: Supabase connection test failed:', error);
    }
  }

  async ensureTableExists(tableName) {
    if (!this.isAvailable()) return false;

    try {
      // Quick check if table exists
      const { error } = await this.supabase.from(tableName).select('id').limit(0);
      if (!error) {
        return true; // Table exists
      }

      if (error.code === 'PGRST106' || error.message.includes('does not exist')) {
        console.log(`CONFIG: Table ${tableName} doesn't exist, creating...`);
        await this.createTable(tableName);
        return true;
      }

      return false;
    } catch (error) {
      console.error(`ERROR: Error checking table ${tableName}:`, error);
      return false;
    }
  }

  async createTable(tableName) {
    const schemas = {
      clinics: `
        CREATE TABLE clinics (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          phone VARCHAR(20),
          address TEXT,
          logo_url TEXT,
          is_active BOOLEAN DEFAULT true,
          reports_used INTEGER DEFAULT 0,
          reports_allowed INTEGER DEFAULT 10,
          subscription_status VARCHAR(50) DEFAULT 'trial',
          subscription_tier VARCHAR(50) DEFAULT 'free',
          trial_start_date TIMESTAMPTZ DEFAULT NOW(),
          trial_end_date TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow all" ON clinics FOR ALL USING (true);
      `,
      patients: `
        CREATE TABLE patients (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          clinic_id UUID,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          phone VARCHAR(20),
          date_of_birth DATE,
          gender VARCHAR(20),
          medical_history JSONB DEFAULT '{}',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow all" ON patients FOR ALL USING (true);
      `,
      reports: `
        CREATE TABLE reports (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          clinic_id UUID,
          patient_id UUID,
          file_name VARCHAR(255),
          file_path TEXT,
          report_data JSONB DEFAULT '{}',
          status VARCHAR(50) DEFAULT 'pending',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow all" ON reports FOR ALL USING (true);
      `
    };

    const schema = schemas[tableName];
    if (!schema) {
      console.log(`WARNING: No schema defined for table: ${tableName}`);
      return;
    }

    try {
      console.log(`CONFIG: Creating table: ${tableName}`);
      // Note: This won't work with standard Supabase client, but we'll log the schema
      console.log(`NOTE: SQL Schema for ${tableName}:`, schema);
      console.log(`WARNING: Please run this SQL in Supabase Dashboard > SQL Editor`);
    } catch (error) {
      console.error(`ERROR: Failed to create table ${tableName}:`, error);
    }
  }

  async initializeTables() {
    if (!this.isAvailable()) return;

    try {
      console.log('START: Initializing Supabase tables...');

      // Check only existing tables from our schema
      const existingTables = ['clinics', 'patients', 'profiles', 'organizations', 'org_memberships', 'subscriptions', 'reports'];

      for (const table of existingTables) {
        try {
          const { data, error } = await this.supabase.from(table).select('id').limit(1);
          if (error) {
            console.log(`WARNING: Table ${table} error:`, error.code, error.message);
          } else {
            console.log(`SUCCESS: Table ${table} is accessible - found ${data?.length || 0} records`);
          }
        } catch (tableError) {
          console.log(`WARNING: Table ${table} check failed:`, tableError.message);
        }
      }
    } catch (error) {
      console.error('ERROR: Error initializing Supabase tables:', error);
    }
  }

  // Generic CRUD operations with demo fallback
  async get(table) {
    if (!this.isAvailable()) return [];

    try {
      console.log(`DATA: Fetching data from Supabase table: ${table}`);
      const { data, error } = await this.supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`ERROR: Error fetching from ${table}:`, error);
        return [];
      }

      console.log(`SUCCESS: Fetched ${data?.length || 0} items from ${table}`);
      return data || [];
    } catch (error) {
      console.error(`ERROR: Error in get operation for ${table}:`, error);
      return [];
    }
  }

  async add(table, item) {
    if (!this.isAvailable()) {
      console.warn('WARNING: Supabase not available, returning demo data');
      return { ...item, id: 'demo-' + Date.now() };
    }

    try {
      console.log(` Adding item to Supabase table: ${table}`, item);

      // Remove any undefined fields
      const cleanedItem = Object.fromEntries(
        Object.entries(item).filter(([_, v]) => v !== undefined)
      );

      console.log(`CONFIG: Cleaned item for ${table}:`, cleanedItem);

      // First try to create table if it doesn't exist
      await this.ensureTableExists(table);

      const { data, error } = await this.supabase
        .from(table)
        .insert(cleanedItem)
        .select()
        .single();

      if (error) {
        console.error(`ERROR: Error adding to ${table}:`, error);
        console.error(`ERROR: Error code:`, error.code);
        console.error(`ERROR: Error message:`, error.message);
        console.error(`ERROR: Error details:`, error.details);
        console.error(`ERROR: Error hint:`, error.hint);

        // If table doesn't exist, try to create it
        if (error.code === 'PGRST106' || error.message.includes('does not exist')) {
          console.log(`CONFIG: Attempting to create table: ${table}`);
          await this.createTable(table);
          // Retry the insert
          const { data: retryData, error: retryError } = await this.supabase
            .from(table)
            .insert(cleanedItem)
            .select()
            .single();

          if (retryError) {
            throw retryError;
          }

          console.log(`SUCCESS: Successfully added to ${table} after creating table:`, retryData);
          return retryData;
        }

        throw error;
      }

      console.log(`SUCCESS: Successfully added to ${table}:`, data);
      return data;
    } catch (error) {
      console.error(`ERROR: Error in add operation for ${table}:`, error);
      console.error(`ERROR: Full error object:`, JSON.stringify(error, null, 2));
      throw error;
    }
  }

  async update(table, id, updates) {
    if (!this.isAvailable()) {
      console.warn('WARNING: Supabase not available, returning demo data');
      return { id, ...updates };
    }

    try {
      console.log(`NOTE: Updating item in Supabase table: ${table}`, { id, updates });

      // Remove any undefined fields
      const cleanedUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, v]) => v !== undefined)
      );

      const { data, error } = await this.supabase
        .from(table)
        .update({
          ...cleanedUpdates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error(`ERROR: Error updating ${table}:`, error);
        throw error;
      }

      console.log(`SUCCESS: Successfully updated ${table}:`, data);
      return data;
    } catch (error) {
      console.error(`ERROR: Error in update operation for ${table}:`, error);
      throw error;
    }
  }

  async delete(table, id) {
    if (!this.isAvailable()) {
      console.warn('WARNING: Supabase not available, simulating delete');
      return true;
    }

    try {
      console.log(`DELETE: Deleting item from Supabase table: ${table}`, { id });

      const { data, error } = await this.supabase
        .from(table)
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error(`ERROR: Supabase DELETE Error:`, {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          table: table,
          id: id
        });

        // Check for RLS policy error
        if (error.code === '42501' || error.message.includes('policy')) {
          throw new Error(`Permission denied: Please check Supabase RLS policies for ${table} table. Error: ${error.message}`);
        }

        throw new Error(`Supabase error: ${error.message}`);
      }

      console.log(`SUCCESS: Successfully deleted from ${table}:`, data);
      return true;
    } catch (error) {
      console.error(`ERROR: Error in delete operation for ${table}:`, error);
      throw error;
    }
  }

  async findById(table, id) {
    if (!this.isAvailable()) return null;

    try {
      const { data, error } = await this.supabase
        .from(table)
        .select('*')
        .eq('id', id);

      if (error) {
        console.error(`ERROR: Error finding by ID in ${table}:`, error);
        return null;
      }

      // Return first item if found, null if empty
      if (!data || data.length === 0) {
        console.log(`INFO:  No data found in ${table} for id: ${id}`);
        return null;
      }

      return data[0];
    } catch (error) {
      console.error(`ERROR: Error in findById for ${table}:`, error);
      return null;
    }
  }

  async findBy(table, field, value) {
    if (!this.isAvailable()) return [];

    try {
      const { data, error } = await this.supabase
        .from(table)
        .select('*')
        .eq(field, value);

      if (error) {
        console.error(`ERROR: Error finding by ${field} in ${table}:`, error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error(`ERROR: Error in findBy for ${table}:`, error);
      return [];
    }
  }

  async findOne(table, field, value) {
    if (!this.isAvailable()) return null;

    try {
      const { data, error } = await this.supabase
        .from(table)
        .select('*')
        .eq(field, value)
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error(`ERROR: Error finding one by ${field} in ${table}:`, error);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`ERROR: Error in findOne for ${table}:`, error);
      return null;
    }
  }

  // Clinic specific methods
  async createClinic(clinicData) {
    const clinic = {
      ...clinicData,
      is_active: true,
      reports_used: 0,
      reports_allowed: 10, // Default trial: 10 reports
      subscription_status: 'trial',
      trial_start_date: new Date().toISOString(),
      trial_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days trial
      created_at: new Date().toISOString()
    };

    return await this.add('clinics', clinic);
  }

  async getClinicUsage(clinicId) {
    if (!this.isAvailable()) {
      return {
        totalReports: 0,
        reportsThisMonth: 0,
        usage: []
      };
    }

    const usage = await this.findBy('usage', 'org_id', clinicId);
    const reports = await this.findBy('reports', 'org_id', clinicId);

    return {
      totalReports: reports.length,
      reportsThisMonth: reports.filter(r => {
        const reportDate = new Date(r.created_at);
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
    return await this.findBy('reports', 'org_id', clinicId);
  }

  async getReportsByPatient(patientId) {
    return await this.findBy('reports', 'patient_id', patientId);
  }

  async addReport(reportData) {
    const report = await this.add('reports', {
      ...reportData,
      created_at: new Date().toISOString()
    });

    // Update clinic usage
    const clinic = await this.findById('clinics', reportData.clinic_id);
    if (clinic) {
      await this.update('clinics', clinic.id, {
        reports_used: (clinic.reports_used || 0) + 1
      });
    }

    // Track usage
    await this.add('usage', {
      clinic_id: reportData.clinic_id,
      patient_id: reportData.patient_id,
      report_id: report.id,
      action: 'report_created',
      timestamp: new Date().toISOString()
    });

    return report;
  }

  // Subscription methods
  async updateSubscription(clinicId, subscriptionData) {
    if (!this.isAvailable()) {
      return { ...subscriptionData, clinic_id: clinicId, id: 'demo-sub-' + Date.now() };
    }

    let subscription = await this.findOne('subscriptions', 'clinic_id', clinicId);

    if (subscription) {
      subscription = await this.update('subscriptions', subscription.id, subscriptionData);
    } else {
      subscription = await this.add('subscriptions', {
        ...subscriptionData,
        clinic_id: clinicId,
        created_at: new Date().toISOString()
      });
    }

    // Update clinic's report allowance
    if (subscriptionData.reports_allowed) {
      const clinic = await this.findById('clinics', clinicId);
      if (clinic) {
        await this.update('clinics', clinicId, {
          reports_allowed: clinic.reports_allowed + subscriptionData.reports_allowed,
          subscription_status: 'active'
        });
      }
    }

    return subscription;
  }

  async getSubscription(clinicId) {
    return await this.findOne('subscriptions', 'clinic_id', clinicId);
  }

  // Analytics methods
  async getAnalytics() {
    if (!this.isAvailable()) {
      return {
        activeClinics: 5,
        totalReports: 150,
        totalPatients: 50,
        monthlyRevenue: 25000,
        recentActivity: []
      };
    }

    const clinics = await this.get('clinics');
    const reports = await this.get('reports');
    const patients = await this.get('patients');

    const activeClinicCount = clinics.filter(c => c.is_active).length;
    const totalReportsCount = reports.length;
    const totalPatientsCount = patients.length;

    const revenueData = await Promise.all(clinics.map(async (clinic) => {
      const subscription = await this.findOne('subscriptions', 'clinic_id', clinic.id);
      return subscription && subscription.amount ? subscription.amount : 0;
    }));

    const totalRevenue = revenueData.reduce((acc, amount) => acc + amount, 0);
    const usage = await this.get('usage');

    return {
      activeClinics: activeClinicCount,
      totalReports: totalReportsCount,
      totalPatients: totalPatientsCount,
      monthlyRevenue: totalRevenue,
      recentActivity: usage.slice(0, 10)
    };
  }

  // Auth methods
  async signUp(email, password, userData = {}) {
    if (!this.isAvailable()) {
      console.warn('WARNING: Supabase not available, returning demo user');
      return { user: { email, ...userData }, session: null };
    }

    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('ERROR: Error signing up:', error);
      throw error;
    }
  }

  async signIn(email, password) {
    if (!this.isAvailable()) {
      console.warn('WARNING: Supabase not available, returning demo session');
      return { user: { email }, session: null };
    }

    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('ERROR: Error signing in:', error);
      throw error;
    }
  }

  async signOut() {
    if (!this.isAvailable()) return;

    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('ERROR: Error signing out:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    if (!this.isAvailable()) return null;

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('ERROR: Error getting current user:', error);
      return null;
    }
  }

  // Session management
  onAuthStateChange(callback) {
    if (!this.isAvailable()) {
      // Return a dummy unsubscribe function
      return { data: null, error: null, unsubscribe: () => {} };
    }

    return this.supabase.auth.onAuthStateChange(callback);
  }
}

export default new SupabaseService();