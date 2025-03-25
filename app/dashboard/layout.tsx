import type React from "react"
import { Providers } from "@/app/providers"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}

