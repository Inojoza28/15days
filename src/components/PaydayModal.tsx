import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, PiggyBank, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentDay } from '@/types/finance';

interface PaydayModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentDay: PaymentDay | null;
  savingsAmount: number;
}

export function PaydayModal({ isOpen, onClose, paymentDay, savingsAmount }: PaydayModalProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  if (!paymentDay) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-3xl bg-card p-8 shadow-modal"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', damping: 15 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
              >
                <Sparkles className="h-10 w-10 text-accent" />
              </motion.div>

              <h2 className="font-display text-2xl font-bold">Dia de Pagamento! 🎉</h2>
              <p className="mt-2 text-muted-foreground">{paymentDay.description}</p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Banknote className="h-5 w-5 text-accent" />
                      <span className="text-sm text-muted-foreground">Valor recebido</span>
                    </div>
                    <span className="font-display text-xl font-bold">
                      {formatCurrency(paymentDay.amount)}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-accent/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <PiggyBank className="h-5 w-5 text-accent" />
                      <span className="text-sm text-accent">Para a caixinha</span>
                    </div>
                    <span className="font-display text-xl font-bold text-accent">
                      {formatCurrency(savingsAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Não esqueça de guardar esse valor para suas metas!
              </p>

              <Button onClick={onClose} className="mt-6 w-full rounded-xl gradient-primary text-accent-foreground border-0 hover:opacity-90">
                Entendido!
              </Button>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
