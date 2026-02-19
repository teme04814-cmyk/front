import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface PaymentSuccessProps {
  title: string
  detail: string
  onViewDetails: () => void
  onBack: () => void
}

export default function PaymentSuccess({
  title,
  detail,
  onViewDetails,
  onBack,
}: PaymentSuccessProps) {
  return (
    <Card className="rounded-2xl shadow-xl text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-blue-600">
          <CheckCircle className="h-6 w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{detail}</p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" onClick={onViewDetails}>
            View Payment Details
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onBack}>
            Back to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
