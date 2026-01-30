import { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Target, Plus, Trash2, User } from 'lucide-react';
import { Header } from '@/components/Header';
import { PaymentDaysList } from '@/components/PaymentDaysList';
import { AddPaymentForm } from '@/components/AddPaymentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFinancialData } from '@/hooks/useFinancialData';

const GOAL_ICONS = [
  { value: 'plane', label: '✈️ Viagem' },
  { value: 'shield', label: '🛡️ Reserva' },
  { value: 'home', label: '🏠 Casa' },
  { value: 'car', label: '🚗 Carro' },
  { value: 'graduation', label: '🎓 Estudos' },
  { value: 'gift', label: '🎁 Presente' },
  { value: 'target', label: '🎯 Outro' },
];

const GOAL_COLORS = [
  { value: 'accent', label: 'Verde' },
  { value: 'warning', label: 'Amarelo' },
  { value: 'primary', label: 'Azul' },
];

const Configurar = () => {
  const {
    data,
    addPaymentDay,
    removePaymentDay,
    updateMonthlyExpenses,
    addSavingsGoal,
    removeSavingsGoal,
    updateUserName,
  } = useFinancialData();

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalIcon, setGoalIcon] = useState('target');
  const [goalColor, setGoalColor] = useState('accent');
  const [expenses, setExpenses] = useState(data.monthlyExpenses.toString());
  const [userName, setUserName] = useState(data.userName);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName || !goalTarget) return;

    addSavingsGoal({
      name: goalName,
      targetAmount: parseFloat(goalTarget),
      currentAmount: 0,
      icon: goalIcon,
      color: goalColor,
    });

    setGoalName('');
    setGoalTarget('');
    setGoalIcon('target');
    setGoalColor('accent');
    setShowGoalForm(false);
  };

  const handleExpensesBlur = () => {
    const value = parseFloat(expenses) || 0;
    updateMonthlyExpenses(value);
  };

  const handleUserNameBlur = () => {
    updateUserName(userName);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold">Configurações</h1>
          <p className="mt-2 text-muted-foreground">
            Configure seus dados financeiros
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Payment Days */}
          <div className="space-y-6">
            {/* User Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-card p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    Seu Nome
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Personalize sua experiência
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="userName">Nome</Label>
                <Input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={handleUserNameBlur}
                  className="mt-2 rounded-xl"
                  placeholder="Ex: João"
                />
              </div>
            </motion.div>

            <PaymentDaysList
              paymentDays={data.paymentDays}
              onRemove={removePaymentDay}
            />
            <AddPaymentForm onAdd={addPaymentDay} />

            {/* Monthly Expenses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-card p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
                  <Receipt className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    Despesas Mensais
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Total de gastos fixos por mês
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="expenses">Valor total</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  onBlur={handleExpensesBlur}
                  className="mt-2 rounded-xl"
                  placeholder="Ex: 3200.00"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Goals */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-card p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      Metas de Economia
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Seus objetivos financeiros
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {data.savingsGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between rounded-xl bg-muted/50 p-4"
                  >
                    <div>
                      <p className="font-medium">{goal.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Meta: {formatCurrency(goal.targetAmount)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSavingsGoal(goal.id)}
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              {!showGoalForm ? (
                <Button
                  variant="outline"
                  onClick={() => setShowGoalForm(true)}
                  className="mt-4 w-full rounded-xl border-dashed"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar meta
                </Button>
              ) : (
                <form onSubmit={handleAddGoal} className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalName">Nome da meta</Label>
                    <Input
                      id="goalName"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      placeholder="Ex: Viagem para Europa"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goalTarget">Valor alvo</Label>
                    <Input
                      id="goalTarget"
                      type="number"
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(e.target.value)}
                      placeholder="Ex: 10000.00"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ícone</Label>
                      <Select value={goalIcon} onValueChange={setGoalIcon}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GOAL_ICONS.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              {icon.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Cor</Label>
                      <Select value={goalColor} onValueChange={setGoalColor}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GOAL_COLORS.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              {color.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowGoalForm(false)}
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Configurar;
