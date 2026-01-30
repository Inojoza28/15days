import { motion } from 'framer-motion';
import { Plane, Shield, Home, Car, GraduationCap, Gift, Target, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { SavingsGoal } from '@/types/finance';
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
}

export function SavingsGoalCard({ goal, index, monthlySavings }: SavingsGoalCardProps) {
  const Icon = iconMap[goal.icon] || Target;
  const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  const remaining = goal.targetAmount - goal.currentAmount;
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : Infinity;
  
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

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
      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{getMonthsLabel()}</span>
      </div>
    </motion.div>
  );
}
