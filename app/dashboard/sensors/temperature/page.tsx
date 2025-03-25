import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AlertTriangle, Thermometer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TemperatureSensorPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Temperature Sensor" text="Detailed analysis of motor temperature measurements" />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Temperature Readings</CardTitle>
                <CardDescription>Real-time and historical temperature data</CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Thermometer className="h-3 w-3" />
                <span>42°C</span>
              </Badge>
            </div>
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
                  <LineChart data={realtimeTempData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[30, 70]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                      name="Temperature (°C)"
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
              <TabsContent value="hourly" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyTempData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[30, 70]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Line type="monotone" dataKey="ambient" stroke="#00C49F" strokeWidth={2} name="Ambient Temp (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="daily" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyTempData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[30, 70]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Avg Temp (°C)"
                    />
                    <Line type="monotone" dataKey="max" stroke="#ff7300" strokeWidth={2} name="Max Temp (°C)" />
                    <Line type="monotone" dataKey="ambient" stroke="#00C49F" strokeWidth={2} name="Ambient Temp (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Analysis</CardTitle>
              <CardDescription>Thermal performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Current Temperature", value: "42°C" },
                    { label: "Maximum Temperature", value: "58°C" },
                    { label: "Ambient Temperature", value: "25°C" },
                    { label: "Temperature Rise", value: "17°C" },
                    { label: "Thermal Resistance", value: "0.34 °C/W" },
                    { label: "Cooling Efficiency", value: "87%" },
                    { label: "Heat Dissipation", value: "50 W" },
                    { label: "Thermal Time Constant", value: "15 min" },
                  ].map((stat, index) => (
                    <div key={index} className="flex flex-col space-y-1 rounded-lg border p-3">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-xl font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Temperature Distribution</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { location: "Stator", temp: 42 },
                      { location: "Rotor", temp: 48 },
                      { location: "Bearings", temp: 45 },
                      { location: "End Windings", temp: 52 },
                      { location: "Frame", temp: 38 },
                      { location: "Terminal Box", temp: 35 },
                    ].map((item, index) => (
                      <div key={index} className="rounded-md bg-muted p-2 text-center">
                        <div className="text-xs text-muted-foreground">{item.location}</div>
                        <div
                          className={`text-lg font-bold ${
                            item.temp > 50 ? "text-red-500" : item.temp > 45 ? "text-yellow-500" : "text-green-500"
                          }`}
                        >
                          {item.temp}°C
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Temperature Alerts</CardTitle>
              <CardDescription>Thermal warnings and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {temperatureAlerts.length > 0 ? (
                  temperatureAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-3 ${
                        alert.severity === "critical"
                          ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
                          : alert.severity === "warning"
                            ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/30"
                            : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            alert.severity === "critical"
                              ? "text-red-500"
                              : alert.severity === "warning"
                                ? "text-yellow-500"
                                : "text-blue-500"
                          }`}
                        />
                        <span className="font-medium">{alert.title}</span>
                      </div>
                      <p className="mt-1 text-sm">{alert.description}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Detected: {alert.time}</span>
                        <span>Temperature: {alert.temperature}°C</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <Thermometer className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 font-medium">No Temperature Alerts</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Temperature readings are within normal parameters
                    </p>
                  </div>
                )}

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Temperature Thresholds</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Warning Threshold", value: 55, current: 42 },
                      { name: "Critical Threshold", value: 65, current: 42 },
                    ].map((threshold, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span>{threshold.name}</span>
                          <span className="text-sm font-medium">{threshold.value}°C</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${
                              threshold.name === "Warning Threshold" ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${(threshold.current / threshold.value) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Current: {threshold.current}°C ({((threshold.current / threshold.value) * 100).toFixed(0)}% of
                          threshold)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

// Sample data for temperature sensor
const realtimeTempData = [
  { time: "10:00:00", value: 42, warning: 55, critical: 65 },
  { time: "10:00:10", value: 42.2, warning: 55, critical: 65 },
  { time: "10:00:20", value: 42.5, warning: 55, critical: 65 },
  { time: "10:00:30", value: 42.8, warning: 55, critical: 65 },
  { time: "10:00:40", value: 43.0, warning: 55, critical: 65 },
  { time: "10:00:50", value: 43.2, warning: 55, critical: 65 },
  { time: "10:01:00", value: 43.5, warning: 55, critical: 65 },
  { time: "10:01:10", value: 43.8, warning: 55, critical: 65 },
  { time: "10:01:20", value: 44.0, warning: 55, critical: 65 },
  { time: "10:01:30", value: 44.2, warning: 55, critical: 65 },
  { time: "10:01:40", value: 44.0, warning: 55, critical: 65 },
  { time: "10:01:50", value: 43.8, warning: 55, critical: 65 },
  { time: "10:02:00", value: 43.5, warning: 55, critical: 65 },
]

const hourlyTempData = [
  { time: "00:00", value: 38, ambient: 22 },
  { time: "01:00", value: 37, ambient: 21 },
  { time: "02:00", value: 36, ambient: 20 },
  { time: "03:00", value: 35, ambient: 20 },
  { time: "04:00", value: 35, ambient: 19 },
  { time: "05:00", value: 36, ambient: 20 },
  { time: "06:00", value: 37, ambient: 21 },
  { time: "07:00", value: 38, ambient: 22 },
  { time: "08:00", value: 40, ambient: 23 },
  { time: "09:00", value: 41, ambient: 24 },
  { time: "10:00", value: 42, ambient: 25 },
  { time: "11:00", value: 44, ambient: 26 },
  { time: "12:00", value: 45, ambient: 27 },
  { time: "13:00", value: 46, ambient: 28 },
  { time: "14:00", value: 47, ambient: 28 },
  { time: "15:00", value: 46, ambient: 27 },
  { time: "16:00", value: 45, ambient: 26 },
  { time: "17:00", value: 44, ambient: 25 },
  { time: "18:00", value: 43, ambient: 24 },
  { time: "19:00", value: 42, ambient: 23 },
  { time: "20:00", value: 41, ambient: 22 },
  { time: "21:00", value: 40, ambient: 22 },
  { time: "22:00", value: 39, ambient: 21 },
  { time: "23:00", value: 38, ambient: 21 },
]

const dailyTempData = [
  { date: "Mar 18", avg: 40, max: 46, ambient: 22 },
  { date: "Mar 19", avg: 41, max: 47, ambient: 23 },
  { date: "Mar 20", avg: 42, max: 48, ambient: 24 },
  { date: "Mar 21", avg: 43, max: 50, ambient: 25 },
  { date: "Mar 22", avg: 44, max: 52, ambient: 26 },
  { date: "Mar 23", avg: 45, max: 55, ambient: 27 },
  { date: "Mar 24", avg: 42, max: 48, ambient: 25 },
]

const temperatureAlerts = [
  {
    title: "High Temperature Warning",
    description: "Motor temperature reached 55°C during high load operation. Approaching warning threshold.",
    time: "Yesterday, 2:45 PM",
    temperature: 55,
    severity: "warning",
  },
  {
    title: "Temperature Rise Rate",
    description: "Abnormal temperature rise rate detected. Temperature increased by 10°C in 15 minutes.",
    time: "Mar 22, 11:30 AM",
    temperature: 52,
    severity: "info",
  },
]

