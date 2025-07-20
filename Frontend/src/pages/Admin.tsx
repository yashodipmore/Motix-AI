import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { useTheme } from '../contexts/ThemeContext';
import { Settings, Users, Github, FileText, Save, Moon, Sun, Volume2, VolumeX } from 'lucide-react';

const Admin: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [config, setConfig] = useState({
    ratedTorque: '150',
    proportionalityConstant: '0.85',
    faultThresholds: `{
  "undervoltage": 380,
  "overvoltage": 450,
  "overcurrent": 20,
  "overload": 18,
  "speedDeviation": 50
}`
  });
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedConfig, setSavedConfig] = useState(false);

  const teamMembers = [
    { name: 'Yashodip More', role: 'Project Lead & ML Engineer', email: 'yashodip.more@email.com' },
    { name: 'Komal Kumavat', role: 'Frontend Developer & UI/UX', email: 'komal.kumavat@email.com' },
    { name: 'Priya Sharma', role: 'Backend Developer', email: 'priya.sharma@email.com' },
    { name: 'Rahul Singh', role: 'Hardware Integration', email: 'rahul.singh@email.com' },
  ];

  const handleConfigSave = () => {
    setSavedConfig(true);
    setTimeout(() => setSavedConfig(false), 3000);
    console.log('Configuration saved:', config);
  };

  const handleConfigChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Settings & Developer Info</h1>
        <p className="text-indigo-100">System configuration and project information</p>
      </div>

      {/* Configuration Panel */}
      <Card title="System Configuration" icon={Settings}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rated Torque (Tn) - Nm
              </label>
              <input
                type="number"
                value={config.ratedTorque}
                onChange={(e) => handleConfigChange('ratedTorque', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter rated torque"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Proportionality Constant (k)
              </label>
              <input
                type="number"
                step="0.01"
                value={config.proportionalityConstant}
                onChange={(e) => handleConfigChange('proportionalityConstant', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter proportionality constant"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fault Threshold Configuration (JSON)
            </label>
            <textarea
              value={config.faultThresholds}
              onChange={(e) => handleConfigChange('faultThresholds', e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              placeholder="Enter fault thresholds in JSON format"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleConfigSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </button>
            {savedConfig && (
              <Badge variant="success">Configuration saved successfully!</Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Developer Info Panel */}
      <Card title="Project Information" icon={Users}>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ML-Based Fault Diagnosis for Electrical Drives
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              An intelligent system for real-time monitoring and classification of faults in Variable Frequency Drive (VFD) based electric motor systems using machine learning algorithms and IoT sensors.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">Machine Learning</Badge>
              <Badge variant="info">IoT Integration</Badge>
              <Badge variant="info">Real-time Monitoring</Badge>
              <Badge variant="info">ESP32</Badge>
              <Badge variant="info">React TypeScript</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Development Team</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white">{member.name}</h5>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{member.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Project Links</h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline">
                  <Github className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline">
                  <FileText className="h-4 w-4" />
                  <span>Documentation</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Details</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>ML Model Version:</span>
                  <Badge variant="info" size="sm">model_v3.pkl</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Frontend Version:</span>
                  <Badge variant="success" size="sm">v2.1.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span>API Version:</span>
                  <Badge variant="success" size="sm">v1.3.2</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>2024-01-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* User Preferences */}
      <Card title="User Preferences" icon={Settings}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h4>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isDark ? <Moon className="h-5 w-5 text-blue-600" /> : <Sun className="h-5 w-5 text-yellow-600" />}
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Theme</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isDark ? 'Dark mode' : 'Light mode'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isDark ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isDark ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h4>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {notificationsEnabled ? <Volume2 className="h-5 w-5 text-green-600" /> : <VolumeX className="h-5 w-5 text-red-600" />}
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Sound Alerts</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {notificationsEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    notificationsEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Admin;