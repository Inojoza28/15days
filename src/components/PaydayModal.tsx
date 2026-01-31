import React from 'react';
import { Dialog } from './ui/dialog';

interface PaydayModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentDay?: { id: string; day: number; amount: number };
  savingsAmount?: number;
}

export const PaydayModal: React.FC<PaydayModalProps> = ({ isOpen, onClose, paymentDay, savingsAmount }) => {
  if (!isOpen || !paymentDay) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg flex flex-col items-center">
        <div className="text-4xl mb-2">💸</div>
        <h2 className="font-bold text-xl mb-2 text-center">Dia de pagamento!</h2>
        <p className="text-center mb-4">
          Você recebeu <span className="font-semibold">R$ {paymentDay.amount.toFixed(2)}</span> no dia <span className="font-semibold">{paymentDay.day}</span>.
        </p>
        {savingsAmount !== undefined && (
          <div className="mb-4 text-center">
            <span className="block text-sm text-muted-foreground mb-1">Sugestão para guardar:</span>
            <span className="font-semibold text-green-600 text-lg">R$ {savingsAmount.toFixed(2)}</span>
          </div>
        )}
        <button
          className="mt-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow hover:bg-primary/90 transition"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </Dialog>
  );
};
