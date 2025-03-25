import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SensorReadings } from "@/components/dashboard/sensor-readings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MonitoringPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Real-time Monitoring" text="Comprehensive monitoring of all motor parameters" />
      <div className="grid gap-4">
        <SensorReadings />
        <Card>
          <CardHeader>
            <CardTitle>Live Monitoring Status</CardTitle>
            <CardDescription>Real-time status of all monitored parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="parameters">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="parameters" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Current", value: "12.4 A", status: "normal" },
                    { name: "Voltage", value: "230 V", status: "normal" },
                    { name: "Temperature", value: "42°C", status: "normal" },
                    { name: "Vibration", value: "1.2 mm/s", status: "warning" },
                    { name: "Speed", value: "1500 RPM", status: "normal" },
                    { name: "Load", value: "65%", status: "normal" },
                    { name: "Power Factor", value: "0.87", status: "normal" },
                    { name: "Efficiency", value: "92%", status: "normal" },
                  ].map((param) => (
                    <div key={param.name} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="font-medium">{param.name}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-right font-bold">{param.value}</div>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            param.status === "normal"
                              ? "bg-green-500"
                              : param.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="thresholds" className="pt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Configure alert thresholds for each parameter</p>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 border-b p-3 font-medium">
                      <div>Parameter</div>
                      <div>Warning</div>
                      <div>Critical</div>
                      <div>Status</div>
                    </div>
                    {[
                      { name: "Current", warning: "15 A", critical: "18 A", status: "normal" },
                      { name: "Voltage", warning: "245 V", critical: "255 V", status: "normal" },
                      { name: "Temperature", warning: "55°C", critical: "65°C", status: "normal" },
                      { name: "Vibration", warning: "1.0 mm/s", critical: "2.5 mm/s", status: "warning" },
                    ].map((param) => (
                      <div key={param.name} className="grid grid-cols-4 border-b p-3 last:border-0">
                        <div>{param.name}</div>
                        <div>{param.warning}</div>
                        <div>{param.critical}</div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              param.status === "normal"
                                ? "bg-green-500"
                                : param.status === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <span className="capitalize">{param.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="alerts" className="pt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Recent alerts from the monitoring system</p>
                  <div className="space-y-2">
                    {[
                      {
                        time: "10:23 AM",
                        message: "Vibration exceeded warning threshold (1.2 mm/s)",
                        level: "warning",
                      },
                      { time: "09:45 AM", message: "Temperature rising steadily (42°C)", level: "info" },
                      { time: "Yesterday", message: "Current fluctuation detected", level: "info" },
                      { time: "Yesterday", message: "Vibration spike detected (1.8 mm/s)", level: "warning" },
                    ].map((alert, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border p-3 ${
                          alert.level === "warning"
                            ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/30"
                            : alert.level === "critical"
                              ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
                              : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{alert.message}</span>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

