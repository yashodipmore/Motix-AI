import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { Brain, AlertTriangle, Activity, TrendingUp, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockPrediction = {
  faultType: 'Phase-to-Phase Short Circuit',
  confidence: 93.21,
  description: 'Detected abnormal current flow between phases indicating potential short circuit condition.'
};

const faultDistribution = [
  { name: 'NOM', value: 45, color: '#10B981' },
  { name: 'UVF', value: 12, color: '#F59E0B' },
  { name: 'OVF', value: 8, color: '#EF4444' },
  { name: 'PTPF', value: 15, color: '#8B5CF6' },
  { name: 'PTGF', value: 10, color: '#EC4899' },
  { name: 'OLF', value: 10, color: '#6B7280' },
];

const faultTypes = [
  { code: 'NOM', name: 'Normal Operation', description: 'System operating within normal parameters', icon: '✅' },
  { code: 'UVF', name: 'Under Voltage Fault', description: 'Voltage below acceptable threshold', icon: '⚡' },
  { code: 'OVF', name: 'Over Voltage Fault', description: 'Voltage exceeds safe operating limits', icon: '🔺' },
  { code: 'PTPF', name: 'Phase-to-Phase Fault', description: 'Short circuit between phases', icon: '⚠️' },
  { code: 'PTGF', name: 'Phase-to-Ground Fault', description: 'Phase connected to ground', icon: '🔌' },
  { code: 'OLF', name: 'Overload Fault', description: 'Current exceeds motor rating', icon: '🔥' },
];

const waveformData = [
  { time: 0, ia: 10, ib: 8, ic: 12, vab: 415, speed: 1450 },
  { time: 1, ia: 12, ib: 10, ic: 14, vab: 410, speed: 1445 },
  { time: 2, ia: 14, ib: 12, ic: 16, vab: 405, speed: 1440 },
  { time: 3, ia: 16, ib: 14, ic: 18, vab: 400, speed: 1435 },
  { time: 4, ia: 18, ib: 16, ic: 20, vab: 395, speed: 1430 },
  { time: 5, ia: 20, ib: 18, ic: 22, vab: 390, speed: 1425 },
];

const FaultDiagnosis: React.FC = () => {
  const [showWaveforms, setShowWaveforms] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">AI-Based Fault Classification</h1>
        <p className="text-purple-100">Real-time machine learning analysis of VFD sensor data</p>
      </div>

      {/* ML Prediction Card */}
      <Card title="Current ML Prediction" icon={Brain}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{mockPrediction.faultType}</h3>
                <p className="text-gray-600 dark:text-gray-300">{mockPrediction.description}</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Confidence Score</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">{mockPrediction.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${mockPrediction.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
              <Badge variant="danger" size="lg">FAULT DETECTED</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Fault Distribution Chart */}
      <Card title="Fault Distribution Analysis" icon={TrendingUp}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={faultDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Waveform Viewer */}
      <Card title="Fault Signature Viewer" icon={Eye}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowWaveforms(!showWaveforms)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showWaveforms ? 'Hide' : 'Show'} Waveforms
              </button>
            </div>
            <Badge variant="info">Real-time Oscilloscope View</Badge>
          </div>

          {showWaveforms && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Current Waveforms (A)</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waveformData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="ia" stroke="#EF4444" strokeWidth={2} name="Phase A" />
                      <Line type="monotone" dataKey="ib" stroke="#F59E0B" strokeWidth={2} name="Phase B" />
                      <Line type="monotone" dataKey="ic" stroke="#10B981" strokeWidth={2} name="Phase C" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Voltage & Speed</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waveformData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="vab" stroke="#3B82F6" strokeWidth={2} name="Voltage (V)" />
                      <Line type="monotone" dataKey="speed" stroke="#8B5CF6" strokeWidth={2} name="Speed (rad/s)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Fault Types Reference */}
      <Card title="Fault Classification Reference" icon={Activity}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faultTypes.map((fault) => (
            <div key={fault.code} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{fault.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{fault.code}</h4>
                    <Badge variant="default" size="sm">{fault.name}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{fault.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FaultDiagnosis;