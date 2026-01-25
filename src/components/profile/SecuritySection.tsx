import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SecuritySectionProps {
  onUpdatePassword: (password: string) => Promise<{ error: unknown }>;
}

export function SecuritySection({ onUpdatePassword }: SecuritySectionProps) {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSavePassword = async () => {
    setPasswordError('');
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setIsSaving(true);
    const { error } = await onUpdatePassword(newPassword);
    
    if (!error) {
      setIsEditingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setIsEditingPassword(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Lock className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Security</h3>
      </div>
      
      <div className="bg-card border border-border rounded-xl p-4">
        {!isEditingPassword ? (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsEditingPassword(true)}
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        ) : (
          <div className="space-y-3">
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            {passwordError && (
              <p className="text-sm text-destructive">{passwordError}</p>
            )}
            <div className="flex gap-2">
              <Button onClick={handleSavePassword} disabled={isSaving} className="flex-1">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save Password
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
