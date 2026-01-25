import { FileText, HelpCircle, ExternalLink, Info } from 'lucide-react';

export function LegalSection() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <FileText className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Legal & Support</h3>
      </div>
      
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        <a 
          href="#terms"
          className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
        >
          <span className="font-medium">Terms & Conditions</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
        
        <a 
          href="#privacy"
          className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
        >
          <span className="font-medium">Privacy Policy</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
        
        <a 
          href="#report"
          className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span className="font-medium">Report an Issue</span>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="w-4 h-4" />
            <span className="text-sm">App Version</span>
          </div>
          <span className="text-sm font-mono text-muted-foreground">1.0.0</span>
        </div>
      </div>
    </section>
  );
}
