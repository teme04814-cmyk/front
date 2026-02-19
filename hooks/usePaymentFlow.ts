import { useCallback, useMemo, useReducer } from "react"
import type { ElementType } from "react"
import { HardHat, Briefcase, Ship, Handshake, Car, Bot } from "lucide-react"

export type Step = "select" | "pay" | "contractor"
export type ContractorSubStep = "grade" | "payment" | "success"

export type CategoryId =
  | "contractor"
  | "professional"
  | "import-export"
  | "partnership"
  | "vehicle"
  | "assistant"

export interface Category {
  id: CategoryId
  label: string
  icon: ElementType
  price: number
}

export interface Grade {
  id: number
  label: string
  price: number
}

export interface PaymentState {
  step: Step
  contractorSubStep: ContractorSubStep
  selectedCategory: CategoryId | null
  selectedGradeId: number
  phoneNumber: string
  termsAccepted: boolean
}

type Action =
  | { type: "SELECT_CATEGORY"; category: CategoryId }
  | { type: "SET_CONTRACTOR_SUBSTEP"; sub: ContractorSubStep }
  | { type: "SET_GRADE"; id: number }
  | { type: "SET_PHONE"; phone: string }
  | { type: "SET_TERMS"; value: boolean }
  | { type: "RESET" }

const initialState: PaymentState = {
  step: "select",
  contractorSubStep: "grade",
  selectedCategory: null,
  selectedGradeId: 1,
  phoneNumber: "09XAXXXX",
  termsAccepted: true,
}

function reducer(state: PaymentState, action: Action): PaymentState {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.category,
        step: action.category === "contractor" ? "contractor" : "pay",
        contractorSubStep: "grade",
      }
    case "SET_CONTRACTOR_SUBSTEP":
      return { ...state, contractorSubStep: action.sub }
    case "SET_GRADE":
      return { ...state, selectedGradeId: action.id }
    case "SET_PHONE":
      return { ...state, phoneNumber: action.phone }
    case "SET_TERMS":
      return { ...state, termsAccepted: action.value }
    case "RESET":
      return { ...initialState }
    default:
      return state
  }
}

export const CATEGORIES: Category[] = [
  { id: "contractor", label: "Contractor", icon: HardHat, price: 500 },
  { id: "professional", label: "Professional", icon: Briefcase, price: 900 },
  { id: "import-export", label: "Import/Export", icon: Ship, price: 1200 },
  { id: "partnership", label: "Partnership", icon: Handshake, price: 600 },
  { id: "vehicle", label: "Vehicle", icon: Car, price: 700 },
  { id: "assistant", label: "Assistant", icon: Bot, price: 800 },
]

export const GRADES: Grade[] = [
  { id: 1, label: "Grade 1", price: 500 },
  { id: 2, label: "Grade 2", price: 900 },
  { id: 3, label: "Grade 3", price: 1200 },
]

export function usePaymentFlow() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const selectedCategoryObj = useMemo(
    () => CATEGORIES.find((c) => c.id === state.selectedCategory) || null,
    [state.selectedCategory],
  )

  const selectedGradeObj = useMemo(
    () => GRADES.find((g) => g.id === state.selectedGradeId) || GRADES[0],
    [state.selectedGradeId],
  )

  const amountDue = useMemo(() => {
    if (state.step === "contractor") {
      return selectedGradeObj.price
    }
    return selectedCategoryObj?.price ?? 0
  }, [state.step, selectedCategoryObj, selectedGradeObj])

  const selectCategory = useCallback((category: CategoryId) => {
    dispatch({ type: "SELECT_CATEGORY", category })
  }, [])

  const setContractorSubStep = useCallback((sub: ContractorSubStep) => {
    dispatch({ type: "SET_CONTRACTOR_SUBSTEP", sub })
  }, [])

  const setGrade = useCallback((id: number) => {
    dispatch({ type: "SET_GRADE", id })
  }, [])

  const setPhone = useCallback((phone: string) => {
    dispatch({ type: "SET_PHONE", phone })
  }, [])

  const setTerms = useCallback((value: boolean) => {
    dispatch({ type: "SET_TERMS", value })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: "RESET" })
  }, [])

  return {
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
  }
}
