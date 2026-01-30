import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SavingsAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPercentage: number;
  onSave: (percentage: number) => void;
  monthlyIncome: number;
}

export function SavingsAdjustModal({
  isOpen,
  onClose,
  currentPercentage,
  onSave,
  monthlyIncome,
}: SavingsAdjustModalProps) {
  const [percentage, setPercentage] = useState(currentPercentage);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const savingsAmount = (monthlyIncome * percentage) / 100;

  const getRecommendation = () => {
    if (percentage < 10) return { text: 'Mínimo recomendado: 10%', color: 'text-destructive' };
    if (percentage < 15) return { text: 'Bom começo!', color: 'text-warning' };
    if (percentage < 20) return { text: 'Excelente escolha!', color: 'text-success' };
    return { text: 'Você é um poupador nato!', color: 'text-accent' };
  };

  const recommendation = getRecommendation();

  const handleSave = () => {
    onSave(percentage);
    onClose();
  };

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
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>

              <h2 className="font-display text-2xl font-bold">Ajustar Caixinha</h2>
              <p className="mt-2 text-muted-foreground">
                Defina quanto do seu salário será guardado
              </p>

              <div className="mt-8">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <span className="font-display text-5xl font-bold text-accent">{percentage}%</span>
                </div>

                <Slider
                  value={[percentage]}
                  onValueChange={([value]) => setPercentage(value)}
                  min={0}
                  max={50}
                  step={1}
                  className="my-6"
                />

                <div className="flex items-center justify-center gap-2">
                  <Sparkles className={`h-4 w-4 ${recommendation.color}`} />
                  <span className={`text-sm font-medium ${recommendation.color}`}>
                    {recommendation.text}
                  </span>
                </div>

                <div className="mt-6 rounded-2xl bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Você vai guardar</p>
                  <p className="font-display text-2xl font-bold">{formatCurrency(savingsAmount)}</p>
                  <p className="text-sm text-muted-foreground">por mês</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl">
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="flex-1 rounded-xl gradient-primary text-accent-foreground border-0 hover:opacity-90">
                  Salvar
                </Button>
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
