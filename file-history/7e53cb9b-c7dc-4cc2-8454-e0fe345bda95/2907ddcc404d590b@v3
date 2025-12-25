import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Activity, GitBranch, Github, Gitlab, AlertCircle, CheckCircle2,
  Settings, Users, BarChart3, Calendar, Zap, Bell, Download,
  Upload, Share2, RefreshCw, Webhook, Database, Cloud, MessageSquare, Menu, X, ArrowRight, Edit3, LogOut
} from 'lucide-react';
import { PRODUCT_CONFIG, CLIENT_CONFIG } from './config/brand';
import ProjectSelector from './components/ProjectSelector';
import AutoProgressTracker from './components/AutoProgressTracker';
import IntegrationPanel from './components/IntegrationPanel';
import ClientPortal from './components/ClientPortal';
import DashboardMetrics from './components/DashboardMetrics';
import ChatCollaboration from './components/ChatCollaboration';
import BugReport from './components/BugReport';
import TestingTracker from './components/TestingTracker';
import GanttChart from '../project-tracking/components/GanttChart';
import ProjectDocuments from '../project-tracking/components/ProjectDocuments';
import { projectOverview } from '../project-tracking/data/sample-project-milestones';
import { ProjectTrackingService } from '../project-tracking/services/projectTrackingService';
import PermissionGuard from '../../components/PermissionGuard';
import { PERMISSIONS } from '../../constants/permissions';
import { useAuth } from '../../contexts/AuthContext';
import userProjectsService from '../../services/userProjectsService';

interface PulseOfProjectProps {
  clientMode?: boolean;
  projectId?: string | null;
  apiKey?: string;
}

