import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Download, Filter, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HistoryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="History" text="Historical data and event logs" />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Event History</CardTitle>
                <CardDescription>Historical record of all system events</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="events">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search events..." className="pl-8" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="fault">Fault Events</SelectItem>
                        <SelectItem value="warning">Warning Events</SelectItem>
                        <SelectItem value="info">Info Events</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Event Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Sensor</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {eventHistory.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.timestamp}</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  event.type === "fault"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                    : event.type === "warning"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                }`}
                              >
                                {event.type}
                              </span>
                            </TableCell>
                            <TableCell>{event.description}</TableCell>
                            <TableCell>{event.sensor}</TableCell>
                            <TableCell>{event.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>42</strong> events
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="operations" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search operations..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Operation</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Avg Load</TableHead>
                          <TableHead>Energy</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {operationHistory.map((operation) => (
                          <TableRow key={operation.id}>
                            <TableCell className="font-medium">{operation.timestamp}</TableCell>
                            <TableCell>{operation.operation}</TableCell>
                            <TableCell>{operation.duration}</TableCell>
                            <TableCell>{operation.avgLoad}</TableCell>
                            <TableCell>{operation.energy}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>28</strong> operations
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search maintenance records..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Technician</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {maintenanceHistory.map((maintenance) => (
                          <TableRow key={maintenance.id}>
                            <TableCell className="font-medium">{maintenance.date}</TableCell>
                            <TableCell>{maintenance.type}</TableCell>
                            <TableCell>{maintenance.description}</TableCell>
                            <TableCell>{maintenance.technician}</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  maintenance.status === "completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                    : maintenance.status === "scheduled"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                }`}
                              >
                                {maintenance.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>1-7</strong> of <strong>7</strong> maintenance records
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        Next
                      </Button>
                    </div>
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

// Sample data for event history
const eventHistory = [
  {
    id: "event-001",
    timestamp: "Mar 24, 2025 10:23 AM",
    type: "warning",
    description: "Vibration exceeded warning threshold",
    sensor: "Vibration",
    value: "2.2 mm/s",
  },
  {
    id: "event-002",
    timestamp: "Mar 24, 2025 08:15 AM",
    type: "info",
    description: "Motor started",
    sensor: "System",
    value: "ON",
  },
  {
    id: "event-003",
    timestamp: "Mar 23, 2025 06:42 PM",
    type: "info",
    description: "Motor stopped",
    sensor: "System",
    value: "OFF",
  },
  {
    id: "event-004",
    timestamp: "Mar 23, 2025 02:15 PM",
    type: "warning",
    description: "Current fluctuation detected",
    sensor: "Current",
    value: "15.2 A",
  },
  {
    id: "event-005",
    timestamp: "Mar 22, 2025 11:30 AM",
    type: "fault",
    description: "Emergency stop activated",
    sensor: "System",
    value: "FAULT",
  },
  {
    id: "event-006",
    timestamp: "Mar 22, 2025 11:28 AM",
    type: "fault",
    description: "Temperature exceeded critical threshold",
    sensor: "Temperature",
    value: "68°C",
  },
  {
    id: "event-007",
    timestamp: "Mar 22, 2025 09:45 AM",
    type: "warning",
    description: "Temperature approaching critical threshold",
    sensor: "Temperature",
    value: "58°C",
  },
  {
    id: "event-008",
    timestamp: "Mar 21, 2025 03:20 PM",
    type: "info",
    description: "System maintenance completed",
    sensor: "System",
    value: "MAINTENANCE",
  },
  {
    id: "event-009",
    timestamp: "Mar 21, 2025 01:10 PM",
    type: "info",
    description: "System maintenance started",
    sensor: "System",
    value: "MAINTENANCE",
  },
  {
    id: "event-010",
    timestamp: "Mar 20, 2025 08:30 AM",
    type: "warning",
    description: "Voltage imbalance detected",
    sensor: "Voltage",
    value: "Phase B: 198V",
  },
]

// Sample data for operation history
const operationHistory = [
  {
    id: "op-001",
    timestamp: "Mar 24, 2025",
    operation: "Production Run",
    duration: "8h 15m",
    avgLoad: "65%",
    energy: "124 kWh",
  },
  {
    id: "op-002",
    timestamp: "Mar 23, 2025",
    operation: "Production Run",
    duration: "10h 30m",
    avgLoad: "72%",
    energy: "168 kWh",
  },
  {
    id: "op-003",
    timestamp: "Mar 22, 2025",
    operation: "Test Run",
    duration: "2h 45m",
    avgLoad: "85%",
    energy: "52 kWh",
  },
  {
    id: "op-004",
    timestamp: "Mar 21, 2025",
    operation: "Maintenance",
    duration: "4h 20m",
    avgLoad: "25%",
    energy: "18 kWh",
  },
  {
    id: "op-005",
    timestamp: "Mar 20, 2025",
    operation: "Production Run",
    duration: "9h 45m",
    avgLoad: "68%",
    energy: "142 kWh",
  },
  {
    id: "op-006",
    timestamp: "Mar 19, 2025",
    operation: "Production Run",
    duration: "10h 00m",
    avgLoad: "70%",
    energy: "155 kWh",
  },
  {
    id: "op-007",
    timestamp: "Mar 18, 2025",
    operation: "Production Run",
    duration: "9h 30m",
    avgLoad: "67%",
    energy: "138 kWh",
  },
  {
    id: "op-008",
    timestamp: "Mar 17, 2025",
    operation: "Production Run",
    duration: "8h 45m",
    avgLoad: "64%",
    energy: "126 kWh",
  },
  {
    id: "op-009",
    timestamp: "Mar 16, 2025",
    operation: "Test Run",
    duration: "3h 15m",
    avgLoad: "80%",
    energy: "58 kWh",
  },
  {
    id: "op-010",
    timestamp: "Mar 15, 2025",
    operation: "Production Run",
    duration: "9h 15m",
    avgLoad: "69%",
    energy: "145 kWh",
  },
]

// Sample data for maintenance history
const maintenanceHistory = [
  {
    id: "maint-001",
    date: "Mar 21, 2025",
    type: "Scheduled",
    description: "Bearing inspection and lubrication",
    technician: "John Smith",
    status: "completed",
  },
  {
    id: "maint-002",
    date: "Mar 15, 2025",
    type: "Corrective",
    description: "Voltage regulator replacement",
    technician: "Sarah Johnson",
    status: "completed",
  },
  {
    id: "maint-003",
    date: "Mar 08, 2025",
    type: "Preventive",
    description: "Cooling system cleaning",
    technician: "Mike Chen",
    status: "completed",
  },
  {
    id: "maint-004",
    date: "Mar 01, 2025",
    type: "Scheduled",
    description: "General inspection and testing",
    technician: "John Smith",
    status: "completed",
  },
  {
    id: "maint-005",
    date: "Apr 05, 2025",
    type: "Scheduled",
    description: "Bearing replacement",
    technician: "Sarah Johnson",
    status: "scheduled",
  },
  {
    id: "maint-006",
    date: "Mar 28, 2025",
    type: "Predictive",
    description: "Rotor balancing based on vibration analysis",
    technician: "Mike Chen",
    status: "in-progress",
  },
  {
    id: "maint-007",
    date: "Apr 15, 2025",
    type: "Scheduled",
    description: "Quarterly comprehensive maintenance",
    technician: "John Smith",
    status: "scheduled",
  },
]

