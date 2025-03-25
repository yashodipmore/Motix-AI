import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MotorOverview } from "@/components/dashboard/motor-overview"
import { SensorReadings } from "@/components/dashboard/sensor-readings"
import { FaultDetection } from "@/components/dashboard/fault-detection"
import { Recommendations } from "@/components/dashboard/recommendations"
import { MotorControls } from "@/components/dashboard/motor-controls"
import { SakhiChatbot } from "@/components/dashboard/sakhi-chatbot"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Motor Dashboard" text="Real-time monitoring and fault diagnosis for induction motors" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* First row - prioritize recommendations and overview */}
        <MotorOverview />
        <Recommendations className="md:col-span-1" />
        <MotorControls />

        {/* Second row - sensor readings and fault detection */}
        <SensorReadings className="md:col-span-2 lg:col-span-2" />
        <FaultDetection className="md:col-span-2 lg:col-span-1" />
      </div>
      <SakhiChatbot />
    </DashboardShell>
  )
}

