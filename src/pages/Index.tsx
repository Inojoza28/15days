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

  const navigateToConfig = () => {
    window.location.href = '/configurar';
  };

  // Exibe tela de boas-vindas se não houver dados relevantes cadastrados (nome sozinho não conta)
  const isFirstAccess = !data.paymentDays.length && !data.savingsGoals.length && !data.monthlyExpenses;

  if (isFirstAccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50 to-blue-50 px-4">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 text-lg shadow-sm">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 17v.01M9 21h6a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v14a2 2 0 002 2z' />
              </svg>
            </span>
            <span className="text-xs font-semibold text-emerald-700">Privacidade e Segurança</span>
          </div>
          <div className="flex flex-col items-center mb-6">
            <img src="/15days.png" alt="Logo 15days" className="w-24 h-24 mb-2 drop-shadow-md opacity-95 transition-transform duration-500 hover:scale-105" />
            <span className="font-display text-2xl font-extrabold tracking-tight text-primary mt-1 select-none">15days</span>
          </div>
          <span className="mb-4 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wide shadow-sm">Seu próximo passo para o equilíbrio financeiro</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center text-primary">
            Metas claras, vida leve
          </h1>
          <p className="text-muted-foreground text-center max-w-md mb-4 text-base md:text-lg">
            Organize suas metas financeiras de acordo com seu salário, com total privacidade e controle. Tenha uma visão clara dos seus objetivos e do seu progresso.
          </p>
          {/* Espaço reservado para manter o espaçamento visual */}
          <div className="mb-8" />
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 text-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
            style={{ boxShadow: '0 4px 24px 0 rgba(16, 185, 129, 0.10)' }}
            onClick={navigateToConfig}
          >
            <span className="tracking-wide">Começar agora</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

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
          {data.paymentDays.length > 1 && (
            <FinanceCard
              title="Por Quinzena"
              value={formatCurrency(totalMonthlyIncome / 2)}
              subtitle="Média por período"
              icon={CreditCard}
              delay={0.05}
            />
          )}
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
            {data.savingsGoals.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-8 text-muted-foreground">
                <span className="text-3xl mb-2">🎯</span>
                <span className="font-medium">Nenhuma meta cadastrada ainda</span>
                <span className="text-sm mt-1">Adicione uma meta para acompanhar seu progresso!</span>
              </div>
            ) : (
              data.savingsGoals.map((goal, index) => (
                <SavingsGoalCard key={goal.id} goal={goal} index={index} monthlySavings={monthlySavings} />
              ))
            }
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
            {data.paymentDays.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-center py-8 text-muted-foreground">
                <span className="text-2xl mb-2">💸</span>
                <span className="font-medium">Nenhum dia de pagamento cadastrado</span>
                <span className="text-sm mt-1">Adicione um pagamento para começar a organizar!</span>
              </div>
            ) : (
              data.paymentDays.map((payment) => {
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
              })
            )}
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
