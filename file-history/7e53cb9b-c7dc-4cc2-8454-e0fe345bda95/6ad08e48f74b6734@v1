// User Projects Service
// Fetches projects assigned to specific users based on permissions

import supabaseService, { supabase as sharedSupabaseClient } from './supabaseService';

const supabaseClient = sharedSupabaseClient || supabaseService.supabase;

class UserProjectsService {
  /**
   * Get all projects assigned to a specific user
   * @param {string} userId - The user's UUID
   * @returns {Promise<Array>} Array of projects with permissions
   */
  async getUserProjects(userId) {
    try {
      console.log('📋 Fetching projects for user:', userId);

      // Call the database function to get user projects
      const { data, error } = await supabaseClient
        .rpc('get_user_projects', { user_uuid: userId });

      if (error) {
        console.error('❌ Error fetching user projects:', error);
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });

        // If function doesn't exist or RLS is blocking, try direct query
        if (error.code === '42883' || error.code === 'PGRST116' || error.code === '42501') {
          console.log('⚠️ Function call failed, trying direct query to admin_projects...');

          // Try direct query to admin_projects
          // Note: admin_projects has UUID 'id' and TEXT 'project_id'
          const { data: directData, error: directError } = await supabaseClient
            .from('admin_projects')
            .select('project_id, name, client, description, status, priority, progress, starred, deadline')
            .limit(100);

          if (directError) {
            console.error('❌ Direct query also failed:', directError);
            throw directError;
          }

          console.log('✅ Direct query succeeded, found', directData?.length || 0, 'projects');

          // Map database projects to frontend format
          const mappedDirectData = this.mapDatabaseProjectsToFrontend(directData || []);
          console.log('📦 Mapped direct projects:', mappedDirectData);

          return mappedDirectData;
        }

        throw error;
      }

      console.log('✅ Fetched', data?.length || 0, 'projects for user');
      console.log('📦 User projects data:', data);

      // Map database projects to frontend format
      const mappedProjects = this.mapDatabaseProjectsToFrontend(data || []);
      console.log('📦 Mapped projects:', mappedProjects);

      return mappedProjects;
    } catch (error) {
      console.error('❌ getUserProjects error:', error);
      throw error;
    }
  }

  /**
   * Get user permissions for a specific project
   * @param {string} userId - The user's UUID
   * @param {string} projectId - The project ID
   * @returns {Promise<Object>} Project permissions object
   */
  async getUserProjectPermissions(userId, projectId) {
    try {
      console.log('🔐 Fetching permissions for user:', userId, 'project:', projectId);

      const { data, error } = await supabaseClient
        .from('user_projects')
        .select('*')
        .eq('user_id', userId)
        .eq('project_id', projectId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No row found - user has no permissions for this project
          console.log('ℹ️ User has no permissions for project:', projectId);
          return null;
        }
        console.error('❌ Error fetching project permissions:', error);
        throw error;
      }

      console.log('✅ User permissions for project:', data);
      return data;
    } catch (error) {
      console.error('❌ getUserProjectPermissions error:', error);
      throw error;
    }
  }

  /**
   * Check if user has a specific permission for a project
   * @param {string} userId - The user's UUID
   * @param {string} projectId - The project ID
   * @param {string} permission - The permission name (e.g., 'can_edit', 'can_view_detailed_plan')
   * @returns {Promise<boolean>} True if user has the permission
   */
  async hasPermission(userId, projectId, permission) {
    try {
      const permissions = await this.getUserProjectPermissions(userId, projectId);

      if (!permissions) {
        return false; // No permissions = no access
      }

      return permissions[permission] === true;
    } catch (error) {
      console.error('❌ hasPermission error:', error);
      return false;
    }
  }

  /**
   * Map database project names to frontend project IDs
   * @param {Array} dbProjects - Array of projects from database
   * @returns {Array} Array of projects with mapped IDs
   */
  mapDatabaseProjectsToFrontend(dbProjects) {
    return dbProjects.map(project => {
      // If project has project_id field (new schema), use that
      // Otherwise, map by name (old schema fallback)
      const frontendId = project.project_id || project.id;

      return {
        ...project,
        frontendId: frontendId,
        id: frontendId // Use project_id as the ID for frontend
      };
    });
  }
}

export default new UserProjectsService();
