import Link from "next/link"
import { redirect } from "next/navigation"

export default function Home() {
  redirect("/dashboard")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold">Induction Motor Fault Diagnosis System</h1>
      <p className="mt-4 text-xl">Real-time monitoring and ML-based fault detection</p>
      <Link
        href="/dashboard"
        className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}

