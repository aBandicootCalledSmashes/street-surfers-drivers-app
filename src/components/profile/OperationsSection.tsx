import { Building, Phone } from 'lucide-react';
import { Profile } from '@/hooks/useProfile';

interface OperationsSectionProps {
  profile: Profile;
}

export function OperationsSection({ profile }: OperationsSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Building className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Operations</h3>
      </div>
      
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        <div className="p-4">
          <p className="text-xs text-muted-foreground">Dispatcher</p>
          <p className="font-medium">{profile.dispatcher_name || 'Street Surfers Operations'}</p>
        </div>
        
        <div className="p-4">
          <a 
            href={`tel:${profile.dispatcher_phone || '+27123456789'}`}
            className="flex items-center justify-center gap-2 w-full p-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors active:scale-95"
          >
            <Phone className="w-5 h-5" />
            Contact Operations
          </a>
        </div>
      </div>
    </section>
  );
}
