import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
  title: string;
}

export function ProfileHeader({ title }: ProfileHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-3 h-16 px-4">
        <button
          onClick={() => navigate('/')}
          className="p-3 -ml-2 rounded-lg hover:bg-secondary transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
    </header>
  );
}
