import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, UserPlus, Edit3, Trash2, Shield, User, CheckCircle, XCircle,
  Activity, FolderPlus, Search, X, Eye, EyeOff, Key, Mail, LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import userManagementService from '../services/userManagementService';
import adminProjectService from '../services/adminProjectService';

const UserManagement = () => {
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showAssignProjectModal, setShowAssignProjectModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({});

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'user'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [canEdit, setCanEdit] = useState(false);

  // Granular Permissions State
  const [permissions, setPermissions] = useState({
    canViewDetailedPlan: false,
    canUploadDocuments: true,
    canManageBugs: true,
    canAccessTesting: true,
    canUploadProjectDocs: true,
    canViewMetrics: true,
    canViewTimeline: true
  });

  useEffect(() => {
    loadUsers();
    loadProjects();
    loadStatistics();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userManagementService.getUsersWithStats();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      console.log('🔄 UserManagement: Loading projects...');
      const projects = await adminProjectService.getAllProjects();
      console.log('✅ UserManagement: Loaded projects:', projects);
      console.log('📊 UserManagement: Project count:', projects?.length || 0);
      setAllProjects(projects);
    } catch (error) {
      console.error('❌ UserManagement: Error loading projects:', error);
      toast.error('Failed to load projects');
    }
  };

  const loadStatistics = async () => {
    try {
      const statistics = await userManagementService.getStatistics();
      setStats(statistics);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.password || !newUser.full_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (newUser.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await userManagementService.createUser(newUser);
      toast.success('User created successfully!');
      setShowNewUserModal(false);
      setNewUser({ email: '', password: '', full_name: '', role: 'user' });
      loadUsers();
      loadStatistics();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (userId === currentUser?.id) {
      toast.error('You cannot delete yourself!');
      return;
    }

    if (window.confirm(`Are you sure you want to delete user ${userEmail}?`)) {
      try {
        await userManagementService.deleteUser(userId);
        toast.success('User deleted successfully');
        loadUsers();
        loadStatistics();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    if (userId === currentUser?.id) {
      toast.error('You cannot deactivate yourself!');
      return;
    }

    try {
      await userManagementService.toggleUserStatus(userId, !currentStatus);
      toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'}`);
      loadUsers();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error('Failed to update status');
    }
  };

  const openAssignProjectModal = async (user) => {
    setSelectedUser(user);
    setShowAssignProjectModal(true);

    // Load user's current projects
    try {
      const userProjects = await userManagementService.getUserProjects(user.id);
      setSelectedProjects(userProjects.map(p => p.id));
    } catch (error) {
      console.error('Error loading user projects:', error);
    }
  };

  const handleAssignProjects = async () => {
    if (!selectedUser) return;

    try {
      await userManagementService.assignMultipleProjects(
        selectedUser.id,
        selectedProjects,
        canEdit,
        permissions
      );
      toast.success('Projects assigned successfully!');
      setShowAssignProjectModal(false);
      setSelectedProjects([]);
      setCanEdit(false);
      resetPermissions();
      loadUsers();
    } catch (error) {
      console.error('Error assigning projects:', error);
      toast.error('Failed to assign projects');
    }
  };

  const resetPermissions = () => {
    setPermissions({
      canViewDetailedPlan: false,
      canUploadDocuments: true,
      canManageBugs: true,
      canAccessTesting: true,
      canUploadProjectDocs: true,
      canViewMetrics: true,
      canViewTimeline: true
    });
  };

  const applyPermissionPreset = (preset) => {
    switch (preset) {
      case 'view-only':
        setPermissions({
          canViewDetailedPlan: false,
          canUploadDocuments: false,
          canManageBugs: false,
          canAccessTesting: false,
          canUploadProjectDocs: false,
          canViewMetrics: true,
          canViewTimeline: true
        });
        setCanEdit(false);
        break;
      case 'standard':
        setPermissions({
          canViewDetailedPlan: false,
          canUploadDocuments: true,
          canManageBugs: true,
          canAccessTesting: true,
          canUploadProjectDocs: true,
          canViewMetrics: true,
          canViewTimeline: true
        });
        setCanEdit(false);
        break;
      case 'full':
        setPermissions({
          canViewDetailedPlan: true,
          canUploadDocuments: true,
          canManageBugs: true,
          canAccessTesting: true,
          canUploadProjectDocs: true,
          canViewMetrics: true,
          canViewTimeline: true
        });
        setCanEdit(true);
        break;
    }
  };

  const toggleProjectSelection = (projectId) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAllProjects = () => {
    if (selectedProjects.length === allProjects.length) {
      // If all are selected, deselect all
      setSelectedProjects([]);
    } else {
      // Select all projects
      setSelectedProjects(allProjects.map(p => p.id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role) => {
    if (role === 'super_admin') {
      return (
        <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          <Shield className="w-3 h-3" />
          Super Admin
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
        <User className="w-3 h-3" />
        User
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-500">Manage users and assign projects</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{currentUser?.email || 'Super Admin'}</span>
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                <Activity className="w-4 h-4 inline mr-2" />
                Projects
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
              <Users className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</span>
            </div>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.activeUsers || 0}</span>
            </div>
            <p className="text-sm text-gray-600">Active Users</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.superAdmins || 0}</span>
            </div>
            <p className="text-sm text-gray-600">Super Admins</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FolderPlus className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalAssignments || 0}</span>
            </div>
            <p className="text-sm text-gray-600">Project Assignments</p>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Users</h2>
            <button
              onClick={() => setShowNewUserModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {user.assigned_projects_count || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.is_active ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <XCircle className="w-4 h-4" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openAssignProjectModal(user)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Assign Projects"
                        >
                          <FolderPlus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id, user.is_active)}
                          disabled={user.id === currentUser?.id}
                          className={`p-2 rounded-lg transition-colors ${
                            user.id === currentUser?.id
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-yellow-600 hover:bg-yellow-50'
                          }`}
                          title={user.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {user.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          disabled={user.id === currentUser?.id}
                          className={`p-2 rounded-lg transition-colors ${
                            user.id === currentUser?.id
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try a different search' : 'Create your first user to get started'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New User Modal */}
      {showNewUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowNewUserModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Min. 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Projects Modal */}
      {showAssignProjectModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Assign Projects</h3>
                <p className="text-sm text-gray-500">{selectedUser.full_name} ({selectedUser.email})</p>
              </div>
              <button
                onClick={() => setShowAssignProjectModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Permission Presets */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Permission Presets</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => applyPermissionPreset('view-only')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  View Only
                </button>
                <button
                  onClick={() => applyPermissionPreset('standard')}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Standard User
                </button>
                <button
                  onClick={() => applyPermissionPreset('full')}
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Full Access
                </button>
              </div>
            </div>

            {/* Granular Permissions */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Module Permissions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={canEdit}
                    onChange={(e) => setCanEdit(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Can Edit Project Data</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.canViewDetailedPlan}
                    onChange={(e) => setPermissions({...permissions, canViewDetailedPlan: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">📝 View Detailed Project Plan</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.canUploadDocuments}
                    onChange={(e) => setPermissions({...permissions, canUploadDocuments: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">📄 Upload Documents</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.canManageBugs}
                    onChange={(e) => setPermissions({...permissions, canManageBugs: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">🐛 Manage Bugs & Issues</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.canAccessTesting}
                    onChange={(e) => setPermissions({...permissions, canAccessTesting: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">🧪 Access Testing Tracker</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.canUploadProjectDocs}
                    onChange={(e) => setPermissions({...permissions, canUploadProjectDocs: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">📁 Upload Project Documents</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.canViewMetrics}
                    onChange={(e) => setPermissions({...permissions, canViewMetrics: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">📊 View Dashboard Metrics</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.canViewTimeline}
                    onChange={(e) => setPermissions({...permissions, canViewTimeline: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">📅 View Project Timeline</span>
                </label>
              </div>
            </div>

            {/* Project Selection */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900">
                Select Projects
                {selectedProjects.length > 0 && (
                  <span className="ml-2 text-xs text-indigo-600 font-normal">
                    ({selectedProjects.length} of {allProjects.length} selected)
                  </span>
                )}
              </h4>
              <button
                onClick={handleSelectAllProjects}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center gap-1"
              >
                {selectedProjects.length === allProjects.length ? (
                  <>
                    <XCircle className="w-4 h-4" />
                    Deselect All
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Select All
                  </>
                )}
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allProjects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">No projects available</p>
                  <p className="text-sm">Please import projects first</p>
                </div>
              ) : (
                allProjects.map((project) => (
                  <label
                    key={project.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProjects.includes(project.id)
                        ? 'bg-indigo-50 border-indigo-300'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProjects.includes(project.id)}
                      onChange={() => toggleProjectSelection(project.id)}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.client}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      project.priority === 1 ? 'bg-red-100 text-red-700' :
                      project.priority === 2 ? 'bg-orange-100 text-orange-700' :
                      project.priority === 3 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      P{project.priority}
                    </span>
                  </label>
                ))
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAssignProjectModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignProjects}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Assign {selectedProjects.length} Project{selectedProjects.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
