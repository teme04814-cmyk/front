import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Grade } from "@/hooks/usePaymentFlow"

interface ContractorGradeProps {
  grades: Grade[]
  selectedId: number
  onSelect: (id: number) => void
  onContinue: () => void
}

export default function ContractorGrade({
  grades,
  selectedId,
  onSelect,
  onContinue,
}: ContractorGradeProps) {
  return (
    <Card className="rounded-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-blue-600">Select Contractor Grade</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {grades.map((g) => {
            const active = selectedId === g.id
            return (
              <Button
                key={g.id}
                className={`transition-transform ${active ? "scale-95 bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
                onClick={() => onSelect(g.id)}
              >
                {g.label}
              </Button>
            )
          })}
        </div>
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onContinue}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
