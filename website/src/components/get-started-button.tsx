"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface GetStartedButtonProps {
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"
}

export default function GetStartedButton({ variant = "default" }: GetStartedButtonProps) {
  return (
    <Link href="/get-started">
      <Button variant={variant} className="h-12 px-6 flex items-center gap-2 group bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300 ease-in-out">
        Get Started
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
  )
}
