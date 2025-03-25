import type React from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, AlertCircle, Calendar, Clock, Info } from "lucide-react"

export default function FaultsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Fault History" text="Historical record of detected faults and issues" />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Fault History</CardTitle>
            <CardDescription>Comprehensive record of all detected faults</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Faults</TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
                <TabsTrigger value="warning">Warning</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <div className="space-y-4">
                  {faultHistory.map((fault, index) => (
                    <FaultHistoryItem key={index} fault={fault} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="critical" className="pt-4">
                <div className="space-y-4">
                  {faultHistory
                    .filter((fault) => fault.severity === "critical")
                    .map((fault, index) => (
                      <FaultHistoryItem key={index} fault={fault} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="warning" className="pt-4">
                <div className="space-y-4">
                  {faultHistory
                    .filter((fault) => fault.severity === "warning")
                    .map((fault, index) => (
                      <FaultHistoryItem key={index} fault={fault} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="resolved" className="pt-4">
                <div className="space-y-4">
                  {faultHistory
                    .filter((fault) => fault.resolved)
                    .map((fault, index) => (
                      <FaultHistoryItem key={index} fault={fault} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fault Statistics</CardTitle>
            <CardDescription>Analysis of fault patterns and frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <StatCard
                title="Total Faults"
                value="24"
                description="Last 30 days"
                icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
              />
              <StatCard
                title="Critical Faults"
                value="3"
                description="Last 30 days"
                icon={<AlertCircle className="h-4 w-4 text-destructive" />}
              />
              <StatCard
                title="Avg. Resolution Time"
                value="4.2 hrs"
                description="Last 30 days"
                icon={<Clock className="h-4 w-4 text-blue-500" />}
              />
            </div>

            <div className="mt-6 rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Common Fault Types</h3>
              <div className="space-y-2">
                {[
                  { type: "Bearing Fault", count: 8, percentage: 33 },
                  { type: "Voltage Imbalance", count: 6, percentage: 25 },
                  { type: "Rotor Imbalance", count: 5, percentage: 21 },
                  { type: "Stator Winding", count: 3, percentage: 13 },
                  { type: "Other", count: 2, percentage: 8 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{item.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.count} faults</span>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span className="text-sm">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

interface FaultHistoryItemProps {
  fault: {
    id: string
    date: string
    type: string
    description: string
    severity: "critical" | "warning" | "info"
    resolved: boolean
    resolution?: string
  }
}

function FaultHistoryItem({ fault }: FaultHistoryItemProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        fault.severity === "critical"
          ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
          : fault.severity === "warning"
            ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/30"
            : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30"
      }`}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {fault.severity === "critical" ? (
              <AlertCircle className="h-5 w-5 text-destructive" />
            ) : fault.severity === "warning" ? (
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            ) : (
              <Info className="h-5 w-5 text-blue-500" />
            )}
            <span className="font-medium">{fault.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {fault.date}
            </div>
            {fault.resolved && (
              <div className="flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                <CheckCircle className="mr-1 h-3 w-3" />
                Resolved
              </div>
            )}
          </div>
        </div>
        <p className="text-sm">{fault.description}</p>
        {fault.resolution && (
          <div className="rounded-md bg-background p-2 text-sm">
            <span className="font-medium">Resolution:</span> {fault.resolution}
          </div>
        )}
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

// Sample fault history data
const faultHistory = [
  {
    id: "fault-001",
    date: "Today, 10:23 AM",
    type: "Bearing Fault",
    description: "Excessive vibration detected in main bearing. Potential early stage failure.",
    severity: "warning" as const,
    resolved: false,
  },
  {
    id: "fault-002",
    date: "Yesterday, 2:45 PM",
    type: "Voltage Imbalance",
    description: "Phase B voltage dropped below threshold (198V). Potential power supply issue.",
    severity: "critical" as const,
    resolved: true,
    resolution: "Power supply stabilized after maintenance. Monitoring for recurrence.",
  },
  {
    id: "fault-003",
    date: "Mar 22, 2025",
    type: "Rotor Imbalance",
    description: "Detected increasing vibration patterns consistent with rotor imbalance.",
    severity: "warning" as const,
    resolved: true,
    resolution: "Rotor balanced during scheduled maintenance.",
  },
  {
    id: "fault-004",
    date: "Mar 20, 2025",
    type: "Stator Winding",
    description: "Abnormal current patterns detected in stator winding. Potential insulation breakdown.",
    severity: "critical" as const,
    resolved: true,
    resolution: "Stator winding replaced. Root cause identified as moisture ingress.",
  },
  {
    id: "fault-005",
    date: "Mar 18, 2025",
    type: "Temperature Alert",
    description: "Motor temperature exceeded warning threshold (58°C) during high load operation.",
    severity: "warning" as const,
    resolved: true,
    resolution: "Cooling system cleaned and optimized.",
  },
]

