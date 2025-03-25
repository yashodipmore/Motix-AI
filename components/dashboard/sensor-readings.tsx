"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMotorData } from "@/lib/hooks/use-motor-data"
import { cn } from "@/lib/utils"

interface SensorReadingsProps {
  className?: string
}

export function SensorReadings({ className }: SensorReadingsProps) {
  const { sensorData } = useMotorData()
  const [activeTab, setActiveTab] = useState("current")

  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader>
        <CardTitle>Sensor Readings</CardTitle>
        <CardDescription>Real-time sensor data from the motor</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="voltage">Voltage</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="vibration">Vibration</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData.current}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, "dataMax + 2"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name="Current (A)"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="voltage" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData.voltage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, "dataMax + 20"]} />
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
          <TabsContent value="temperature" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData.temperature}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, "dataMax + 10"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="vibration" className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData.vibration}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, "dataMax + 0.5"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name="Vibration (mm/s)"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

