import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: {
    name: string;
    icon: string;
  } | null;
  isNewIntegration?: boolean;
}

export default function IntegrationModal({ 
  isOpen, 
  onClose, 
  integration,
  isNewIntegration = false 
}: IntegrationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [integrationName, setIntegrationName] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  if (!isOpen) return null;

  const handleConnect = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${isNewIntegration ? 'Integration' : integration?.name} connected successfully`, {
        description: 'You can now use this integration in your knowledge base',
      });
      onClose();
      setApiKey('');
      setIntegrationName('');
      setApiUrl('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#191919] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {integration && !isNewIntegration && (
              <div className="w-10 h-10 rounded-lg bg-[#732CFF]/20 flex items-center justify-center text-xl">
                {integration.icon}
              </div>
            )}
            <div>
              <h2 className="text-xl text-white">
                {isNewIntegration ? 'Add Custom Integration' : `Connect ${integration?.name}`}
              </h2>
              <p className="text-[#aeb9e1] text-sm">
                {isNewIntegration ? 'Configure your custom integration' : 'Enter your API credentials'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isNewIntegration && (
            <>
              <div>
                <Label className="text-white mb-2 block">Integration Name</Label>
                <Input
                  placeholder="e.g., Custom API"
                  value={integrationName}
                  onChange={(e) => setIntegrationName(e.target.value)}
                  className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                />
              </div>
              
              <div>
                <Label className="text-white mb-2 block">API URL</Label>
                <Input
                  placeholder="https://api.example.com"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                />
              </div>
            </>
          )}
          
          <div>
            <Label className="text-white mb-2 block">API Key</Label>
            <Input
              type="password"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
            />
          </div>

          {!isNewIntegration && (
            <div className="p-4 rounded-xl bg-[#732CFF]/10 border border-[#732CFF]/30">
              <p className="text-[#aeb9e1] text-sm">
                Your API key will be encrypted and stored securely. We'll never share it with third parties.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-white/10 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleConnect}
            disabled={isLoading || !apiKey || (isNewIntegration && (!integrationName || !apiUrl))}
            className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white disabled:opacity-50 min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              'Save & Connect'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
