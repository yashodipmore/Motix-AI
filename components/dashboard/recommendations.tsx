"use client"

import { useState } from "react"
import { CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useMotorData } from "@/lib/hooks/use-motor-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface RecommendationsProps {
  className?: string
}

export function Recommendations({ className }: RecommendationsProps) {
  const { recommendations, faultData } = useMotorData()
  const [completedRecommendations, setCompletedRecommendations] = useState<string[]>([])

  const toggleRecommendation = (id: string) => {
    setCompletedRecommendations((prev) => (prev.includes(id) ? prev.filter((recId) => recId !== id) : [...prev, id]))
  }

  // Get the highest priority recommendation
  const highPriorityRec = recommendations.find((rec) => rec.priority === "high") || recommendations[0]

  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>ML-based maintenance suggestions</CardDescription>
          </div>
          <Badge
            variant={
              faultData.status === "healthy" ? "outline" : faultData.status === "warning" ? "secondary" : "destructive"
            }
          >
            {faultData.status === "healthy"
              ? "All Systems Normal"
              : faultData.status === "warning"
                ? "Attention Required"
                : "Critical Action Needed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {/* Highlight the most important recommendation */}
        {highPriorityRec && (
          <div className="mb-4 rounded-md border-2 border-primary bg-primary/5 p-3">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-primary">{highPriorityRec.title}</h4>
                <p className="text-sm">{highPriorityRec.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    Required by: {highPriorityRec.timeframe}
                  </span>
                  <Button variant="outline" size="sm" className="h-7">
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {recommendations
            .filter((r) => r.id !== highPriorityRec?.id)
            .map((recommendation) => (
              <div
                key={recommendation.id}
                className={cn(
                  "flex items-start space-x-3 rounded-md border p-3 transition-colors",
                  completedRecommendations.includes(recommendation.id)
                    ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                    : "border-border",
                )}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-6 w-6 shrink-0 rounded-full",
                    completedRecommendations.includes(recommendation.id) && "border-green-500 text-green-500",
                  )}
                  onClick={() => toggleRecommendation(recommendation.id)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="sr-only">Mark as complete</span>
                </Button>
                <div className="space-y-1">
                  <p
                    className={cn(
                      "font-medium",
                      completedRecommendations.includes(recommendation.id) && "line-through text-muted-foreground",
                    )}
                  >
                    {recommendation.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Recommended by {recommendation.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
          <span>View All Recommendations</span>
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}

