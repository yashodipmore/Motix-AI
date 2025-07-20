import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { BarChart3, Download, Calendar, Filter, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const historicalData = [
  { time: '00:00', ia: 12.1, ib: 12.0, ic: 12.2, vab: 415, speed: 1450 },
  { time: '04:00', ia: 11.8, ib: 11.9, ic: 12.1, vab: 412, speed: 1445 },
  { time: '08:00', ia: 12.3, ib: 12.1, ic: 12.4, vab: 418, speed: 1455 },
  { time: '12:00', ia: 12.5, ib: 12.3, ic: 12.6, vab: 420, speed: 1460 },
  { time: '16:00', ia: 12.2, ib: 12.0, ic: 12.3, vab: 416, speed: 1450 },
  { time: '20:00', ia: 11.9, ib: 11.8, ic: 12.0, vab: 413, speed: 1445 },
];

const logsData = [
  { id: 1, time: '2024-01-15 14:32:15', fault: 'Under Voltage', severity: 'Warning', parameter: 'Vab: 385V', action: 'Logged for analysis' },
  { id: 2, time: '2024-01-15 12:45:30', fault: 'Phase Imbalance', severity: 'Critical', parameter: 'Ic: 18.5A', action: 'Auto-shutdown triggered' },
  { id: 3, time: '2024-01-15 10:15:45', fault: 'Overload', severity: 'Warning', parameter: 'Speed: 1580 rad/s', action: 'Notification sent' },
  { id: 4, time: '2024-01-15 08:22:10', fault: 'Over Voltage', severity: 'Critical', parameter: 'Vab: 445V', action: 'Emergency stop activated' },
  { id: 5, time: '2024-01-15 06:18:25', fault: 'Normal', severity: 'Info', parameter: 'All parameters nominal', action: 'System operational' },
];

const Analytics: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('24h');
  const [selectedFaultType, setSelectedFaultType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logsData.filter(log => 
    log.fault.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.parameter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportData = (format: string) => {
    console.log(`Exporting data as ${format}...`);
    // Implementation would go here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">System Analytics & History</h1>
        <p className="text-green-100">Historical data analysis and system logs</p>
      </div>

      {/* Filters Section */}
      <Card title="Data Filters" icon={Filter}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <select 
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fault Type
            </label>
            <select 
              value={selectedFaultType}
              onChange={(e) => setSelectedFaultType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Faults</option>
              <option value="voltage">Voltage Related</option>
              <option value="current">Current Related</option>
              <option value="speed">Speed Related</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Logs
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search logs..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-end space-x-2">
            <button 
              onClick={() => exportData('csv')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Historical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Current Trends (A)" icon={BarChart3}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
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
        </Card>

        <Card title="Voltage & Speed Trends" icon={BarChart3}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vab" stroke="#3B82F6" strokeWidth={2} name="Voltage (V)" />
                <Line type="monotone" dataKey="speed" stroke="#8B5CF6" strokeWidth={2} name="Speed (rad/s)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* System Logs Table */}
      <Card title="System Event Logs" icon={Calendar}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredLogs.length} of {logsData.length} entries
            </p>
            <div className="flex space-x-2">
              <button 
                onClick={() => exportData('pdf')}
                className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Export PDF
              </button>
              <button 
                onClick={() => exportData('image')}
                className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Save as Image
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Fault Detected</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Severity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Affected Parameter</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Action Taken</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{log.time}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{log.fault}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={
                          log.severity === 'Critical' ? 'danger' : 
                          log.severity === 'Warning' ? 'warning' : 'info'
                        }
                        size="sm"
                      >
                        {log.severity}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{log.parameter}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{log.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;