import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
