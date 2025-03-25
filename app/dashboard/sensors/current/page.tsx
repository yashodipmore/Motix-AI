import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AlertCircle, Zap } from "lucide-react"

export default function CurrentSensorPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Current Sensor" text="Detailed analysis of motor current measurements" />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Readings</CardTitle>
            <CardDescription>Real-time and historical current data</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="realtime">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="realtime">Real-time</TabsTrigger>
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
              </TabsList>
              <TabsContent value="realtime" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realtimeCurrentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, "dataMax + 2"]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                      name="Current (A)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="hourly" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyCurrentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, "dataMax + 2"]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Current (A)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="daily" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyCurrentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, "dataMax + 2"]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Avg Current (A)"
                    />
                    <Line type="monotone" dataKey="max" stroke="#ff7300" strokeWidth={2} name="Max Current (A)" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Statistics</CardTitle>
              <CardDescription>Key metrics and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Current RMS", value: "12.4 A" },
                  { label: "Peak Current", value: "18.7 A" },
                  { label: "Minimum Current", value: "8.2 A" },
                  { label: "Average Current", value: "11.8 A" },
                  { label: "Current THD", value: "3.2%" },
                  { label: "Crest Factor", value: "1.51" },
                  { label: "Form Factor", value: "1.11" },
                  { label: "Power Factor", value: "0.87" },
                ].map((stat, index) => (
                  <div key={index} className="flex flex-col space-y-1 rounded-lg border p-3">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="text-xl font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Anomalies</CardTitle>
              <CardDescription>Detected abnormal current patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentAnomalies.length > 0 ? (
                  currentAnomalies.map((anomaly, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">{anomaly.type}</span>
                      </div>
                      <p className="mt-1 text-sm">{anomaly.description}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Detected: {anomaly.time}</span>
                        <span>Confidence: {anomaly.confidence}%</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <Zap className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 font-medium">No Anomalies Detected</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Current readings are within normal parameters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

// Sample data for current sensor
const realtimeCurrentData = [
  { time: "10:00:00", value: 12.3 },
  { time: "10:00:10", value: 12.5 },
  { time: "10:00:20", value: 12.4 },
  { time: "10:00:30", value: 12.6 },
  { time: "10:00:40", value: 12.8 },
  { time: "10:00:50", value: 12.7 },
  { time: "10:01:00", value: 12.9 },
  { time: "10:01:10", value: 13.1 },
  { time: "10:01:20", value: 13.0 },
  { time: "10:01:30", value: 12.8 },
  { time: "10:01:40", value: 12.7 },
  { time: "10:01:50", value: 12.5 },
  { time: "10:02:00", value: 12.4 },
]

const hourlyCurrentData = [
  { time: "00:00", value: 10.2 },
  { time: "01:00", value: 9.8 },
  { time: "02:00", value: 9.5 },
  { time: "03:00", value: 9.3 },
  { time: "04:00", value: 9.4 },
  { time: "05:00", value: 9.7 },
  { time: "06:00", value: 10.5 },
  { time: "07:00", value: 11.2 },
  { time: "08:00", value: 12.1 },
  { time: "09:00", value: 12.8 },
  { time: "10:00", value: 13.2 },
  { time: "11:00", value: 13.5 },
  { time: "12:00", value: 13.8 },
  { time: "13:00", value: 14.0 },
  { time: "14:00", value: 13.9 },
  { time: "15:00", value: 13.7 },
  { time: "16:00", value: 13.5 },
  { time: "17:00", value: 13.2 },
  { time: "18:00", value: 12.8 },
  { time: "19:00", value: 12.3 },
  { time: "20:00", value: 11.8 },
  { time: "21:00", value: 11.2 },
  { time: "22:00", value: 10.7 },
  { time: "23:00", value: 10.3 },
]

const dailyCurrentData = [
  { date: "Mar 18", avg: 11.2, max: 14.5 },
  { date: "Mar 19", avg: 11.5, max: 15.2 },
  { date: "Mar 20", avg: 11.8, max: 16.1 },
  { date: "Mar 21", avg: 12.0, max: 16.8 },
  { date: "Mar 22", avg: 12.2, max: 17.3 },
  { date: "Mar 23", avg: 12.4, max: 18.7 },
  { date: "Mar 24", avg: 11.8, max: 15.9 },
]

const currentAnomalies = [
  {
    type: "Current Spike",
    description: "Sudden increase in current detected. Possible indication of momentary overload or short circuit.",
    time: "Today, 08:42 AM",
    confidence: 87,
  },
  {
    type: "Phase Imbalance",
    description: "Current imbalance between phases detected. May indicate connection issues or load imbalance.",
    time: "Yesterday, 03:15 PM",
    confidence: 92,
  },
]

