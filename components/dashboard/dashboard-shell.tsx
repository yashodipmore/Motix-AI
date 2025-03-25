import type React from "react"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { SakhiChatbot } from "@/components/dashboard/sakhi-chatbot"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="p-4 md:p-8">
        <div className="flex-1 space-y-4">{children}</div>
        <SakhiChatbot />
      </SidebarInset>
    </>
  )
}

