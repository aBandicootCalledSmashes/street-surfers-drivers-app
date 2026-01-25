import { Shield, Phone, AlertTriangle, ExternalLink } from 'lucide-react';
import { SOSButton } from '@/components/SOSButton';
import { Profile } from '@/hooks/useProfile';

interface SafetySectionProps {
  profile: Profile;
  tripId: string | null;
}

export function SafetySection({ profile, tripId }: SafetySectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Shield className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Safety</h3>
      </div>
      
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        {/* SOS Button */}
        <SOSButton 
          driverId={profile.id}
          tripId={tripId}
          vehicleId={null}
        />
        
        {/* Emergency Contact */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Emergency Contact</p>
          <a 
            href={`tel:${profile.dispatcher_phone || '+27123456789'}`}
            className="flex items-center gap-2 text-primary font-medium"
          >
            <Phone className="w-4 h-4" />
            {profile.dispatcher_phone || '+27 12 345 6789'}
          </a>
        </div>
        
        {/* Safety Rules Link */}
        <a 
          href="#safety-rules"
          className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Safety Rules & Guidelines</span>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
      </div>
    </section>
  );
}
