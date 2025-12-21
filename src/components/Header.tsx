import { Circle, Menu } from 'lucide-react';
import { Driver } from '@/types/trip';

interface HeaderProps {
  driver: Driver;
  onMenuClick?: () => void;
}

export function Header({ driver, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              St<span className="text-primary">.</span>Surfers
            </h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              South-Side Shuttles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">{driver.name}</p>
            <p className="text-xs text-muted-foreground">{driver.plateNumber}</p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-bold">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <Circle 
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${
                driver.isOnline ? 'text-success fill-success' : 'text-muted-foreground fill-muted-foreground'
              }`} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
