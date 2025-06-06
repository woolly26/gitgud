
import { Button } from '@/components/ui/button';
import { Code2, Plus, ArrowLeft, Users } from 'lucide-react';

interface HeaderProps {
  currentView: 'dashboard' | 'submit' | 'detail';
  onViewChange: (view: 'dashboard' | 'submit' | 'detail') => void;
  onGoBack: () => void;
}

export const Header = ({ currentView, onViewChange, onGoBack }: HeaderProps) => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentView !== 'dashboard' && (
              <Button variant="ghost" size="sm" onClick={onGoBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Code2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">GitGud</h1>
                <p className="text-sm text-muted-foreground">Tech Project Mentorship Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentView === 'dashboard' && (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Helping friends level up</span>
                </div>
                <Button onClick={() => onViewChange('submit')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Project
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
