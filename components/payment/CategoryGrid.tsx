import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Category, CategoryId } from "@/hooks/usePaymentFlow"

interface CategoryGridProps {
  categories: Category[]
  selected?: CategoryId | null
  onSelect: (id: CategoryId) => void
}

export default function CategoryGrid({ categories, selected, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((c) => {
        const Icon = c.icon
        const active = selected === c.id
        return (
          <Card key={c.id} className="rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-blue-600" />
                {c.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Amount: {c.price} ETB</p>
              <Button
                className={`w-full transition-transform ${active ? "scale-95 bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
                onClick={() => onSelect(c.id)}
              >
                {active ? "Selected" : "Select"}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
