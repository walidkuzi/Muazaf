import { useState, useRef } from 'react';
import { 
  BookOpen, 
  Database, 
  Wrench, 
  MessageCircle, 
  GraduationCap,
  Globe,
  FileText,
  Type,
  Search,
  Table,
  Plus,
  Brain,
  Zap,
  BarChart3,
  Save,
  ArrowLeft,
  Loader2,
  Trash2,
  Upload,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

interface AgentEditorPageProps {
  onBack: () => void;
}

const integrations = [
  { name: 'Google AI', icon: '🔍', enabled: false },
  { name: 'OpenAI', icon: '🤖', enabled: true },
  { name: 'Anthropic', icon: '🧠', enabled: true },
  { name: 'Fireworks', icon: '🎆', enabled: false },
  { name: 'Groq', icon: '⚡', enabled: false },
  { name: 'Cerebras', icon: '🔬', enabled: false },
  { name: 'Browser', icon: '🌐', enabled: true },
  { name: 'Web Chat', icon: '💬', enabled: true },
  { name: 'Charts', icon: '📊', enabled: false },
];

const channels = [
  { name: 'WhatsApp', icon: '📱', connected: true },
  { name: 'Instagram', icon: '📷', connected: false },
  { name: 'Facebook', icon: '👥', connected: false },
  { name: 'Telegram', icon: '✈️', connected: true },
  { name: 'Email', icon: '📧', connected: true },
  { name: 'Web Widget', icon: '💻', connected: true },
];

export default function AgentEditorPage({ onBack }: AgentEditorPageProps) {
  const [activeTab, setActiveTab] = useState('instructions');
  const [knowledgeTab, setKnowledgeTab] = useState('urls');
  const [isSaving, setIsSaving] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isAddingUrl, setIsAddingUrl] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [searchProvider, setSearchProvider] = useState('google');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [agentUrls, setAgentUrls] = useState([
    { id: '1', url: 'https://docs.example.com', status: 'synced' as const },
  ]);

  const [agentDocs, setAgentDocs] = useState([
    { id: '1', name: 'product-guide.pdf', status: 'uploaded' as const },
  ]);

  const tabs = [
    { id: 'instructions', label: 'Instructions', icon: BookOpen },
    { id: 'knowledge', label: 'Knowledge Base', icon: Database },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'channels', label: 'Communication', icon: MessageCircle },
    { id: 'learning', label: 'Learning', icon: GraduationCap },
  ];

  const handleSaveChanges = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast.success('Changes saved successfully', {
      description: 'Your agent configuration has been updated',
      icon: <CheckCircle2 className="w-5 h-5 text-[#aeb9e1]" />,
    });
  };

  const handleAddUrl = async () => {
    if (!urlInput.trim()) return;
    setIsAddingUrl(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setAgentUrls([
      { id: Date.now().toString(), url: urlInput, status: 'synced' as const },
      ...agentUrls
    ]);
    setUrlInput('');
    setIsAddingUrl(false);
    toast.success('URL added to agent', {
      description: 'This knowledge source is now available to your agent',
    });
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2100));

    setAgentDocs([
      { id: Date.now().toString(), name: file.name, status: 'uploaded' as const },
      ...agentDocs
    ]);
    setUploadProgress(0);
    toast.success('Document added to agent', {
      description: 'Processing and indexing...',
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="rounded-xl border-white/10 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl text-white">Agent Editor</h1>
              <p className="text-[#aeb9e1]">Configure your AI agent's behavior and capabilities</p>
            </div>
          </div>
          <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <Card className="bg-[#191919] border-white/10 rounded-2xl h-fit">
            <CardContent className="p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-[#732CFF]/20 text-white border border-[#732CFF]/50'
                          : 'text-[#aeb9e1] hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'instructions' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-white mb-4">System Prompt</h2>
                    <Textarea
                      placeholder="Define how your agent should behave, its role, and key instructions..."
                      rows={8}
                      defaultValue="You are a helpful AI assistant designed to provide excellent customer support. Be professional, empathetic, and concise in your responses."
                      className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-white mb-4">Agent Role</h2>
                    <Input
                      placeholder="e.g., Customer Support Specialist"
                      defaultValue="Customer Support Agent"
                      className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-white mb-4">Tone of Voice</h2>
                    <div className="grid grid-cols-3 gap-3">
                      {['Professional', 'Friendly', 'Casual', 'Formal', 'Empathetic', 'Technical'].map((tone) => (
                        <button
                          key={tone}
                          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#732CFF]/50 transition-all text-white"
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'knowledge' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-white mb-6">Knowledge Sources</h2>

                    <Tabs value={knowledgeTab} onValueChange={setKnowledgeTab}>
                      <TabsList className="bg-[#2A2A2A] border-white/10 border p-1 rounded-xl mb-6">
                        <TabsTrigger value="urls" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
                          URLs
                        </TabsTrigger>
                        <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
                          Documents
                        </TabsTrigger>
                        <TabsTrigger value="text" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
                          Text
                        </TabsTrigger>
                        <TabsTrigger value="websearch" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
                          Web Search
                        </TabsTrigger>
                        <TabsTrigger value="tables" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
                          Tables
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="urls">
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="flex-1 relative">
                              <Input 
                                placeholder="https://example.com/docs" 
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
                                disabled={isAddingUrl}
                                className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                              />
                              {isAddingUrl && (
                                <div className="absolute inset-0 bg-[#732CFF]/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                  <Loader2 className="w-5 h-5 text-[#732CFF] animate-spin" />
                                </div>
                              )}
                            </div>
                            <Button 
                              onClick={handleAddUrl}
                              disabled={isAddingUrl || !urlInput.trim()}
                              className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white disabled:opacity-50"
                            >
                              {isAddingUrl ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {agentUrls.map((url) => (
                              <div 
                                key={url.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-5"
                              >
                                <div className="flex items-center gap-3">
                                  <Globe className="w-5 h-5 text-[#732CFF]" />
                                  <span className="text-white">{url.url}</span>
                                  <span className="px-2 py-1 rounded-full text-xs bg-[#aeb9e1]/20 text-[#aeb9e1]">
                                    {url.status}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setAgentUrls(agentUrls.filter(u => u.id !== url.id))}
                                  className="rounded-lg text-[#F46D6B] hover:text-[#F46D6B]/80"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="documents">
                        <div className="space-y-4">
                          <div 
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                              isDragging 
                                ? 'border-[#732CFF] bg-[#732CFF]/10' 
                                : 'border-white/10 hover:border-[#732CFF]/50'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="w-10 h-10 mx-auto mb-3 text-[#732CFF]" />
                            <p className="text-white mb-1">Upload Documents</p>
                            <p className="text-[#aeb9e1] text-sm">PDF, DOCX, TXT (Max 10MB)</p>
                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileSelect(e.target.files)}
                              accept=".pdf,.doc,.docx,.txt"
                            />
                          </div>

                          {uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-white">Uploading...</span>
                                <span className="text-[#aeb9e1]">{uploadProgress}%</span>
                              </div>
                              <Progress value={uploadProgress} className="h-2" />
                            </div>
                          )}

                          <div className="space-y-2">
                            {agentDocs.map((doc) => (
                              <div 
                                key={doc.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-5"
                              >
                                <div className="flex items-center gap-3">
                                  <FileText className="w-5 h-5 text-[#606283]" />
                                  <span className="text-white">{doc.name}</span>
                                  <span className="px-2 py-1 rounded-full text-xs bg-[#aeb9e1]/20 text-[#aeb9e1]">
                                    {doc.status}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setAgentDocs(agentDocs.filter(d => d.id !== doc.id))}
                                  className="rounded-lg text-[#F46D6B] hover:text-[#F46D6B]/80"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="text">
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Add plain text content..."
                            rows={8}
                            className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                          />
                          <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Text Entry
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="websearch">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                            <div>
                              <h3 className="text-white mb-1">Enable Real-time Web Search</h3>
                              <p className="text-[#aeb9e1] text-sm">Allow agent to search the web for current information</p>
                            </div>
                            <Switch 
                              checked={webSearchEnabled}
                              onCheckedChange={setWebSearchEnabled}
                            />
                          </div>

                          {webSearchEnabled && (
                            <div className="animate-in fade-in slide-in-from-top-5">
                              <label className="text-white mb-2 block">Search Provider</label>
                              <div className="grid grid-cols-3 gap-3">
                                {['Google', 'SerpAPI', 'Tavily'].map((provider) => (
                                  <button
                                    key={provider}
                                    onClick={() => setSearchProvider(provider.toLowerCase())}
                                    className={`p-4 rounded-xl border transition-all ${
                                      searchProvider === provider.toLowerCase()
                                        ? 'bg-[#732CFF]/20 border-[#732CFF]'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                                  >
                                    <p className="text-white">{provider}</p>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="tables">
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#732CFF]/50 transition-all cursor-pointer">
                            <Table className="w-10 h-10 mx-auto mb-3 text-[#aeb9e1]" />
                            <p className="text-white mb-1">Upload CSV or XLSX</p>
                            <p className="text-[#aeb9e1] text-sm">Import structured data for your agent</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-white mb-6">Built-in Tools</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-[#732CFF]" />
                            <div>
                              <h3 className="text-white">Workflows</h3>
                              <p className="text-[#aeb9e1] text-sm">Create or select existing workflows</p>
                            </div>
                          </div>
                          <Button variant="outline" className="rounded-xl border-white/10 text-white hover:bg-white/10">
                            Configure
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Brain className="w-5 h-5 text-[#606283]" />
                            <div>
                              <h3 className="text-white">Actions</h3>
                              <p className="text-[#aeb9e1] text-sm">Create or select custom actions</p>
                            </div>
                          </div>
                          <Button variant="outline" className="rounded-xl border-white/10 text-white hover:bg-white/10">
                            Configure
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Table className="w-5 h-5 text-[#535E82]" />
                            <div>
                              <h3 className="text-white">Tables</h3>
                              <p className="text-[#aeb9e1] text-sm">Create or import data tables</p>
                            </div>
                          </div>
                          <Button variant="outline" className="rounded-xl border-white/10 text-white hover:bg-white/10">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-white mb-6">From Integrations</h2>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {integrations.map((integration) => (
                        <div
                          key={integration.name}
                          className={`p-4 rounded-xl border transition-all ${
                            integration.enabled
                              ? 'bg-[#732CFF]/10 border-[#732CFF]/50'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-2xl mb-2">{integration.icon}</div>
                          <h4 className="text-white text-sm">{integration.name}</h4>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'channels' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-white mb-6">Communication Channels</h2>
                    
                    <div className="space-y-4">
                      {channels.map((channel) => (
                        <div
                          key={channel.name}
                          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#732CFF]/20 flex items-center justify-center text-xl">
                                {channel.icon}
                              </div>
                              <div>
                                <h3 className="text-white">{channel.name}</h3>
                                <p className="text-[#aeb9e1] text-sm">
                                  {channel.connected ? 'Connected' : 'Not connected'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Switch defaultChecked={channel.connected} />
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl border-white/10 text-white hover:bg-white/10"
                              >
                                Configure
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-4 rounded-xl border-white/10 text-white hover:bg-white/10"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add More Channels
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl text-white mb-2">Learning Experiences</h2>
                        <p className="text-[#aeb9e1]">
                          Learning experiences come from feedback to refine performance
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl text-white mb-1">0 / 5</div>
                        <Progress value={0} className="w-32" />
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-[#732CFF]/10 to-[#F46D6B]/10 border border-[#732CFF]/30 text-center">
                      <GraduationCap className="w-12 h-12 text-[#732CFF] mx-auto mb-4" />
                      <h3 className="text-white mb-2">No learning experiences yet</h3>
                      <p className="text-[#aeb9e1] mb-4">
                        Test your agent and click "Improve Response" to create learning experiences
                      </p>
                      <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Test Agent
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#191919] border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl text-white mb-4">Training Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                          <h3 className="text-white mb-1">Auto-improve from feedback</h3>
                          <p className="text-[#aeb9e1] text-sm">Automatically learn from user interactions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                          <h3 className="text-white mb-1">Collect analytics</h3>
                          <p className="text-[#aeb9e1] text-sm">Track performance metrics</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
