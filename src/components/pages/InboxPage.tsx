import { useState } from 'react';
import { 
  MessageSquare, 
  User, 
  Clock, 
  Search, 
  Filter, 
  Ticket,
  MoreVertical,
  Phone,
  UserPlus,
  X,
  Send,
  Paperclip,
  Smile,
  Sparkles,
  Calendar,
  MapPin,
  Mail,
  Tag,
  AlertCircle,
  CheckCircle,
  Bot,
  UserCircle,
  Archive,
  Star,
  Loader2,
  ArrowRight,
  Plus,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

interface Conversation {
  id: string;
  user: string;
  avatar: string;
  channel: 'whatsapp' | 'instagram' | 'webchat' | 'facebook' | 'email';
  status: 'bot' | 'human' | 'waiting' | 'assigned';
  tags: string[];
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  isTyping: boolean;
  priority?: 'low' | 'normal' | 'high' | 'critical';
}

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  content: string;
  time: string;
  agentName?: string;
}

interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  ip: string;
  tags: string[];
  totalChats: number;
  totalSpent: string;
  joinedDate: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

const conversations: Conversation[] = [
  {
    id: '1',
    user: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    channel: 'whatsapp',
    status: 'waiting',
    tags: ['VIP', 'Refund'],
    lastMessage: 'I need help with my recent order',
    time: '2m ago',
    unread: 3,
    isOnline: true,
    isTyping: false,
    priority: 'high'
  },
  {
    id: '2',
    user: 'Mike Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    channel: 'instagram',
    status: 'bot',
    tags: ['New Lead'],
    lastMessage: 'What are your pricing plans?',
    time: '5m ago',
    unread: 0,
    isOnline: true,
    isTyping: true,
    priority: 'normal'
  },
  {
    id: '3',
    user: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    channel: 'webchat',
    status: 'assigned',
    tags: ['Technical', 'Complaint'],
    lastMessage: 'The API is not working',
    time: '15m ago',
    unread: 5,
    isOnline: false,
    isTyping: false,
    priority: 'critical'
  },
  {
    id: '4',
    user: 'Anonymous Visitor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anon',
    channel: 'webchat',
    status: 'bot',
    tags: [],
    lastMessage: 'Hello, I have a question',
    time: '1h ago',
    unread: 1,
    isOnline: true,
    isTyping: false,
    priority: 'normal'
  },
  {
    id: '5',
    user: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    channel: 'email',
    status: 'human',
    tags: ['Feature Request'],
    lastMessage: 'Can you add dark mode?',
    time: '2h ago',
    unread: 0,
    isOnline: false,
    isTyping: false,
    priority: 'low'
  }
];

