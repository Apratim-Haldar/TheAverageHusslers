import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
}

export default function TestimonialCard({ quote, author, position }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-primary/30 mb-4" />
        <p className="text-gray-700 mb-6 italic">"{quote}"</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-gray-500 text-sm">{position}</p>
        </div>
      </CardContent>
    </Card>
  )
}
