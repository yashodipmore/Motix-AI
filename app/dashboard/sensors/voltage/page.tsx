import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AlertCircle } from "lucide-react"

export default function VoltageSensorPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Voltage Sensor" text="Detailed analysis of motor voltage measurements" />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Voltage Readings</CardTitle>
            <CardDescription>Real-time and historical voltage data</CardDescription>
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
                  <LineChart data={realtimeVoltageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[200, 250]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                      name="Voltage (V)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="hourly" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyVoltageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[200, 250]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Voltage (V)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="daily" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyVoltageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[200, 250]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Avg Voltage (V)"
                    />
                    <Line type="monotone" dataKey="min" stroke="#ff7300" strokeWidth={2} name="Min Voltage (V)" />
                    <Line type="monotone" dataKey="max" stroke="#00C49F" strokeWidth={2} name="Max Voltage (V)" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Voltage Statistics</CardTitle>
              <CardDescription>Key metrics and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "RMS Voltage", value: "230 V" },
                  { label: "Peak Voltage", value: "325 V" },
                  { label: "Minimum Voltage", value: "218 V" },
                  { label: "Average Voltage", value: "228 V" },
                  { label: "Voltage THD", value: "2.8%" },
                  { label: "Phase Imbalance", value: "1.2%" },
                  { label: "Frequency", value: "50.02 Hz" },
                  { label: "Voltage Stability", value: "Good" },
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
              <CardTitle>Voltage Quality</CardTitle>
              <CardDescription>Power quality analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Voltage Quality Metrics</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Voltage Stability", score: 92 },
                      { name: "Harmonic Distortion", score: 88 },
                      { name: "Voltage Balance", score: 95 },
                      { name: "Frequency Stability", score: 97 },
                    ].map((metric, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span>{metric.name}</span>
                          <span className="text-sm font-medium">{metric.score}/100</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${
                              metric.score > 90 ? "bg-green-500" : metric.score > 70 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Recent Events</h3>
                  {voltageEvents.length > 0 ? (
                    <div className="space-y-2">
                      {voltageEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                          <div className="flex items-center gap-2">
                            <AlertCircle
                              className={`h-4 w-4 ${
                                event.severity === "low"
                                  ? "text-blue-500"
                                  : event.severity === "medium"
                                    ? "text-yellow-500"
                                    : "text-red-500"
                              }`}
                            />
                            <span>{event.description}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{event.time}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-md bg-muted p-4 text-center">
                      <span className="text-sm text-muted-foreground">No voltage events detected</span>
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

// Sample data for voltage sensor
const realtimeVoltageData = [
  { time: "10:00:00", value: 230 },
  { time: "10:00:10", value: 231 },
  { time: "10:00:20", value: 230 },
  { time: "10:00:30", value: 229 },
  { time: "10:00:40", value: 228 },
  { time: "10:00:50", value: 227 },
  { time: "10:01:00", value: 228 },
  { time: "10:01:10", value: 229 },
  { time: "10:01:20", value: 230 },
  { time: "10:01:30", value: 231 },
  { time: "10:01:40", value: 232 },
  { time: "10:01:50", value: 231 },
  { time: "10:02:00", value: 230 },
]

const hourlyVoltageData = [
  { time: "00:00", value: 228 },
  { time: "01:00", value: 227 },
  { time: "02:00", value: 226 },
  { time: "03:00", value: 225 },
  { time: "04:00", value: 224 },
  { time: "05:00", value: 225 },
  { time: "06:00", value: 226 },
  { time: "07:00", value: 227 },
  { time: "08:00", value: 228 },
  { time: "09:00", value: 229 },
  { time: "10:00", value: 230 },
  { time: "11:00", value: 231 },
  { time: "12:00", value: 232 },
  { time: "13:00", value: 233 },
  { time: "14:00", value: 232 },
  { time: "15:00", value: 231 },
  { time: "16:00", value: 230 },
  { time: "17:00", value: 229 },
  { time: "18:00", value: 228 },
  { time: "19:00", value: 227 },
  { time: "20:00", value: 226 },
  { time: "21:00", value: 225 },
  { time: "22:00", value: 224 },
  { time: "23:00", value: 223 },
]

const dailyVoltageData = [
  { date: "Mar 18", avg: 228, min: 218, max: 238 },
  { date: "Mar 19", avg: 229, min: 220, max: 239 },
  { date: "Mar 20", avg: 230, min: 221, max: 240 },
  { date: "Mar 21", avg: 231, min: 222, max: 241 },
  { date: "Mar 22", avg: 230, min: 220, max: 240 },
  { date: "Mar 23", avg: 229, min: 219, max: 239 },
  { date: "Mar 24", avg: 228, min: 218, max: 238 },
]

const voltageEvents = [
  {
    description: "Voltage dip detected (218V)",
    time: "Today, 06:42 AM",
    severity: "medium",
  },
  {
    description: "Voltage fluctuation",
    time: "Yesterday, 02:15 PM",
    severity: "low",
  },
  {
    description: "Harmonic distortion increased",
    time: "Mar 22, 11:30 AM",
    severity: "low",
  },
]

