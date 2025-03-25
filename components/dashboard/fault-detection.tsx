"use client"
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useMotorData } from "@/lib/hooks/use-motor-data"
import { cn } from "@/lib/utils"

interface FaultDetectionProps {
  className?: string
}

export function FaultDetection({ className }: FaultDetectionProps) {
  const { faultData } = useMotorData()

  return (
    <Card className={cn("col-span-2 lg:col-span-1", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Fault Detection</CardTitle>
            <CardDescription>ML-based fault diagnosis</CardDescription>
          </div>
          <Badge
            variant={
              faultData.status === "healthy" ? "outline" : faultData.status === "warning" ? "secondary" : "destructive"
            }
            className="capitalize"
          >
            {faultData.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faultData.faults.map((fault) => (
            <div key={fault.type} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {fault.probability > 70 ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : fault.probability > 30 ? (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <span className="font-medium">{fault.type}</span>
                </div>
                <span className="text-sm">{fault.probability}%</span>
              </div>
              <Progress
                value={fault.probability}
                className={
                  fault.probability > 70
                    ? "bg-destructive/20"
                    : fault.probability > 30
                      ? "bg-yellow-500/20"
                      : "bg-green-500/20"
                }
                indicatorClassName={
                  fault.probability > 70 ? "bg-destructive" : fault.probability > 30 ? "bg-yellow-500" : "bg-green-500"
                }
              />
              <p className="text-xs text-muted-foreground">{fault.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

