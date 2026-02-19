import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface ContractorPaymentProps {
  amount: number
  phone: string
  termsAccepted: boolean
  onPhoneChange: (value: string) => void
  onTermsChange: (value: boolean) => void
  onPay: () => void
}

export default function ContractorPayment({
  amount,
  phone,
  termsAccepted,
  onPhoneChange,
  onTermsChange,
  onPay,
}: ContractorPaymentProps) {
  return (
    <Card className="rounded-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-blue-600">Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Payment Type</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                <span className="h-3 w-3 rounded-full bg-blue-600" />
                Telebirr
              </span>
              <span className="text-xs text-muted-foreground">(locked)</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Amount Due</p>
            <p className="text-lg font-semibold">{amount} ETB</p>
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
          <Checkbox checked={termsAccepted} onCheckedChange={(v) => onTermsChange(Boolean(v))} />
          <span className="text-sm">I agree to terms</span>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={onPay}
          disabled={!termsAccepted}
        >
          Pay
        </Button>
      </CardContent>
    </Card>
  )
}
