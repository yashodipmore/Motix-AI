"use client"

import { useState } from "react"
import { Power, AlertTriangle, RotateCw, Pause } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useMotorData } from "@/lib/hooks/use-motor-data"

export function MotorControls() {
  const { toast } = useToast()
  const { motorStatus, setMotorStatus } = useMotorData()
  const [speed, setSpeed] = useState(1500)
  const [autoProtection, setAutoProtection] = useState(true)

  const handlePowerToggle = () => {
    const newStatus = motorStatus === "running" ? "idle" : "running"
    setMotorStatus(newStatus)

    toast({
      title: newStatus === "running" ? "Motor Started" : "Motor Stopped",
      description:
        newStatus === "running" ? "The motor has been successfully started." : "The motor has been safely stopped.",
      variant: "default",
    })
  }

  const handleEmergencyStop = () => {
    setMotorStatus("fault")

    toast({
      title: "Emergency Stop Activated",
      description: "The motor has been stopped due to an emergency shutdown.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Motor Controls</CardTitle>
        <CardDescription>Control and monitor motor operation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Button
              variant={motorStatus === "running" ? "default" : "outline"}
              size="lg"
              className="h-16 w-16 rounded-full"
              onClick={handlePowerToggle}
              disabled={motorStatus === "fault"}
            >
              <Power className="h-8 w-8" />
              <span className="sr-only">{motorStatus === "running" ? "Stop" : "Start"} Motor</span>
            </Button>
            <span className="text-sm font-medium capitalize">
              {motorStatus === "running" ? "Running" : motorStatus}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="speed">Speed Control (RPM)</Label>
              <span className="text-sm font-medium">{speed}</span>
            </div>
            <Slider
              id="speed"
              min={0}
              max={3000}
              step={50}
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
              disabled={motorStatus !== "running"}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="auto-protection" className="flex-1">
              Auto Protection
            </Label>
            <Switch id="auto-protection" checked={autoProtection} onCheckedChange={setAutoProtection} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setMotorStatus("idle")
                toast({
                  title: "Motor Paused",
                  description: "The motor has been temporarily paused.",
                })
              }}
              disabled={motorStatus !== "running"}
            >
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                if (motorStatus === "fault") {
                  setMotorStatus("idle")
                  toast({
                    title: "Motor Reset",
                    description: "The motor has been reset from fault state.",
                  })
                }
              }}
              disabled={motorStatus !== "fault"}
            >
              <RotateCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <Button variant="destructive" className="w-full" onClick={handleEmergencyStop}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Emergency Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

