import { useState } from 'react';
import { Settings as SettingsIcon, Zap, Puzzle, Server, Key, Lock, Cloud, Archive, Trash2, Save } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white">Settings</h2>
        <p className="text-[#aeb9e1] mt-2">Configure your AI agent settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-[#191919] border-white/10 rounded-xl">
            <CardContent className="p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSection('general')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                    activeSection === 'general' ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <SettingsIcon className="w-4 h-4" />
                  General
                </button>
                <button
                  onClick={() => setActiveSection('behaviour')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                    activeSection === 'behaviour' ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  Behaviour
                </button>
                <button
                  onClick={() => setActiveSection('integrations')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                    activeSection === 'integrations' ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <Puzzle className="w-4 h-4" />
                  Integrations
                </button>
                <button
                  onClick={() => setActiveSection('mcp')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                    activeSection === 'mcp' ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <Server className="w-4 h-4" />
                  MCP Servers
                </button>
                <button
                  onClick={() => setActiveSection('secrets')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                    activeSection === 'secrets' ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  Secrets
                </button>
                <button
                  onClick={() => setActiveSection('environments')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                    activeSection === 'environments' ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  Environments
                </button>
                <button
                  onClick={() => setActiveSection('apikeys')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                    activeSection === 'apikeys' ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  API Keys
                </button>
                <button
                  onClick={() => setActiveSection('backups')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white ${
                    activeSection === 'backups' ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <Archive className="w-4 h-4" />
                  Backups
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <Card className="bg-[#191919] border-white/10 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-white">Agent Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Agent Name</Label>
                      <Input defaultValue="Customer Support AI" className="mt-2 bg-white/5 border-white/10 rounded-xl text-white" />
                    </div>
                    <div>
                      <Label className="text-white">Description</Label>
                      <Textarea 
                        defaultValue="Handles customer support inquiries and provides assistance."
                        rows={3}
                        className="mt-2 bg-white/5 border-white/10 rounded-xl text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Agent ID</Label>
                        <Input value="agent_abc123" disabled className="mt-2 bg-white/5 border-white/10 rounded-xl text-[#aeb9e1]" />
                      </div>
                      <div>
                        <Label className="text-white">Created Date</Label>
                        <Input value="2024-10-15" disabled className="mt-2 bg-white/5 border-white/10 rounded-xl text-[#aeb9e1]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#191919] border-white/10 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-white">Canvas Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Auto-save</Label>
                        <p className="text-[#aeb9e1]">Automatically save workflow changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Show Grid</Label>
                        <p className="text-[#aeb9e1]">Display grid on canvas</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Snap to Grid</Label>
                        <p className="text-[#aeb9e1]">Align nodes to grid</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#191919] border-[#F46D6B]/50 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-[#F46D6B]">Danger Zone</h3>
                  <p className="text-[#aeb9e1] mb-6">Irreversible actions</p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full rounded-xl border-[#F46D6B]/50 text-[#F46D6B] hover:bg-[#F46D6B]/10">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All Data
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl border-[#F46D6B]/50 text-[#F46D6B] hover:bg-[#F46D6B]/10">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'behaviour' && (
            <div className="space-y-6">
              <Card className="bg-[#191919] border-white/10 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-white">General Behavior</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">System Prompt</Label>
                      <Textarea 
                        defaultValue="You are a helpful AI assistant. Be professional, friendly, and concise."
                        rows={4}
                        className="mt-2 bg-white/5 border-white/10 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">LLM Model</Label>
                      <Select defaultValue="gpt4">
                        <SelectTrigger className="mt-2 bg-white/5 border-white/10 rounded-xl text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt4">GPT-4</SelectItem>
                          <SelectItem value="gpt4-turbo">GPT-4 Turbo</SelectItem>
                          <SelectItem value="gpt35">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude">Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Temperature</Label>
                      <Input type="number" defaultValue="0.7" step="0.1" min="0" max="2" className="mt-2 bg-white/5 border-white/10 rounded-xl text-white" />
                      <p className="text-[#aeb9e1] mt-1">Controls randomness (0-2)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#191919] border-white/10 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-white">Chat Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Enable Typing Indicator</Label>
                        <p className="text-[#aeb9e1]">Show when agent is typing</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Message History</Label>
                        <p className="text-[#aeb9e1]">Remember conversation context</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label className="text-white">Max Message Length</Label>
                      <Input type="number" defaultValue="2000" className="mt-2 bg-white/5 border-white/10 rounded-xl text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#191919] border-white/10 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-white">Voice Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Voice Model</Label>
                      <Select defaultValue="alloy">
                        <SelectTrigger className="mt-2 bg-white/5 border-white/10 rounded-xl text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alloy">Alloy</SelectItem>
                          <SelectItem value="echo">Echo</SelectItem>
                          <SelectItem value="fable">Fable</SelectItem>
                          <SelectItem value="onyx">Onyx</SelectItem>
                          <SelectItem value="nova">Nova</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Speech Speed</Label>
                      <Input type="number" defaultValue="1.0" step="0.1" min="0.5" max="2" className="mt-2 bg-white/5 border-white/10 rounded-xl text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'integrations' && (
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="mb-6 text-white">Active Integrations</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Slack', status: 'connected', icon: '💬' },
                    { name: 'Zapier', status: 'connected', icon: '⚡' },
                    { name: 'Webhooks', status: 'connected', icon: '🔗' },
                    { name: 'Stripe', status: 'disconnected', icon: '💳' },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 bg-[#2A2A2A] border-white/10 border rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#732CFF]/20 flex items-center justify-center backdrop-blur-sm text-xl">
                          {integration.icon}
                        </div>
                        <div>
                          <h4 className="text-white">{integration.name}</h4>
                          <p className="text-[#aeb9e1]">{integration.status}</p>
                        </div>
                      </div>
                      <Button 
                        variant={integration.status === 'connected' ? 'outline' : 'default'}
                        className={`rounded-xl ${
                          integration.status === 'connected'
                            ? 'border-white/10 text-white hover:bg-white/10'
                            : 'bg-[#732CFF] hover:bg-[#732CFF]/90 text-white'
                        }`}
                      >
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'mcp' && (
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white">MCP Servers</h3>
                    <p className="text-[#aeb9e1]">Model Context Protocol servers</p>
                  </div>
                  <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                    Add Server
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Database MCP', url: 'mcp://db.example.com', status: 'online' },
                    { name: 'API Gateway MCP', url: 'mcp://api.example.com', status: 'online' },
                    { name: 'Custom Tools MCP', url: 'mcp://tools.example.com', status: 'offline' },
                  ].map((server) => (
                    <div key={server.name} className="p-4 bg-[#2A2A2A] border-white/10 border rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white">{server.name}</h4>
                          <p className="text-[#aeb9e1]">{server.url}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            server.status === 'online' ? 'bg-[#aeb9e1]/20 text-[#aeb9e1]' : 'bg-[#F46D6B]/20 text-[#F46D6B]'
                          }`}>
                            {server.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'secrets' && (
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white">Environment Secrets</h3>
                    <p className="text-[#aeb9e1]">Securely stored variables</p>
                  </div>
                  <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                    Add Secret
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { key: 'OPENAI_API_KEY', value: '••••••••••••••••', updated: '2024-10-28' },
                    { key: 'DATABASE_URL', value: '••••••••••••••••', updated: '2024-10-25' },
                    { key: 'WEBHOOK_SECRET', value: '••••••••••••••••', updated: '2024-10-20' },
                  ].map((secret) => (
                    <div key={secret.key} className="p-4 bg-[#2A2A2A] border-white/10 border rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-white">{secret.key}</h4>
                          <p className="text-[#aeb9e1]">{secret.value}</p>
                          <p className="text-[#aeb9e1] mt-1">Last updated: {secret.updated}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-lg text-[#F46D6B] hover:text-[#F46D6B]/80 hover:bg-white/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'environments' && (
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <h3 className="mb-6 text-white">Deployment Environments</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Production', url: 'https://api.agentflow.ai', status: 'active' },
                    { name: 'Staging', url: 'https://staging.agentflow.ai', status: 'active' },
                    { name: 'Development', url: 'https://dev.agentflow.ai', status: 'inactive' },
                  ].map((env) => (
                    <div key={env.name} className="p-4 bg-[#2A2A2A] border-white/10 border rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white">{env.name}</h4>
                          <p className="text-[#aeb9e1]">{env.url}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          env.status === 'active' ? 'bg-[#aeb9e1]/20 text-[#aeb9e1]' : 'bg-[#535E82]/20 text-[#535E82]'
                        }`}>
                          {env.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'apikeys' && (
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white">API Keys</h3>
                    <p className="text-[#aeb9e1]">Manage API access keys</p>
                  </div>
                  <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                    Generate Key
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Production Key', key: 'ak_prod_••••••••••••', created: '2024-10-15', lastUsed: '2024-11-01' },
                    { name: 'Development Key', key: 'ak_dev_••••••••••••', created: '2024-09-20', lastUsed: '2024-11-01' },
                  ].map((apiKey) => (
                    <div key={apiKey.name} className="p-4 bg-[#2A2A2A] border-white/10 border rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white">{apiKey.name}</h4>
                        <Button variant="ghost" size="sm" className="rounded-lg text-[#F46D6B] hover:text-[#F46D6B]/80 hover:bg-white/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-[#aeb9e1] mb-1 font-mono">{apiKey.key}</p>
                      <div className="flex items-center gap-3 text-[#aeb9e1]">
                        <span>Created: {apiKey.created}</span>
                        <span>•</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'backups' && (
            <Card className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white">Backups</h3>
                    <p className="text-[#aeb9e1]">Agent configuration backups</p>
                  </div>
                  <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                    Create Backup
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Auto Backup', date: '2024-11-01 03:00', size: '2.4 MB', type: 'automatic' },
                    { name: 'Manual Backup', date: '2024-10-28 15:30', size: '2.3 MB', type: 'manual' },
                    { name: 'Auto Backup', date: '2024-10-25 03:00', size: '2.2 MB', type: 'automatic' },
                  ].map((backup, index) => (
                    <div key={index} className="p-4 bg-[#2A2A2A] border-white/10 border rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#732CFF]/20 flex items-center justify-center backdrop-blur-sm">
                            <Archive className="w-5 h-5 text-[#732CFF]" />
                          </div>
                          <div>
                            <h4 className="text-white">{backup.name}</h4>
                            <div className="flex items-center gap-3 text-[#aeb9e1]">
                              <span>{backup.date}</span>
                              <span>•</span>
                              <span>{backup.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="rounded-lg border-white/10 text-white hover:bg-white/10">
                            Restore
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-lg text-white hover:bg-white/10">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" className="rounded-xl border-white/10 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
