"use client"

import { useState, useEffect } from "react"
import { Gauge, Zap, Thermometer, Activity } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMotorData } from "@/lib/hooks/use-motor-data"

export function MotorOverview() {
  const { motorData, motorStatus } = useMotorData()
  const [runningTime, setRunningTime] = useState("0h 0m")

  useEffect(() => {
    if (motorStatus === "running") {
      const interval = setInterval(() => {
        // This would normally be calculated from the actual start time
        const hours = Math.floor(Math.random() * 24)
        const minutes = Math.floor(Math.random() * 60)
        setRunningTime(`${hours}h ${minutes}m`)
      }, 60000)

      return () => clearInterval(interval)
    }
  }, [motorStatus])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Motor Overview</CardTitle>
          <CardDescription>Real-time motor status</CardDescription>
        </div>
        <Badge
          variant={motorStatus === "running" ? "default" : motorStatus === "idle" ? "secondary" : "destructive"}
          className="capitalize"
        >
          {motorStatus}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>Load</span>
            </div>
            <div className="text-2xl font-bold text-center">{motorData.load}%</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <span>Speed</span>
            </div>
            <div className="text-2xl font-bold text-center">{motorData.speed} RPM</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Thermometer className="h-4 w-4" />
              <span>Temp</span>
            </div>
            <div className="text-2xl font-bold text-center">{motorData.temperature}°C</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>Runtime</span>
            </div>
            <div className="text-2xl font-bold text-center">{runningTime}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

