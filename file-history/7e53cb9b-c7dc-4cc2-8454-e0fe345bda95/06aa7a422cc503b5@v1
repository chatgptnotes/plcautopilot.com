import supabaseService from '../../../services/supabaseService';
import {
  ProjectData,
  ProjectMilestone,
  ProjectTask,
  ProjectComment,
  ProjectUpdate,
  MilestoneKPI,
  Deliverable
} from '../types';

export class ProjectTrackingService {
  // Projects
  static async getProject(projectId: string): Promise<ProjectData | null> {
    try {
      console.log('📡 Fetching project from database:', projectId);

      // Check if projectId is a UUID (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);
      console.log(`🔍 Project ID is ${isUUID ? 'UUID' : 'TEXT'}:`, projectId);

      // Try to load from projects table first
      // Match by appropriate column based on ID format
      const { data: project, error: projectError } = await supabaseService.supabase
        .from('projects')
        .select('*')
        .eq(isUUID ? 'id' : 'project_id', projectId)
        .maybeSingle();

      // If project doesn't exist in projects table, try admin_projects
      if (!project) {
        if (projectError) {
          console.log('⚠️ Project query returned error, checking admin_projects...', projectError);
        } else {
          console.log('⚠️ Project not found in projects table, checking admin_projects...');
        }

        // admin_projects: try matching by UUID id first, then by project_id text
        const { data: adminProject, error: adminError } = await supabaseService.supabase
          .from('admin_projects')
          .select('*')
          .eq(isUUID ? 'id' : 'project_id', projectId)
          .maybeSingle();

        if (adminError || !adminProject) {
          console.warn('ℹ️ No matching project found in admin_projects. This is expected if the user has no assigned project.', {
            projectId,
            error: adminError || null
          });
          return null;
        }

        console.log('✅ Found project in admin_projects, creating in projects table...');

        // Create project in projects table
        // Note: adminProject.project_id is the TEXT ID, adminProject.id is UUID
        const newProject = {
          id: isUUID ? projectId : undefined, // Use UUID if that's what was passed
          project_id: isUUID ? (adminProject.project_id || adminProject.name.toLowerCase().replace(/\s+/g, '-')) : projectId,
          name: adminProject.name,
          description: adminProject.description || '',
          client: adminProject.client,
          start_date: new Date().toISOString(),
          end_date: adminProject.deadline || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
          status: adminProject.status || 'active',
          overall_progress: adminProject.progress || 0
        };

        const { data: createdProject, error: createError } = await supabaseService.supabase
          .from('projects')
          .insert(newProject)
          .select()
          .single();

        if (createError) {
          console.error('Error creating project:', createError);
          // Still try to fetch milestones even if project creation failed
        }

        // Fetch milestones from project_milestones table
        // Use the TEXT project_id for milestone lookup
        const milestoneProjectId = isUUID ? (adminProject.project_id || adminProject.name.toLowerCase().replace(/\s+/g, '-')) : projectId;
        console.log(`📊 Fetching milestones for project_id: ${milestoneProjectId}`);

        const { data: milestones, error: milestonesError } = await supabaseService.supabase
          .from('project_milestones')
          .select('*')
          .eq('project_id', milestoneProjectId)
          .order('order', { ascending: true });

        if (milestonesError) {
          console.error('Error fetching milestones:', milestonesError);
        }

        console.log(`✅ Fetched ${milestones?.length || 0} milestones for project ${projectId}`);

        // Return project with milestones
        const projectToReturn = createdProject || newProject;
        return {
          ...projectToReturn,
          milestones: milestones || [],
          tasks: [],
          team: [],
          risks: []
        } as ProjectData;
      }

      if (projectError) {
        console.error('Error fetching project:', projectError);
        return null;
      }

      console.log('✅ Project fetched from projects table:', project);

      // Load milestones separately from project_milestones table
      // Always use the TEXT project_id column for milestone lookup
      const milestoneProjectId = project.project_id || projectId;
      console.log('📊 Fetching milestones for project_id:', milestoneProjectId);
      const { data: milestones, error: milestonesError } = await supabaseService.supabase
        .from('project_milestones')
        .select('*')
        .eq('project_id', milestoneProjectId)
        .order('order', { ascending: true });

      if (milestonesError) {
        console.error('❌ Error fetching milestones:', milestonesError);
      } else {
        console.log(`✅ Fetched ${milestones?.length || 0} milestones for project ${projectId}`);
        if (milestones && milestones.length > 0) {
          console.log('📦 Sample milestone:', milestones[0]);
        } else {
          console.warn('⚠️ No milestones found in project_milestones table for project:', projectId);
        }
      }

      // Combine the data
      return {
        ...project,
        milestones: milestones || [],
        tasks: [],
        team: [],
        risks: []
      } as ProjectData;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  static async updateProject(projectId: string, updates: Partial<ProjectData>): Promise<boolean> {
    try {
      const { error } = await supabaseService.supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  }

  // Milestones
  static async getMilestones(projectId: string): Promise<ProjectMilestone[]> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('project_milestones')
        .select(`
          *,
          kpis:milestone_kpis(*)
        `)
        .eq('project_id', projectId)
        .order('order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching milestones:', error);
      return [];
    }
  }

  static async updateMilestone(milestoneId: string, updates: Partial<ProjectMilestone>): Promise<boolean> {
    try {
      // First, try to fetch the current milestone to see if it exists
      const { data: existingMilestone, error: fetchError } = await supabaseService.supabase
        .from('project_milestones')
        .select('id, project_id')
        .eq('id', milestoneId)
        .single();

      // If milestone doesn't exist, create it
      if (fetchError && fetchError.code === 'PGRST116') {
        console.log('Milestone not found, creating it...');

        // Ensure project exists first
        const projectId = (updates as any).project_id || 'neurosense-mvp';
        const { data: project, error: projectError } = await supabaseService.supabase
          .from('projects')
          .select('id')
          .eq('id', projectId)
          .single();

        if (projectError && projectError.code === 'PGRST116') {
          // Create project first
          const { error: createProjectError } = await supabaseService.supabase
            .from('projects')
            .insert({
              id: projectId,
              name: 'NeuroSense360 MVP',
              description: 'Full-stack NeuroSense360 application',
              client: 'Dr. Murali BK',
              start_date: new Date().toISOString(),
              end_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'active',
              overall_progress: 0
            });

          if (createProjectError) {
            console.error('Failed to create project:', createProjectError);
            return false;
          }
          console.log('✅ Project created:', projectId);
        }

        // Create the milestone
        const { error: createError } = await supabaseService.supabase
          .from('project_milestones')
          .insert({
            id: milestoneId,
            project_id: projectId,
            name: (updates as any).name || 'New Phase',
            description: (updates as any).description || '',
            status: (updates as any).status || 'pending',
            start_date: (updates as any).start_date || new Date().toISOString(),
            end_date: (updates as any).end_date || new Date().toISOString(),
            progress: (updates as any).progress || 0,
            deliverables: (updates as any).deliverables || [],
            assigned_to: (updates as any).assigned_to || [],
            dependencies: (updates as any).dependencies || [],
            order: (updates as any).order || 0,
            color: (updates as any).color || '#4F46E5'
          });

        if (createError) {
          console.error('Failed to create milestone:', createError);
          return false;
        }

        console.log('✅ Milestone created successfully:', milestoneId);
        return true;
      } else if (fetchError) {
        throw fetchError;
      }

      // Milestone exists, update it
      const { error: updateError } = await supabaseService.supabase
        .from('project_milestones')
        .update(updates)
        .eq('id', milestoneId);

      if (updateError) throw updateError;
      console.log('✅ Milestone updated successfully:', milestoneId);
      return true;
    } catch (error) {
      console.error('Error updating milestone:', error);
      return false;
    }
  }

  static async updateDeliverables(milestoneId: string, deliverables: Deliverable[]): Promise<boolean> {
    try {
      const { error } = await supabaseService.supabase
        .from('project_milestones')
        .update({ deliverables })
        .eq('id', milestoneId);

      if (error) throw error;
      console.log('✅ Deliverables updated in Supabase for milestone:', milestoneId);
      return true;
    } catch (error) {
      console.error('Error updating deliverables:', error);
      return false;
    }
  }

  static async toggleDeliverable(milestoneId: string, deliverableId: string, milestoneData?: any): Promise<boolean> {
    try {
      // First, try to fetch the current milestone
      const { data: milestone, error: fetchError } = await supabaseService.supabase
        .from('project_milestones')
        .select('*')
        .eq('id', milestoneId)
        .single();

      // If milestone doesn't exist and we have the data, create it
      if (fetchError && fetchError.code === 'PGRST116' && milestoneData) {
        console.log('Milestone not found, creating it first...');

        // Ensure project exists
        const { data: project, error: projectError } = await supabaseService.supabase
          .from('projects')
          .select('id')
          .eq('id', milestoneData.project_id || 'neurosense-mvp')
          .single();

        if (projectError && projectError.code === 'PGRST116') {
          // Create project first
          const { error: createProjectError } = await supabaseService.supabase
            .from('projects')
            .insert({
              id: milestoneData.project_id || 'neurosense-mvp',
              name: 'NeuroSense360 MVP',
              description: 'Full-stack NeuroSense360 application',
              client: 'Dr. Murali BK',
              start_date: new Date().toISOString(),
              end_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'active',
              overall_progress: 0
            });

          if (createProjectError) {
            console.error('Failed to create project:', createProjectError);
          }
        }

        // Create the milestone
        const { error: createError } = await supabaseService.supabase
          .from('project_milestones')
          .insert({
            id: milestoneId,
            project_id: milestoneData.project_id || 'neurosense-mvp',
            name: milestoneData.name || 'Phase',
            description: milestoneData.description || '',
            status: milestoneData.status || 'pending',
            start_date: milestoneData.start_date || new Date().toISOString(),
            end_date: milestoneData.end_date || new Date().toISOString(),
            progress: milestoneData.progress || 0,
            deliverables: milestoneData.deliverables || [],
            assigned_to: milestoneData.assigned_to || [],
            dependencies: milestoneData.dependencies || [],
            order: milestoneData.order || 0,
            color: milestoneData.color || '#4F46E5'
          });

        if (createError) {
          console.error('Failed to create milestone:', createError);
          return false;
        }

        console.log('✅ Milestone created successfully');
      } else if (fetchError) {
        throw fetchError;
      }

      // Fetch the milestone again (whether it was just created or already existed)
      const { data: currentMilestone, error: refetchError } = await supabaseService.supabase
        .from('project_milestones')
        .select('deliverables')
        .eq('id', milestoneId)
        .single();

      if (refetchError) throw refetchError;

      // Toggle the deliverable
      const updatedDeliverables = currentMilestone.deliverables.map((d: Deliverable) =>
        d.id === deliverableId ? { ...d, completed: !d.completed } : d
      );

      // Update the milestone with new deliverables
      const { error: updateError } = await supabaseService.supabase
        .from('project_milestones')
        .update({ deliverables: updatedDeliverables })
        .eq('id', milestoneId);

      if (updateError) throw updateError;
      console.log('✅ Deliverable toggled in Supabase:', deliverableId);
      return true;
    } catch (error) {
      console.error('Error toggling deliverable:', error);
      return false;
    }
  }

  static async createMilestone(projectId: string, milestone: Omit<ProjectMilestone, 'id'>): Promise<ProjectMilestone | null> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('project_milestones')
        .insert({
          ...milestone,
          project_id: projectId
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating milestone:', error);
      return null;
    }
  }

  // Tasks
  static async getTasks(milestoneId: string): Promise<ProjectTask[]> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('project_tasks')
        .select('*')
        .eq('milestone_id', milestoneId)
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  static async updateTask(taskId: string, updates: Partial<ProjectTask>): Promise<boolean> {
    try {
      const { error } = await supabaseService.supabase
        .from('project_tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  }

  static async createTask(task: Omit<ProjectTask, 'id'>): Promise<ProjectTask | null> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('project_tasks')
        .insert(task)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  }

  // KPIs
  static async updateKPI(kpiId: string, updates: Partial<MilestoneKPI>): Promise<boolean> {
    try {
      const { error } = await supabaseService.supabase
        .from('milestone_kpis')
        .update(updates)
        .eq('id', kpiId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating KPI:', error);
      return false;
    }
  }

  static async createKPI(milestoneId: string, kpi: Omit<MilestoneKPI, 'id'>): Promise<MilestoneKPI | null> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('milestone_kpis')
        .insert({
          ...kpi,
          milestone_id: milestoneId
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating KPI:', error);
      return null;
    }
  }

  // Comments
  static async getComments(projectId: string): Promise<ProjectComment[]> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('project_comments')
        .select('*')
        .eq('project_id', projectId)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  static async createComment(projectId: string, comment: Omit<ProjectComment, 'id' | 'timestamp'>): Promise<ProjectComment | null> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('project_comments')
        .insert({
          ...comment,
          project_id: projectId,
          timestamp: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating comment:', error);
      return null;
    }
  }

  static async deleteComment(commentId: string): Promise<boolean> {
    try {
      const { error } = await supabaseService.supabase
        .from('project_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  }

  // Updates
  static async getUpdates(projectId: string): Promise<ProjectUpdate[]> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('project_updates')
        .select('*')
        .eq('project_id', projectId)
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching updates:', error);
      return [];
    }
  }

  static async createUpdate(update: Omit<ProjectUpdate, 'id' | 'timestamp'>): Promise<ProjectUpdate | null> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('project_updates')
        .insert({
          ...update,
          timestamp: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating update:', error);
      return null;
    }
  }

  // Real-time subscriptions
  static subscribeToProjectChanges(
    projectId: string,
    onUpdate: (payload: any) => void
  ) {
    return supabaseService.supabase
      .channel(`project-${projectId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'project_milestones', filter: `project_id=eq.${projectId}` },
        onUpdate
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'project_tasks' },
        onUpdate
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'project_comments', filter: `project_id=eq.${projectId}` },
        onUpdate
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'project_updates', filter: `project_id=eq.${projectId}` },
        onUpdate
      )
      .subscribe();
  }

  static unsubscribeFromProjectChanges(projectId: string) {
    return supabaseService.supabase.channel(`project-${projectId}`).unsubscribe();
  }

  // ==========================================
  // Deliverable Progress Methods (New Table)
  // ==========================================

  /**
   * Get all deliverable progress for a project
   */
  static async getDeliverableProgress(projectId: string): Promise<any[]> {
    try {
      console.log('📡 Fetching deliverable progress for project:', projectId);

      const { data, error } = await supabaseService.supabase
        .from('deliverable_progress')
        .select('*')
        .eq('project_id', projectId)
        .order('milestone_id', { ascending: true });

      if (error) {
        console.error('Error fetching deliverable progress:', error);
        return [];
      }

      console.log(`✅ Fetched ${data?.length || 0} deliverable progress records`);
      return data || [];
    } catch (error) {
      console.error('Error in getDeliverableProgress:', error);
      return [];
    }
  }

  /**
   * Toggle a single deliverable completion status
   */
  static async toggleDeliverableProgress(
    projectId: string,
    milestoneId: string,
    deliverableId: string,
    deliverableText: string,
    completed: boolean
  ): Promise<boolean> {
    try {
      console.log('💾 Toggling deliverable progress:', {
        projectId,
        milestoneId,
        deliverableId,
        completed
      });

      const record = {
        project_id: projectId,
        milestone_id: milestoneId,
        deliverable_id: deliverableId,
        deliverable_text: deliverableText,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        completed_by: null // You can add user info here
      };

      const { data, error } = await supabaseService.supabase
        .from('deliverable_progress')
        .upsert(record, {
          onConflict: 'project_id,milestone_id,deliverable_id'
        })
        .select();

      if (error) {
        console.error('❌ Error saving deliverable progress:', error);
        return false;
      }

      console.log('✅ Deliverable progress saved successfully');
      return true;
    } catch (error) {
      console.error('❌ Error in toggleDeliverableProgress:', error);
      return false;
    }
  }

  /**
   * Get deliverable progress for a specific milestone
   */
  static async getDeliverableProgressByMilestone(
    projectId: string,
    milestoneId: string
  ): Promise<any[]> {
    try {
      const { data, error } = await supabaseService.supabase
        .from('deliverable_progress')
        .select('*')
        .eq('project_id', projectId)
        .eq('milestone_id', milestoneId);

      if (error) {
        console.error('Error fetching milestone deliverable progress:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getDeliverableProgressByMilestone:', error);
      return [];
    }
  }

  /**
   * Bulk save deliverable progress for a milestone
   */
  static async bulkSaveDeliverableProgress(
    projectId: string,
    milestoneId: string,
    deliverables: Array<{ id: string; text: string; completed: boolean }>
  ): Promise<boolean> {
    try {
      console.log(`💾 Bulk saving ${deliverables.length} deliverables for milestone ${milestoneId}`);

      const records = deliverables.map(d => ({
        project_id: projectId,
        milestone_id: milestoneId,
        deliverable_id: d.id,
        deliverable_text: d.text,
        completed: d.completed,
        completed_at: d.completed ? new Date().toISOString() : null,
        completed_by: null
      }));

      const { error } = await supabaseService.supabase
        .from('deliverable_progress')
        .upsert(records, {
          onConflict: 'project_id,milestone_id,deliverable_id'
        });

      if (error) {
        console.error('❌ Error bulk saving deliverable progress:', error);
        return false;
      }

      console.log('✅ Bulk save successful');
      return true;
    } catch (error) {
      console.error('❌ Error in bulkSaveDeliverableProgress:', error);
      return false;
    }
  }
}