import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Configure system parameters and preferences" />
      <div className="grid gap-4">
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic configuration for the monitoring system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="motor-name">Motor Name</Label>
                  <Input id="motor-name" defaultValue="Induction Motor #1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motor-location">Location</Label>
                  <Input id="motor-location" defaultValue="Building A - Production Line 2" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motor-type">Motor Type</Label>
                  <Select defaultValue="induction">
                    <SelectTrigger id="motor-type">
                      <SelectValue placeholder="Select motor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="induction">Induction Motor</SelectItem>
                      <SelectItem value="synchronous">Synchronous Motor</SelectItem>
                      <SelectItem value="dc">DC Motor</SelectItem>
                      <SelectItem value="servo">Servo Motor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rated-power">Rated Power (kW)</Label>
                  <Input id="rated-power" type="number" defaultValue="15" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rated-speed">Rated Speed (RPM)</Label>
                  <Input id="rated-speed" type="number" defaultValue="1500" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-protection" className="flex-1">
                    Auto Protection
                  </Label>
                  <Switch id="auto-protection" defaultChecked />
                </div>

                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thresholds" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds</CardTitle>
                <CardDescription>Configure warning and critical thresholds for sensors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Current Thresholds (A)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="current-warning">Warning Threshold</Label>
                      <span className="text-sm">15 A</span>
                    </div>
                    <Slider id="current-warning" defaultValue={[15]} max={25} step={0.5} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="current-critical">Critical Threshold</Label>
                      <span className="text-sm">18 A</span>
                    </div>
                    <Slider id="current-critical" defaultValue={[18]} max={25} step={0.5} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Temperature Thresholds (°C)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temp-warning">Warning Threshold</Label>
                      <span className="text-sm">55 °C</span>
                    </div>
                    <Slider id="temp-warning" defaultValue={[55]} max={80} step={1} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temp-critical">Critical Threshold</Label>
                      <span className="text-sm">65 °C</span>
                    </div>
                    <Slider id="temp-critical" defaultValue={[65]} max={80} step={1} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Vibration Thresholds (mm/s)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="vibration-warning">Warning Threshold</Label>
                      <span className="text-sm">2.0 mm/s</span>
                    </div>
                    <Slider id="vibration-warning" defaultValue={[2]} max={5} step={0.1} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="vibration-critical">Critical Threshold</Label>
                      <span className="text-sm">3.0 mm/s</span>
                    </div>
                    <Slider id="vibration-critical" defaultValue={[3]} max={5} step={0.1} />
                  </div>
                </div>

                <Button className="w-full">Save Threshold Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Methods</h3>
                  <div className="space-y-2">
                    {[
                      { id: "email-notifications", label: "Email Notifications" },
                      { id: "sms-notifications", label: "SMS Notifications" },
                      { id: "push-notifications", label: "Push Notifications" },
                      { id: "dashboard-alerts", label: "Dashboard Alerts" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between space-x-2">
                        <Label htmlFor={item.id} className="flex-1">
                          {item.label}
                        </Label>
                        <Switch
                          id={item.id}
                          defaultChecked={item.id === "dashboard-alerts" || item.id === "email-notifications"}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-address">Email Address</Label>
                  <Input id="email-address" type="email" defaultValue="admin@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input id="phone-number" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Frequency</h3>
                  <div className="space-y-2">
                    <Select defaultValue="immediate">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="critical-only">Critical Alerts Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Alert Types</h3>
                  <div className="space-y-2">
                    {[
                      { id: "fault-alerts", label: "Fault Alerts" },
                      { id: "warning-alerts", label: "Warning Alerts" },
                      { id: "maintenance-alerts", label: "Maintenance Reminders" },
                      { id: "performance-alerts", label: "Performance Degradation" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between space-x-2">
                        <Label htmlFor={item.id} className="flex-1">
                          {item.label}
                        </Label>
                        <Switch id={item.id} defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="data-sampling">Data Sampling Rate (seconds)</Label>
                  <Select defaultValue="10">
                    <SelectTrigger id="data-sampling">
                      <SelectValue placeholder="Select sampling rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 second</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Select defaultValue="90">
                    <SelectTrigger id="data-retention">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">6 months</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ml-model">ML Model Update Frequency</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="ml-model">
                      <SelectValue placeholder="Select update frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">System Features</h3>
                  <div className="space-y-2">
                    {[
                      { id: "auto-diagnostics", label: "Automatic Diagnostics" },
                      { id: "predictive-maintenance", label: "Predictive Maintenance" },
                      { id: "energy-optimization", label: "Energy Optimization" },
                      { id: "remote-control", label: "Remote Control" },
                      { id: "data-backup", label: "Automatic Data Backup" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between space-x-2">
                        <Label htmlFor={item.id} className="flex-1">
                          {item.label}
                        </Label>
                        <Switch id={item.id} defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Save System Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

