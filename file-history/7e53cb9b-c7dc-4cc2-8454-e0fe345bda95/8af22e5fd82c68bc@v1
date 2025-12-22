import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditableMilestone from './components/EditableMilestone';
import GanttChart from './components/GanttChart';
import KPIDashboard from './components/KPIDashboard';
import ClientCollaboration from './components/ClientCollaboration';
import ProjectMetadataEditor from './components/ProjectMetadataEditor';
import ProjectDocuments from './components/ProjectDocuments';
import TeamManagement from './components/TeamManagement';
import { projectOverview as defaultProjectData } from './data/sample-project-milestones';
import { ProjectData, ProjectComment, ProjectUpdate, ProjectMilestone, ProjectTask } from './types';
import { ProjectTrackingService } from './services/projectTrackingService';
import {
  Edit, Save, Download, Upload, Share2, RefreshCw,
  Lock, Unlock, Users, Clock, Cloud, CloudOff,
  GitBranch, FileJson, AlertCircle, CheckCircle, Plus, Trash2, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface EditLock {
  userId: string;
  userName: string;
  timestamp: number;
}

interface EditableProjectDashboardProps {
  projectId?: string;
}

const EditableProjectDashboard: React.FC<EditableProjectDashboardProps> = ({ projectId = 'default-project' }) => {
  const navigate = useNavigate();
  // Use project-specific storage keys
  const STORAGE_KEY = `project-${projectId}-data`;
  const LAST_SAVED_KEY = `project-${projectId}-last-saved`;
  const EDIT_LOCK_KEY = `project-${projectId}-edit-lock`;
  const [activeView, setActiveView] = useState<'overview' | 'gantt' | 'kpi' | 'collaboration' | 'documents' | 'team'>('overview');
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectData, setProjectData] = useState<ProjectData>(defaultProjectData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [editLock, setEditLock] = useState<EditLock | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved data on mount
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        await loadProjectData();
        checkEditLock();
        // Wait a tick for state to update
        await new Promise(resolve => setTimeout(resolve, 0));
      } catch (error) {
        console.error('Error during component initialization:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();

    // Check online status
    setIsOnline(navigator.onLine);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    // Auto-save every 30 seconds if there are changes
    const autoSaveInterval = setInterval(() => {
      if (hasUnsavedChanges) {
        saveProjectData();
      }
    }, 30000);

    return () => {
      clearInterval(autoSaveInterval);
      releaseEditLock();
    };
  }, []);

  const loadProjectData = async () => {
    try {
      console.log('🔄 Loading project data from Supabase database...');

      // Load from Supabase ONLY
      const supabaseProject = await ProjectTrackingService.getProject(projectId);

      if (supabaseProject) {
        console.log('✅ Loaded project from Supabase:', supabaseProject);

        // Convert database format to app format
        const projectData: ProjectData = {
          ...supabaseProject,
          startDate: new Date(supabaseProject.start_date || supabaseProject.startDate),
          endDate: new Date(supabaseProject.end_date || supabaseProject.endDate),
          overallProgress: supabaseProject.overall_progress || supabaseProject.overallProgress || 0,
          milestones: (supabaseProject.milestones || []).map((m: any) => ({
            ...m,
            startDate: new Date(m.start_date || m.startDate),
            endDate: new Date(m.end_date || m.endDate),
            assignedTo: m.assigned_to || m.assignedTo || [],
            deliverables: m.deliverables || [],
          })),
          tasks: supabaseProject.tasks || [],
          team: supabaseProject.team || [],
          risks: supabaseProject.risks || []
        };

        setProjectData(projectData);
        toast.success(`✅ Loaded from database: ${projectData.milestones.length} milestones`);
        return;
      }

      console.log('⚠️ No data in Supabase, loading default template...');

      // No data in database, use default template
      const customizedData = {
        ...defaultProjectData,
        id: projectId,
        name: projectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      };
      setProjectData(customizedData);
      toast(`📋 Using default template for ${customizedData.name}. Click Save to store in database.`);

    } catch (error) {
      console.error('❌ Failed to load project data:', error);

      // Use defaults on error
      const customizedData = {
        ...defaultProjectData,
        id: projectId,
        name: projectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      };
      setProjectData(customizedData);
      toast.error(`Failed to load from database. Using default template.`);
    }
  };

  const saveProjectData = async () => {
    try {
      const now = new Date();
      console.log('💾 Saving project data to Supabase database...');

      // Save project metadata to database
      const projectUpdateSuccess = await ProjectTrackingService.updateProject(projectData.id, {
        name: projectData.name,
        description: projectData.description,
        client: projectData.client,
        start_date: projectData.startDate.toISOString(),
        end_date: projectData.endDate.toISOString(),
        status: projectData.status,
        overall_progress: projectData.overallProgress
      });

      // Save all milestones to database WITH deliverables
      let milestoneSaveCount = 0;
      for (const milestone of projectData.milestones) {
        const milestoneData = {
          project_id: projectData.id,
          name: milestone.name,
          description: milestone.description,
          status: milestone.status,
          start_date: milestone.startDate instanceof Date
            ? milestone.startDate.toISOString()
            : new Date(milestone.startDate).toISOString(),
          end_date: milestone.endDate instanceof Date
            ? milestone.endDate.toISOString()
            : new Date(milestone.endDate).toISOString(),
          progress: milestone.progress,
          deliverables: milestone.deliverables || [], // Save WITH completed field
          assigned_to: milestone.assignedTo || [],
          dependencies: milestone.dependencies || [],
          order: milestone.order || 0,
          color: milestone.color || '#4F46E5'
        };

        const success = await ProjectTrackingService.updateMilestone(milestone.id, milestoneData);
        if (success) {
          milestoneSaveCount++;
        }
      }

      if (projectUpdateSuccess && milestoneSaveCount === projectData.milestones.length) {
        toast.success(`✅ Saved to database: ${milestoneSaveCount} milestones`);
        console.log(`✅ Successfully saved ${milestoneSaveCount} milestones to Supabase`);
        setLastSaved(now);
        setHasUnsavedChanges(false);
      } else if (milestoneSaveCount > 0) {
        toast.warning(`⚠️ Partially saved: ${milestoneSaveCount}/${projectData.milestones.length} milestones`);
        setLastSaved(now);
        setHasUnsavedChanges(false);
      } else {
        toast.error('❌ Failed to save to database');
      }

      // Create an update entry
      const update: ProjectUpdate = {
        id: `update-${Date.now()}`,
        projectId: projectData.id,
        userId: getCurrentUserId(),
        userName: getCurrentUserName(),
        type: 'general',
        title: 'Project Data Saved to Database',
        description: `Project data has been saved to Supabase database`,
        timestamp: now
      };
      setUpdates(prev => [update, ...prev]);
    } catch (error) {
      console.error('❌ Failed to save project data:', error);
      toast.error('❌ Failed to save data to database');
    }
  };

  const checkEditLock = () => {
    const lockData = localStorage.getItem(EDIT_LOCK_KEY);
    if (lockData) {
      const lock: EditLock = JSON.parse(lockData);
      // Check if lock is still valid (less than 5 minutes old)
      if (Date.now() - lock.timestamp < 5 * 60 * 1000) {
        setEditLock(lock);
      } else {
        localStorage.removeItem(EDIT_LOCK_KEY);
      }
    }
  };

  const acquireEditLock = () => {
    const lock: EditLock = {
      userId: getCurrentUserId(),
      userName: getCurrentUserName(),
      timestamp: Date.now()
    };
    localStorage.setItem(EDIT_LOCK_KEY, JSON.stringify(lock));
    setEditLock(lock);
    setIsEditMode(true);
    toast.success('Edit mode enabled');
  };

  const releaseEditLock = () => {
    if (editLock && editLock.userId === getCurrentUserId()) {
      localStorage.removeItem(EDIT_LOCK_KEY);
      setEditLock(null);
      setIsEditMode(false);
    }
  };

  const getCurrentUserId = () => {
    // Get from auth context or use dev mode
    const auth = localStorage.getItem('neuro360-auth');
    if (auth) {
      const { user } = JSON.parse(auth);
      return user.id;
    }
    return 'dev-user-' + Math.random().toString(36).substr(2, 9);
  };

  const getCurrentUserName = () => {
    const auth = localStorage.getItem('neuro360-auth');
    if (auth) {
      const { user } = JSON.parse(auth);
      return user.name;
    }
    return 'Developer';
  };

  const handleMilestoneUpdate = async (updatedMilestone: ProjectMilestone) => {
    const updatedMilestones = projectData.milestones.map(m =>
      m.id === updatedMilestone.id ? updatedMilestone : m
    );

    // Recalculate overall progress
    const totalProgress = updatedMilestones.reduce((sum, m) => sum + m.progress, 0) / updatedMilestones.length;

    const newProjectData = {
      ...projectData,
      milestones: updatedMilestones,
      overallProgress: Math.round(totalProgress)
    };

    setProjectData(newProjectData);
    setHasUnsavedChanges(true);

    // Save to Supabase database immediately
    try {
      console.log('💾 Saving milestone to Supabase database...');

      const milestoneData = {
        project_id: projectData.id,
        name: updatedMilestone.name,
        description: updatedMilestone.description,
        status: updatedMilestone.status,
        start_date: updatedMilestone.startDate instanceof Date
          ? updatedMilestone.startDate.toISOString()
          : new Date(updatedMilestone.startDate).toISOString(),
        end_date: updatedMilestone.endDate instanceof Date
          ? updatedMilestone.endDate.toISOString()
          : new Date(updatedMilestone.endDate).toISOString(),
        progress: updatedMilestone.progress,
        deliverables: updatedMilestone.deliverables, // Save WITH completed field
        assigned_to: updatedMilestone.assignedTo || [],
        dependencies: updatedMilestone.dependencies || [],
        order: updatedMilestone.order || 0,
        color: updatedMilestone.color || '#4F46E5'
      };

      const success = await ProjectTrackingService.updateMilestone(updatedMilestone.id, milestoneData);

      if (success) {
        toast.success('✅ Milestone saved to database');
        console.log('✅ Milestone saved to Supabase:', updatedMilestone.id);
      } else {
        toast.error('❌ Failed to save milestone to database');
      }
    } catch (error) {
      console.error('❌ Error saving milestone to Supabase:', error);
      toast.error('❌ Failed to save milestone to database');
    }
  };

  const handleDeliverableToggle = useCallback(async (milestoneId: string, deliverableId: string) => {
    console.log('=== handleDeliverableToggle CALLED IN PARENT ===');
    console.log('Parent received - milestoneId:', milestoneId, 'deliverableId:', deliverableId);

    // Use a variable to capture deliverable info for database save
    let deliverableInfo: { text: string; completed: boolean } | null = null;

    // Use setProjectData with functional update to get latest state
    setProjectData((prevData) => {
      const milestone = prevData.milestones.find(m => m.id === milestoneId);

      if (!milestone) {
        console.error('Milestone not found:', milestoneId);
        return prevData;
      }

      const updatedDeliverables = milestone.deliverables.map(deliverable => {
        if (deliverable.id === deliverableId) {
          const newCompleted = !deliverable.completed;
          // Capture deliverable info for database save
          deliverableInfo = { text: deliverable.text, completed: newCompleted };
          return { ...deliverable, completed: newCompleted };
        }
        return deliverable;
      });

      const updatedMilestone = { ...milestone, deliverables: updatedDeliverables };

      const updatedMilestones = prevData.milestones.map(m =>
        m.id === milestoneId ? updatedMilestone : m
      );

      console.log('✅ Updated deliverables for milestone:', updatedDeliverables);

      return {
        ...prevData,
        milestones: updatedMilestones
      };
    });

    setHasUnsavedChanges(true);
    console.log('✅ Local state updated!');

    // Save milestone with updated deliverables to project_milestones table
    try {
      const milestone = projectData.milestones.find(m => m.id === milestoneId);
      if (milestone) {
        console.log('💾 Saving milestone with updated deliverables');

        const milestoneData = {
          project_id: projectData.id,
          name: milestone.name,
          description: milestone.description,
          status: milestone.status,
          start_date: milestone.startDate instanceof Date
            ? milestone.startDate.toISOString()
            : new Date(milestone.startDate).toISOString(),
          end_date: milestone.endDate instanceof Date
            ? milestone.endDate.toISOString()
            : new Date(milestone.endDate).toISOString(),
          progress: milestone.progress,
          deliverables: milestone.deliverables, // Save WITH completed field
          assigned_to: milestone.assignedTo || [],
          dependencies: milestone.dependencies || [],
          order: milestone.order || 0,
          color: milestone.color || '#4F46E5'
        };

        const success = await ProjectTrackingService.updateMilestone(milestoneId, milestoneData);
        if (success) {
          toast.success('✅ Deliverable saved to database');
        } else {
          toast.error('❌ Failed to save deliverable to database');
        }
      }
    } catch (error) {
      console.error('❌ Error saving deliverable to Supabase:', error);
      toast.error('❌ Failed to save deliverable to database');
    }
  }, [projectData.id, projectData.milestones]); // Need both

  const handleAddTask = (task: Omit<ProjectTask, 'id'>) => {
    const newTask: ProjectTask = {
      ...task,
      id: `task-${Date.now()}`
    };
    setProjectData({
      ...projectData,
      tasks: [...projectData.tasks, newTask]
    });
    setHasUnsavedChanges(true);
    toast.success('Task added');
  };

  const handleUpdateTask = (updatedTask: ProjectTask) => {
    const updatedTasks = projectData.tasks.map(t =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setProjectData({
      ...projectData,
      tasks: updatedTasks
    });
    setHasUnsavedChanges(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setProjectData({
      ...projectData,
      tasks: projectData.tasks.filter(t => t.id !== taskId)
    });
    setHasUnsavedChanges(true);
    toast.success('Task deleted');
  };

  const handleProjectMetadataUpdate = (updatedMetadata: Partial<ProjectData>) => {
    const oldStartDate = projectData.startDate;
    const newStartDate = updatedMetadata.startDate;

    // If start date changed, cascade the change to all milestones and tasks
    if (newStartDate && oldStartDate.getTime() !== newStartDate.getTime()) {
      const daysDifference = Math.floor((newStartDate.getTime() - oldStartDate.getTime()) / (1000 * 60 * 60 * 24));

      // Update all milestones
      const updatedMilestones = projectData.milestones.map(milestone => ({
        ...milestone,
        startDate: new Date(milestone.startDate.getTime() + daysDifference * 24 * 60 * 60 * 1000),
        endDate: new Date(milestone.endDate.getTime() + daysDifference * 24 * 60 * 60 * 1000)
      }));

      // Update all tasks
      const updatedTasks = projectData.tasks.map(task => ({
        ...task,
        startDate: new Date(task.startDate.getTime() + daysDifference * 24 * 60 * 60 * 1000),
        endDate: new Date(task.endDate.getTime() + daysDifference * 24 * 60 * 60 * 1000)
      }));

      setProjectData({
        ...projectData,
        ...updatedMetadata,
        milestones: updatedMilestones,
        tasks: updatedTasks
      });

      toast.success(`Project dates shifted by ${Math.abs(daysDifference)} days`);
    } else {
      setProjectData({
        ...projectData,
        ...updatedMetadata
      });
      toast.success('Project details updated');
    }

    setHasUnsavedChanges(true);
  };

  const handleAddMilestone = () => {
    const newMilestone: ProjectMilestone = {
      id: `milestone-${Date.now()}`,
      name: 'New Milestone',
      description: 'Enter milestone description',
      status: 'pending',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      progress: 0,
      deliverables: [],
      assignedTo: [],
      dependencies: [],
      kpis: [],
      order: projectData.milestones.length,
      color: '#3B82F6'
    };

    setProjectData({
      ...projectData,
      milestones: [...projectData.milestones, newMilestone]
    });
    setHasUnsavedChanges(true);
    toast.success('Milestone added');
  };

  const handleDeleteMilestone = (milestoneId: string) => {
    if (!confirm('Are you sure you want to delete this milestone? All associated tasks will also be deleted.')) {
      return;
    }

    // Delete milestone and all its tasks
    const updatedMilestones = projectData.milestones.filter(m => m.id !== milestoneId);
    const updatedTasks = projectData.tasks.filter(t => t.milestoneId !== milestoneId);

    // Recalculate overall progress
    const totalProgress = updatedMilestones.length > 0
      ? updatedMilestones.reduce((sum, m) => sum + m.progress, 0) / updatedMilestones.length
      : 0;

    setProjectData({
      ...projectData,
      milestones: updatedMilestones,
      tasks: updatedTasks,
      overallProgress: Math.round(totalProgress)
    });
    setHasUnsavedChanges(true);
    toast.success('Milestone and associated tasks deleted');
  };

  const exportProjectData = () => {
    const dataStr = JSON.stringify(projectData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `neurosense-project-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast.success('Project data exported');
  };

  const importProjectData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          // Convert date strings
          imported.startDate = new Date(imported.startDate);
          imported.endDate = new Date(imported.endDate);
          imported.milestones = imported.milestones.map((m: any) => ({
            ...m,
            startDate: new Date(m.startDate),
            endDate: new Date(m.endDate)
          }));
          imported.tasks = imported.tasks.map((t: any) => ({
            ...t,
            startDate: new Date(t.startDate),
            endDate: new Date(t.endDate)
          }));

          setProjectData(imported);
          setHasUnsavedChanges(true);
          toast.success('Project data imported successfully');
        } catch (error) {
          toast.error('Failed to import file');
        }
      };
      reader.readAsText(file);
    }
  };

  const shareProject = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Project link copied to clipboard');
  };

  // Show loading state while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project data...</p>
        </div>
      </div>
    );
  }

  // Validate projectData before rendering
  if (!projectData || !projectData.milestones || !projectData.tasks) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>Invalid project data. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Back to Overview Button */}
        {projectId !== 'default-project' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <button
              onClick={() => navigate(`/pulseofproject?project=${projectId}`)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all text-gray-700 hover:text-indigo-600"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Project Overview</span>
            </button>
          </motion.div>
        )}

        {/* Floating Edit Mode Button (Alternative/Additional) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button
            onClick={() => {
              if (isEditMode) {
                if (hasUnsavedChanges) {
                  saveProjectData();
                }
                releaseEditLock();
              } else {
                acquireEditLock();
              }
            }}
            disabled={editLock && editLock.userId !== getCurrentUserId()}
            className={`group flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 ${
              editLock && editLock.userId !== getCurrentUserId()
                ? 'bg-gray-400 cursor-not-allowed'
                : isEditMode
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-medium`}
            title={editLock && editLock.userId !== getCurrentUserId()
              ? `Currently being edited by ${editLock.userName}`
              : isEditMode
              ? 'Click to exit edit mode'
              : 'Click to enable edit mode'}
          >
            {isEditMode ? (
              <>
                <Unlock className="w-5 h-5" />
                <span>Exit Edit Mode</span>
                {hasUnsavedChanges && (
                  <span className="ml-2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                )}
              </>
            ) : (
              <>
                <Edit className="w-5 h-5" />
                <span>Enable Edit Mode</span>
              </>
            )}
          </button>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Header with Edit Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            {/* Old Timeline Warning Banner */}
            {projectData.startDate < new Date('2025-11-01') && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    You're viewing an old timeline (Oct 21 start). The project now starts Nov 1, 2025.
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Reset to the updated November 1st timeline? Your current changes will be lost.')) {
                      localStorage.removeItem(STORAGE_KEY);
                      localStorage.removeItem(LAST_SAVED_KEY);
                      setProjectData(defaultProjectData);
                      setHasUnsavedChanges(false);
                      toast.success('Updated to new timeline: Nov 1, 2025 - Jan 10, 2026');
                    }
                  }}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm font-medium"
                >
                  Update to Nov 1 Timeline
                </button>
              </div>
            )}

            {/* Edit Mode Banner */}
            {isEditMode && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Edit Mode Active - Changes will be saved automatically
                  </span>
                </div>
                {hasUnsavedChanges && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Unsaved changes
                  </span>
                )}
              </div>
            )}

            {/* Status Bar */}
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-sm px-3 py-1 rounded-full flex items-center gap-2 ${
                isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {isOnline ? <Cloud className="w-4 h-4" /> : <CloudOff className="w-4 h-4" />}
                {isOnline ? 'Online' : 'Offline'}
              </span>
              {lastSaved && (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              {hasUnsavedChanges && (
                <span className="text-sm text-yellow-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Unsaved changes
                </span>
              )}
              {editLock && editLock.userId !== getCurrentUserId() && (
                <span className="text-sm text-orange-600 flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  Being edited by {editLock.userName}
                </span>
              )}
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {/* Edit Mode Toggle Switch */}
                <div className={`flex items-center gap-3 px-5 py-3 rounded-lg border-2 transition-all ${
                  isEditMode
                    ? 'bg-green-50 border-green-300'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <span className={`text-sm font-semibold ${
                    isEditMode ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    Edit Mode
                  </span>
                  <button
                    onClick={() => {
                      if (isEditMode) {
                        if (hasUnsavedChanges) {
                          saveProjectData();
                        }
                        releaseEditLock();
                      } else {
                        acquireEditLock();
                      }
                    }}
                    disabled={editLock && editLock.userId !== getCurrentUserId()}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      editLock && editLock.userId !== getCurrentUserId()
                        ? 'bg-gray-300 cursor-not-allowed'
                        : isEditMode
                        ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                        : 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-500'
                    }`}
                    title={editLock && editLock.userId !== getCurrentUserId()
                      ? `Currently being edited by ${editLock.userName}`
                      : isEditMode
                      ? 'Click to exit edit mode'
                      : 'Click to enable edit mode'}
                  >
                    <span className="sr-only">Toggle edit mode</span>
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                        isEditMode ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  {isEditMode ? (
                    <div className="flex items-center gap-1">
                      <Unlock className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Lock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Locked</span>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                {isEditMode && hasUnsavedChanges && (
                  <button
                    onClick={saveProjectData}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                )}

                {/* Export/Import */}
                <button
                  onClick={exportProjectData}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Download className="w-5 h-5" />
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={importProjectData}
                  className="hidden"
                />

                <button
                  onClick={shareProject}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                <button
                  onClick={loadProjectData}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  title="Reload saved data"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset to default project data? This will clear all your changes.')) {
                      localStorage.removeItem(STORAGE_KEY);
                      localStorage.removeItem(LAST_SAVED_KEY);
                      setProjectData(defaultProjectData);
                      setHasUnsavedChanges(false);
                      toast.success('Reset to default project timeline (Nov 1, 2025 start)');
                    }
                  }}
                  className="p-2 bg-red-100 rounded-lg hover:bg-red-200"
                  title="Reset to default timeline"
                >
                  <RefreshCw className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex gap-2 mt-6 border-t pt-4">
              {(['overview', 'gantt', 'kpi', 'collaboration', 'documents', 'team'] as const).map(view => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    activeView === view
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Project Metadata Editor */}
          <ProjectMetadataEditor
            projectData={projectData}
            onUpdate={handleProjectMetadataUpdate}
            isEditMode={isEditMode}
          />

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === 'overview' && (
                <div className="space-y-4">
                  {/* Progress Overview */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Project Progress</h2>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Overall Completion</span>
                        <span className="text-sm font-bold">{projectData.overallProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full transition-all"
                          style={{ width: `${projectData.overallProgress}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-500">
                          {projectData.milestones.filter(m => m.status === 'completed').length}
                        </div>
                        <div className="text-sm text-gray-600">Completed Milestones</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-500">
                          {projectData.milestones.filter(m => m.status === 'in-progress').length}
                        </div>
                        <div className="text-sm text-gray-600">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-500">
                          {projectData.milestones.filter(m => m.status === 'pending').length}
                        </div>
                        <div className="text-sm text-gray-600">Pending</div>
                      </div>
                    </div>
                  </div>

                  {/* Editable Milestones */}
                  <div className="space-y-4">
                    {/* Add Milestone Button */}
                    {isEditMode && (
                      <button
                        onClick={handleAddMilestone}
                        className="w-full py-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium flex items-center justify-center gap-2 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                        Add New Milestone
                      </button>
                    )}

                    {projectData.milestones.map(milestone => (
                      <EditableMilestone
                        key={milestone.id}
                        milestone={milestone}
                        tasks={projectData.tasks.filter(t => t.milestoneId === milestone.id)}
                        onUpdate={handleMilestoneUpdate}
                        onDelete={handleDeleteMilestone}
                        onAddTask={handleAddTask}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                        isEditMode={isEditMode}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeView === 'gantt' && (() => {
                console.log('=== RENDERING GanttChart in EditableProjectDashboard ===');
                console.log('Passing handleDeliverableToggle:', handleDeliverableToggle);
                console.log('handleDeliverableToggle type:', typeof handleDeliverableToggle);
                // Create a stable key based on milestone deliverables state to force re-render
                const dataKey = JSON.stringify(projectData.milestones.map(m => ({
                  id: m.id,
                  deliverables: m.deliverables.map(d => ({ id: d.id, completed: d.completed }))
                })));
                return (
                  <GanttChart
                    key={dataKey}
                    data={{
                      milestones: projectData.milestones,
                      tasks: projectData.tasks,
                      startDate: projectData.startDate,
                      endDate: projectData.endDate,
                      viewMode: 'month'
                    }}
                    onDeliverableToggle={handleDeliverableToggle}
                    showTasks={true}
                    interactive={true}
                  />
                );
              })()}

              {activeView === 'kpi' && (
                <KPIDashboard projectData={projectData} />
              )}

              {activeView === 'collaboration' && (
                <ClientCollaboration
                  projectId={projectData.id}
                  comments={comments}
                  updates={updates}
                  onSendComment={(comment) => {
                    const newComment: ProjectComment = {
                      ...comment,
                      id: `comment-${Date.now()}`,
                      timestamp: new Date()
                    };
                    setComments(prev => [...prev, newComment]);
                  }}
                  currentUserId={getCurrentUserId()}
                  currentUserName={getCurrentUserName()}
                  currentUserRole="team"
                />
              )}

              {activeView === 'documents' && (
                <ProjectDocuments
                  projectId={projectData.id}
                  isEditMode={isEditMode}
                />
              )}

              {activeView === 'team' && (
                <TeamManagement
                  projectName={projectData.id}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Collaboration Status Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Collaborative editing enabled • Auto-save every 30 seconds
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isEditMode ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    Editing
                  </span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    View Only
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DndProvider>
  );
};

export default EditableProjectDashboard;