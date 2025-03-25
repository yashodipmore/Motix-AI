import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, CheckCircle, Clock, Info, X } from "lucide-react"

export default function NotificationsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Notifications" text="System alerts and notifications" />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>System alerts and important messages</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span>Mark all as read</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <NotificationItem key={index} notification={notification} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="alerts" className="pt-4">
                <div className="space-y-4">
                  {notifications
                    .filter((notification) => notification.category === "alert")
                    .map((notification, index) => (
                      <NotificationItem key={index} notification={notification} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="maintenance" className="pt-4">
                <div className="space-y-4">
                  {notifications
                    .filter((notification) => notification.category === "maintenance")
                    .map((notification, index) => (
                      <NotificationItem key={index} notification={notification} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="system" className="pt-4">
                <div className="space-y-4">
                  {notifications
                    .filter((notification) => notification.category === "system")
                    .map((notification, index) => (
                      <NotificationItem key={index} notification={notification} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

interface NotificationItemProps {
  notification: {
    id: string
    title: string
    message: string
    time: string
    read: boolean
    category: "alert" | "maintenance" | "system"
    severity: "info" | "warning" | "critical" | "success"
  }
}

function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div className={`relative rounded-lg border p-4 ${notification.read ? "" : "border-primary bg-primary/5"}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {notification.severity === "info" && <Info className="h-5 w-5 text-blue-500" />}
          {notification.severity === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
          {notification.severity === "critical" && <AlertTriangle className="h-5 w-5 text-red-500" />}
          {notification.severity === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{notification.title}</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{notification.time}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
                <span className="sr-only">Dismiss</span>
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span
              className={`rounded-full px-2 py-0.5 font-medium ${
                notification.category === "alert"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  : notification.category === "maintenance"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
              }`}
            >
              {notification.category}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              {notification.time}
            </span>
          </div>
        </div>
      </div>
      {!notification.read && <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary" />}
    </div>
  )
}

const notifications = [
  {
    id: "notif-001",
    title: "Vibration Alert",
    message:
      "Vibration levels have exceeded warning threshold (2.2 mm/s). Consider inspection during next maintenance window.",
    time: "10 minutes ago",
    read: false,
    category: "alert",
    severity: "warning",
  },
  {
    id: "notif-002",
    title: "Maintenance Reminder",
    message: "Scheduled bearing inspection due in 5 days. Please prepare maintenance resources.",
    time: "2 hours ago",
    read: false,
    category: "maintenance",
    severity: "info",
  },
  {
    id: "notif-003",
    title: "Temperature Normalized",
    message: "Motor temperature has returned to normal operating range (42°C).",
    time: "Yesterday",
    read: true,
    category: "alert",
    severity: "success",
  },
  {
    id: "notif-004",
    title: "System Update Available",
    message: "A new firmware update (v2.3.5) is available for the monitoring system. Click to install.",
    time: "2 days ago",
    read: true,
    category: "system",
    severity: "info",
  },
  {
    id: "notif-005",
    title: "Current Spike Detected",
    message: "Momentary current spike detected (18.7A). System has logged the event for analysis.",
    time: "3 days ago",
    read: true,
    category: "alert",
    severity: "warning",
  },
  {
    id: "notif-006",
    title: "ML Model Updated",
    message: "Predictive maintenance model has been updated with latest operational data.",
    time: "1 week ago",
    read: true,
    category: "system",
    severity: "info",
  },
  {
    id: "notif-007",
    title: "Bearing Replacement Recommended",
    message: "ML analysis indicates bearing #2 should be replaced within next 30 days to prevent failure.",
    time: "1 week ago",
    read: true,
    category: "maintenance",
    severity: "warning",
  },
]

