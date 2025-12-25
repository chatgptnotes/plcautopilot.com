'use client';

import { useState } from 'react';

interface SAPConnection {
  sapSystem: 'ERP' | 'S4HANA' | 'PM' | 'PLM';
  sapEndpoint: string;
  sapClient: string;
  sapUsername: string;
  sapPassword: string;
}

interface Project {
  id: string;
  name: string;
  type: string;
  plcModel: string;
  status: string;
  lastModified: string;
}

export default function SAPExportPage() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [sapConnection, setSapConnection] = useState<SAPConnection>({
    sapSystem: 'S4HANA',
    sapEndpoint: '',
    sapClient: '100',
    sapUsername: '',
    sapPassword: '',
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportResults, setExportResults] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState('');

  const projects: Project[] = [
    { id: '1', name: 'Motor Start/Stop Control', type: 'Basic Control', plcModel: 'Schneider TM221', status: 'Completed', lastModified: '2025-12-20' },
    { id: '2', name: 'Conveyor System Automation', type: 'Sequential Control', plcModel: 'Siemens S7-1200', status: 'Completed', lastModified: '2025-12-19' },
    { id: '3', name: 'Tank Level Control', type: 'Process Control', plcModel: 'Rockwell CompactLogix', status: 'Completed', lastModified: '2025-12-18' },
    { id: '4', name: 'Packaging Line Control', type: 'Manufacturing', plcModel: 'Mitsubishi FX5U', status: 'Completed', lastModified: '2025-12-17' },
  ];

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleVerifyConnection = async () => {
    setConnectionStatus('Verifying connection...');
    try {
      const response = await fetch('/api/sap/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sapConnection),
      });

      const data = await response.json();

      if (data.connected) {
        setIsConnected(true);
        setConnectionStatus(`Connected to SAP ${data.systemInfo.systemType} - ${data.systemInfo.release}`);
      } else {
        setIsConnected(false);
        setConnectionStatus('Connection failed. Please check credentials.');
      }
    } catch (error) {
      setIsConnected(false);
      setConnectionStatus('Connection error occurred');
    }
  };

  const handleExportToSAP = async () => {
    if (selectedProjects.length === 0) {
      alert('Please select at least one project to export');
      return;
    }

    if (!isConnected) {
      alert('Please verify SAP connection first');
      return;
    }

    setIsExporting(true);
    const results = [];

    for (const projectId of selectedProjects) {
      const project = projects.find(p => p.id === projectId);
      if (!project) continue;

      try {
        const response = await fetch('/api/sap/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId: project.id,
            projectName: project.name,
            projectType: project.type,
            plcModel: project.plcModel,
            programCode: '// Generated PLC code...',
            documentation: 'Project documentation...',
            ...sapConnection,
          }),
        });

        const data = await response.json();
        results.push({ project: project.name, ...data });
      } catch (error) {
        results.push({
          project: project.name,
          success: false,
          message: 'Export failed',
        });
      }
    }

    setExportResults(results);
    setIsExporting(false);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SAP Integration
          </h1>
          <p className="text-gray-600">
            Export PLC projects to SAP ERP, S/4HANA, Plant Maintenance, or PLM systems
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SAP Connection Configuration */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                SAP Connection Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SAP System Type
                  </label>
                  <select
                    value={sapConnection.sapSystem}
                    onChange={(e) => setSapConnection({...sapConnection, sapSystem: e.target.value as any})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ERP">SAP ERP (ECC 6.0)</option>
                    <option value="S4HANA">SAP S/4HANA</option>
                    <option value="PM">SAP Plant Maintenance</option>
                    <option value="PLM">SAP PLM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SAP Endpoint URL
                  </label>
                  <input
                    type="text"
                    value={sapConnection.sapEndpoint}
                    onChange={(e) => setSapConnection({...sapConnection, sapEndpoint: e.target.value})}
                    placeholder="https://your-sap-server.com:8000/sap/opu/odata"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Number
                  </label>
                  <input
                    type="text"
                    value={sapConnection.sapClient}
                    onChange={(e) => setSapConnection({...sapConnection, sapClient: e.target.value})}
                    placeholder="100"
                    maxLength={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={sapConnection.sapUsername}
                    onChange={(e) => setSapConnection({...sapConnection, sapUsername: e.target.value})}
                    placeholder="SAP Username"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={sapConnection.sapPassword}
                    onChange={(e) => setSapConnection({...sapConnection, sapPassword: e.target.value})}
                    placeholder="SAP Password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleVerifyConnection}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Verify Connection
                </button>

                {connectionStatus && (
                  <div className={`p-4 rounded-lg flex items-center gap-2 ${
                    isConnected ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {isConnected ? (
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span>{connectionStatus}</span>
                  </div>
                )}
              </div>
            </div>

            {/* SAP Export Information */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Export Capabilities</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Material Master creation (MM module)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Equipment Master records (PM module)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Functional Location assignment</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Document Management System (DMS) integration</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Project System (PS) integration for S/4HANA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Project Selection and Export */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Select Projects to Export
              </h2>

              <div className="space-y-3 mb-6">
                {projects.map(project => (
                  <div
                    key={project.id}
                    onClick={() => toggleProjectSelection(project.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedProjects.includes(project.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedProjects.includes(project.id)}
                            onChange={() => {}}
                            className="w-5 h-5"
                          />
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 ml-7">{project.type}</p>
                        <p className="text-xs text-gray-500 mt-1 ml-7">
                          PLC: {project.plcModel} | Modified: {project.lastModified}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleExportToSAP}
                disabled={!isConnected || selectedProjects.length === 0 || isExporting}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting to SAP...
                  </span>
                ) : (
                  `Export ${selectedProjects.length} Project${selectedProjects.length !== 1 ? 's' : ''} to SAP`
                )}
              </button>
            </div>

            {/* Export Results */}
            {exportResults.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Export Results
                </h2>
                <div className="space-y-3">
                  {exportResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        result.success
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {result.project}
                      </h3>
                      <p className={`text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                        {result.message}
                      </p>
                      {result.success && result.sapReferences && (
                        <div className="mt-3 text-xs text-gray-600 space-y-1">
                          <p>SAP Document: {result.sapDocumentNumber}</p>
                          <p>Material Number: {result.sapReferences.materialNumber}</p>
                          <p>Equipment Number: {result.sapReferences.equipmentNumber}</p>
                          <p>Functional Location: {result.sapReferences.functionalLocation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
