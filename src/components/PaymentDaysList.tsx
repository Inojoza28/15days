import { motion } from 'framer-motion';
import { Calendar, Trash2 } from 'lucide-react';
import { PaymentDay } from '@/types/finance';
import { Button } from '@/components/ui/button';

interface PaymentDaysListProps {
  paymentDays: PaymentDay[];
  onRemove: (id: string) => void;
}

export function PaymentDaysList({ paymentDays, onRemove }: PaymentDaysListProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl bg-card p-6 shadow-card"
    >
      <h3 className="font-display text-lg font-semibold">Dias de Pagamento</h3>
      <p className="text-sm text-muted-foreground">Suas datas de recebimento</p>

      <div className="mt-4 space-y-3">
        {paymentDays.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground text-center">
            <span className="text-2xl mb-2">💸</span>
            <span className="font-medium">Nenhum dia de pagamento cadastrado</span>
            <span className="text-sm mt-1">Adicione um pagamento para começar a organizar!</span>
          </div>
        ) : (
          paymentDays.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between rounded-xl bg-muted/50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Dia {payment.day}</p>
                  <p className="text-sm text-muted-foreground">{payment.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display font-semibold">{formatCurrency(payment.amount)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(payment.id)}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
