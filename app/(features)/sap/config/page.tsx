'use client';

import { useState } from 'react';

interface SAPProfile {
  id: string;
  name: string;
  sapSystem: 'ERP' | 'S4HANA' | 'PM' | 'PLM';
  sapEndpoint: string;
  sapClient: string;
  sapUsername: string;
  isDefault: boolean;
}

export default function SAPConfigPage() {
  const [profiles, setProfiles] = useState<SAPProfile[]>([
    {
      id: '1',
      name: 'Production SAP S/4HANA',
      sapSystem: 'S4HANA',
      sapEndpoint: 'https://sap-prod.company.com:8000/sap/opu/odata',
      sapClient: '100',
      sapUsername: 'PLCUSER',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Development SAP ERP',
      sapSystem: 'ERP',
      sapEndpoint: 'https://sap-dev.company.com:8000/sap/opu/odata',
      sapClient: '200',
      sapUsername: 'DEVUSER',
      isDefault: false,
    },
  ]);

  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [newProfile, setNewProfile] = useState<Partial<SAPProfile>>({
    name: '',
    sapSystem: 'S4HANA',
    sapEndpoint: '',
    sapClient: '',
    sapUsername: '',
    isDefault: false,
  });

  const [exportSettings, setExportSettings] = useState({
    autoCreateMaterial: true,
    autoCreateEquipment: true,
    autoAssignFunctionalLocation: true,
    createDocuments: true,
    plantCode: 'P001',
    defaultMaterialType: 'HALB',
    defaultEquipmentCategory: 'M',
    enableAuditLogging: true,
    retryFailedExports: true,
    maxRetryAttempts: 3,
  });

  const handleAddProfile = () => {
    if (newProfile.name && newProfile.sapEndpoint && newProfile.sapClient && newProfile.sapUsername) {
      const profile: SAPProfile = {
        id: String(profiles.length + 1),
        name: newProfile.name,
        sapSystem: newProfile.sapSystem as 'ERP' | 'S4HANA' | 'PM' | 'PLM',
        sapEndpoint: newProfile.sapEndpoint,
        sapClient: newProfile.sapClient,
        sapUsername: newProfile.sapUsername,
        isDefault: newProfile.isDefault || false,
      };
      setProfiles([...profiles, profile]);
      setNewProfile({
        name: '',
        sapSystem: 'S4HANA',
        sapEndpoint: '',
        sapClient: '',
        sapUsername: '',
        isDefault: false,
      });
      setIsAddingProfile(false);
    }
  };

  const handleSetDefault = (profileId: string) => {
    setProfiles(profiles.map(p => ({
      ...p,
      isDefault: p.id === profileId,
    })));
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfiles(profiles.filter(p => p.id !== profileId));
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SAP Configuration
          </h1>
          <p className="text-gray-600">
            Manage your SAP connection profiles and export settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Profiles */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Connection Profiles
                </h2>
                <button
                  onClick={() => setIsAddingProfile(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Add Profile
                </button>
              </div>

              {/* Existing Profiles */}
              <div className="space-y-3">
                {profiles.map(profile => (
                  <div
                    key={profile.id}
                    className="border-2 border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                          {profile.isDefault && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">SAP {profile.sapSystem}</p>
                        <p className="text-xs text-gray-500 mt-1">Client: {profile.sapClient}</p>
                      </div>
                      <div className="flex gap-2">
                        {!profile.isDefault && (
                          <button
                            onClick={() => handleSetDefault(profile.id)}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="text-xs text-red-600 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{profile.sapEndpoint}</p>
                  </div>
                ))}
              </div>

              {/* Add New Profile Form */}
              {isAddingProfile && (
                <div className="mt-4 border-2 border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-gray-900 mb-3">New Connection Profile</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Name
                      </label>
                      <input
                        type="text"
                        value={newProfile.name}
                        onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
                        placeholder="Production S/4HANA"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SAP System Type
                      </label>
                      <select
                        value={newProfile.sapSystem}
                        onChange={(e) => setNewProfile({...newProfile, sapSystem: e.target.value as any})}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="S4HANA">SAP S/4HANA</option>
                        <option value="ERP">SAP ERP (ECC 6.0)</option>
                        <option value="PM">SAP Plant Maintenance</option>
                        <option value="PLM">SAP PLM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SAP Endpoint URL
                      </label>
                      <input
                        type="text"
                        value={newProfile.sapEndpoint}
                        onChange={(e) => setNewProfile({...newProfile, sapEndpoint: e.target.value})}
                        placeholder="https://your-sap-server.com:8000/sap/opu/odata"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Client Number
                        </label>
                        <input
                          type="text"
                          value={newProfile.sapClient}
                          onChange={(e) => setNewProfile({...newProfile, sapClient: e.target.value})}
                          placeholder="100"
                          maxLength={3}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          value={newProfile.sapUsername}
                          onChange={(e) => setNewProfile({...newProfile, sapUsername: e.target.value})}
                          placeholder="SAP Username"
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newProfile.isDefault || false}
                        onChange={(e) => setNewProfile({...newProfile, isDefault: e.target.checked})}
                        className="w-4 h-4 mr-2"
                      />
                      <label className="text-sm text-gray-700">Set as default profile</label>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleAddProfile}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                      >
                        Save Profile
                      </button>
                      <button
                        onClick={() => setIsAddingProfile(false)}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Export Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Export Settings
              </h2>

              <div className="space-y-4">
                {/* Auto-Creation Options */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Auto-Creation Options</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportSettings.autoCreateMaterial}
                        onChange={(e) => setExportSettings({...exportSettings, autoCreateMaterial: e.target.checked})}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-sm text-gray-700">Auto-create Material Master</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportSettings.autoCreateEquipment}
                        onChange={(e) => setExportSettings({...exportSettings, autoCreateEquipment: e.target.checked})}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-sm text-gray-700">Auto-create Equipment Master</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportSettings.autoAssignFunctionalLocation}
                        onChange={(e) => setExportSettings({...exportSettings, autoAssignFunctionalLocation: e.target.checked})}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-sm text-gray-700">Auto-assign Functional Location</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportSettings.createDocuments}
                        onChange={(e) => setExportSettings({...exportSettings, createDocuments: e.target.checked})}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-sm text-gray-700">Create Documents in DMS</span>
                    </label>
                  </div>
                </div>

                {/* Default Values */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Default Values</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plant Code
                      </label>
                      <input
                        type="text"
                        value={exportSettings.plantCode}
                        onChange={(e) => setExportSettings({...exportSettings, plantCode: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Material Type
                      </label>
                      <select
                        value={exportSettings.defaultMaterialType}
                        onChange={(e) => setExportSettings({...exportSettings, defaultMaterialType: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="HALB">HALB - Semi-finished product</option>
                        <option value="FERT">FERT - Finished product</option>
                        <option value="ROH">ROH - Raw material</option>
                        <option value="ERSA">ERSA - Spare parts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Equipment Category
                      </label>
                      <select
                        value={exportSettings.defaultEquipmentCategory}
                        onChange={(e) => setExportSettings({...exportSettings, defaultEquipmentCategory: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="M">M - Machine</option>
                        <option value="P">P - Production resource/tool</option>
                        <option value="T">T - Test equipment</option>
                        <option value="V">V - Vehicle</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Advanced Options</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportSettings.enableAuditLogging}
                        onChange={(e) => setExportSettings({...exportSettings, enableAuditLogging: e.target.checked})}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-sm text-gray-700">Enable audit logging</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportSettings.retryFailedExports}
                        onChange={(e) => setExportSettings({...exportSettings, retryFailedExports: e.target.checked})}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-sm text-gray-700">Retry failed exports</span>
                    </label>
                    {exportSettings.retryFailedExports && (
                      <div className="ml-7">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Retry Attempts
                        </label>
                        <input
                          type="number"
                          value={exportSettings.maxRetryAttempts}
                          onChange={(e) => setExportSettings({...exportSettings, maxRetryAttempts: Number(e.target.value)})}
                          min="1"
                          max="10"
                          className="w-24 px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>

            {/* Connection Test */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Connection Test</h3>
              <p className="text-sm text-blue-800 mb-4">
                Test your SAP connection using the default profile before exporting projects.
              </p>
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Test Default Connection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
