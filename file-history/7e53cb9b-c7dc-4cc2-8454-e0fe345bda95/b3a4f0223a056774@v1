import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, Plus, Edit3, Trash2, Share2, Eye, Calendar, Users,
  CheckCircle2, Clock, AlertCircle, BarChart3, Link as LinkIcon,
  Copy, ExternalLink, Settings, LogOut, Menu, X, FolderPlus, Search, Filter, Star, RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { projects as importedProjects } from '../modules/pulseofproject/data/projects.ts';
import bugTrackingService from '../services/bugTrackingService.js';
import adminProjectService from '../services/adminProjectService.js';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'planning'
  });

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  // Bug tracking state
  const [loadingBugs, setLoadingBugs] = useState(false);
  const [bugCounts, setBugCounts] = useState({});

  // Load projects from Supabase database
  useEffect(() => {
    loadProjectsFromDatabase();
  }, []);

  const loadProjectsFromDatabase = async () => {
    try {
      console.log('🔍 Loading projects from Supabase...');

      // Try to load from database first
      let dbProjects = await adminProjectService.getAllProjects();

      if (dbProjects && dbProjects.length > 0) {
        console.log(`✅ Loaded ${dbProjects.length} projects from database`);

        // Convert database format to AdminPage format
        const convertedProjects = dbProjects.map(p => ({
          // Prefer text project_id (matches tracking tables); keep DB UUID separately
          id: p.project_id || p.id,
          dbId: p.id,
          name: p.name,
          description: p.description || `${p.client} project`,
          startDate: new Date().toISOString().split('T')[0],
          endDate: p.deadline,
          status: p.status,
          progress: p.progress,
          bugs: 0, // Will be calculated from bug tracking service
          team: p.team_count,
          shareToken: p.share_token || generateShareToken(),
          createdAt: p.created_at || new Date().toISOString(),
          client: p.client,
          category: p.category,
          priority: p.priority,
          starred: p.starred,
          url: p.url,
          isCustom: p.is_custom
        }));

        setProjects(convertedProjects);
        fetchBugCounts(convertedProjects);
      } else {
        console.warn('⚠️ No projects found in database, using fallback static data');
        loadFallbackProjects();
      }
    } catch (error) {
      console.error('❌ Error loading projects from database:', error);
      console.log('ℹ️ Falling back to static projects');
      loadFallbackProjects();
    }
  };

  const loadFallbackProjects = () => {
    // Fallback to static imported projects
    const convertedProjects = importedProjects.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description || `${p.client} project`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: p.deadline,
      status: p.status,
      progress: p.progress,
      bugs: 0,
      team: p.team,
      shareToken: p.shareToken || generateShareToken(),
      createdAt: new Date().toISOString(),
      client: p.client,
      category: p.category,
      priority: p.priority,
      starred: p.starred,
      url: p.url,
      isCustom: false
    }));

    setProjects(convertedProjects);
    console.log(`✅ Loaded ${convertedProjects.length} fallback projects`);
    fetchBugCounts(convertedProjects);
  };

  // Project name mapping for database lookup
  const projectNameMapping = {
    'linkist-nfc': 'LinkList',
    'linkist nfc': 'LinkList',
    // Add more mappings as needed
  };

  // Fetch bug counts for all projects from the database
  const fetchBugCounts = async (projectList) => {
    setLoadingBugs(true);
    try {
      console.log('📊 Fetching bug counts for all projects...');

      // Fetch all bugs from the database
      const allBugs = await bugTrackingService.getBugReports();
      console.log(`📋 Found ${allBugs.length} total bugs in database`);

      // Group bugs by project name and count them
      const counts = {};

      projectList.forEach(project => {
        // Check if there's a mapping for this project
        const mappedName = projectNameMapping[project.id.toLowerCase()] ||
                          projectNameMapping[project.name.toLowerCase()];

        // Try to match bugs by project name or ID (case-insensitive)
        const projectNameLower = project.name.toLowerCase();
        const projectIdLower = project.id.toLowerCase();
        const firstWord = projectNameLower.split(' ')[0]; // e.g., "linkist" from "Linkist NFC"

        const projectBugs = allBugs.filter(bug => {
          const bugProjectName = bug.project_name || '';
          const bugProjectNameLower = bugProjectName.toLowerCase();

          // Check mapped name first (exact match)
          if (mappedName && bugProjectName === mappedName) {
            return true;
          }

          return (
            // Exact match on project name
            bugProjectNameLower === projectNameLower ||
            // Exact match on project ID
            bugProjectNameLower === projectIdLower ||
            // Match first word (e.g., "linkist" matches "Linkist NFC")
            bugProjectNameLower === firstWord ||
            bugProjectNameLower.includes(firstWord) ||
            // Match if bug project name contains the project name
            bugProjectNameLower.includes(projectNameLower) ||
            projectNameLower.includes(bugProjectNameLower)
          );
        });

        counts[project.id] = {
          total: projectBugs.length,
          open: projectBugs.filter(b => b.status === 'Open').length,
          inProgress: projectBugs.filter(b => b.status === 'In Progress').length,
          closed: projectBugs.filter(b => b.status === 'Closed' || b.status === 'Resolved').length,
          p1: projectBugs.filter(b => b.severity === 'P1').length,
          p2: projectBugs.filter(b => b.severity === 'P2').length,
          p3: projectBugs.filter(b => b.severity === 'P3').length
        };

        // Log projects with bugs for debugging
        if (projectBugs.length > 0) {
          console.log(`📌 ${project.name} (ID: ${project.id}): ${projectBugs.length} bugs found (Open: ${counts[project.id].open}, Closed: ${counts[project.id].closed})`);
        }
      });

      // Log summary
      const totalBugs = Object.values(counts).reduce((sum, c) => sum + c.total, 0);
      console.log(`📊 Summary: ${totalBugs} total bugs across ${Object.keys(counts).filter(k => counts[k].total > 0).length} projects`);

      setBugCounts(counts);
      console.log(`✅ Bug counts loaded for ${Object.keys(counts).length} projects`);

      // Update projects with bug counts
      const updatedProjects = projectList.map(p => ({
        ...p,
        bugs: counts[p.id]?.total || 0
      }));
      setProjects(updatedProjects);

    } catch (error) {
      console.error('❌ Error fetching bug counts:', error);
      toast.error('Failed to load bug counts');
    } finally {
      setLoadingBugs(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.name || !newProject.startDate) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      console.log('➕ Creating new project in Supabase...');

      const projectId = newProject.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      const projectData = {
        id: projectId,
        name: newProject.name,
        client: newProject.client || 'New Client',
        description: newProject.description || '',
        status: newProject.status || 'planning',
        priority: parseInt(newProject.priority) || 2,
        progress: 0,
        starred: false,
        deadline: newProject.endDate || null,
        team_count: parseInt(newProject.team) || 1,
        url: newProject.url || null,
        category: newProject.category || 'Other',
        is_custom: true
      };

      // Save to Supabase
      const savedProject = await adminProjectService.createProject(projectData);

      if (savedProject) {
        console.log('✅ Project saved to database:', savedProject.id);

        // Reload projects from database
        await loadProjectsFromDatabase();

        setShowNewProjectModal(false);
        setNewProject({
          name: '',
          description: '',
          client: '',
          startDate: '',
          endDate: '',
          status: 'planning',
          priority: 2,
          team: 1,
          category: 'Other',
          url: ''
        });
        toast.success('Project created successfully!');
      }
    } catch (error) {
      console.error('❌ Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    }
  };

  const generateShareToken = () => {
    return 'share-' + Math.random().toString(36).substr(2, 9);
  };

  const handleDeleteProject = async (projectId) => {
    const projectToDelete = projects.find(p => p.id === projectId);

    if (!projectToDelete) {
      toast.error('Project not found');
      return;
    }

    const confirmMessage = projectToDelete.isCustom
      ? 'Are you sure you want to delete this custom project?'
      : 'Are you sure you want to delete this project? This will remove it from the database.';

    if (window.confirm(confirmMessage)) {
      try {
        console.log('🗑️ Deleting project from Supabase:', projectId);

        const success = await adminProjectService.deleteProject(projectId);

        if (success) {
          console.log('✅ Project deleted from database');

          // Reload projects from database
          await loadProjectsFromDatabase();

          toast.success('Project deleted successfully');
        } else {
          throw new Error('Delete operation failed');
        }
      } catch (error) {
        console.error('❌ Error deleting project:', error);
        toast.error('Failed to delete project. Please try again.');
      }
    }
  };

  const copyShareLink = (shareToken) => {
    const shareLink = `${window.location.origin}/client/${shareToken}`;
    navigator.clipboard.writeText(shareLink);
    toast.success('Share link copied to clipboard!');
  };

  // Filter and search projects
  const filteredProjects = projects.filter(project => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.client?.toLowerCase().includes(query) ||
        project.category?.toLowerCase().includes(query) ||
        project.id.toLowerCase().includes(query);

      if (!matchesSearch) return false;
    }

    // Status filter
    if (statusFilter !== 'all' && project.status !== statusFilter) {
      return false;
    }

    // Priority filter
    if (priorityFilter !== 'all' && project.priority !== parseInt(priorityFilter)) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'all' && project.category !== categoryFilter) {
      return false;
    }

    // Starred filter
    if (showStarredOnly && !project.starred) {
      return false;
    }

    return true;
  });

  // Get unique categories from projects
  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))].sort();

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
    setShowStarredOnly(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'on-hold': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'planning': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Activity className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'on-hold': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Activity className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Project Admin</h1>
                <p className="text-sm text-gray-500">Manage your projects and share links</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{user?.email || user?.name || 'Admin'}</span>
              </div>
              <button
                onClick={() => navigate('/users')}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                title="Manage Users"
              >
                <Users className="w-4 h-4 inline mr-2" />
                Users
              </button>
              <button
                onClick={() => navigate('/pulse')}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                title="Go to PulseOfProject Dashboard"
              >
                <Activity className="w-4 h-4 inline mr-2" />
                Pulse Dashboard
              </button>
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FolderPlus className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">{projects.length}</span>
            </div>
            <p className="text-sm text-gray-600">Total Projects</p>
            {filteredProjects.length !== projects.length && (
              <p className="text-xs text-indigo-600 mt-1">Showing {filteredProjects.length}</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status === 'in-progress').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status === 'completed').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Completed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">
                {projects.reduce((sum, p) => sum + p.bugs, 0)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total Bugs</p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
              {loadingBugs && (
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Loading bug data...
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchBugCounts(projects)}
                disabled={loadingBugs}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                title="Refresh bug counts"
              >
                <RefreshCw className={`w-4 h-4 ${loadingBugs ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => setShowNewProjectModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, client, category, or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-6 space-y-4">
            {/* Quick Filters Row */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowStarredOnly(!showStarredOnly)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showStarredOnly
                    ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star className={`w-4 h-4 ${showStarredOnly ? 'fill-yellow-500' : ''}`} />
                Starred Only
              </button>

              <div className="h-6 w-px bg-gray-300 mx-2" />

              {/* Status Filters */}
              <span className="text-sm text-gray-600 font-medium">Status:</span>
              {['all', 'in-progress', 'planning', 'completed', 'on-hold'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>

            {/* Priority and Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Priority Filters */}
              <span className="text-sm text-gray-600 font-medium">Priority:</span>
              {['all', '1', '2', '3', '4'].map(priority => (
                <button
                  key={priority}
                  onClick={() => setPriorityFilter(priority)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    priorityFilter === priority
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {priority === 'all' ? 'All' : `P${priority}`}
                </button>
              ))}

              <div className="h-6 w-px bg-gray-300 mx-2" />

              {/* Category Filter */}
              <span className="text-sm text-gray-600 font-medium">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Clear Filters */}
              {(searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all' || showStarredOnly) && (
                <button
                  onClick={clearFilters}
                  className="ml-auto px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProjects.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{projects.length}</span> projects
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      {!project.isCustom && (
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
                          System
                        </span>
                      )}
                      {project.starred && (
                        <span className="text-yellow-500">⭐</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                    {project.client && (
                      <p className="text-xs text-gray-500 mt-1">Client: {project.client}</p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status.replace('-', ' ')}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1" title={bugCounts[project.id] ? `Open: ${bugCounts[project.id].open}, Closed: ${bugCounts[project.id].closed}` : 'No bugs'}>
                    <AlertCircle className={`w-4 h-4 ${bugCounts[project.id]?.total > 0 ? 'text-orange-600' : ''}`} />
                    <span className={bugCounts[project.id]?.total > 0 ? 'font-semibold text-orange-600' : ''}>
                      {bugCounts[project.id]?.total || 0} bugs
                    </span>
                    {bugCounts[project.id]?.total > 0 && (
                      <span className="text-xs text-gray-500">
                        ({bugCounts[project.id].open} open)
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/pulseofproject?project=${project.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                    title="View PulseOfProject dashboard"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowShareModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    disabled={!project.isCustom}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      project.isCustom
                        ? 'bg-red-50 text-red-700 hover:bg-red-100'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    title={project.isCustom ? 'Delete project' : 'System projects cannot be deleted'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && projects.length === 0 && (
            <div className="text-center py-12">
              <FolderPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
              <p className="text-gray-600 mb-4">Create your first project to get started</p>
              <button
                onClick={() => setShowNewProjectModal(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Project
              </button>
            </div>
          )}

          {filteredProjects.length === 0 && projects.length > 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
              <p className="text-gray-600 mb-4">No projects match your current filters</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Project</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Brief description of your project"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="planning">Planning</option>
                  <option value="in-progress">In Progress</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Share Project</h3>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">{selectedProject.name}</h4>
              <p className="text-sm text-gray-600">Share this link with clients or stakeholders for read-only access</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={`${window.location.origin}/client/${selectedProject.shareToken}`}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={() => copyShareLink(selectedProject.shareToken)}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.open(`/client/${selectedProject.shareToken}`, '_blank');
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
