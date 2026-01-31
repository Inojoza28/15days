import { useState, useEffect, useCallback } from 'react';
import { FinancialData, PaymentDay, SavingsGoal } from '@/types/finance';

const DEFAULT_DATA: FinancialData = {
  paymentDays: [],
  savingsPercentage: 15,
  savingsGoals: [],
  monthlyExpenses: 0,
  userName: '',
};

export function useFinancialData() {
  const [data, setData] = useState<FinancialData>(() => {
    const saved = localStorage.getItem('15days-financial-data');
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });

  useEffect(() => {
    localStorage.setItem('15days-financial-data', JSON.stringify(data));
  }, [data]);

  const totalMonthlyIncome = data.paymentDays.reduce((sum, p) => sum + p.amount, 0);
  const totalSavingsPerPayment = (amount: number) => (amount * data.savingsPercentage) / 100;
  const monthlySavings = (totalMonthlyIncome * data.savingsPercentage) / 100;
  const availableAfterSavings = totalMonthlyIncome - monthlySavings - data.monthlyExpenses;

  const updatePaymentDay = useCallback((id: string, updates: Partial<PaymentDay>) => {
    setData((prev) => ({
      ...prev,
      paymentDays: prev.paymentDays.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const addPaymentDay = useCallback((paymentDay: Omit<PaymentDay, 'id'>) => {
    setData((prev) => ({
      ...prev,
      paymentDays: [
        ...prev.paymentDays,
        { ...paymentDay, id: Date.now().toString() },
      ],
    }));
  }, []);

  const removePaymentDay = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      paymentDays: prev.paymentDays.filter((p) => p.id !== id),
    }));
  }, []);

  const updateSavingsPercentage = useCallback((percentage: number) => {
    setData((prev) => ({ ...prev, savingsPercentage: percentage }));
  }, []);

  const updateMonthlyExpenses = useCallback((amount: number) => {
    setData((prev) => ({ ...prev, monthlyExpenses: amount }));
  }, []);

  const addToGoal = useCallback((goalId: string, amount: number) => {
    setData((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.map((g) =>
        g.id === goalId
          ? { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount) }
          : g
      ),
    }));
  }, []);

  const addSavingsGoal = useCallback((goal: Omit<SavingsGoal, 'id'>) => {
    setData((prev) => ({
      ...prev,
      savingsGoals: [...prev.savingsGoals, { ...goal, id: Date.now().toString() }],
    }));
  }, []);

  const removeSavingsGoal = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.filter((g) => g.id !== id),
    }));
  }, []);

  const updateUserName = useCallback((name: string) => {
    setData((prev) => ({ ...prev, userName: name }));
  }, []);

  return {
    data,
    totalMonthlyIncome,
    totalSavingsPerPayment,
    monthlySavings,
    availableAfterSavings,
    updatePaymentDay,
    addPaymentDay,
    removePaymentDay,
    updateSavingsPercentage,
    updateMonthlyExpenses,
    addToGoal,
    addSavingsGoal,
    removeSavingsGoal,
    updateUserName,
  };
}
