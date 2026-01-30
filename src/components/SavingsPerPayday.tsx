import { motion } from 'framer-motion';
import { PiggyBank } from 'lucide-react';
import { PaymentDay } from '@/types/finance';

interface SavingsPerPaydayProps {
  paymentDays: PaymentDay[];
  savingsPercentage: number;
}

export function SavingsPerPayday({ paymentDays, savingsPercentage }: SavingsPerPaydayProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
          <PiggyBank className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-display font-semibold">Guardar por Quinzena</h3>
          <p className="text-xs text-muted-foreground">Separe esse valor de cada pagamento</p>
        </div>
      </div>

      <div className="space-y-2">
        {paymentDays.map((payment, index) => {
          const savingsAmount = (payment.amount * savingsPercentage) / 100;
          
          return (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-semibold text-accent">
                  {payment.day}
                </span>
                <div>
                  <p className="text-sm font-medium">{payment.description || `Dia ${payment.day}`}</p>
                  <p className="text-xs text-muted-foreground">Recebe {formatCurrency(payment.amount)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-bold text-accent">
                  {formatCurrency(savingsAmount)}
                </p>
                <p className="text-xs text-muted-foreground">guardar</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
