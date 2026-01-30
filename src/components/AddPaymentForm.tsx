import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddPaymentFormProps {
  onAdd: (payment: { day: number; amount: number; description: string }) => void;
}

export function AddPaymentForm({ onAdd }: AddPaymentFormProps) {
  const [day, setDay] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || !amount) return;
    
    onAdd({
      day: parseInt(day),
      amount: parseFloat(amount),
      description: description || `Pagamento dia ${day}`,
    });

    setDay('');
    setAmount('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-2xl bg-card p-6 shadow-card"
    >
      {!isExpanded ? (
        <Button
          variant="outline"
          onClick={() => setIsExpanded(true)}
          className="w-full rounded-xl border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar dia de pagamento
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="day" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Dia do mês
              </Label>
              <Input
                id="day"
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="Ex: 5"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Valor
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ex: 2500.00"
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Descrição (opcional)
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Primeira quinzena"
              className="rounded-xl"
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(false)}
              className="flex-1 rounded-xl"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 rounded-xl gradient-primary text-accent-foreground border-0 hover:opacity-90">
              Adicionar
            </Button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
