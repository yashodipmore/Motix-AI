"use client"

import type React from "react"

import { MotorDataProvider } from "@/lib/hooks/use-motor-data"

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotorDataProvider>{children}</MotorDataProvider>
}

