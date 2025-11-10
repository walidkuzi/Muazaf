import { useState } from 'react';
import { MessageSquare, Mic, Phone, Send, Settings, Palette, Shield, Code2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface InterfacesPageProps {
  initialTab?: string;
}

const chatHistory = [
  { id: '1', role: 'user', message: 'Hello! I need help with my account.', time: '10:30 AM' },
  { id: '2', role: 'agent', message: "Hi! I'd be happy to help you with your account. What specific issue are you experiencing?", time: '10:30 AM' },
  { id: '3', role: 'user', message: "I can't log in with my password.", time: '10:31 AM' },
  { id: '4', role: 'agent', message: "I understand. Let me help you reset your password. I'll need to verify your email address first.", time: '10:31 AM' },
];

const callHistory = [
  { id: '1', number: '+1 (555) 123-4567', duration: '5:23', date: '2024-11-01 14:30', status: 'completed' },
  { id: '2', number: '+1 (555) 987-6543', duration: '3:45', date: '2024-11-01 13:15', status: 'completed' },
  { id: '3', number: '+1 (555) 456-7890', duration: '7:12', date: '2024-11-01 11:20', status: 'completed' },
  { id: '4', number: '+1 (555) 321-0987', duration: '2:08', date: '2024-11-01 09:45', status: 'missed' },
];

const installationCode = `<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.agentflow.ai/widget.js';
    script.setAttribute('data-agent-id', 'agent_abc123');
    document.body.appendChild(script);
  })();
</script>`;

export default function InterfacesPage({ initialTab = 'playground' }: InterfacesPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [widgetTab, setWidgetTab] = useState('installation');
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white">Interfaces</h2>
        <p className="text-[#aeb9e1] mt-2">Configure how users interact with your AI agents</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#191919] border-white/10 border p-1 rounded-xl">
          <TabsTrigger value="playground" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Playground
          </TabsTrigger>
          <TabsTrigger value="widget" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <Code2 className="w-4 h-4 mr-2" />
            Widget
          </TabsTrigger>
          <TabsTrigger value="telephony" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <Phone className="w-4 h-4 mr-2" />
            Telephony
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playground" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chat Interface */}
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white">Chat Interface</h3>
                  <Button variant="ghost" size="icon" className="rounded-lg hover:bg-white/10">
                    <div className="w-8 h-8 rounded-lg bg-[#732CFF]/20 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-[#732CFF]" />
                    </div>
                  </Button>
                </div>

                <div className="space-y-4 mb-4 h-96 overflow-y-auto p-4 bg-white/5 rounded-xl">
                  {chatHistory.map((chat) => (
                    <div 
                      key={chat.id}
                      className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        chat.role === 'user' 
                          ? 'bg-[#732CFF]' 
                          : 'bg-[#2A2A2A] border-white/10 border'
                      } p-4 rounded-xl`}>
                        <p className="text-white">{chat.message}</p>
                        <span className="text-xs text-[#aeb9e1] mt-2 block">{chat.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                  />
                  <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test Controls */}
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-white">Test Configuration</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Agent Model</Label>
                    <Select defaultValue="gpt4">
                      <SelectTrigger className="mt-2 bg-white/5 border-white/10 rounded-xl text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4">GPT-4</SelectItem>
                        <SelectItem value="gpt35">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Temperature</Label>
                    <Input type="number" defaultValue="0.7" step="0.1" min="0" max="2" className="mt-2 bg-white/5 border-white/10 rounded-xl text-white" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Enable Voice</Label>
                      <p className="text-[#aeb9e1]">Allow voice input/output</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Debug Mode</Label>
                      <p className="text-[#aeb9e1]">Show detailed logs</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Button variant="outline" className="w-full rounded-xl border-white/10 text-white hover:bg-white/10">
                      Clear Chat History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="widget" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Widget Settings Sidebar */}
            <div className="space-y-4">
              <Card className="bg-[#191919] border-white/10 rounded-xl">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <button
                      onClick={() => setWidgetTab('installation')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                        widgetTab === 'installation' ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <Code2 className="w-4 h-4" />
                      Installation
                    </button>
                    <button
                      onClick={() => setWidgetTab('modality')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                        widgetTab === 'modality' ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Modality & Interface
                    </button>
                    <button
                      onClick={() => setWidgetTab('appearance')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                        widgetTab === 'appearance' ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <Palette className="w-4 h-4" />
                      Appearance & Style
                    </button>
                    <button
                      onClick={() => setWidgetTab('security')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                        widgetTab === 'security' ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      Security
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Widget Content */}
            <div className="lg:col-span-2">
              {widgetTab === 'installation' && (
                <Card className="bg-[#191919] border-white/10 rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-white">Installation Code</h3>
                    <p className="text-[#aeb9e1] mb-4">
                      Copy and paste this code into your website&apos;s HTML, just before the closing body tag.
                    </p>
                    <div className="bg-white/5 p-4 rounded-xl font-mono overflow-x-auto">
                      <pre className="text-[#606283] text-sm">{installationCode}</pre>
                    </div>
                    <Button className="w-full mt-4 rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                      Copy Code
                    </Button>
                  </CardContent>
                </Card>
              )}

              {widgetTab === 'modality' && (
                <Card className="bg-[#191919] border-white/10 rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-white">Modality & Interface</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Enable Chat</Label>
                          <p className="text-[#aeb9e1]">Text-based conversations</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Enable Voice</Label>
                          <p className="text-[#aeb9e1]">Voice input and output</p>
                        </div>
                        <Switch />
                      </div>
                      <div>
                        <Label className="text-white">Widget Position</Label>
                        <Select defaultValue="bottom-right">
                          <SelectTrigger className="mt-2 bg-white/5 border-white/10 rounded-xl text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bottom-right">Bottom Right</SelectItem>
                            <SelectItem value="bottom-left">Bottom Left</SelectItem>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="top-left">Top Left</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {widgetTab === 'appearance' && (
                <Card className="bg-[#191919] border-white/10 rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-white">Appearance & Style</h3>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-white">Primary Color</Label>
                        <div className="flex gap-3 mt-2">
                          <Input type="color" defaultValue="#732CFF" className="w-20 h-10 rounded-xl" />
                          <Input defaultValue="#732CFF" className="flex-1 bg-white/5 border-white/10 rounded-xl text-white" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Widget Title</Label>
                        <Input defaultValue="Chat with us" className="mt-2 bg-white/5 border-white/10 rounded-xl text-white" />
                      </div>
                      <div>
                        <Label className="text-white">Welcome Message</Label>
                        <Textarea 
                          defaultValue="Hello! How can I help you today?" 
                          rows={3}
                          className="mt-2 bg-white/5 border-white/10 rounded-xl text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {widgetTab === 'security' && (
                <Card className="bg-[#191919] border-white/10 rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-white">Security Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-white">Allowed Domains</Label>
                        <Textarea 
                          placeholder="example.com&#10;app.example.com" 
                          rows={4}
                          className="mt-2 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                        />
                        <p className="text-[#aeb9e1] mt-2">One domain per line</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Require User Authentication</Label>
                          <p className="text-[#aeb9e1]">Users must be logged in</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Rate Limiting</Label>
                          <p className="text-[#aeb9e1]">Limit messages per session</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="telephony" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-white">Phone Settings</h3>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Phone Number</Label>
                    <div className="flex gap-3 mt-2">
                      <Select defaultValue="us">
                        <SelectTrigger className="w-32 bg-white/5 border-white/10 rounded-xl text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">🇺🇸 +1</SelectItem>
                          <SelectItem value="uk">🇬🇧 +44</SelectItem>
                          <SelectItem value="ca">🇨🇦 +1</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input defaultValue="(555) 123-4567" className="flex-1 bg-white/5 border-white/10 rounded-xl text-white" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">SIP Provider</Label>
                    <Select defaultValue="twilio">
                      <SelectTrigger className="mt-2 bg-white/5 border-white/10 rounded-xl text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="vonage">Vonage</SelectItem>
                        <SelectItem value="bandwidth">Bandwidth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Call Recording</Label>
                      <p className="text-[#aeb9e1]">Record all calls</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Voicemail</Label>
                      <p className="text-[#aeb9e1]">Enable voicemail feature</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-white">Recent Calls</h3>
                <div className="space-y-3">
                  {callHistory.map((call) => (
                    <div key={call.id} className="bg-[#2A2A2A] border-white/10 border p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#732CFF]/20">
                            <Phone className="w-5 h-5 text-[#732CFF]" />
                          </div>
                          <div>
                            <p className="text-white">{call.number}</p>
                            <p className="text-[#aeb9e1]">{call.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white">{call.duration}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            call.status === 'completed' 
                              ? 'bg-[#aeb9e1]/20 text-[#aeb9e1]' 
                              : 'bg-[#F46D6B]/20 text-[#F46D6B]'
                          }`}>
                            {call.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
