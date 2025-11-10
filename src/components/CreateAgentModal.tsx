import { useState } from 'react';
import { X, Sparkles, MessageSquare, ShoppingBag, Users, DollarSign, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const goalOptions = [
  {
    id: 'support',
    title: 'Customer Support',
    description: 'Fix problems & help users along the way',
    icon: MessageSquare,
    color: '#732CFF',
  },
  {
    id: 'assistance',
    title: 'AI Assistance',
    description: 'Help customers with anything about your brand',
    icon: Sparkles,
    color: '#606283',
  },
  {
    id: 'sales',
    title: 'Sales',
    description: 'Help customers discover the right products for them',
    icon: ShoppingBag,
    color: '#F46D6B',
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Shape your agent\'s unique personality',
    icon: Users,
    color: '#aeb9e1',
  },
];

export default function CreateAgentModal({ isOpen, onClose, onComplete }: CreateAgentModalProps) {
  const [step, setStep] = useState(1);
  const [agentName, setAgentName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isTraining, setIsTraining] = useState(false);

  if (!isOpen) return null;

  const progress = (step / 4) * 100;

  const handleNext = () => {
    if (step === 3) {
      setStep(4);
      setIsTraining(true);
      // Simulate training completion after 3 seconds
      setTimeout(() => {
        setIsTraining(false);
      }, 3000);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAutoGenerateName = () => {
    const names = ['Support Hero', 'Sales Genius', 'AI Assistant Pro', 'Customer Care Bot', 'Growth Agent'];
    setAgentName(names[Math.floor(Math.random() * names.length)]);
  };

  const canProceed = () => {
    if (step === 1) return agentName.trim().length > 0;
    if (step === 2) return selectedGoal.length > 0;
    if (step === 3) return websiteUrl.trim().length > 0 || description.trim().length > 0;
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-[#191919] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl text-white">Create New Agent</h2>
            <p className="text-[#aeb9e1] mt-1">Step {step} of 4</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
              <div>
                <h3 className="text-xl text-white mb-2">What should we call your agent?</h3>
                <p className="text-[#aeb9e1]">Choose a name that represents your agent's purpose</p>
              </div>
              
              <div className="space-y-4">
                <Input
                  placeholder="Enter agent name..."
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50 h-14 text-lg"
                  autoFocus
                />
                
                <Button
                  variant="outline"
                  onClick={handleAutoGenerateName}
                  className="w-full rounded-xl border-white/10 text-white hover:bg-white/10 h-12"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Auto-Generate Name
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
              <div>
                <h3 className="text-xl text-white mb-2">Select your bot's primary goal</h3>
                <p className="text-[#aeb9e1]">We'll tailor its behavior based on your selection</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goalOptions.map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        selectedGoal === goal.id
                          ? 'border-[#732CFF] bg-[#732CFF]/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${goal.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: goal.color }} />
                      </div>
                      <h4 className="text-white mb-2">{goal.title}</h4>
                      <p className="text-[#aeb9e1] text-sm">{goal.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
              <div>
                <h3 className="text-xl text-white mb-2">Shape your bot's tone and appearance</h3>
                <p className="text-[#aeb9e1]">Provide a website URL or describe your agent's personality</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-white mb-2 block">Website URL</label>
                  <Input
                    placeholder="https://example.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50 h-12"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[#aeb9e1]">OR</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>
                
                <div>
                  <label className="text-white mb-2 block">Describe personality manually</label>
                  <Textarea
                    placeholder="E.g., Professional, friendly, and concise. Specializes in technical support..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
              <div className="text-center">
                <h3 className="text-2xl text-white mb-2">Setup Complete – Training Your Agent</h3>
                <p className="text-[#aeb9e1]">Your AI agent is being configured</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#732CFF]/20 flex items-center justify-center flex-shrink-0">
                    <Loader2 className="w-5 h-5 text-[#732CFF] animate-spin" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white mb-1">Personalizing your agent with your content…</p>
                    {isTraining && (
                      <div className="text-[#aeb9e1] text-sm animate-pulse">Processing...</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#606283]/20 flex items-center justify-center flex-shrink-0">
                    <Loader2 className="w-5 h-5 text-[#606283] animate-spin" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white mb-1">Defining instructions for your bot…</p>
                    {isTraining && (
                      <div className="text-[#aeb9e1] text-sm animate-pulse">Analyzing...</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#aeb9e1]/20 flex items-center justify-center flex-shrink-0">
                    <Loader2 className="w-5 h-5 text-[#aeb9e1] animate-spin" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white mb-1">Training in progress…</p>
                    {isTraining && (
                      <div className="text-[#aeb9e1]/50 text-sm blur-sm">
                        Lorem ipsum dolor sit amet consectetur...
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-center py-8">
                <div className="text-4xl mb-4">☕</div>
                <p className="text-lg text-white mb-2">This may take some time</p>
                <p className="text-[#aeb9e1]">Sit back and relax while we set your bot up for you.</p>
              </div>
              
              {!isTraining && (
                <Button
                  onClick={onComplete}
                  className="w-full rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white h-12"
                >
                  Continue to Live Demo →
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 4 && (
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="rounded-xl border-white/10 text-white hover:bg-white/10"
            >
              ← Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white disabled:opacity-50"
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