const PulseOfProject: React.FC<PulseOfProjectProps> = ({
  clientMode = false,
  projectId = null,
  apiKey
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); // Get user and logout from AuthContext

  // Read project ID from URL parameter
  const searchParams = new URLSearchParams(location.search);
  const urlProjectId = searchParams.get('project');
  const initialProjectId = urlProjectId || projectId;

  const [selectedProject, setSelectedProject] = useState<string | null>(initialProjectId);

  // Log initial project selection
  useEffect(() => {
    console.log('🎯 Initial project from URL:', urlProjectId);
    console.log('🎯 Initial project from props:', projectId);
    console.log('🎯 Selected project:', initialProjectId);
  }, []);
  const [projectData, setProjectData] = useState<any>({
    id: initialProjectId,
    name: 'Loading...',
    description: '',
    client: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'active',
    overallProgress: 0,
    milestones: [], // Start with empty milestones - will load from DB
    tasks: [],
    team: [],
    risks: []
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Map frontend project IDs to database project IDs
  const getDbProjectId = (projectId: string): string => {
    // Frontend project IDs match database IDs from admin_projects table
    // No mapping needed - return as-is
    return projectId;
  };
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [showChat, setShowChat] = useState(false); // Chat hidden by default
  const [bugs, setBugs] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default
  const [integrations, setIntegrations] = useState({
    github: { connected: false, repos: [] },
    gitlab: { connected: false, projects: [] },
    jira: { connected: false, projects: [] },
    slack: { connected: false, channels: [] }
  });

  // Auto-select first assigned project for regular users if none selected
  useEffect(() => {
    const ensureProjectSelectedForUser = async () => {
      if (clientMode) return;
      if (!user || user.role === 'super_admin') return;
      if (selectedProject) return;

      try {
        console.log('🔐 Loading assigned projects for user:', user.id);
        const userProjects = await userProjectsService.getUserProjects(user.id);

        let frontendId: string | null = null;

        if (userProjects && userProjects.length > 0) {
          const first = userProjects[0];
          frontendId = (first as any).frontendId || (first as any).project_id || (first as any).id || null;
          console.log('🎯 Auto-selecting user project from assignments:', frontendId);

          if (frontendId) {
            setSelectedProject(frontendId);

            // Keep URL in sync for refresh/share
            const params = new URLSearchParams(location.search);
            params.set('project', frontendId);
            navigate(`${location.pathname}?${params.toString()}`, { replace: true });
          }
        } else {
          // FIXED: Don't fallback to neurosense-mvp if user has no projects
          // This was causing permission errors
          console.log('ℹ️ No projects assigned to this user.');
          setSelectedProject(null); // Clear selection
        }
      } catch (error) {
        console.error('❌ Failed to load user projects for auto-selection:', error);
      }
    };

    ensureProjectSelectedForUser();
  }, [clientMode, user, selectedProject, navigate, location.pathname, location.search]);

  // Update selectedProject when URL parameter or projectId prop changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlProjectId = searchParams.get('project');
    const newProjectId = urlProjectId || projectId;

    if (newProjectId && newProjectId !== selectedProject) {
      console.log('🔄 Project ID changed:', selectedProject, '->', newProjectId);
      setSelectedProject(newProjectId);

      // Update URL to reflect selected project
      if (!urlProjectId && newProjectId) {
        navigate(`${location.pathname}?project=${newProjectId}`, { replace: true });
      }
    }
  }, [location.search, projectId, selectedProject, navigate, location.pathname]);

  // FIXED: Clear bugs when switching projects to prevent cross-contamination
  useEffect(() => {
    console.log('🔄 Project switched to:', selectedProject, '- Clearing bugs');
    setBugs([]); // Clear bugs array when project changes
  }, [selectedProject]);

  // Shared function to load project data
  const loadProjectData = useCallback(async () => {
    // Validate selectedProject before loading
    if (!selectedProject) {
      console.log('⚠️ No project selected, skipping data load');
      setIsLoadingData(false);
      return;
    }

    const dbProjectId = getDbProjectId(selectedProject);
    console.log('🔍 [PulseOfProject] Loading project data for:', selectedProject, '-> DB ID:', dbProjectId);

    setIsLoadingData(true);

      try {
        // SECURITY: Check if user has permission to access this project
        if (user && user.role !== 'super_admin' && !clientMode) {
          console.log('🔐 Checking user permission for project:', dbProjectId);

          const userProjects = await userProjectsService.getUserProjects(user.id);
          const hasAccess = userProjects.some(p =>
            p.project_id === dbProjectId || p.frontendId === dbProjectId || p.id === dbProjectId
          );

          if (!hasAccess) {
            console.error('❌ User does not have permission to access project:', dbProjectId);

            // FIXED: Only show toast once by checking if we already redirected
            const hasShownError = sessionStorage.getItem('permission_error_shown');
            if (!hasShownError) {
              if (userProjects.length > 0) {
                toast.error('Redirecting to your assigned project');
              } else {
                toast.error('No projects assigned to your account. Please contact admin.');
              }
              sessionStorage.setItem('permission_error_shown', 'true');
            }

            setIsLoadingData(false);

            // Redirect to first available project or clear selection
            if (userProjects.length > 0) {
              const firstProject = userProjects[0];
              const firstProjectId = firstProject.frontendId || firstProject.project_id || firstProject.id;
              setSelectedProject(firstProjectId);
            } else {
              setSelectedProject(null);
            }
            return;
          }

          // Clear the error flag on successful access
          sessionStorage.removeItem('permission_error_shown');
          console.log('✅ User has permission to access project:', dbProjectId);
        }

        // First, try to load project data from the database
        let dbProject = await ProjectTrackingService.getProject(dbProjectId);

        console.log('📦 [PulseOfProject] Database response:', {
          hasProject: !!dbProject,
          hasMilestones: !!dbProject?.milestones,
          milestonesCount: dbProject?.milestones?.length || 0,
          fullDbProject: dbProject
        });

        // Log raw data to see what we're getting
        if (dbProject) {
          console.log('🔍 Raw database project:', JSON.stringify(dbProject, null, 2));
        } else {
          console.log('⚠️ dbProject is null or undefined!');
        }

        // If project doesn't exist, show error and empty state
        if (!dbProject) {
          console.log('⚠️ Project not found in database');
          console.log('ℹ️  Please run COMPLETE_MILESTONE_IMPORT.sql to populate the database');

          setIsLoadingData(false);

          // Set empty state
          setProjectData({
            id: dbProjectId,
            name: selectedProject || 'Project',
            description: 'Project not found in database',
            client: '',
            startDate: new Date(),
            endDate: new Date(),
            overallProgress: 0,
            status: 'active',
            milestones: [],
            tasks: [],
            team: [],
            risks: []
          });

          // Show error message
          toast.error('❌ Project not found in database. Please import data first.', {
            duration: 5000
          });

          return; // Exit early
        }

        if (dbProject && dbProject.milestones && dbProject.milestones.length > 0) {
          console.log('✅ [PulseOfProject] Loaded project data from database');

          // Use deliverables directly from project_milestones table
          const milestones = dbProject.milestones.map((m: any) => {
            console.log(`\n🔍 Processing milestone: ${m.id} (${m.name})`);
            console.log(`   Deliverables count: ${(m.deliverables || []).length}`);

            // Use deliverables directly from milestone, ensure completed field exists
            const deliverables = (m.deliverables || []).map((d: any) => ({
              ...d,
              completed: d.completed !== undefined ? d.completed : false
            }));

            // Calculate progress percentage based on completed deliverables
            const totalDeliverables = deliverables.length;
            const completedDeliverables = deliverables.filter((d: any) => d.completed).length;
            const calculatedProgress = totalDeliverables > 0
              ? Math.round((completedDeliverables / totalDeliverables) * 100)
              : 0;

            console.log(`📊 ${m.name}: ${completedDeliverables}/${totalDeliverables} deliverables = ${calculatedProgress}%`);

            return {
              id: m.id,
              name: m.name,
              description: m.description,
              status: m.status,
              startDate: new Date(m.start_date),
              endDate: new Date(m.end_date),
              progress: calculatedProgress, // Use calculated progress from deliverables
              deliverables, // Updated with progress data
              assignedTo: m.assigned_to || [],
              dependencies: m.dependencies || [],
              order: m.order,
              color: m.color || '#4F46E5',
              kpis: m.kpis || []
            };
          });

          console.log('✨ [PulseOfProject] Merged deliverable progress with', milestones.length, 'milestones');

          // Calculate overall project progress from all milestones
          const totalMilestones = milestones.length;
          const totalProgress = milestones.reduce((sum: number, m: any) => sum + m.progress, 0);
          const overallProgress = totalMilestones > 0
            ? Math.round(totalProgress / totalMilestones)
            : 0;

          console.log(`📈 Overall project progress: ${overallProgress}% (average of ${totalMilestones} milestones)`);

          setProjectData({
            id: dbProject.id,
            name: dbProject.name,
            description: dbProject.description,
            client: dbProject.client,
            startDate: new Date(dbProject.start_date),
            endDate: new Date(dbProject.end_date),
            overallProgress, // Use calculated overall progress
            status: dbProject.status,
            milestones,
            tasks: dbProject.tasks || [],
            team: dbProject.team || [],
            risks: []
          });

          setIsLoadingData(false);
        } else {
        // No milestones in database - use empty state or show message
        console.log('⚠️ No milestones found in database for project:', dbProjectId);
        console.log('ℹ️  Please save project data from the edit page first');

        // Set minimal project data without dummy milestones
        setProjectData({
          id: dbProject?.id || dbProjectId,
          name: dbProject?.name || selectedProject,
          description: dbProject?.description || 'No description available',
          client: dbProject?.client || 'Client',
          startDate: dbProject?.start_date ? new Date(dbProject.start_date) : new Date(),
          endDate: dbProject?.end_date ? new Date(dbProject.end_date) : new Date(),
          overallProgress: dbProject?.overall_progress || 0,
          status: dbProject?.status || 'active',
          milestones: [], // Empty milestones - will show empty state
          tasks: [],
          team: [],
          risks: []
        });

        setIsLoadingData(false);

        // Show toast to guide user
        toast('📋 No project timeline data found. Please save data from the edit page first.', {
          duration: 5000
        });

        return; // Exit early
        }
      } catch (error) {
        console.error('❌ [PulseOfProject] Error loading project data:', error);
        setIsLoadingData(false);

        // Show error message
        toast.error('❌ Failed to load project data from database');

        // Set empty state
        setProjectData({
          id: selectedProject,
          name: selectedProject,
          description: 'Error loading project data',
          client: '',
          startDate: new Date(),
          endDate: new Date(),
          overallProgress: 0,
          status: 'active',
          milestones: [],
          tasks: [],
          team: [],
          risks: []
        });

        return; // Exit early
      }
  }, [selectedProject]);

  // useEffect to call loadProjectData
  useEffect(() => {
    loadProjectData();
  }, [selectedProject, loadProjectData]);

  // Navigate to detailed project tracking page
  const goToDetailedView = () => {
    navigate(`/project-tracking-public?project=${selectedProject}`);
  };

  // Automatic progress tracking via webhooks/polling
  const syncProjectProgress = useCallback(async () => {
    setSyncStatus('syncing');

    try {
      // Simulate fetching updates from various sources
      const updates = await fetchProgressUpdates();

      if (updates.length > 0) {
        applyProgressUpdates(updates);
        setNotifications(prev => [...prev, ...updates.map(u => ({
          id: Date.now(),
          type: 'update',
          message: u.message,
          timestamp: new Date()
        }))]);
      }

      setLastSync(new Date());
      setSyncStatus('success');
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
    }
  }, [selectedProject]);

  // Fetch progress updates from integrated sources
  const fetchProgressUpdates = async () => {
    const updates = [];

    // GitHub Integration
    if (integrations.github.connected) {
      // Simulate fetching commits, PRs, issues
      const githubActivity = {
        commits: Math.floor(Math.random() * 5),
        prs: Math.floor(Math.random() * 2),
        issues: Math.floor(Math.random() * 3)
      };

      if (githubActivity.commits > 0) {
        updates.push({
          source: 'github',
          type: 'commit',
          message: `${githubActivity.commits} new commits detected`,
          impact: { progress: githubActivity.commits * 2 }
        });
      }
    }

    // Jira Integration
    if (integrations.jira.connected) {
      // Simulate Jira ticket updates
      const jiraUpdates = Math.random() > 0.5 ? 1 : 0;
      if (jiraUpdates > 0) {
        updates.push({
          source: 'jira',
          type: 'ticket',
          message: 'Ticket moved to Done',
          impact: { progress: 5, status: 'in-progress' }
        });
      }
    }

    return updates;
  };

  // Apply progress updates to project data
  const applyProgressUpdates = (updates: any[]) => {
    setProjectData(prev => {
      const updated = { ...prev };

      updates.forEach(update => {
        // Update milestone progress based on rules
        if (update.impact.progress) {
          const activeMilestone = updated.milestones.find(m => m.status === 'in-progress');
          if (activeMilestone) {
            activeMilestone.progress = Math.min(100, activeMilestone.progress + update.impact.progress);

            // Auto-complete milestone if progress reaches 100%
            if (activeMilestone.progress === 100) {
              activeMilestone.status = 'completed';

              // Start next milestone
              const nextMilestone = updated.milestones.find(m => m.status === 'pending');
              if (nextMilestone) {
                nextMilestone.status = 'in-progress';
              }
            }
          }
        }
      });

      // Recalculate overall progress
      const totalProgress = updated.milestones.reduce((sum, m) => sum + m.progress, 0) / updated.milestones.length;
      updated.overallProgress = Math.round(totalProgress);

      return updated;
    });
  };

  // Handle deliverable toggle
  const handleDeliverableToggle = useCallback(async (milestoneId: string, deliverableId: string) => {
    const dbProjectId = getDbProjectId(selectedProject);
    console.log('=== handleDeliverableToggle CALLED IN PulseOfProject ===');
    console.log('milestoneId:', milestoneId, 'deliverableId:', deliverableId);
    console.log('Using DB Project ID:', dbProjectId);

    // Use a variable to capture the updated milestone data
    let updatedMilestoneData: any = null;

    // Update local state with functional update and capture the updated milestone
    setProjectData((prevData) => {
      const milestone = prevData.milestones.find(m => m.id === milestoneId);

      if (!milestone) {
        console.error('Milestone not found:', milestoneId);
        return prevData;
      }

      const updatedDeliverables = milestone.deliverables.map(deliverable =>
        deliverable.id === deliverableId
          ? { ...deliverable, completed: !deliverable.completed }
          : deliverable
      );

      // Calculate new progress based on completed deliverables
      const totalDeliverables = updatedDeliverables.length;
      const completedDeliverables = updatedDeliverables.filter((d: any) => d.completed).length;
      const calculatedProgress = totalDeliverables > 0
        ? Math.round((completedDeliverables / totalDeliverables) * 100)
        : 0;

      console.log(`📊 Updated progress: ${completedDeliverables}/${totalDeliverables} = ${calculatedProgress}%`);

      const updatedMilestone = {
        ...milestone,
        deliverables: updatedDeliverables,
        progress: calculatedProgress // Update progress based on deliverables
      };

      // Capture the updated milestone data for database save
      updatedMilestoneData = {
        project_id: dbProjectId, // Use the database project ID
        name: updatedMilestone.name,
        description: updatedMilestone.description,
        status: updatedMilestone.status,
        start_date: updatedMilestone.startDate instanceof Date ? updatedMilestone.startDate.toISOString() : new Date(updatedMilestone.startDate).toISOString(),
        end_date: updatedMilestone.endDate instanceof Date ? updatedMilestone.endDate.toISOString() : new Date(updatedMilestone.endDate).toISOString(),
        progress: calculatedProgress, // Use calculated progress
        deliverables: updatedDeliverables, // Use the NEW updated deliverables
        assigned_to: updatedMilestone.assignedTo || [],
        dependencies: updatedMilestone.dependencies || [],
        order: updatedMilestone.order,
        color: updatedMilestone.color || '#4F46E5'
      };

      const updatedMilestones = prevData.milestones.map(m =>
        m.id === milestoneId ? updatedMilestone : m
      );

      // Recalculate overall project progress
      const totalMilestones = updatedMilestones.length;
      const totalProgress = updatedMilestones.reduce((sum: number, m: any) => sum + (m.progress || 0), 0);
      const newOverallProgress = totalMilestones > 0
        ? Math.round(totalProgress / totalMilestones)
        : 0;

      console.log('✅ State updated with new deliverables:', updatedDeliverables);
      console.log(`📈 Updated overall progress: ${newOverallProgress}%`);

      return {
        ...prevData,
        milestones: updatedMilestones,
        overallProgress: newOverallProgress
      };
    });

    // Save updated milestone WITH deliverables to project_milestones table
    try {
      if (updatedMilestoneData) {
        console.log('💾 Saving milestone with updated deliverables to project_milestones table');

        const success = await ProjectTrackingService.updateMilestone(milestoneId, updatedMilestoneData);

        if (success) {
          toast.success('✅ Progress saved to database');
          console.log('✅ Milestone updated with new deliverable status');
        } else {
          toast.error('❌ Failed to save progress');
        }
      }
    } catch (error) {
      console.error('❌ Error saving deliverable progress:', error);
      toast.error('❌ Failed to save progress');
    }
  }, [selectedProject]); // Include selectedProject since it's used for DB ID mapping

  // Auto-sync on interval
  useEffect(() => {
    if (autoUpdateEnabled && PRODUCT_CONFIG.integrations.github.autoSync) {
      const interval = setInterval(syncProjectProgress, PRODUCT_CONFIG.integrations.github.syncInterval);
      return () => clearInterval(interval);
    }
  }, [autoUpdateEnabled, syncProjectProgress]);

  // Initial sync on mount
  useEffect(() => {
    syncProjectProgress();
  }, []);

  // Subscribe to real-time changes from the database
  useEffect(() => {
    if (!selectedProject) return;

    const dbProjectId = getDbProjectId(selectedProject);
    const subscription = ProjectTrackingService.subscribeToProjectChanges(
      dbProjectId,
      (payload) => {
        console.log('🔔 Real-time update received:', payload);

        // Reload project data when changes occur
        ProjectTrackingService.getProject(dbProjectId).then(dbProject => {
          if (dbProject && dbProject.milestones && dbProject.milestones.length > 0) {
            const milestones = dbProject.milestones.map((m: any) => ({
              id: m.id,
              name: m.name,
              description: m.description,
              status: m.status,
              startDate: new Date(m.start_date),
              endDate: new Date(m.end_date),
              progress: m.progress,
              deliverables: m.deliverables || [],
              assignedTo: m.assigned_to || [],
              dependencies: m.dependencies || [],
              order: m.order,
              color: m.color || '#4F46E5',
              kpis: m.kpis || []
            }));

            setProjectData(prev => ({
              ...prev,
              milestones,
              overallProgress: dbProject.overall_progress
            }));

            console.log('✅ Project data refreshed with latest deliverables');
          }
        });
      }
    );

    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        ProjectTrackingService.unsubscribeFromProjectChanges(dbProjectId);
      }
    };
  }, [selectedProject]);

  // Reload data when navigating back to this page (React Router navigation)
  useEffect(() => {
    if (!selectedProject) return;

    console.log('🔄 Route changed - reloading project data...');
    const dbProjectId = getDbProjectId(selectedProject);

    const reloadData = async () => {
      try {
        const dbProject = await ProjectTrackingService.getProject(dbProjectId);
        if (dbProject && dbProject.milestones && dbProject.milestones.length > 0) {
          const milestones = dbProject.milestones.map((m: any) => ({
            id: m.id,
            name: m.name,
            description: m.description,
            status: m.status,
            startDate: new Date(m.start_date),
            endDate: new Date(m.end_date),
            progress: m.progress,
            deliverables: m.deliverables || [],
            assignedTo: m.assigned_to || [],
            dependencies: m.dependencies || [],
            order: m.order,
            color: m.color || '#4F46E5',
            kpis: m.kpis || []
          }));

          setProjectData(prev => ({
            ...prev,
            milestones,
            overallProgress: dbProject.overall_progress
          }));

          console.log('✅ Project data refreshed on route change');
        }
      } catch (error) {
        console.error('Error reloading project data:', error);
      }
    };

    reloadData();
  }, [location.pathname, selectedProject]);

  // Reload data when window/tab becomes visible again (user switches back)
  useEffect(() => {
    if (!selectedProject) return;

    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        console.log('🔄 Tab became visible - reloading project data...');
        const dbProjectId = getDbProjectId(selectedProject);

        try {
          const dbProject = await ProjectTrackingService.getProject(dbProjectId);
          if (dbProject && dbProject.milestones && dbProject.milestones.length > 0) {
            const milestones = dbProject.milestones.map((m: any) => ({
              id: m.id,
              name: m.name,
              description: m.description,
              status: m.status,
              startDate: new Date(m.start_date),
              endDate: new Date(m.end_date),
              progress: m.progress,
              deliverables: m.deliverables || [],
              assignedTo: m.assigned_to || [],
              dependencies: m.dependencies || [],
              order: m.order,
              color: m.color || '#4F46E5',
              kpis: m.kpis || []
            }));

            setProjectData(prev => ({
              ...prev,
              milestones,
              overallProgress: dbProject.overall_progress
            }));

            console.log('✅ Project data refreshed on visibility change');
          }
        } catch (error) {
          console.error('Error reloading project data:', error);
        }
      }
    };

    const handleWindowFocus = async () => {
      console.log('🔄 Window focused - reloading project data...');
      const dbProjectId = getDbProjectId(selectedProject);

      try {
        const dbProject = await ProjectTrackingService.getProject(dbProjectId);
        if (dbProject && dbProject.milestones && dbProject.milestones.length > 0) {
          const milestones = dbProject.milestones.map((m: any) => ({
            id: m.id,
            name: m.name,
            description: m.description,
            status: m.status,
            startDate: new Date(m.start_date),
            endDate: new Date(m.end_date),
            progress: m.progress,
            deliverables: m.deliverables || [],
            assignedTo: m.assigned_to || [],
            dependencies: m.dependencies || [],
            order: m.order,
            color: m.color || '#4F46E5',
            kpis: m.kpis || []
          }));

          setProjectData(prev => ({
            ...prev,
            milestones,
            overallProgress: dbProject.overall_progress
          }));

          console.log('✅ Project data refreshed on window focus');
        }
      } catch (error) {
        console.error('Error reloading project data:', error);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [selectedProject]);

  const connectIntegration = async (service: string) => {
    // Simulate OAuth flow
    console.log(`Connecting to ${service}...`);

    setTimeout(() => {
      setIntegrations(prev => ({
        ...prev,
        [service]: { ...prev[service as keyof typeof prev], connected: true }
      }));

      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'success',
        message: `Successfully connected to ${service}`,
        timestamp: new Date()
      }]);
    }, 1500);
  };

  // Show "No Projects" UI if user has no projects assigned
  if (!selectedProject && !isLoadingData && user && user.role !== 'super_admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-yellow-100 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Projects Assigned</h2>
          <p className="text-gray-600 mb-6">
            You don't have access to any projects yet. Please contact your administrator to get project access.
          </p>
          <button
            onClick={() => logout()}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Product Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Integrations Sidebar Toggle Button */}
              {!clientMode && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isSidebarOpen
                      ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={isSidebarOpen ? "Close Integrations Panel" : "Open Integrations Panel (GitHub, Jira, etc.)"}
                >
                  {isSidebarOpen ? (
                    <>
                      <X className="w-5 h-5" />
                      <span className="text-sm font-medium hidden md:block">Close</span>
                    </>
                  ) : (
                    <>
                      <Menu className="w-5 h-5" />
                      <span className="text-sm font-medium hidden md:block">Integrations</span>
                    </>
                  )}
                </button>
              )}
              <Activity className="w-8 h-8 text-indigo-600" />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {PRODUCT_CONFIG.name}
                  </h1>
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full">
                    A Bettroi Product
                  </span>
                </div>
                <p className="text-sm text-gray-500">{PRODUCT_CONFIG.tagline}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!clientMode && (
                <div className="flex items-center gap-4">
                  {/* Sync Status */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                    <span className="text-sm">
                      {syncStatus === 'syncing' ? 'Syncing...' :
                       syncStatus === 'success' ? 'Synced' :
                       syncStatus === 'error' ? 'Sync Failed' : 'Ready'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {lastSync.toLocaleTimeString()}
                    </span>
                  </div>

                  {/* Auto-Update Toggle */}
                  <button
                    onClick={() => setAutoUpdateEnabled(!autoUpdateEnabled)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      autoUpdateEnabled
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Auto-Update {autoUpdateEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Chat/Collaboration */}
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className={`relative p-2 rounded-lg transition-colors flex items-center gap-2 ${
                      showChat ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    title="Project Chat"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm font-medium">Chat</span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </button>

                  {/* Notifications */}
                  <button className="relative p-2 rounded-lg hover:bg-gray-100">
                    <Bell className="w-5 h-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </button>
                </div>
              )}

              {/* Logged-in user profile chip */}
              {user && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-700">
                  <div className="flex flex-col leading-tight max-w-[220px] md:max-w-xs">
                    <span className="font-semibold truncate">
                      {user.name || user.email || 'User'}
                    </span>
                    <span className="truncate text-gray-500">
                      {user.email}
                    </span>
                    <span className="font-mono text-[10px] md:text-[11px] text-gray-400 truncate">
                      ID: {user.id}
                    </span>
                  </div>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex relative">
        {/* Sidebar - Integration Panel (hidden in client mode) */}
        <AnimatePresence>
          {!clientMode && isSidebarOpen && (
            <motion.aside
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto"
            >
              <IntegrationPanel
                integrations={integrations}
                onConnect={connectIntegration}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Dashboard */}
        <main className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${!isSidebarOpen || clientMode ? 'ml-0' : ''}`}>
          {/* Project Selector - Only show for super_admin or when explicitly opened */}
          {user?.role === 'super_admin' && (
            <ProjectSelector
              selectedProject={selectedProject}
              onProjectChange={setSelectedProject}
              clientMode={clientMode}
            />
          )}

          {/* For regular users, show project name without selector */}
          {user?.role !== 'super_admin' && selectedProject && (
            <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Activity className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{projectData.name}</h1>
                  <p className="text-sm text-gray-500">{projectData.client}</p>
                </div>
              </div>
            </div>
          )}

          {/* Only show dashboard content when a project is selected */}
          {selectedProject && (
            <>
          {/* Navigate to Detailed Project Tracking Button - For admin and super_admin */}
          {!clientMode && (user?.role === 'super_admin' || user?.role === 'admin') && (
            <PermissionGuard
              projectId={selectedProject || undefined}
              permission={PERMISSIONS.VIEW_DETAILED_PLAN}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 mb-6"
              >
                <button
                  onClick={goToDetailedView}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Edit3 className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-lg">View Detailed Project Plan</div>
                      <div className="text-sm opacity-90">
                        Edit milestones, tasks, dates, and full project details
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </PermissionGuard>
          )}

          {/* Metrics Dashboard - SECOND */}
          <DashboardMetrics projectData={projectData} />

          {/* Bug Report Module - THIRD (Below project info) */}
          <div className="mt-6">
            <BugReport
              key={selectedProject}
              projectName={selectedProject}
              version="v1.0.0"
              onBugsUpdate={setBugs}
            />
          </div>

          {/* Testing Tracker Module - FOURTH (Below bug reports) */}
          <div className="mt-6">
            <TestingTracker
              key={`testing-${selectedProject}`}
              projectName={selectedProject}
              bugs={bugs}
            />
          </div>

          {/* Project Documents - FIFTH (Below testing tracker) */}
          <div className="mt-6">
            <ProjectDocuments
              projectId={selectedProject}
              isEditMode={!clientMode}
            />
          </div>

          {/* Auto Progress Tracker */}
          <AutoProgressTracker
            projectData={projectData}
            lastSync={lastSync}
            syncStatus={syncStatus}
            onManualSync={syncProjectProgress}
          />

          {/* Gantt Chart */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Project Timeline</h2>
              <button
                onClick={() => {
                  console.log('🔄 Manual refresh clicked');
                  loadProjectData();
                  toast.success('Refreshing project data...');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
            </div>
            <GanttChart
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
          </div>

          {/* Recent Activity Feed */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <AnimatePresence>
                {notifications.slice(-5).reverse().map((notif, idx) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {notif.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : notif.type === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    ) : (
                      <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notif.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          </>
          )}
        </main>
      </div>

      {/* Floating Action Button for Manual Sync (hidden in client mode) */}
      {!clientMode && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={syncProjectProgress}
          className="fixed bottom-6 left-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw className={`w-6 h-6 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
        </motion.button>
      )}

      {/* Chat Collaboration Module */}
      {showChat && (
        <ChatCollaboration
          projectName={selectedProject}
          clientMode={clientMode}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default PulseOfProject;