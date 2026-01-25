import { useState } from 'react';
import { User, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Profile } from '@/hooks/useProfile';

interface PersonalInfoSectionProps {
  profile: Profile;
  onUpdatePhone: (phone: string) => Promise<{ error: unknown }>;
}

export function PersonalInfoSection({ profile, onUpdatePhone }: PersonalInfoSectionProps) {
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePhone = async () => {
    if (!newPhone.trim()) return;
    setIsSaving(true);
    await onUpdatePhone(newPhone);
    setIsEditingPhone(false);
    setNewPhone('');
    setIsSaving(false);
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <User className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Personal Information</h3>
      </div>
      
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        <div className="p-4">
          <Label className="text-xs text-muted-foreground">Full Name</Label>
          <p className="font-medium">{profile.name}</p>
        </div>
        
        <div className="p-4">
          <Label className="text-xs text-muted-foreground">Driver ID</Label>
          <p className="font-medium font-mono">{profile.driver_code || '—'}</p>
        </div>
        
        <div className="p-4">
          <Label className="text-xs text-muted-foreground">Email</Label>
          <p className="font-medium">{profile.email || '—'}</p>
        </div>
        
        {/* Editable Phone */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <Label className="text-xs text-muted-foreground">Phone Number</Label>
            {!isEditingPhone && (
              <button 
                onClick={() => {
                  setNewPhone(profile.phone || '');
                  setIsEditingPhone(true);
                }}
                className="text-xs text-primary font-medium"
              >
                Edit
              </button>
            )}
          </div>
          {isEditingPhone ? (
            <div className="flex gap-2">
              <Input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Enter phone number"
                className="flex-1"
              />
              <Button size="sm" onClick={handleSavePhone} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditingPhone(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <p className="font-medium">{profile.phone || '—'}</p>
          )}
        </div>
        
        <div className="p-4">
          <Label className="text-xs text-muted-foreground">License Number</Label>
          <p className="font-medium">{profile.license_number || '—'}</p>
        </div>

        <div className="p-4">
          <Label className="text-xs text-muted-foreground">Assigned Depot / Region</Label>
          <p className="font-medium">{profile.assigned_depot || '—'}</p>
        </div>
      </div>
    </section>
  );
}
