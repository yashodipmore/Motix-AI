import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { AlertTriangle, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function VibrationSensorPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Vibration Sensor" text="Detailed analysis of motor vibration measurements" />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Vibration Readings</CardTitle>
                <CardDescription>Real-time and historical vibration data</CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span>1.2 mm/s</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="realtime">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="realtime">Real-time</TabsTrigger>
                <TabsTrigger value="spectrum">Spectrum</TabsTrigger>
                <TabsTrigger value="trend">Trend</TabsTrigger>
              </TabsList>
              <TabsContent value="realtime" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realtimeVibrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 3]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                      name="Vibration (mm/s)"
                    />
                    <Line
                      type="monotone"
                      dataKey="warning"
                      stroke="#ff7300"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      name="Warning Threshold"
                    />
                    <Line
                      type="monotone"
                      dataKey="critical"
                      stroke="#ff0000"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      name="Critical Threshold"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="spectrum" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vibrationSpectrumData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="frequency"
                      label={{ value: "Frequency (Hz)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis label={{ value: "Amplitude (mm/s)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Bar dataKey="amplitude" fill="hsl(var(--primary))" name="Amplitude" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="trend" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vibrationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 3]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Avg Vibration (mm/s)"
                    />
                    <Line type="monotone" dataKey="max" stroke="#ff7300" strokeWidth={2} name="Max Vibration (mm/s)" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Vibration Analysis</CardTitle>
              <CardDescription>Detailed vibration metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "RMS Vibration", value: "1.2 mm/s" },
                    { label: "Peak Vibration", value: "2.8 mm/s" },
                    { label: "Crest Factor", value: "2.33" },
                    { label: "Dominant Frequency", value: "24.5 Hz" },
                    { label: "Axial Vibration", value: "0.8 mm/s" },
                    { label: "Radial Vibration", value: "1.1 mm/s" },
                    { label: "Tangential Vibration", value: "0.7 mm/s" },
                    { label: "ISO 10816 Class", value: "Class B" },
                  ].map((stat, index) => (
                    <div key={index} className="flex flex-col space-y-1 rounded-lg border p-3">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-xl font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">ISO 10816 Vibration Severity</h3>
                  <div className="space-y-2">
                    <div className="flex h-8 w-full overflow-hidden rounded-md">
                      <div className="h-full w-1/4 bg-green-500" />
                      <div className="h-full w-1/4 bg-blue-500" />
                      <div className="h-full w-1/4 bg-yellow-500" />
                      <div className="h-full w-1/4 bg-red-500" />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Class A: Good</span>
                      <span>Class B: Acceptable</span>
                      <span>Class C: Unsatisfactory</span>
                      <span>Class D: Unacceptable</span>
                    </div>
                    <div className="relative h-6 w-full">
                      <div className="absolute top-0 h-6 w-1 bg-black" style={{ left: `${(1.2 / 4.5) * 100}%` }} />
                      <div className="absolute -top-1 left-[26%] text-xs font-medium">Current: 1.2 mm/s</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fault Signatures</CardTitle>
              <CardDescription>Vibration-based fault detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Detected Fault Patterns</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Bearing Fault", probability: 35, frequency: "24.5 Hz" },
                      { name: "Misalignment", probability: 15, frequency: "1x RPM" },
                      { name: "Imbalance", probability: 42, frequency: "1x RPM" },
                      { name: "Looseness", probability: 8, frequency: "2x RPM" },
                    ].map((fault, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle
                              className={`h-4 w-4 ${
                                fault.probability > 40
                                  ? "text-yellow-500"
                                  : fault.probability > 20
                                    ? "text-blue-500"
                                    : "text-muted-foreground"
                              }`}
                            />
                            <span>{fault.name}</span>
                          </div>
                          <span className="text-sm font-medium">{fault.probability}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${
                              fault.probability > 40
                                ? "bg-yellow-500"
                                : fault.probability > 20
                                  ? "bg-blue-500"
                                  : "bg-muted-foreground"
                            }`}
                            style={{ width: `${fault.probability}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">Characteristic frequency: {fault.frequency}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Vibration Alerts</h3>
                  {vibrationAlerts.length > 0 ? (
                    <div className="space-y-2">
                      {vibrationAlerts.map((alert, index) => (
                        <div
                          key={index}
                          className={`rounded-md p-2 ${
                            alert.severity === "warning"
                              ? "bg-yellow-50 dark:bg-yellow-950/30"
                              : "bg-blue-50 dark:bg-blue-950/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{alert.message}</span>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-md bg-muted p-4 text-center">
                      <span className="text-sm text-muted-foreground">No vibration alerts detected</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

// Sample data for vibration sensor
const realtimeVibrationData = [
  { time: "10:00:00", value: 1.2, warning: 2.0, critical: 3.0 },
  { time: "10:00:10", value: 1.25, warning: 2.0, critical: 3.0 },
  { time: "10:00:20", value: 1.3, warning: 2.0, critical: 3.0 },
  { time: "10:00:30", value: 1.28, warning: 2.0, critical: 3.0 },
  { time: "10:00:40", value: 1.22, warning: 2.0, critical: 3.0 },
  { time: "10:00:50", value: 1.18, warning: 2.0, critical: 3.0 },
  { time: "10:01:00", value: 1.15, warning: 2.0, critical: 3.0 },
  { time: "10:01:10", value: 1.2, warning: 2.0, critical: 3.0 },
  { time: "10:01:20", value: 1.25, warning: 2.0, critical: 3.0 },
  { time: "10:01:30", value: 1.3, warning: 2.0, critical: 3.0 },
  { time: "10:01:40", value: 1.35, warning: 2.0, critical: 3.0 },
  { time: "10:01:50", value: 1.32, warning: 2.0, critical: 3.0 },
  { time: "10:02:00", value: 1.28, warning: 2.0, critical: 3.0 },
]

const vibrationSpectrumData = [
  { frequency: 0, amplitude: 0.1 },
  { frequency: 5, amplitude: 0.2 },
  { frequency: 10, amplitude: 0.3 },
  { frequency: 15, amplitude: 0.4 },
  { frequency: 20, amplitude: 0.6 },
  { frequency: 24.5, amplitude: 1.2 },
  { frequency: 30, amplitude: 0.5 },
  { frequency: 35, amplitude: 0.3 },
  { frequency: 40, amplitude: 0.2 },
  { frequency: 45, amplitude: 0.15 },
  { frequency: 50, amplitude: 0.1 },
  { frequency: 55, amplitude: 0.08 },
  { frequency: 60, amplitude: 0.05 },
]

const vibrationTrendData = [
  { date: "Mar 18", avg: 0.8, max: 1.5 },
  { date: "Mar 19", avg: 0.9, max: 1.7 },
  { date: "Mar 20", avg: 1.0, max: 1.9 },
  { date: "Mar 21", avg: 1.1, max: 2.2 },
  { date: "Mar 22", avg: 1.2, max: 2.5 },
  { date: "Mar 23", avg: 1.1, max: 2.3 },
  { date: "Mar 24", avg: 1.2, max: 2.8 },
]

const vibrationAlerts = [
  {
    message: "Increased vibration in bearing frequency band",
    time: "Today, 09:15 AM",
    severity: "info",
  },
  {
    message: "Vibration spike detected (2.8 mm/s)",
    time: "Yesterday, 02:45 PM",
    severity: "warning",
  },
]

