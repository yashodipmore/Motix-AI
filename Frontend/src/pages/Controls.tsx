import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { Power, AlertOctagon, Play, Square, Wifi, WifiOff } from 'lucide-react';

const Controls: React.FC = () => {
  const [motorRunning, setMotorRunning] = useState(true);
  const [emergencyStop, setEmergencyStop] = useState(false);
  const [selectedFault, setSelectedFault] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [currentAction, setCurrentAction] = useState('Motor Running Normally');

  const faultTypes = [
    { value: 'undervoltage', label: 'Under Voltage' },
    { value: 'overvoltage', label: 'Over Voltage' },
    { value: 'phasetoground', label: 'Phase-to-Ground' },
    { value: 'phasetophase', label: 'Phase-to-Phase' },
    { value: 'overload', label: 'Overload' },
  ];

  const handleMotorToggle = () => {
    if (!emergencyStop) {
      setMotorRunning(!motorRunning);
      setCurrentAction(motorRunning ? 'Motor Stopped by User' : 'Motor Started by User');
    }
  };

  const handleEmergencyStop = () => {
    setEmergencyStop(true);
    setMotorRunning(false);
    setCurrentAction('EMERGENCY STOP ACTIVATED');
  };

  const resetEmergencyStop = () => {
    setEmergencyStop(false);
    setCurrentAction('Emergency Stop Reset - System Ready');
  };

  const simulateFault = () => {
    if (selectedFault) {
      const faultLabel = faultTypes.find(f => f.value === selectedFault)?.label;
      setCurrentAction(`Simulating ${faultLabel} Fault`);
      setMotorRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">System Controls & Simulation</h1>
        <p className="text-orange-100">Manual control and fault simulation for testing purposes</p>
      </div>

      {/* System Status */}
      <Card title="Current System Status" icon={Power}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
              motorRunning ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
            }`}>
              {motorRunning ? 
                <Play className="h-8 w-8 text-green-600 dark:text-green-400" /> :
                <Square className="h-8 w-8 text-red-600 dark:text-red-400" />
              }
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Motor Status</h3>
            <Badge variant={motorRunning ? 'success' : 'danger'} size="lg">
              {motorRunning ? 'RUNNING' : 'STOPPED'}
            </Badge>
          </div>

          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
              emergencyStop ? 'bg-red-100 dark:bg-red-900/20' : 'bg-green-100 dark:bg-green-900/20'
            }`}>
              <AlertOctagon className={`h-8 w-8 ${
                emergencyStop ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
              }`} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Emergency Stop</h3>
            <Badge variant={emergencyStop ? 'danger' : 'success'} size="lg">
              {emergencyStop ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
          </div>

          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
              connectionStatus ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
            }`}>
              {connectionStatus ? 
                <Wifi className="h-8 w-8 text-green-600 dark:text-green-400" /> :
                <WifiOff className="h-8 w-8 text-red-600 dark:text-red-400" />
              }
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Connection</h3>
            <Badge variant={connectionStatus ? 'success' : 'danger'} size="lg">
              {connectionStatus ? 'CONNECTED' : 'DISCONNECTED'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Motor Control Section */}
      <Card title="Motor Control" icon={Power}>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Power Control</h4>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleMotorToggle}
                  disabled={emergencyStop}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    motorRunning 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } ${emergencyStop ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {motorRunning ? 'STOP MOTOR' : 'START MOTOR'}
                </button>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${motorRunning ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {motorRunning ? 'Motor Active' : 'Motor Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Emergency Controls</h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEmergencyStop}
                disabled={emergencyStop}
                className={`px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  emergencyStop ? 'opacity-50 cursor-not-allowed' : 'shadow-lg'
                }`}
              >
                🚨 EMERGENCY STOP 🚨
              </button>
              {emergencyStop && (
                <button
                  onClick={resetEmergencyStop}
                  className="px-6 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Reset Emergency Stop
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Fault Simulation Section */}
      <Card title="Fault Simulation (Testing)" icon={AlertOctagon}>
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertOctagon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Warning: This section is for testing purposes only. Use with caution.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Fault Type
              </label>
              <select 
                value={selectedFault}
                onChange={(e) => setSelectedFault(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Choose a fault to simulate...</option>
                {faultTypes.map((fault) => (
                  <option key={fault.value} value={fault.value}>{fault.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={simulateFault}
                disabled={!selectedFault || emergencyStop}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedFault && !emergencyStop
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Simulate Fault
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Action Status */}
      <Card title="System Action Log" icon={AlertOctagon}>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Current System Action</h4>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{currentAction}</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ESP32 Connection</span>
            <Badge variant={connectionStatus ? 'success' : 'danger'}>
              {connectionStatus ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">MQTT Status</span>
            <Badge variant="success">Active</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Controls;