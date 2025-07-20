import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Gauge from '../components/Gauge';
import { Activity, Zap, Gauge as GaugeIcon, AlertCircle, Clock, Wifi } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const mockSensorData = {
  current: { ia: 12.5, ib: 12.3, ic: 12.7 },
  voltage: { vab: 415.2 },
  speed: 1450,
  motorStatus: 'Healthy'
};

const mockVoltageHistory = [
  { time: '10:00', voltage: 415 },
  { time: '10:01', voltage: 412 },
  { time: '10:02', voltage: 418 },
  { time: '10:03', voltage: 415 },
  { time: '10:04', voltage: 420 },
  { time: '10:05', voltage: 415 },
];

const mockAlerts = [
  { id: 1, type: 'Under Voltage', severity: 'Warning', timestamp: '10:03:45', action: 'Logged for analysis' },
  { id: 2, type: 'Phase Imbalance', severity: 'Critical', timestamp: '09:45:22', action: 'Auto-shutdown triggered' },
  { id: 3, type: 'Overload', severity: 'Warning', timestamp: '09:30:15', action: 'Notification sent' },
];

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemUptime, setSystemUptime] = useState('2d 14h 32m');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Live VFD Monitoring</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Last Reading: {currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Runtime: {systemUptime}</span>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Motor Status" icon={Activity}>
          <div className="text-center">
            <Badge variant={mockSensorData.motorStatus === 'Healthy' ? 'success' : 'danger'} size="lg">
              {mockSensorData.motorStatus}
            </Badge>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">System operational</p>
          </div>
        </Card>

        <Card title="Current (Ia)" icon={Zap}>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {mockSensorData.current.ia}
            </div>
            <p className="text-gray-500 dark:text-gray-400">Amperes</p>
          </div>
        </Card>

        <Card title="Voltage (Vab)" icon={GaugeIcon}>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {mockSensorData.voltage.vab}
            </div>
            <p className="text-gray-500 dark:text-gray-400">Volts</p>
          </div>
        </Card>

        <Card title="Speed" icon={Activity}>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {mockSensorData.speed}
            </div>
            <p className="text-gray-500 dark:text-gray-400">rad/s</p>
          </div>
        </Card>
      </div>

      {/* Sensor Gauges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Current Monitoring" icon={Zap}>
          <div className="grid grid-cols-3 gap-4">
            <Gauge 
              value={mockSensorData.current.ia} 
              min={0} 
              max={20} 
              label="Phase A" 
              unit="A"
              color="#EF4444"
            />
            <Gauge 
              value={mockSensorData.current.ib} 
              min={0} 
              max={20} 
              label="Phase B" 
              unit="A"
              color="#F59E0B"
            />
            <Gauge 
              value={mockSensorData.current.ic} 
              min={0} 
              max={20} 
              label="Phase C" 
              unit="A"
              color="#10B981"
            />
          </div>
        </Card>

        <Card title="Voltage Trend" icon={GaugeIcon}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockVoltageHistory}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis domain={[400, 430]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="voltage" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Speed Gauge and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Motor Speed" icon={Activity}>
          <div className="flex justify-center">
            <Gauge 
              value={mockSensorData.speed} 
              min={0} 
              max={2000} 
              label="Motor Speed" 
              unit="rad/s"
              color="#8B5CF6"
              size="lg"
            />
          </div>
        </Card>

        <Card title="Live Fault Alerts" icon={AlertCircle}>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">{alert.type}</span>
                    <Badge variant={alert.severity === 'Critical' ? 'danger' : 'warning'} size="sm">
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{alert.action}</p>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{alert.timestamp}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Uptime: {systemUptime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">ESP32 Connected</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {currentTime.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;