import supabaseService from './supabaseService';
import { supabase } from './supabaseService';

/**
 * User Management Service
 * Handles all user and project assignment operations
 */
class UserManagementService {
  constructor() {
    this.usersTable = 'users';
    this.assignmentsTable = 'user_projects';
    console.log('👥 UserManagementService initialized');
  }

  // ==================== USER OPERATIONS ====================

  /**
   * Get all users
   * @returns {Promise<Array>} List of all users
   */
  async getAllUsers() {
    try {
      console.log('📊 Fetching all users...');

      const { data, error } = await supabase
        .from(this.usersTable)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching users:', error);
        throw error;
      }

      console.log(`✅ Fetched ${data?.length || 0} users`);
      return data || [];
    } catch (error) {
      console.error('❌ Error in getAllUsers:', error);
      return [];
    }
  }

  /**
   * Get users with statistics
   * @returns {Promise<Array>} List of users with project counts
   */
  async getUsersWithStats() {
    try {
      console.log('📊 Fetching users with stats...');

      const { data, error } = await supabase
        .from('users_with_stats')
        .select('*');

      if (error) {
        console.warn('⚠️ users_with_stats view not available, using fallback');
        console.error('View error:', error);

        // Fallback: Get all users and manually add project counts
        const users = await this.getAllUsers();

        // Get project counts for each user
        const usersWithStats = await Promise.all(users.map(async (user) => {
          const { data: projects } = await supabase
            .from('user_projects')
            .select('project_id')
            .eq('user_id', user.id);

          return {
            ...user,
            project_count: projects?.length || 0,
            assigned_projects: projects?.map(p => p.project_id) || []
          };
        }));

        console.log(`✅ Fetched ${usersWithStats.length} users via fallback`);
        return usersWithStats;
      }

      console.log(`✅ Fetched ${data?.length || 0} users from view`);
      return data || [];
    } catch (error) {
      console.error('❌ Error in getUsersWithStats:', error);
      // Last resort fallback
      return await this.getAllUsers();
    }
  }

  /**
   * Get user by ID
   * @param {string} userId - User UUID
   * @returns {Promise<Object|null>} User data
   */
  async getUserById(userId) {
    try {
      const { data, error } = await supabase
        .from(this.usersTable)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('❌ Error in getUserById:', error);
      return null;
    }
  }

  /**
   * Get current logged-in user
   * @returns {Promise<Object|null>} Current user data
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error('❌ Error getting current user:', error);
        return null;
      }

      // Get user details from users table
      const userData = await this.getUserById(user.id);
      return userData;
    } catch (error) {
      console.error('❌ Error in getCurrentUser:', error);
      return null;
    }
  }

  /**
   * Create a new user (Super admin only)
   * @param {Object} userData - User data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.full_name - Full name
   * @param {string} userData.role - Role (super_admin or user)
   * @returns {Promise<Object|null>} Created user
   */
  async createUser(userData) {
    try {
      console.log('➕ Creating new user:', userData.email);

      // Save current session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      console.log('📝 Current session saved');

      // Create the auth user - trigger will create public.users record automatically
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role || 'user'
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (authError) {
        console.error('❌ Error creating auth user:', authError);
        throw authError;
      }

      if (!authData.user) {
        throw new Error('User creation failed - no user data returned');
      }

      const newUserId = authData.user.id;
      console.log('✅ Auth user created:', newUserId);

      // IMPORTANT: Restore the admin session
      if (currentSession) {
        const { error: restoreError } = await supabase.auth.setSession({
          access_token: currentSession.access_token,
          refresh_token: currentSession.refresh_token
        });

        if (restoreError) {
          console.error('⚠️ Could not restore admin session:', restoreError);
          // Force page reload to restore session
          window.location.reload();
        } else {
          console.log('✅ Admin session restored');
        }
      }

      // Ensure a row exists in public.users (in case trigger is misconfigured or slow)
      try {
        const { error: userInsertError } = await supabase
          .from(this.usersTable)
          .upsert({
            id: newUserId,
            email: userData.email,
            full_name: userData.full_name,
            role: userData.role || 'user',
            is_active: true
          }, { onConflict: 'id' });

        if (userInsertError) {
          console.warn('⚠️ Could not upsert user into public.users (trigger will handle it if configured):', userInsertError);
        } else {
          console.log('✅ User upserted into public.users table');
        }
      } catch (e) {
        console.warn('⚠️ Exception while upserting into public.users:', e);
      }

      // Wait a moment for trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the created user profile
      const profile = await this.getUserById(newUserId);

      if (!profile) {
        console.warn('⚠️ User profile not found immediately, it may still be creating');
        // Return basic info
        return {
          id: newUserId,
          email: userData.email,
          full_name: userData.full_name,
          role: userData.role || 'user',
          is_active: true
        };
      }

      console.log('✅ User created successfully:', profile.email);
      return profile;
    } catch (error) {
      console.error('❌ Error in createUser:', error);
      throw error;
    }
  }

  /**
   * Update user
   * @param {string} userId - User UUID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object|null>} Updated user
   */
  async updateUser(userId, updates) {
    try {
      console.log('📝 Updating user:', userId);

      // Remove id from updates
      const { id, ...updateData } = updates;

      const { data, error } = await supabase
        .from(this.usersTable)
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      console.log('✅ User updated successfully');
      return data;
    } catch (error) {
      console.error('❌ Error in updateUser:', error);
      throw error;
    }
  }

  /**
   * Delete user
   * @param {string} userId - User UUID
   * @returns {Promise<boolean>} Success status
   */
  async deleteUser(userId) {
    try {
      console.log('🗑️ Deleting user:', userId);

      // Delete from public.users table (auth.users will be cleaned by database policies)
      const { error } = await supabase
        .from(this.usersTable)
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('❌ Error deleting user:', error);
        throw error;
      }

      console.log('✅ User deleted successfully from public.users');

      // Note: To fully delete from auth.users, you need service role key
      // For now, we just deactivate in public.users
      // Alternatively, mark as inactive instead of deleting

      return true;
    } catch (error) {
      console.error('❌ Error in deleteUser:', error);
      return false;
    }
  }

  /**
   * Toggle user active status
   * @param {string} userId - User UUID
   * @param {boolean} isActive - Active status
   * @returns {Promise<Object|null>} Updated user
   */
  async toggleUserStatus(userId, isActive) {
    try {
      return await this.updateUser(userId, { is_active: isActive });
    } catch (error) {
      console.error('❌ Error toggling user status:', error);
      return null;
    }
  }

  /**
   * Update user's last login time
   * @param {string} userId - User UUID
   * @returns {Promise<void>}
   */
  async updateLastLogin(userId) {
    try {
      await supabase
        .from(this.usersTable)
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId);
    } catch (error) {
      console.error('❌ Error updating last login:', error);
    }
  }

  // ==================== PROJECT ASSIGNMENT OPERATIONS ====================

  /**
   * Get projects assigned to a user
   * @param {string} userId - User UUID
   * @returns {Promise<Array>} List of assigned projects
   */
  async getUserProjects(userId) {
    try {
      console.log('📊 Fetching projects for user:', userId);

      const { data, error } = await supabase
        .rpc('get_user_projects', { user_uuid: userId });

      if (error) {
        console.error('❌ Error fetching user projects:', error);
        throw error;
      }

      console.log(`✅ Found ${data?.length || 0} projects for user`);
      return data || [];
    } catch (error) {
      console.error('❌ Error in getUserProjects:', error);
      return [];
    }
  }

  /**
   * Get all project assignments with details
   * @returns {Promise<Array>} List of assignments
   */
  async getAllAssignments() {
    try {
      const { data, error } = await supabase
        .from('project_assignments_detail')
        .select('*');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ Error in getAllAssignments:', error);
      return [];
    }
  }

  /**
   * Assign project to user
   * @param {Object} assignment - Assignment data
   * @param {string} assignment.userId - User UUID
   * @param {string} assignment.projectId - Project ID
   * @param {boolean} assignment.canEdit - Can user edit
   * @param {string} assignment.notes - Optional notes
   * @returns {Promise<Object|null>} Assignment ID
   */
  async assignProject(assignment) {
    try {
      console.log('➕ Assigning project to user:', assignment);

      const { data, error } = await supabase
        .rpc('assign_project_to_user', {
          p_user_id: assignment.userId,
          p_project_id: assignment.projectId,
          p_can_edit: assignment.canEdit || false,
          p_notes: assignment.notes || null
        });

      if (error) throw error;

      console.log('✅ Project assigned successfully');
      return data;
    } catch (error) {
      console.error('❌ Error in assignProject:', error);
      throw error;
    }
  }

  /**
   * Assign multiple projects to a user with granular permissions
   * @param {string} userId - User UUID
   * @param {Array<string>} projectIds - Array of project IDs
   * @param {boolean} canEdit - Can user edit
   * @param {Object} permissions - Granular permissions
   * @returns {Promise<boolean>} Success status
   */
  async assignMultipleProjects(userId, projectIds, canEdit = false, permissions = {}) {
    try {
      console.log(`➕ Assigning ${projectIds.length} projects to user with permissions`);
      console.log('📋 Received permissions:', permissions);
      console.log('✏️ Can Edit:', canEdit);

      // Default permissions if not provided
      const defaultPermissions = {
        canViewDetailedPlan: false,
        canUploadDocuments: true,
        canManageBugs: true,
        canAccessTesting: true,
        canUploadProjectDocs: true,
        canViewMetrics: true,
        canViewTimeline: true
      };

      const finalPermissions = { ...defaultPermissions, ...permissions };
      console.log('🎯 Final permissions after merge:', finalPermissions);

      const assignments = projectIds.map(projectId => ({
        user_id: userId,
        project_id: projectId,
        can_edit: canEdit,
        can_view_detailed_plan: finalPermissions.canViewDetailedPlan,
        can_upload_documents: finalPermissions.canUploadDocuments,
        can_manage_bugs: finalPermissions.canManageBugs,
        can_access_testing: finalPermissions.canAccessTesting,
        can_upload_project_docs: finalPermissions.canUploadProjectDocs,
        can_view_metrics: finalPermissions.canViewMetrics,
        can_view_timeline: finalPermissions.canViewTimeline,
        assigned_by: null // Will be set by database
      }));

      console.log('📦 Assignments to be saved:', assignments);

      const { data, error } = await supabase
        .from(this.assignmentsTable)
        .upsert(assignments)
        .select();

      if (error) {
        console.error('❌ Database error:', error);
        throw error;
      }

      console.log('✅ Projects assigned successfully with permissions');
      console.log('💾 Saved data:', data);
      return true;
    } catch (error) {
      console.error('❌ Error in assignMultipleProjects:', error);
      return false;
    }
  }

  /**
   * Remove project assignment
   * @param {string} userId - User UUID
   * @param {string} projectId - Project ID
   * @returns {Promise<boolean>} Success status
   */
  async removeAssignment(userId, projectId) {
    try {
      console.log('🗑️ Removing project assignment');

      const { data, error } = await supabase
        .rpc('remove_project_assignment', {
          p_user_id: userId,
          p_project_id: projectId
        });

      if (error) throw error;

      console.log('✅ Assignment removed successfully');
      return data;
    } catch (error) {
      console.error('❌ Error in removeAssignment:', error);
      return false;
    }
  }

  /**
   * Get users assigned to a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} List of users
   */
  async getProjectUsers(projectId) {
    try {
      const { data, error } = await supabase
        .from('project_assignments_detail')
        .select('*')
        .eq('project_id', projectId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ Error in getProjectUsers:', error);
      return [];
    }
  }

  // ==================== STATISTICS ====================

  /**
   * Get user management statistics
   * @returns {Promise<Object>} Statistics
   */
  async getStatistics() {
    try {
      const users = await this.getAllUsers();
      const assignments = await this.getAllAssignments();

      const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.is_active).length,
        inactiveUsers: users.filter(u => !u.is_active).length,
        superAdmins: users.filter(u => u.role === 'super_admin').length,
        regularUsers: users.filter(u => u.role === 'user').length,
        totalAssignments: assignments.length,
        usersWithProjects: new Set(assignments.map(a => a.user_id)).size,
        projectsAssigned: new Set(assignments.map(a => a.project_id)).size
      };

      return stats;
    } catch (error) {
      console.error('❌ Error getting statistics:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        superAdmins: 0,
        regularUsers: 0,
        totalAssignments: 0,
        usersWithProjects: 0,
        projectsAssigned: 0
      };
    }
  }
}

// Export singleton instance
export default new UserManagementService();
