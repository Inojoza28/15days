import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinanceCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'accent' | 'muted';
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  delay?: number;
  numbersVisible?: boolean;
  onToggleVisibility?: () => void;
}

export function FinanceCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  trend,
  className,
  delay = 0,
  numbersVisible = true,
  onToggleVisibility,
}: FinanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 shadow-card transition-all duration-300 hover:shadow-card-hover',
        variant === 'default' && 'bg-card',
        variant === 'accent' && 'gradient-primary text-accent-foreground',
        variant === 'muted' && 'bg-muted',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <p
            className={cn(
              'text-sm font-medium',
              variant === 'accent' ? 'text-accent-foreground/80' : 'text-muted-foreground'
            )}
          >
            {title}
          </p>
          <div className="flex items-center gap-2">
            <p
              className={cn(
                'font-display text-2xl font-bold tracking-tight transition-all duration-300',
                variant === 'accent' ? 'text-accent-foreground' : 'text-foreground',
                !numbersVisible && 'blur-sm select-none'
              )}
            >
              {numbersVisible ? value : '••••••••'}
            </p>
            {onToggleVisibility && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleVisibility}
                className={cn(
                  'h-6 w-6 rounded-md opacity-60 hover:opacity-100 transition-all duration-200',
                  variant === 'accent'
                    ? 'hover:bg-accent-foreground/10'
                    : 'hover:bg-accent/20'
                )}
              >
                {numbersVisible ? (
                  <Eye className="h-3 w-3" />
                ) : (
                  <EyeOff className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>
          {subtitle && (
            <p
              className={cn(
                'text-xs transition-all duration-300',
                variant === 'accent' ? 'text-accent-foreground/70' : 'text-muted-foreground',
                !numbersVisible && 'blur-sm select-none'
              )}
            >
              {numbersVisible ? subtitle : '••••••••••••••'}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl',
              variant === 'accent'
                ? 'bg-accent-foreground/20'
                : 'bg-accent/10'
            )}
          >
            <Icon
              className={cn(
                'h-6 w-6',
                variant === 'accent' ? 'text-accent-foreground' : 'text-accent'
              )}
            />
          </div>
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span
            className={cn(
              'text-xs font-medium',
              trend === 'up' && 'text-success',
              trend === 'down' && 'text-destructive',
              trend === 'neutral' && 'text-muted-foreground'
            )}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
          <span
            className={cn(
              'text-xs',
              variant === 'accent' ? 'text-accent-foreground/70' : 'text-muted-foreground'
            )}
          >
            em relação ao mês anterior
          </span>
        </div>
      )}
    </motion.div>
  );
}
