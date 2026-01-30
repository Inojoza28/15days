import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, CreditCard, PiggyBank, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinanceCard } from '@/components/ui/finance-card';
import { SavingsBox } from '@/components/SavingsBox';
import { SavingsGoalCard } from '@/components/SavingsGoalCard';
import { PaydayModal } from '@/components/PaydayModal';
import { SavingsAdjustModal } from '@/components/SavingsAdjustModal';
import { SavingsPerPayday } from '@/components/SavingsPerPayday';
import { NextPaydayCountdown } from '@/components/NextPaydayCountdown';
import { useFinancialData } from '@/hooks/useFinancialData';

const Index = () => {
  const {
    data,
    totalMonthlyIncome,
    totalSavingsPerPayment,
    monthlySavings,
    availableAfterSavings,
    updateSavingsPercentage,
  } = useFinancialData();

  const [showPaydayModal, setShowPaydayModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [activePaymentDay, setActivePaymentDay] = useState(data.paymentDays[0]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  // Check for unseen payment notifications
  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Find payments that already happened this month but weren't seen
    const unseenPayment = data.paymentDays.find((payment) => {
      // Only check payments that already happened (day <= today)
      if (payment.day > currentDay) return false;
      
      // Check if this payment was already seen this month
      const seenKey = `payday-seen-${currentYear}-${currentMonth}-${payment.day}`;
      return !localStorage.getItem(seenKey);
    });

    if (unseenPayment) {
      setActivePaymentDay(unseenPayment);
      setShowPaydayModal(true);
    }
  }, [data.paymentDays]);

  const handleClosePaydayModal = () => {
    // Mark this payment as seen for this month
    if (activePaymentDay) {
      const today = new Date();
      const seenKey = `payday-seen-${today.getFullYear()}-${today.getMonth()}-${activePaymentDay.day}`;
      localStorage.setItem(seenKey, 'true');
    }
    setShowPaydayModal(false);
  };

  const handleSimulatePayday = () => {
    setActivePaymentDay(data.paymentDays[0]);
    setShowPaydayModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Olá{data.userName ? `, ${data.userName}` : ''}! 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            Aqui está seu resumo financeiro do mês
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FinanceCard
            title="Renda Mensal"
            value={formatCurrency(totalMonthlyIncome)}
            subtitle={`${data.paymentDays.length} pagamentos por mês`}
            icon={Wallet}
            variant="accent"
            delay={0}
          />
          <FinanceCard
            title="Por Quinzena"
            value={formatCurrency(totalMonthlyIncome / 2)}
            subtitle="Média por período"
            icon={CreditCard}
            delay={0.05}
          />
          <FinanceCard
            title="Guardando"
            value={formatCurrency(monthlySavings)}
            subtitle={`${data.savingsPercentage}% do total • valor fixo mensal`}
            icon={PiggyBank}
            delay={0.1}
          />
          <FinanceCard
            title="Disponível"
            value={formatCurrency(availableAfterSavings)}
            subtitle="Após despesas e reservas"
            icon={TrendingUp}
            trend={availableAfterSavings > 0 ? 'up' : 'down'}
            delay={0.15}
          />
        </div>

        {/* Countdown */}
        <div className="mt-8">
          <NextPaydayCountdown paymentDays={data.paymentDays} />
        </div>

        {/* Savings Section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SavingsPerPayday
            paymentDays={data.paymentDays}
            savingsPercentage={data.savingsPercentage}
          />
          <div className="space-y-6">
            <SavingsBox
              currentPercentage={data.savingsPercentage}
              suggestedPercentage={15}
              monthlySavings={monthlySavings}
              onAdjustClick={() => setShowSavingsModal(true)}
            />
          </div>
        </div>

        {/* Goals Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="font-display text-lg font-semibold">Suas Metas</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.savingsGoals.map((goal, index) => (
              <SavingsGoalCard key={goal.id} goal={goal} index={index} monthlySavings={monthlySavings} />
            ))}
          </div>

          {/* Simulate payday button */}
          <motion.button
            onClick={handleSimulatePayday}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full rounded-2xl border-2 border-dashed border-border p-4 text-center text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            🔔 Simular notificação de pagamento
          </motion.button>
        </div>

        {/* Payment Days Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl bg-card p-6 shadow-card"
        >
          <h3 className="font-display text-lg font-semibold">Próximos Recebimentos</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {data.paymentDays.map((payment) => {
              const today = new Date().getDate();
              const isUpcoming = payment.day >= today;
              
              return (
                <div
                  key={payment.id}
                  className={`rounded-xl px-4 py-2 ${
                    isUpcoming
                      ? 'bg-accent/10 text-accent'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <span className="font-semibold">Dia {payment.day}</span>
                  <span className="ml-2 text-sm">
                    {formatCurrency(payment.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>

      <Footer />

      {/* Modals */}
      <PaydayModal
        isOpen={showPaydayModal}
        onClose={handleClosePaydayModal}
        paymentDay={activePaymentDay}
        savingsAmount={totalSavingsPerPayment(activePaymentDay?.amount || 0)}
      />

      <SavingsAdjustModal
        isOpen={showSavingsModal}
        onClose={() => setShowSavingsModal(false)}
        currentPercentage={data.savingsPercentage}
        onSave={updateSavingsPercentage}
        monthlyIncome={totalMonthlyIncome}
      />
    </div>
  );
};

export default Index;
