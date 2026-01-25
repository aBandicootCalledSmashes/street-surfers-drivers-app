import { Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface NotificationsSectionProps {
  // For now these are just UI - no persistence
}

export function NotificationsSection({}: NotificationsSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Bell className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Notifications</h3>
      </div>
      
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        <div className="p-4 flex items-center justify-between">
          <Label htmlFor="notify-trip" className="cursor-pointer">Trip Assigned</Label>
          <Switch id="notify-trip" defaultChecked />
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <Label htmlFor="notify-pickup" className="cursor-pointer">Pickup Reminder</Label>
          <Switch id="notify-pickup" defaultChecked />
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <Label htmlFor="notify-sos" className="cursor-pointer">SOS Alerts</Label>
          <Switch id="notify-sos" defaultChecked disabled />
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <Label htmlFor="notify-admin" className="cursor-pointer">Admin Messages</Label>
          <Switch id="notify-admin" defaultChecked />
        </div>
      </div>
    </section>
  );
}
