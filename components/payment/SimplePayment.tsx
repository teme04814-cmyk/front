import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Category } from "@/hooks/usePaymentFlow"

interface SimplePaymentProps {
  category: Category
  phone: string
  onPhoneChange: (value: string) => void
  onPay: () => void
}

export default function SimplePayment({
  category,
  phone,
  onPhoneChange,
  onPay,
}: SimplePaymentProps) {
  return (
    <Card className="rounded-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-blue-600">Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-lg font-semibold">{category.label}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Amount Due</p>
            <p className="text-lg font-semibold">{category.price} ETB</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm">Phone Number</p>
          <Input
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+2519XXXXXXXX or 09XXXXXXXX"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            Telebirr
          </span>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onPay}>
          Pay
        </Button>
      </CardContent>
    </Card>
  )
}
