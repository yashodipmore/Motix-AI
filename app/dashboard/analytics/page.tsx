import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics" text="Performance analysis and predictive insights" />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="efficiency">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                <TabsTrigger value="energy">Energy</TabsTrigger>
                <TabsTrigger value="temperature">Temperature</TabsTrigger>
                <TabsTrigger value="vibration">Vibration</TabsTrigger>
              </TabsList>
              <TabsContent value="efficiency" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[75, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Efficiency (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Predicted Efficiency (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="energy" className="h-[350px] pt-4">
                <ChartContainer
                  config={{
                    consumption: {
                      label: "Energy Consumption",
                      color: "hsl(var(--chart-1))",
                    },
                    baseline: {
                      label: "Baseline",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <BarChart data={energyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="consumption" fill="var(--color-consumption)" name="kWh" />
                    <Bar dataKey="baseline" fill="var(--color-baseline)" name="Baseline" />
                  </BarChart>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="temperature" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[20, 70]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#ff7300"
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Line type="monotone" dataKey="ambient" stroke="#387908" strokeWidth={2} name="Ambient Temp (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="vibration" className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vibrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="vibration"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Vibration (mm/s)"
                    />
                    <Line
                      type="monotone"
                      dataKey="threshold"
                      stroke="#ff0000"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      name="Warning Threshold"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Fault Distribution</CardTitle>
              <CardDescription>Distribution of faults by type</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={faultDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {faultDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Predictive Maintenance</CardTitle>
              <CardDescription>ML-based maintenance predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Component Health Prediction</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Bearings", health: 72, nextMaintenance: "15 days" },
                      { name: "Stator Windings", health: 89, nextMaintenance: "45 days" },
                      { name: "Rotor", health: 94, nextMaintenance: "60 days" },
                      { name: "Cooling System", health: 85, nextMaintenance: "30 days" },
                    ].map((component, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span>{component.name}</span>
                          <span className="text-sm font-medium">{component.health}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${
                              component.health > 80
                                ? "bg-green-500"
                                : component.health > 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${component.health}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Next maintenance: {component.nextMaintenance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Remaining Useful Life</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">237 days</div>
                      <div className="text-sm text-muted-foreground">Until next major maintenance</div>
                    </div>
                    <div className="h-16 w-16 rounded-full border-4 border-primary p-1">
                      <div className="h-full w-full rounded-full bg-primary-foreground p-2">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          65%
                        </div>
                      </div>
                    </div>
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

// Sample data for charts
const efficiencyData = [
  { date: "Jan", efficiency: 87, predicted: null },
  { date: "Feb", efficiency: 86, predicted: null },
  { date: "Mar", efficiency: 89, predicted: null },
  { date: "Apr", efficiency: 88, predicted: null },
  { date: "May", efficiency: 86, predicted: null },
  { date: "Jun", efficiency: 85, predicted: null },
  { date: "Jul", efficiency: 84, predicted: null },
  { date: "Aug", efficiency: 82, predicted: null },
  { date: "Sep", efficiency: null, predicted: 81 },
  { date: "Oct", efficiency: null, predicted: 80 },
  { date: "Nov", efficiency: null, predicted: 79 },
  { date: "Dec", efficiency: null, predicted: 78 },
]

const energyData = [
  { date: "Week 1", consumption: 420, baseline: 450 },
  { date: "Week 2", consumption: 430, baseline: 450 },
  { date: "Week 3", consumption: 448, baseline: 450 },
  { date: "Week 4", consumption: 470, baseline: 450 },
  { date: "Week 5", consumption: 460, baseline: 450 },
  { date: "Week 6", consumption: 450, baseline: 450 },
  { date: "Week 7", consumption: 455, baseline: 450 },
  { date: "Week 8", consumption: 490, baseline: 450 },
]

const temperatureData = [
  { time: "00:00", temperature: 42, ambient: 25 },
  { time: "04:00", temperature: 40, ambient: 23 },
  { time: "08:00", temperature: 45, ambient: 26 },
  { time: "12:00", temperature: 50, ambient: 28 },
  { time: "16:00", temperature: 48, ambient: 27 },
  { time: "20:00", temperature: 44, ambient: 25 },
]

const vibrationData = [
  { time: "Day 1", vibration: 0.8, threshold: 2.0 },
  { time: "Day 2", vibration: 0.9, threshold: 2.0 },
  { time: "Day 3", vibration: 1.1, threshold: 2.0 },
  { time: "Day 4", vibration: 1.0, threshold: 2.0 },
  { time: "Day 5", vibration: 1.2, threshold: 2.0 },
  { time: "Day 6", vibration: 1.8, threshold: 2.0 },
  { time: "Day 7", vibration: 1.5, threshold: 2.0 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const faultDistribution = [
  { name: "Bearing", value: 35 },
  { name: "Stator", value: 20 },
  { name: "Rotor", value: 25 },
  { name: "Voltage", value: 15 },
  { name: "Other", value: 5 },
]

