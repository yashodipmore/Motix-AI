"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

type MotorStatus = "running" | "idle" | "fault"
type FaultStatus = "healthy" | "warning" | "critical"

interface MotorData {
  load: number
  speed: number
  temperature: number
  efficiency: number
}

interface SensorDataPoint {
  time: string
  value: number
}

interface SensorData {
  current: SensorDataPoint[]
  voltage: SensorDataPoint[]
  temperature: SensorDataPoint[]
  vibration: SensorDataPoint[]
}

interface Fault {
  type: string
  probability: number
  description: string
}

interface FaultData {
  status: FaultStatus
  faults: Fault[]
}

interface Recommendation {
  id: string
  title: string
  description: string
  timeframe: string
  priority: "low" | "medium" | "high"
  relatedFault?: string // Link to the related fault type
}

interface MotorDataContextType {
  motorData: MotorData
  sensorData: SensorData
  faultData: FaultData
  recommendations: Recommendation[]
  motorStatus: MotorStatus
  setMotorStatus: (status: MotorStatus) => void
}

const MotorDataContext = createContext<MotorDataContextType | undefined>(undefined)

export function MotorDataProvider({ children }: { children: React.ReactNode }) {
  const [motorStatus, setMotorStatus] = useState<MotorStatus>("idle")
  const [motorData, setMotorData] = useState<MotorData>({
    load: 65,
    speed: 1500,
    temperature: 42,
    efficiency: 87,
  })

  const [sensorData, setSensorData] = useState<SensorData>({
    current: generateInitialData(10, 5, 15),
    voltage: generateInitialData(10, 220, 240),
    temperature: generateInitialData(10, 35, 50),
    vibration: generateInitialData(10, 0.5, 2.5),
  })

  const [faultData, setFaultData] = useState<FaultData>({
    status: "healthy",
    faults: [
      {
        type: "Bearing Fault",
        probability: 15,
        description: "Potential early signs of bearing wear detected.",
      },
      {
        type: "Stator Winding",
        probability: 8,
        description: "Stator winding condition is normal.",
      },
      {
        type: "Rotor Imbalance",
        probability: 32,
        description: "Minor rotor imbalance detected. Monitor for changes.",
      },
      {
        type: "Voltage Imbalance",
        probability: 5,
        description: "Voltage supply is balanced and within normal parameters.",
      },
    ],
  })

  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "rec1",
      title: "Schedule Bearing Inspection",
      description: "Early signs of bearing wear detected. Schedule inspection within next maintenance window.",
      timeframe: "next 30 days",
      priority: "medium",
      relatedFault: "Bearing Fault",
    },
    {
      id: "rec2",
      title: "Check Rotor Balance",
      description: "Minor rotor imbalance detected. Perform balancing procedure to prevent further issues.",
      timeframe: "next 15 days",
      priority: "medium",
      relatedFault: "Rotor Imbalance",
    },
    {
      id: "rec3",
      title: "Lubricate Bearings",
      description: "Regular lubrication schedule recommended to extend bearing life.",
      timeframe: "next 7 days",
      priority: "low",
      relatedFault: "Bearing Fault",
    },
  ])

  // Update recommendations based on fault data
  useEffect(() => {
    // Dynamically update recommendations based on fault probabilities
    const updatedRecommendations: Recommendation[] = []

    // Check bearing fault
    const bearingFault = faultData.faults.find((f) => f.type === "Bearing Fault")
    if (bearingFault) {
      if (bearingFault.probability > 70) {
        updatedRecommendations.push({
          id: "rec-bearing-critical",
          title: "Urgent: Replace Bearings",
          description: "Critical bearing wear detected. Immediate replacement required to prevent failure.",
          timeframe: "immediately",
          priority: "high",
          relatedFault: "Bearing Fault",
        })
      } else if (bearingFault.probability > 30) {
        updatedRecommendations.push({
          id: "rec-bearing-warning",
          title: "Schedule Bearing Inspection",
          description: "Significant bearing wear detected. Schedule inspection and prepare for replacement.",
          timeframe: "next 15 days",
          priority: "medium",
          relatedFault: "Bearing Fault",
        })
      } else {
        updatedRecommendations.push({
          id: "rec-bearing-normal",
          title: "Lubricate Bearings",
          description: "Regular lubrication schedule recommended to extend bearing life.",
          timeframe: "next 30 days",
          priority: "low",
          relatedFault: "Bearing Fault",
        })
      }
    }

    // Check rotor imbalance
    const rotorFault = faultData.faults.find((f) => f.type === "Rotor Imbalance")
    if (rotorFault) {
      if (rotorFault.probability > 60) {
        updatedRecommendations.push({
          id: "rec-rotor-high",
          title: "Rotor Balancing Required",
          description: "Significant rotor imbalance detected. Schedule balancing procedure to prevent damage.",
          timeframe: "next 7 days",
          priority: "high",
          relatedFault: "Rotor Imbalance",
        })
      } else if (rotorFault.probability > 20) {
        updatedRecommendations.push({
          id: "rec-rotor-medium",
          title: "Check Rotor Balance",
          description: "Minor rotor imbalance detected. Perform balancing procedure during next maintenance.",
          timeframe: "next 30 days",
          priority: "medium",
          relatedFault: "Rotor Imbalance",
        })
      }
    }

    // Check stator winding
    const statorFault = faultData.faults.find((f) => f.type === "Stator Winding")
    if (statorFault && statorFault.probability > 40) {
      updatedRecommendations.push({
        id: "rec-stator",
        title: "Inspect Stator Windings",
        description: "Potential stator winding issues detected. Perform insulation resistance test.",
        timeframe: "next 15 days",
        priority: statorFault.probability > 70 ? "high" : "medium",
        relatedFault: "Stator Winding",
      })
    }

    // Check voltage imbalance
    const voltageFault = faultData.faults.find((f) => f.type === "Voltage Imbalance")
    if (voltageFault && voltageFault.probability > 30) {
      updatedRecommendations.push({
        id: "rec-voltage",
        title: "Check Power Supply",
        description: "Voltage imbalance detected. Inspect power supply and connections.",
        timeframe: "next 7 days",
        priority: voltageFault.probability > 60 ? "high" : "medium",
        relatedFault: "Voltage Imbalance",
      })
    }

    // Add general maintenance recommendation if no specific issues
    if (
      updatedRecommendations.length === 0 ||
      !updatedRecommendations.some((r) => r.priority === "high" || r.priority === "medium")
    ) {
      updatedRecommendations.push({
        id: "rec-general",
        title: "Routine Maintenance Check",
        description: "Schedule routine maintenance to ensure optimal motor performance.",
        timeframe: "next 90 days",
        priority: "low",
      })
    }

    setRecommendations(updatedRecommendations)
  }, [faultData])

  // Simulate real-time data updates
  useEffect(() => {
    if (motorStatus !== "running") return

    const interval = setInterval(() => {
      // Update motor data
      setMotorData((prev) => ({
        load: clamp(prev.load + randomChange(5), 40, 90),
        speed: clamp(prev.speed + randomChange(50), 1400, 1600),
        temperature: clamp(prev.temperature + randomChange(2), 35, 65),
        efficiency: clamp(prev.efficiency + randomChange(1), 82, 92),
      }))

      // Update sensor data
      setSensorData((prev) => ({
        current: updateSensorData(prev.current, 5, 15),
        voltage: updateSensorData(prev.voltage, 220, 240),
        temperature: updateSensorData(prev.temperature, 35, 65),
        vibration: updateSensorData(prev.vibration, 0.5, 3),
      }))

      // Randomly update fault probabilities
      setFaultData((prev) => {
        const updatedFaults = prev.faults.map((fault) => ({
          ...fault,
          probability: clamp(fault.probability + randomChange(5), 0, 100),
        }))

        // Determine overall status based on highest fault probability
        const highestProb = Math.max(...updatedFaults.map((f) => f.probability))
        let status: FaultStatus = "healthy"
        if (highestProb > 70) status = "critical"
        else if (highestProb > 30) status = "warning"

        return {
          status,
          faults: updatedFaults,
        }
      })

      // Simulate fault condition occasionally
      if (Math.random() < 0.01) {
        setMotorStatus("fault")
        setFaultData((prev) => ({
          status: "critical",
          faults: prev.faults.map((fault) => ({
            ...fault,
            probability: fault.type === "Bearing Fault" ? 85 : fault.probability,
          })),
        }))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [motorStatus])

  return (
    <MotorDataContext.Provider
      value={{
        motorData,
        sensorData,
        faultData,
        recommendations,
        motorStatus,
        setMotorStatus,
      }}
    >
      {children}
    </MotorDataContext.Provider>
  )
}

export function useMotorData() {
  const context = useContext(MotorDataContext)
  if (context === undefined) {
    throw new Error("useMotorData must be used within a MotorDataProvider")
  }
  return context
}

// Helper functions
function generateInitialData(count: number, min: number, max: number): SensorDataPoint[] {
  return Array.from({ length: count }).map((_, i) => ({
    time: formatTime(new Date(Date.now() - (count - i) * 2000)),
    value: randomInRange(min, max),
  }))
}

function updateSensorData(data: SensorDataPoint[], min: number, max: number): SensorDataPoint[] {
  const newData = [...data.slice(1)]
  newData.push({
    time: formatTime(new Date()),
    value: clamp(newData[newData.length - 1].value + randomChange(max * 0.05), min, max),
  })
  return newData
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function randomChange(magnitude: number): number {
  return (Math.random() - 0.5) * 2 * magnitude
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

