import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import MapBackground from '@/components/MapBackground';
import { Loader2, AlertCircle, MapPin, ShieldCheck } from 'lucide-react';
import logo from '@/assets/logo.webp';

// Validation schema
const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, role, isLoading: authLoading, signIn } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated as driver
  useEffect(() => {
    if (!authLoading && user && role === 'driver') {
      navigate('/', { replace: true });
    }
  }, [user, role, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password');
        } else {
          setError(signInError.message);
        }
        return;
      }

      // Success - the auth state change will handle the redirect
      toast({
        title: 'Signed in successfully',
        duration: 2000,
      });
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-start p-4 pt-12">
      {/* Map background overlay */}
      <MapBackground />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-4">
          <img 
            src={logo} 
            alt="Street Surfers - South Side Shuttles" 
            className="h-20 w-auto"
          />
        </div>

        {/* Driver App label */}
        <div className="mb-6">
          <span className="px-4 py-1.5 bg-primary/20 text-primary font-semibold text-sm uppercase tracking-widest rounded-full border border-primary/30">
            Driver App
          </span>
        </div>

        {/* Welcome headline */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground italic mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to manage your rides
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex gap-3 mb-8">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">Live Tracking</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">Safe Rides</span>
          </div>
        </div>

        {/* Login card */}
        <div className="w-full bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-2xl shadow-primary/5">
          {/* Error message */}
          {error && (
            <div className="mb-5 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-secondary/60 border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 rounded-xl"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-secondary/60 border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 rounded-xl"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              variant="action"
              className="w-full h-14 text-lg font-semibold glow-primary rounded-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            Driver accounts are created by operations.
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Contact your dispatcher for access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
