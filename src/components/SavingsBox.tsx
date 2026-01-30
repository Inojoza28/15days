import { motion } from 'framer-motion';
import { PiggyBank, TrendingUp, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SavingsBoxProps {
  currentPercentage: number;
  suggestedPercentage: number;
  monthlySavings: number;
  onAdjustClick: () => void;
}

export function SavingsBox({
  currentPercentage,
  suggestedPercentage,
  monthlySavings,
  onAdjustClick,
}: SavingsBoxProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const isOptimal = currentPercentage >= suggestedPercentage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl bg-card p-6 shadow-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <PiggyBank className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Caixinha</h3>
            <p className="text-sm text-muted-foreground">Sua reserva mensal</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-bold text-accent">
            {formatCurrency(monthlySavings)}
          </p>
          <p className="text-sm text-muted-foreground">por mês</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Percentual atual</span>
          <span className="font-semibold">{currentPercentage}%</span>
        </div>
        <Progress value={currentPercentage} className="h-3" />
      </div>

      <div
        className={cn(
          'mt-4 flex items-center gap-2 rounded-xl p-3',
          isOptimal ? 'bg-success/10' : 'bg-warning/10'
        )}
      >
        {isOptimal ? (
          <Sparkles className="h-5 w-5 text-success" />
        ) : (
          <TrendingUp className="h-5 w-5 text-warning" />
        )}
        <p className={cn('text-sm', isOptimal ? 'text-success' : 'text-warning')}>
          {isOptimal
            ? 'Excelente! Você está guardando o valor ideal.'
            : `Sugerimos guardar pelo menos ${suggestedPercentage}% do seu salário.`}
        </p>
      </div>

      <Button
        onClick={onAdjustClick}
        variant="outline"
        className="mt-4 w-full rounded-xl"
      >
        Ajustar percentual
      </Button>
    </motion.div>
  );
}
