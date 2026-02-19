 "use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import CategoryGrid from "@/components/payment/CategoryGrid"
import ContractorGrade from "@/components/payment/ContractorGrade"
import ContractorPayment from "@/components/payment/ContractorPayment"
import SimplePayment from "@/components/payment/SimplePayment"
import PaymentSuccess from "@/components/payment/PaymentSuccess"
import { usePaymentFlow, CATEGORIES, GRADES } from "@/hooks/usePaymentFlow"

export default function PaymentPage() {
  const router = useRouter()
  const {
    state,
    amountDue,
    selectedCategoryObj,
    selectedGradeObj,
    selectCategory,
    setContractorSubStep,
    setGrade,
    setPhone,
    setTerms,
    reset,
  } = usePaymentFlow()

  const [simpleSuccess, setSimpleSuccess] = useState(false)

  const variants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1 },
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div initial="hidden" animate="show" variants={variants} transition={{ duration: 0.2 }}>
          <Card className="rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-600">Telebirr Payment</CardTitle>
              <CardDescription>Select category and complete payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {state.step === "select" && (
                <CategoryGrid
                  categories={CATEGORIES}
                  selected={state.selectedCategory}
                  onSelect={selectCategory}
                />
              )}

              {state.step === "contractor" && state.contractorSubStep === "grade" && (
                <ContractorGrade
                  grades={GRADES}
                  selectedId={state.selectedGradeId}
                  onSelect={setGrade}
                  onContinue={() => setContractorSubStep("payment")}
                />
              )}

              {state.step === "contractor" && state.contractorSubStep === "payment" && (
                <ContractorPayment
                  amount={amountDue}
                  phone={state.phoneNumber}
                  termsAccepted={state.termsAccepted}
                  onPhoneChange={setPhone}
                  onTermsChange={setTerms}
                  onPay={() => setContractorSubStep("success")}
                />
              )}

              {state.step === "contractor" && state.contractorSubStep === "success" && (
                <PaymentSuccess
                  title="Payment Successful"
                  detail={`Selected: ${selectedGradeObj.label} • Amount: ${amountDue} ETB`}
                  onViewDetails={() => alert("Demo: Payment details")}
                  onBack={() => {
                    reset()
                    router.push("/dashboard")
                  }}
                />
              )}

              {state.step === "pay" && !simpleSuccess && selectedCategoryObj && (
                <SimplePayment
                  category={selectedCategoryObj}
                  phone={state.phoneNumber}
                  onPhoneChange={setPhone}
                  onPay={() => setSimpleSuccess(true)}
                />
              )}

              {state.step === "pay" && simpleSuccess && selectedCategoryObj && (
                <PaymentSuccess
                  title="Payment Successful"
                  detail={`Category: ${selectedCategoryObj.label} • Amount: ${selectedCategoryObj.price} ETB`}
                  onViewDetails={() => alert("Demo: Payment details")}
                  onBack={() => {
                    reset()
                    router.push("/dashboard")
                  }}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
