export interface PaymentDay {
  id: string;
  day: number;
  amount: number;
  description?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
}

export interface FinancialData {
  paymentDays: PaymentDay[];
  savingsPercentage: number;
  savingsGoals: SavingsGoal[];
  monthlyExpenses: number;
  userName: string;
  numbersVisible: boolean;
}

export interface PaydayNotification {
  paymentDay: PaymentDay;
  savingsAmount: number;
  isOpen: boolean;
}
