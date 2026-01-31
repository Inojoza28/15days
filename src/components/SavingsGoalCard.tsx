import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Shield, Home, Car, GraduationCap, Gift, Target, Clock, Plus, DollarSign } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SavingsGoal, PaymentDay } from '@/types/finance';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  plane: Plane,
  shield: Shield,
  home: Home,
  car: Car,
  graduation: GraduationCap,
  gift: Gift,
  target: Target,
};

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  index: number;
  monthlySavings: number;
  paymentDays: PaymentDay[];
  onAddToGoal: (goalId: string, amount: number) => void;
}

export function SavingsGoalCard({ goal, index, monthlySavings, paymentDays, onAddToGoal }: SavingsGoalCardProps) {
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const Icon = iconMap[goal.icon] || Target;
  const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  const remaining = goal.targetAmount - goal.currentAmount;
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : Infinity;
  
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  // Find the most recent payment day that has passed
  const today = new Date().getDate();
  const recentPaymentDay = paymentDays
    .filter(payment => payment.day <= today)
    .sort((a, b) => b.day - a.day)[0]; // Get the latest one

  const savingsAmount = recentPaymentDay ? (recentPaymentDay.amount * 15) / 100 : 0; // 15% savings

  const handleSaveSuggested = () => {
    if (savingsAmount > 0) {
      onAddToGoal(goal.id, savingsAmount);
    }
  };

  const handleSaveCustom = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0) {
      onAddToGoal(goal.id, amount);
      setCustomAmount('');
      setShowCustomDialog(false);
    }
  };

  const getMonthsLabel = () => {
    if (percentage >= 100) return 'Meta alcançada! 🎉';
    if (monthsToGoal === Infinity) return 'Configure sua caixinha';
    if (monthsToGoal === 1) return '1 mês restante';
    return `${monthsToGoal} meses restantes`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      className="rounded-2xl bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            goal.color === 'accent' && 'bg-accent/10',
            goal.color === 'warning' && 'bg-warning/10',
            goal.color === 'primary' && 'bg-primary/10'
          )}
        >
          <Icon
            className={cn(
              'h-5 w-5',
              goal.color === 'accent' && 'text-accent',
              goal.color === 'warning' && 'text-warning',
              goal.color === 'primary' && 'text-primary'
            )}
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{goal.name}</h4>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}
          </p>
        </div>
        <span className="font-display text-lg font-bold text-accent">{percentage}%</span>
      </div>
      <Progress value={percentage} className="mt-4 h-2" />

      {/* Savings Buttons */}
      {savingsAmount > 0 && percentage < 100 && (
        <div className="mt-4 flex gap-2">
          <Button
            onClick={handleSaveSuggested}
            size="sm"
            className="flex-1 rounded-xl gradient-primary text-accent-foreground border-0 hover:opacity-90"
          >
            Guardei {formatCurrency(savingsAmount)}
          </Button>
          <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-xl">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md mx-auto rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-center">Adicionar valor personalizado</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-amount" className="text-sm font-medium">
                    Valor a adicionar
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="mt-1 h-12 text-base"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                  <Button
                    onClick={() => setShowCustomDialog(false)}
                    variant="outline"
                    className="flex-1 h-12 text-base font-medium"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveCustom}
                    className="flex-1 h-12 text-base font-medium gradient-primary text-accent-foreground border-0 hover:opacity-90"
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{getMonthsLabel()}</span>
      </div>
    </motion.div>
  );
}
