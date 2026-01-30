import { motion } from 'framer-motion';
import { Calendar, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
            <Calendar className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="font-display text-xl font-bold">15days</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'rounded-xl',
                location.pathname === '/' && 'bg-muted'
              )}
            >
              Dashboard
            </Button>
          </Link>
          <Link to="/configurar">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'rounded-xl',
                location.pathname === '/configurar' && 'bg-muted'
              )}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurar
            </Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
