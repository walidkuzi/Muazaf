import { useState, useEffect } from 'react';
import { Send, Share2, SkipForward, Loader2, Sparkles, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

interface LiveDemoPageProps {
  onContinue: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  time: string;
}

export default function LiveDemoPage({ onContinue }: LiveDemoPageProps) {
  const [message, setMessage] = useState('');
  const [isTraining, setIsTraining] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: 'Hello! I\'m your new AI agent. How can I help you today?',
      time: '10:30 AM',
    },
  ]);

  // Simulate training completion after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTraining(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate agent response
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: 'Thank you for your message! I\'m learning to provide better assistance based on your needs.',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, agentResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl text-white mb-2">Live Demo & Training</h1>
          <p className="text-[#aeb9e1]">Test your agent while it continues to learn</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <Card className="lg:col-span-2 bg-[#191919] border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-white">Chat Interface</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#aeb9e1] animate-pulse" />
                  <span className="text-[#aeb9e1]">Active</span>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4 mb-6 h-[500px] overflow-y-auto p-4 bg-white/5 rounded-xl">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-xl ${
                        msg.role === 'user'
                          ? 'bg-[#732CFF]'
                          : 'bg-[#2A2A2A] border border-white/10'
                      }`}
                    >
                      <p className="text-white">{msg.content}</p>
                      <span className="text-xs text-[#aeb9e1] mt-2 block">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-3">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                />
                <Button
                  onClick={handleSendMessage}
                  className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Training Status */}
          <div className="space-y-6">
            <Card className="bg-[#191919] border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#732CFF]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#732CFF]" />
                  </div>
                  <div>
                    <h3 className="text-white">Training Status</h3>
                    <p className="text-[#aeb9e1] text-sm">Your bot is learning</p>
                  </div>
                </div>

                {isTraining ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Loader2 className="w-5 h-5 text-[#732CFF] animate-spin flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-white mb-2">Your bot is learning from your content</p>
                        <div className="space-y-2">
                          <div className="h-3 bg-white/5 rounded-full animate-pulse" />
                          <div className="h-3 bg-white/5 rounded-full animate-pulse blur-sm" />
                          <div className="h-3 bg-white/5 rounded-full animate-pulse blur-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-[#aeb9e1]/10 border border-[#aeb9e1]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#aeb9e1]" />
                        <p className="text-white">Training Complete!</p>
                      </div>
                      <p className="text-[#aeb9e1] text-sm">Your agent is ready to assist users</p>
                    </div>
                    
                    <Button
                      onClick={onContinue}
                      className="w-full rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white"
                    >
                      Continue to Editor →
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card className="bg-gradient-to-br from-[#732CFF]/10 to-[#F46D6B]/10 border-[#732CFF]/30 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-[#732CFF]" />
                  <h3 className="text-white">Premium Features</h3>
                </div>
                
                <p className="text-[#aeb9e1] mb-4 text-sm">
                  Unlock advanced capabilities with our premium plans:
                </p>
                
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-[#aeb9e1] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#732CFF]" />
                    Custom branding
                  </li>
                  <li className="flex items-center gap-2 text-[#aeb9e1] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#732CFF]" />
                    Human handoff
                  </li>
                  <li className="flex items-center gap-2 text-[#aeb9e1] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#732CFF]" />
                    Role-based access control
                  </li>
                  <li className="flex items-center gap-2 text-[#aeb9e1] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#732CFF]" />
                    Advanced analytics
                  </li>
                </ul>
                
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-white/10 text-white hover:bg-white/10"
                >
                  View Plans
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-white/10 text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={onContinue}
                variant="outline"
                className="flex-1 rounded-xl border-white/10 text-white hover:bg-white/10"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Skip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
