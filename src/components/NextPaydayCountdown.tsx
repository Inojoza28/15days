import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { PaymentDay } from '@/types/finance';

interface NextPaydayCountdownProps {
  paymentDays: PaymentDay[];
}

export function NextPaydayCountdown({ paymentDays }: NextPaydayCountdownProps) {
  if (!paymentDays || paymentDays.length === 0) return null;

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const sortedDays = [...paymentDays].sort((a, b) => a.day - b.day);

  let nextPayment: PaymentDay | null = null;
  let daysUntil = 0;

  const laterThisMonth = sortedDays.find(p => p.day > currentDay);

  if (laterThisMonth) {
    nextPayment = laterThisMonth;
    daysUntil = laterThisMonth.day - currentDay;
  } else {
    nextPayment = sortedDays[0];
    if (nextPayment) {
      const nextMonthDate = new Date(currentYear, currentMonth + 1, nextPayment.day);
      const diffTime = nextMonthDate.getTime() - today.getTime();
      daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  const isPayday = sortedDays.some(p => p.day === currentDay);

  if (!nextPayment) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="flex items-center gap-3 rounded-2xl border-l-4 border-r-4 border-accent bg-green-50/20 px-4 py-3 shadow-card"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
        <Calendar className="h-5 w-5 text-accent" />
      </div>
      
      {isPayday ? (
        <p className="font-medium">
          Hoje é dia de <span className="text-accent font-semibold">pagamento!</span> 🎉
        </p>
      ) : (
        <p className="text-sm">
          <span className="font-display text-lg font-bold">{daysUntil}</span>
          <span className="text-muted-foreground"> {daysUntil === 1 ? 'dia' : 'dias'} pro dia </span>
          <span className="font-semibold">{nextPayment.day}</span>
        </p>
      )}
    </motion.div>
  );
}