const channelIcons = {
  whatsapp: '💬',
  instagram: '📷',
  webchat: '🌐',
  facebook: '👥',
  email: '✉️'
};

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [messageInput, setMessageInput] = useState('');
  const [sendAsBot, setSendAsBot] = useState(false);
  const [isTakingOver, setIsTakingOver] = useState(false);
  const [showTicketPanel, setShowTicketPanel] = useState(false);
  const [ticketPriority, setTicketPriority] = useState('normal');
  const [ticketStatus, setTicketStatus] = useState('open');
  const [assignedAgent, setAssignedAgent] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'user', content: 'Hi, I need help with my recent order. It seems like there was a problem with the payment.', time: '10:30 AM' },
    { id: '2', sender: 'bot', content: 'Hello! I\'m here to help. I can see you had an order placed recently. Let me check the payment status for you.', time: '10:31 AM' },
    { id: '3', sender: 'bot', content: 'I found your order #12345. The payment is showing as pending. Would you like me to connect you with our payment specialist?', time: '10:31 AM' },
    { id: '4', sender: 'user', content: 'Yes please, I need to resolve this urgently.', time: '10:32 AM' }
  ]);

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const customerProfile: CustomerProfile = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    ip: '192.168.1.1',
    tags: ['VIP', 'Refund', 'Frequent Buyer'],
    totalChats: 24,
    totalSpent: '$12,450',
    joinedDate: 'Jan 15, 2023',
    sentiment: 'negative'
  };

  const handleTakeOver = () => {
    setIsTakingOver(true);
    toast.success('Human agent is now assisting', {
      description: 'AI bot has been paused',
    });
    
    setMessages([...messages, {
      id: Date.now().toString(),
      sender: 'agent',
      content: 'Agent Sarah joined the chat',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      agentName: 'Sarah'
    }]);
  };

  const handleResumeAI = () => {
    setIsTakingOver(false);
    toast.success('AI assistance resumed', {
      description: 'Bot is now handling the conversation',
    });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: sendAsBot ? 'bot' : 'agent',
      content: messageInput,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      agentName: sendAsBot ? undefined : 'You'
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    toast.success('Message sent');
  };

  const handleMarkAsTicket = () => {
    const ticketId = `TCK-${Math.floor(Math.random() * 9000) + 1000}`;
    setShowTicketPanel(true);
    toast.success(`Ticket created: ${ticketId}`, {
      description: 'Conversation converted to support ticket',
    });
  };

  const handleAssignAgent = (agent: string) => {
    setAssignedAgent(agent);
    toast.success(`Assigned to ${agent}`, {
      description: 'Agent will be notified',
    });
  };

  const handleCloseConversation = () => {
    toast.success('Conversation closed', {
      description: 'Moved to archived',
    });
  };

  const handleSuggestReply = () => {
    const suggestions = [
      "I understand your concern. Let me help you with that right away.",
      "Thank you for reaching out. I've escalated this to our specialist team.",
      "I've reviewed your account and can help resolve this issue.",
    ];
    setMessageInput(suggestions[Math.floor(Math.random() * suggestions.length)]);
    toast.success('AI suggested a reply', {
      description: 'You can edit before sending',
    });
  };

  const filteredConversations = conversations.filter(conv => {
    // Filter by tab
    if (activeTab === 'unassigned' && conv.status !== 'bot') return false;
    if (activeTab === 'open' && conv.status === 'bot') return false;
    if (activeTab === 'waiting' && conv.status !== 'waiting') return false;
    if (activeTab === 'human' && conv.status !== 'human' && conv.status !== 'assigned') return false;
    
    // Filter by search
    if (searchQuery && !conv.user.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="mb-6">
        <h2 className="text-white">Inbox</h2>
        <p className="text-[#aeb9e1] mt-2">Enterprise conversation & ticketing management</p>
      </div>

      {/* Main 3-Panel Layout */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100%-80px)]">
        {/* LEFT PANEL - Conversations List */}
        <div className="col-span-3">
          <Card className="bg-[#191919] border-white/10 rounded-2xl h-full flex flex-col">
            <CardContent className="p-4 flex flex-col h-full">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeb9e1]" />
                  <Input 
                    placeholder="Search conversations..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-4 flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white/5 border-white/10 rounded-xl text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#191919] border-white/10">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="priority">By Priority</SelectItem>
                    <SelectItem value="channel">By Channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="bg-[#2A2A2A] border-white/10 border p-1 rounded-xl mb-4 grid grid-cols-4 gap-1">
                  <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white text-xs">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unassigned" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white text-xs">
                    Bot
                  </TabsTrigger>
                  <TabsTrigger value="waiting" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white text-xs">
                    Waiting
                  </TabsTrigger>
                  <TabsTrigger value="human" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white text-xs">
                    Human
                  </TabsTrigger>
                </TabsList>

                {/* Conversation List */}
                <div className="space-y-2 overflow-y-auto flex-1 pr-2">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                        selectedConversation === conv.id
                          ? 'bg-[#732CFF]/20 border-2 border-[#732CFF]/50'
                          : 'bg-[#2A2A2A] border border-white/10 hover:border-[#732CFF]/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conv.avatar} />
                            <AvatarFallback>{conv.user[0]}</AvatarFallback>
                          </Avatar>
                          {conv.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#aeb9e1] rounded-full border-2 border-[#191919]" />
                          )}
                          <div className="absolute -top-1 -right-1 text-sm">
                            {channelIcons[conv.channel]}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="truncate text-white text-sm">{conv.user}</h4>
                            {conv.unread > 0 && (
                              <Badge className="bg-[#732CFF] text-white rounded-full h-5 min-w-[20px] px-1.5 border-0 text-xs">
                                {conv.unread}
                              </Badge>
                            )}
                          </div>
                          
                          {conv.tags.length > 0 && (
                            <div className="flex gap-1 mb-1 flex-wrap">
                              {conv.tags.map((tag, idx) => (
                                <Badge key={idx} className="bg-white/5 text-[#aeb9e1] border-white/10 text-xs px-1.5 py-0">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-[#aeb9e1] truncate text-xs mb-1">
                            {conv.isTyping ? (
                              <span className="flex items-center gap-1">
                                <span className="animate-pulse">typing...</span>
                              </span>
                            ) : (
                              conv.lastMessage
                            )}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-[#aeb9e1] text-xs">
                              <Clock className="w-3 h-3" />
                              <span>{conv.time}</span>
                            </div>
                            
                            <Badge className={`text-xs px-1.5 py-0 ${
                              conv.status === 'bot' ? 'bg-[#606283]/20 text-[#606283] border-[#606283]/30 border' :
                              conv.status === 'waiting' ? 'bg-[#F46D6B]/20 text-[#F46D6B] border-[#F46D6B]/30 border' :
                              conv.status === 'human' || conv.status === 'assigned' ? 'bg-[#aeb9e1]/20 text-[#aeb9e1] border-[#aeb9e1]/30 border' :
                              'bg-white/5 text-white border-white/10'
                            }`}>
                              {conv.status === 'bot' ? <Bot className="w-3 h-3" /> : <UserCircle className="w-3 h-3" />}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Tabs>

              {/* Add Conversation Button */}
              <Button 
                className="w-full mt-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Conversation Manually
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* MIDDLE PANEL - Chat Window */}
        <div className="col-span-6">
          <Card className="bg-[#191919] border-white/10 rounded-2xl h-full flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={selectedConv.avatar} />
                          <AvatarFallback>{selectedConv.user[0]}</AvatarFallback>
                        </Avatar>
                        {selectedConv.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#aeb9e1] rounded-full border-2 border-[#191919]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white flex items-center gap-2">
                          {selectedConv.user}
                          <span className="text-lg">{channelIcons[selectedConv.channel]}</span>
                        </h3>
                        <p className="text-[#aeb9e1] text-sm">
                          {selectedConv.isOnline ? (
                            selectedConv.isTyping ? 'Typing...' : 'Online'
                          ) : 'Offline'}
                        </p>
                      </div>
                    </div>
                    
                    <MoreVertical className="w-5 h-5 text-[#aeb9e1] cursor-pointer" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={isTakingOver ? handleResumeAI : handleTakeOver}
                      size="sm"
                      className={`rounded-xl ${
                        isTakingOver 
                          ? 'bg-[#aeb9e1] hover:bg-[#aeb9e1]/90' 
                          : 'bg-[#732CFF] hover:bg-[#732CFF]/90'
                      } text-white`}
                    >
                      {isTakingOver ? (
                        <>
                          <Bot className="w-4 h-4 mr-2" />
                          Resume AI
                        </>
                      ) : (
                        <>
                          <UserCircle className="w-4 h-4 mr-2" />
                          Take Over
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={handleMarkAsTicket}
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-white/10 text-white hover:bg-white/10"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      Create Ticket
                    </Button>
                    
                    <Select value={assignedAgent} onValueChange={handleAssignAgent}>
                      <SelectTrigger className="w-[140px] h-9 bg-white/5 border-white/10 rounded-xl text-white text-sm">
                        <UserPlus className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Assign" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#191919] border-white/10">
                        <SelectItem value="agent1">Agent Sarah</SelectItem>
                        <SelectItem value="agent2">Agent Mike</SelectItem>
                        <SelectItem value="agent3">Agent Emma</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-white/10 text-white hover:bg-white/10"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    
                    <Button
                      onClick={handleCloseConversation}
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-white/10 text-[#F46D6B] hover:bg-[#F46D6B]/10"
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Close
                    </Button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.sender === 'user' ? (
                        <div className="flex justify-start">
                          <div className="max-w-[70%] bg-[#2A2A2A] border border-white/10 p-4 rounded-2xl rounded-tl-sm">
                            <p className="text-white">{msg.content}</p>
                            <span className="text-xs text-[#aeb9e1] mt-2 block">{msg.time}</span>
                          </div>
                        </div>
                      ) : msg.sender === 'bot' ? (
                        <div className="flex justify-end">
                          <div className="max-w-[70%]">
                            <div className="bg-gradient-to-r from-[#732CFF] to-[#606283] p-4 rounded-2xl rounded-tr-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <Bot className="w-4 h-4" />
                                <span className="text-xs text-white/80">AI Bot</span>
                              </div>
                              <p className="text-white">{msg.content}</p>
                              <span className="text-xs text-white/70 mt-2 block">{msg.time}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <div className="max-w-[70%]">
                            <div className="bg-[#aeb9e1] p-4 rounded-2xl rounded-tr-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <UserCircle className="w-4 h-4 text-[#111111]" />
                                <span className="text-xs text-[#111111]/80">{msg.agentName || 'Agent'}</span>
                              </div>
                              <p className="text-[#111111]">{msg.content}</p>
                              <span className="text-xs text-[#111111]/70 mt-2 block">{msg.time}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTakingOver && (
                    <div className="bg-[#732CFF]/10 border border-[#732CFF]/30 p-3 rounded-xl text-center">
                      <p className="text-[#732CFF] text-sm flex items-center justify-center gap-2">
                        <UserCircle className="w-4 h-4" />
                        Human agent is now assisting - AI is on standby
                      </p>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Switch 
                      checked={sendAsBot}
                      onCheckedChange={setSendAsBot}
                      id="send-mode"
                    />
                    <Label htmlFor="send-mode" className="text-[#aeb9e1] text-sm cursor-pointer">
                      {sendAsBot ? 'Send as Bot' : 'Send as Human Agent'}
                    </Label>
                    
                    <Button
                      onClick={handleSuggestReply}
                      size="sm"
                      variant="outline"
                      className="ml-auto rounded-xl border-white/10 text-white hover:bg-white/10"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Suggest Reply
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl border-white/10 text-[#aeb9e1] hover:bg-white/10"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl border-white/10 text-[#aeb9e1] hover:bg-white/10"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Textarea
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50 min-h-[44px] max-h-[120px] resize-none"
                      rows={1}
                    />
                    
                    <Button 
                      onClick={handleSendMessage}
                      className="rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white px-6"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-[#aeb9e1]" />
                  <h3 className="mb-2 text-white">No conversation selected</h3>
                  <p className="text-[#aeb9e1]">Select a conversation to start chatting</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* RIGHT PANEL - Customer Details & Actions */}
        <div className="col-span-3">
          <div className="space-y-4 h-full overflow-y-auto pr-2">
            {/* Customer Profile */}
            <Card className="bg-[#191919] border-white/10 rounded-2xl">
              <CardContent className="p-4">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Profile
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#aeb9e1]" />
                    <span className="text-white text-sm">{customerProfile.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#aeb9e1]" />
                    <span className="text-white text-sm">{customerProfile.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#aeb9e1]" />
                    <span className="text-white text-sm">{customerProfile.location}</span>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <p className="text-[#aeb9e1] text-xs mb-1">Total Chats</p>
                      <p className="text-white">{customerProfile.totalChats}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <p className="text-[#aeb9e1] text-xs mb-1">Total Spent</p>
                      <p className="text-white">{customerProfile.totalSpent}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-[#aeb9e1] text-xs mb-2">Sentiment</p>
                    <div className="flex items-center gap-2">
                      {customerProfile.sentiment === 'positive' ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-[#aeb9e1]" />
                          <span className="text-[#aeb9e1] text-sm">Positive</span>
                        </>
                      ) : customerProfile.sentiment === 'negative' ? (
                        <>
                          <TrendingDown className="w-4 h-4 text-[#F46D6B]" />
                          <span className="text-[#F46D6B] text-sm">Negative</span>
                        </>
                      ) : (
                        <span className="text-white text-sm">Neutral</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[#aeb9e1] text-xs mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {customerProfile.tags.map((tag, idx) => (
                        <Badge key={idx} className="bg-[#732CFF]/20 text-[#732CFF] border-[#732CFF]/30 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Panel */}
            {showTicketPanel && (
              <Card className="bg-gradient-to-br from-[#732CFF]/10 to-[#606283]/10 border-[#732CFF]/30 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      Ticket #TCK-2039
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowTicketPanel(false)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-white mb-2 block text-xs">Priority</Label>
                      <Select value={ticketPriority} onValueChange={setTicketPriority}>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#191919] border-white/10">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-white mb-2 block text-xs">Status</Label>
                      <Select value={ticketStatus} onValueChange={setTicketStatus}>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#191919] border-white/10">
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="waiting">Waiting</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                          <SelectItem value="solved">Solved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-white mb-2 block text-xs">Due Date</Label>
                      <Input 
                        type="date"
                        className="bg-white/5 border-white/10 rounded-xl text-white"
                      />
                    </div>
                    
                    <Button className="w-full rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                      Save Ticket
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appointments */}
            <Card className="bg-[#191919] border-white/10 rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Appointments
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowScheduler(!showScheduler)}
                    className="rounded-xl border-white/10 text-white hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {showScheduler ? (
                  <div className="space-y-3">
                    <Input 
                      type="datetime-local"
                      className="bg-white/5 border-white/10 rounded-xl text-white"
                    />
                    <Textarea
                      placeholder="Meeting notes..."
                      className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                      rows={3}
                    />
                    <Button className="w-full rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 text-white">
                      Schedule Meeting
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-[#aeb9e1]" />
                    <p className="text-[#aeb9e1] text-sm">No upcoming appointments</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="bg-[#191919] border-white/10 rounded-2xl">
              <CardContent className="p-4">
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Internal Notes
                </h3>
                <Textarea
                  placeholder="Add private notes about this customer..."
                  className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50 mb-2"
                  rows={4}
                />
                <Button className="w-full rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white">
                  Save Note
                </Button>
              </CardContent>
            </Card>

            {/* AI Assist */}
            <Card className="bg-gradient-to-br from-[#732CFF]/10 to-[#606283]/10 border-[#732CFF]/30 rounded-2xl">
              <CardContent className="p-4">
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#732CFF]" />
                  AI Assist
                </h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    className="w-full rounded-xl border-white/10 text-white hover:bg-white/10 justify-start"
                  >
                    <Loader2 className="w-4 h-4 mr-2" />
                    Summarize Conversation
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full rounded-xl border-white/10 text-white hover:bg-white/10 justify-start"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Improve AI with this chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
