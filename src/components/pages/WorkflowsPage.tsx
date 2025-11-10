import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  BackgroundVariant,
  Panel,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Menu,
  Settings,
  Download,
  Upload,
  Play,
  Undo,
  Redo,
  Save,
  Maximize,
  X,
  Search,
  ChevronDown,
  ChevronRight,
  Copy,
  Trash2,
  Power,
  Edit3,
  Loader2,
  Sparkles,
  MessageSquare,
  Database,
  Brain,
  Zap,
  Clock,
  Mail,
  Phone,
  BarChart3,
  FileText,
  Send,
  Globe,
  Bot,
  Users,
  Calendar,
  ShoppingCart,
  HelpCircle,
  MapPin,
  Layout as LayoutIcon,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { toast } from 'sonner';
import CustomNode from '../workflow/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface NodeCategory {
  id: string;
  label: string;
  icon: any;
  nodes: NodeTemplate[];
}

interface NodeTemplate {
  id: string;
  label: string;
  icon: any;
  category: string;
  color: string;
  defaultData?: any;
}

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  nodes: Node[];
  edges: Edge[];
}

const nodeLibrary: NodeCategory[] = [
  {
    id: 'messaging',
    label: 'Messaging',
    icon: MessageSquare,
    nodes: [
      { id: 'send-message', label: 'Send Message', icon: MessageSquare, category: 'messaging', color: '#A855F7', defaultData: { message: '' } },
      { id: 'send-email', label: 'Send Email', icon: Mail, category: 'messaging', color: '#A855F7', defaultData: { subject: '', body: '' } },
      { id: 'send-whatsapp', label: 'WhatsApp Message', icon: Phone, category: 'messaging', color: '#00E5FF', defaultData: { message: '' } },
    ]
  },
  {
    id: 'ai',
    label: 'AI & LLMs',
    icon: Brain,
    nodes: [
      { id: 'openai-chat', label: 'OpenAI Chat', icon: Brain, category: 'ai', color: '#00E5FF', defaultData: { model: 'gpt-4', prompt: '', temperature: 0.7 } },
      { id: 'claude-chat', label: 'Claude Chat', icon: Brain, category: 'ai', color: '#A855F7', defaultData: { model: 'claude-3', prompt: '', temperature: 0.7 } },
      { id: 'ai-classify', label: 'AI Classifier', icon: Brain, category: 'ai', color: '#00E5FF', defaultData: { categories: [] } },
    ]
  },
  {
    id: 'logic',
    label: 'Logic & Flow',
    icon: Zap,
    nodes: [
      { id: 'if-else', label: 'If/Else Condition', icon: Zap, category: 'logic', color: '#A855F7', defaultData: { condition: '' } },
      { id: 'switch', label: 'Switch Case', icon: Zap, category: 'logic', color: '#00E5FF', defaultData: { cases: [] } },
      { id: 'loop', label: 'Loop', icon: Zap, category: 'logic', color: '#A855F7', defaultData: { iterations: 1 } },
      { id: 'trigger', label: 'Trigger', icon: Zap, category: 'logic', color: '#00E5FF', defaultData: { type: 'webhook' } },
    ]
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    nodes: [
      { id: 'db-query', label: 'Query Database', icon: Database, category: 'database', color: '#00E5FF', defaultData: { query: '' } },
      { id: 'db-insert', label: 'Insert Record', icon: Database, category: 'database', color: '#A855F7', defaultData: { table: '', data: {} } },
      { id: 'db-update', label: 'Update Record', icon: Database, category: 'database', color: '#00E5FF', defaultData: { table: '', data: {} } },
    ]
  },
  {
    id: 'scheduler',
    label: 'Scheduler',
    icon: Clock,
    nodes: [
      { id: 'wait', label: 'Wait/Delay', icon: Clock, category: 'scheduler', color: '#A855F7', defaultData: { duration: 5, unit: 'seconds' } },
      { id: 'schedule', label: 'Schedule', icon: Calendar, category: 'scheduler', color: '#00E5FF', defaultData: { cron: '' } },
    ]
  },
  {
    id: 'api',
    label: 'API & Webhooks',
    icon: Globe,
    nodes: [
      { id: 'http-request', label: 'HTTP Request', icon: Send, category: 'api', color: '#00E5FF', defaultData: { method: 'GET', url: '' } },
      { id: 'webhook', label: 'Webhook Trigger', icon: Zap, category: 'api', color: '#A855F7', defaultData: { url: '' } },
    ]
  },
  {
    id: 'charts',
    label: 'Charts & Data',
    icon: BarChart3,
    nodes: [
      { id: 'bar-chart', label: 'Bar Chart', icon: BarChart3, category: 'charts', color: '#00E5FF', defaultData: { data: [] } },
      { id: 'line-chart', label: 'Line Chart', icon: BarChart3, category: 'charts', color: '#A855F7', defaultData: { data: [] } },
    ]
  },
  {
    id: 'inputs',
    label: 'User Inputs',
    icon: FileText,
    nodes: [
      { id: 'text-input', label: 'Text Input', icon: FileText, category: 'inputs', color: '#A855F7', defaultData: { placeholder: '' } },
      { id: 'choice-input', label: 'Multiple Choice', icon: FileText, category: 'inputs', color: '#00E5FF', defaultData: { options: [] } },
      { id: 'email-input', label: 'Email Input', icon: Mail, category: 'inputs', color: '#A855F7', defaultData: { validation: true } },
    ]
  },
];

const agentTemplates: AgentTemplate[] = [
  {
    id: 'customer-support',
    name: 'Customer Support Bot',
    description: 'Handle customer inquiries with AI, knowledge base lookup, and human handoff',
    icon: Users,
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 200 },
        data: { 
          label: 'Trigger', 
          nodeType: 'trigger',
          color: '#00E5FF',
          config: { type: 'webhook', event: 'customer_message' }
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 350, y: 200 },
        data: { 
          label: 'AI Response', 
          nodeType: 'openai-chat',
          color: '#00E5FF',
          config: { model: 'gpt-4', prompt: 'You are a helpful customer support agent', temperature: 0.7 }
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 600, y: 100 },
        data: { 
          label: 'Knowledge Base Lookup', 
          nodeType: 'db-query',
          color: '#00E5FF',
          config: { query: 'SELECT * FROM knowledge_base WHERE topic = $1' }
        },
      },
      {
        id: 'node-4',
        type: 'custom',
        position: { x: 850, y: 200 },
        data: { 
          label: 'Can AI Handle?', 
          nodeType: 'if-else',
          color: '#A855F7',
          config: { condition: 'confidence > 0.8' }
        },
      },
      {
        id: 'node-5',
        type: 'custom',
        position: { x: 1100, y: 100 },
        data: { 
          label: 'Send Response', 
          nodeType: 'send-message',
          color: '#A855F7',
          config: { message: '{{ai_response}}' }
        },
      },
      {
        id: 'node-6',
        type: 'custom',
        position: { x: 1100, y: 300 },
        data: { 
          label: 'Human Handoff', 
          nodeType: 'send-message',
          color: '#00E5FF',
          config: { message: 'Connecting you to a human agent...', handoff: true }
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', type: 'smoothstep', animated: true },
      { id: 'e2-3', source: 'node-2', target: 'node-3', type: 'smoothstep', animated: true },
      { id: 'e3-4', source: 'node-3', target: 'node-4', type: 'smoothstep', animated: true },
      { id: 'e4-5', source: 'node-4', target: 'node-5', type: 'smoothstep', animated: true, label: 'Yes' },
      { id: 'e4-6', source: 'node-4', target: 'node-6', type: 'smoothstep', animated: true, label: 'No' },
    ]
  },
  {
    id: 'sales-assistant',
    name: 'Sales Assistant Bot',
    description: 'Qualify leads, answer questions, and schedule demos',
    icon: ShoppingCart,
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 200 },
        data: { 
          label: 'Lead Message', 
          nodeType: 'trigger',
          color: '#00E5FF',
          config: { type: 'chat_message' }
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Qualify Lead', 
          nodeType: 'ai-classify',
          color: '#A855F7',
          config: { categories: ['hot', 'warm', 'cold'] }
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 600, y: 100 },
        data: { 
          label: 'Hot Lead?', 
          nodeType: 'if-else',
          color: '#00E5FF',
          config: { condition: 'lead_score === "hot"' }
        },
      },
      {
        id: 'node-4',
        type: 'custom',
        position: { x: 850, y: 50 },
        data: { 
          label: 'Schedule Demo', 
          nodeType: 'schedule',
          color: '#A855F7',
          config: { duration: 30, type: 'demo' }
        },
      },
      {
        id: 'node-5',
        type: 'custom',
        position: { x: 850, y: 200 },
        data: { 
          label: 'Send Info', 
          nodeType: 'send-email',
          color: '#00E5FF',
          config: { subject: 'Product Information', template: 'sales_info' }
        },
      },
      {
        id: 'node-6',
        type: 'custom',
        position: { x: 1100, y: 150 },
        data: { 
          label: 'Save to CRM', 
          nodeType: 'db-insert',
          color: '#00E5FF',
          config: { table: 'leads' }
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', type: 'smoothstep', animated: true },
      { id: 'e2-3', source: 'node-2', target: 'node-3', type: 'smoothstep', animated: true },
      { id: 'e3-4', source: 'node-3', target: 'node-4', type: 'smoothstep', animated: true, label: 'Yes' },
      { id: 'e3-5', source: 'node-3', target: 'node-5', type: 'smoothstep', animated: true, label: 'No' },
      { id: 'e4-6', source: 'node-4', target: 'node-6', type: 'smoothstep', animated: true },
      { id: 'e5-6', source: 'node-5', target: 'node-6', type: 'smoothstep', animated: true },
    ]
  },
  {
    id: 'faq-bot',
    name: 'FAQ Bot',
    description: 'Answer frequently asked questions using AI and knowledge base',
    icon: HelpCircle,
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 200 },
        data: { 
          label: 'User Question', 
          nodeType: 'trigger',
          color: '#00E5FF',
          config: { type: 'message' }
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Search FAQ', 
          nodeType: 'db-query',
          color: '#A855F7',
          config: { query: 'SELECT answer FROM faq WHERE question LIKE $1' }
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 600, y: 200 },
        data: { 
          label: 'Found Answer?', 
          nodeType: 'if-else',
          color: '#00E5FF',
          config: { condition: 'answer_found === true' }
        },
      },
      {
        id: 'node-4',
        type: 'custom',
        position: { x: 850, y: 100 },
        data: { 
          label: 'Send Answer', 
          nodeType: 'send-message',
          color: '#A855F7',
          config: { message: '{{faq_answer}}' }
        },
      },
      {
        id: 'node-5',
        type: 'custom',
        position: { x: 850, y: 300 },
        data: { 
          label: 'AI Generate Answer', 
          nodeType: 'openai-chat',
          color: '#00E5FF',
          config: { model: 'gpt-4', prompt: 'Answer this question based on our FAQ' }
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', type: 'smoothstep', animated: true },
      { id: 'e2-3', source: 'node-2', target: 'node-3', type: 'smoothstep', animated: true },
      { id: 'e3-4', source: 'node-3', target: 'node-4', type: 'smoothstep', animated: true, label: 'Yes' },
      { id: 'e3-5', source: 'node-3', target: 'node-5', type: 'smoothstep', animated: true, label: 'No' },
    ]
  },
  {
    id: 'appointment-scheduler',
    name: 'Appointment Scheduler Bot',
    description: 'Book appointments and send calendar invites',
    icon: Calendar,
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 200 },
        data: { 
          label: 'Booking Request', 
          nodeType: 'trigger',
          color: '#00E5FF',
          config: { type: 'booking_request' }
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 350, y: 200 },
        data: { 
          label: 'Check Availability', 
          nodeType: 'db-query',
          color: '#A855F7',
          config: { query: 'SELECT * FROM calendar WHERE date = $1' }
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 600, y: 200 },
        data: { 
          label: 'Time Available?', 
          nodeType: 'if-else',
          color: '#00E5FF',
          config: { condition: 'slots_available > 0' }
        },
      },
      {
        id: 'node-4',
        type: 'custom',
        position: { x: 850, y: 100 },
        data: { 
          label: 'Create Booking', 
          nodeType: 'db-insert',
          color: '#A855F7',
          config: { table: 'appointments' }
        },
      },
      {
        id: 'node-5',
        type: 'custom',
        position: { x: 1100, y: 100 },
        data: { 
          label: 'Send Confirmation', 
          nodeType: 'send-email',
          color: '#00E5FF',
          config: { subject: 'Appointment Confirmed', template: 'confirmation' }
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', type: 'smoothstep', animated: true },
      { id: 'e2-3', source: 'node-2', target: 'node-3', type: 'smoothstep', animated: true },
      { id: 'e3-4', source: 'node-3', target: 'node-4', type: 'smoothstep', animated: true, label: 'Yes' },
      { id: 'e4-5', source: 'node-4', target: 'node-5', type: 'smoothstep', animated: true },
    ]
  },
];

export default function WorkflowsPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showNodeLibrary, setShowNodeLibrary] = useState(false);
  const [showNodeSettings, setShowNodeSettings] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>(['messaging', 'ai', 'logic']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition, fitView } = useReactFlow();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; nodeId: string } | null>(null);

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleAutoSave();
    }, 5000);
    return () => clearInterval(interval);
  }, [nodes, edges]);

  const handleAutoSave = () => {
    console.log('Auto-saving workflow...', { nodes, edges });
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#00E5FF', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#00E5FF',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
      toast.success('Nodes connected');
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeData = event.dataTransfer.getData('application/reactflow');
      if (!nodeData) return;

      const nodeTemplate: NodeTemplate = JSON.parse(nodeData);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: { 
          label: nodeTemplate.label,
          nodeType: nodeTemplate.id,
          color: nodeTemplate.color,
          config: nodeTemplate.defaultData || {}
        },
      };

      setNodes((nds) => nds.concat(newNode));
      toast.success('Node added', {
        description: `${nodeTemplate.label} added to canvas`,
      });
    },
    [screenToFlowPosition, setNodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setShowNodeSettings(true);
  }, []);

  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
    });
  }, []);

  const handleNodeDelete = (nodeId?: string) => {
    const idToDelete = nodeId || selectedNode?.id;
    if (idToDelete) {
      setNodes((nds) => nds.filter((n) => n.id !== idToDelete));
      setEdges((eds) => eds.filter((e) => e.source !== idToDelete && e.target !== idToDelete));
      if (selectedNode?.id === idToDelete) {
        setSelectedNode(null);
        setShowNodeSettings(false);
      }
      toast.success('Node deleted');
    }
    setContextMenu(null);
  };

  const handleNodeDuplicate = (nodeId?: string) => {
    const idToDuplicate = nodeId || selectedNode?.id;
    const nodeToDuplicate = nodes.find(n => n.id === idToDuplicate);
    
    if (nodeToDuplicate) {
      const newNode: Node = {
        ...nodeToDuplicate,
        id: `node-${Date.now()}`,
        position: {
          x: nodeToDuplicate.position.x + 50,
          y: nodeToDuplicate.position.y + 50,
        },
      };
      setNodes((nds) => [...nds, newNode]);
      toast.success('Node duplicated');
    }
    setContextMenu(null);
  };

  const handleSaveSettings = () => {
    if (!selectedNode) return;
    
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Node settings saved', {
        description: 'Configuration updated successfully',
      });
    }, 1000);
  };

  const handleSaveWorkflow = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Workflow saved successfully', {
        description: 'All changes have been saved',
        icon: <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" />,
      });
    }, 1500);
  };

  const handleExportWorkflow = () => {
    const workflow = { nodes, edges };
    const json = JSON.stringify(workflow, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
    toast.success('Workflow exported');
  };

  const handleImportWorkflow = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const workflow = JSON.parse(event.target?.result as string);
          setNodes(workflow.nodes);
          setEdges(workflow.edges);
          toast.success('Workflow imported');
        } catch (error) {
          toast.error('Invalid workflow file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleFitView = () => {
    fitView({ padding: 0.2 });
  };

  const handlePreview = () => {
    toast.success('Preview mode activated', {
      description: 'Testing workflow execution...',
    });
  };

  const loadAgentTemplate = (template: AgentTemplate) => {
    setNodes(template.nodes);
    setEdges(template.edges);
    setShowNodeLibrary(false);
    toast.success(`${template.name} loaded`, {
      description: 'Template workflow added to canvas',
    });
    setTimeout(() => fitView({ padding: 0.2 }), 100);
  };

  const onDragStart = (event: React.DragEvent, nodeTemplate: NodeTemplate) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeTemplate));
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredNodes = nodeLibrary.map(category => ({
    ...category,
    nodes: category.nodes.filter(node =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.nodes.length > 0);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSaveWorkflow();
      }
      if (e.key === 'Delete' && selectedNode) {
        handleNodeDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode]);

  // Close context menu on click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0B0E12]" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#00E5FF', strokeWidth: 2 },
        }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#ffffff" 
          style={{ opacity: 0.15 }}
        />
        <Controls 
          className="!bg-[#191919] !border-white/10 !rounded-xl"
          showInteractive={false}
        />
        <MiniMap 
          className="!bg-[#191919] !border !border-white/10 !rounded-xl"
          nodeColor={(node) => node.data.color || '#00E5FF'}
          maskColor="rgba(0, 0, 0, 0.6)"
        />

        {/* Floating Toolbar */}
        <Panel position="top-left" className="flex gap-2 m-4" style={{ marginLeft: '5.5rem' }}>
          <Button
            onClick={() => setShowNodeLibrary(!showNodeLibrary)}
            className="rounded-xl bg-[#191919]/90 backdrop-blur-md border border-white/10 text-white hover:bg-[#252525] hover:border-[#00E5FF]/50 transition-all"
          >
            <Menu className="w-4 h-4 mr-2" />
            Node Library
          </Button>
          
          <Button
            onClick={() => setShowNodeSettings(!showNodeSettings)}
            variant="outline"
            className="rounded-xl bg-[#191919]/90 backdrop-blur-md border-white/10 text-white hover:bg-[#252525] hover:border-[#00E5FF]/50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Node Settings
          </Button>
          
          <Separator orientation="vertical" className="h-8 bg-white/10" />
          
          <Button
            onClick={handleFitView}
            variant="outline"
            size="icon"
            className="rounded-xl bg-[#191919]/90 backdrop-blur-md border-white/10 text-white hover:bg-[#252525] hover:border-[#00E5FF]/50"
          >
            <Maximize className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handleSaveWorkflow}
            variant="outline"
            size="icon"
            className="rounded-xl bg-[#191919]/90 backdrop-blur-md border-white/10 text-white hover:bg-[#252525] hover:border-[#00E5FF]/50"
          >
            <Save className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handlePreview}
            className="rounded-xl bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black"
          >
            <Play className="w-4 h-4 mr-2" />
            Preview
          </Button>
          
          <Separator orientation="vertical" className="h-8 bg-white/10" />
          
          <Button
            onClick={handleImportWorkflow}
            variant="outline"
            size="icon"
            className="rounded-xl bg-[#191919]/90 backdrop-blur-md border-white/10 text-white hover:bg-[#252525]"
          >
            <Upload className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handleExportWorkflow}
            variant="outline"
            size="icon"
            className="rounded-xl bg-[#191919]/90 backdrop-blur-md border-white/10 text-white hover:bg-[#252525]"
          >
            <Download className="w-4 h-4" />
          </Button>
        </Panel>

        {/* Status Bar */}
        <Panel position="bottom-center" className="bg-[#191919]/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 mb-4">
          <div className="flex items-center gap-4 text-sm text-[#aeb9e1]">
            <span className="flex items-center gap-1">
              <LayoutIcon className="w-3 h-3" />
              {nodes.length} nodes
            </span>
            <span>•</span>
            <span>{edges.length} connections</span>
            <span>•</span>
            <span className="text-[#00E5FF] flex items-center gap-1">
              <div className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse" />
              Auto-saving
            </span>
          </div>
        </Panel>
      </ReactFlow>

      {/* Node Library Panel */}
      <div
        className={`fixed top-0 left-20 h-full w-96 bg-[#0B0E12]/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 z-40 ${
          showNodeLibrary ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white flex items-center gap-2">
                <Menu className="w-5 h-5" />
                Node Library
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNodeLibrary(false)}
                className="text-white hover:bg-white/10 rounded-xl"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeb9e1]" />
              <Input
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
              />
            </div>
          </div>

          <div 
            className="flex-1 overflow-y-auto p-4 workflow-scrollbar"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
            }}
          >
            {/* Agent Templates */}
            <div className="mb-6">
              <h4 className="text-white mb-3 flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#00E5FF]" />
                Agent Templates
              </h4>
              <div className="space-y-2">
                {agentTemplates.map((template) => {
                  const TemplateIcon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => loadAgentTemplate(template)}
                      className="w-full p-3 rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#A855F7]/20 border border-[#00E5FF]/30 hover:border-[#00E5FF]/60 transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center group-hover:bg-[#00E5FF]/30 transition-all">
                          <TemplateIcon className="w-5 h-5 text-[#00E5FF]" />
                        </div>
                        <div>
                          <p className="text-white mb-1">{template.name}</p>
                          <p className="text-[#aeb9e1] text-xs">{template.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Separator className="bg-white/10 my-4" />

            {/* Node Categories */}
            <div className="space-y-2">
              {filteredNodes.map((category) => {
                const Icon = category.icon;
                const isOpen = openCategories.includes(category.id);
                
                return (
                  <Collapsible key={category.id} open={isOpen}>
                    <CollapsibleTrigger
                      onClick={() => setOpenCategories(prev =>
                        prev.includes(category.id)
                          ? prev.filter(id => id !== category.id)
                          : [...prev, category.id]
                      )}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{category.label}</span>
                        <span className="text-xs text-[#aeb9e1]">({category.nodes.length})</span>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="mt-2 space-y-1 pl-2">
                      {category.nodes.map((node) => {
                        const NodeIcon = node.icon;
                        return (
                          <div
                            key={node.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, node)}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00E5FF]/50 transition-all cursor-grab active:cursor-grabbing group"
                            style={{
                              borderLeft: `3px solid ${node.color}`,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <NodeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: node.color }} />
                              <span className="text-white text-sm">{node.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Node Settings Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 backdrop-blur-xl border-l border-white/10 transition-transform duration-300 z-40 ${
          showNodeSettings ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Node Settings
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNodeSettings(false)}
                className="text-white hover:bg-white/10 rounded-xl"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {selectedNode ? (
            <div className="flex-1 overflow-y-auto p-4 workflow-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent' }}>
              <div className="space-y-4">
                {/* Node Info */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedNode.data.color}20` }}
                    >
                      <Settings 
                        className="w-6 h-6" 
                        style={{ color: selectedNode.data.color }}
                      />
                    </div>
                    <div>
                      <h4 className="text-white">{selectedNode.data.label}</h4>
                      <p className="text-[#aeb9e1] text-xs">ID: {selectedNode.id}</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Node Name */}
                <div>
                  <Label className="text-white mb-2 block">Node Name</Label>
                  <Input
                    defaultValue={selectedNode.data.label}
                    onChange={(e) => {
                      setNodes(nds => nds.map(n => 
                        n.id === selectedNode.id 
                          ? { ...n, data: { ...n.data, label: e.target.value } }
                          : n
                      ));
                    }}
                    className="bg-white/5 border-white/10 rounded-xl text-white"
                  />
                </div>

                {/* Dynamic Settings based on node type */}
                {selectedNode.data.nodeType?.includes('chat') && (
                  <>
                    <div>
                      <Label className="text-white mb-2 block">Model</Label>
                      <Select defaultValue={selectedNode.data.config?.model || 'gpt-4'}>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#191919] border-white/10">
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude-3">Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">System Prompt</Label>
                      <Textarea
                        defaultValue={selectedNode.data.config?.prompt || ''}
                        placeholder="You are a helpful assistant..."
                        className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                        rows={5}
                      />
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">
                        Temperature: {selectedNode.data.config?.temperature || 0.7}
                      </Label>
                      <Slider
                        defaultValue={[selectedNode.data.config?.temperature || 0.7]}
                        max={1}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </>
                )}

                {selectedNode.data.nodeType?.includes('message') && (
                  <div>
                    <Label className="text-white mb-2 block">Message Content</Label>
                    <Textarea
                      defaultValue={selectedNode.data.config?.message || ''}
                      placeholder="Enter your message..."
                      className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50"
                      rows={5}
                    />
                    <p className="text-xs text-[#aeb9e1] mt-2">
                      Use {'{{variable}}'} for dynamic content
                    </p>
                  </div>
                )}

                {selectedNode.data.nodeType?.includes('db') && (
                  <>
                    <div>
                      <Label className="text-white mb-2 block">Database Query</Label>
                      <Textarea
                        defaultValue={selectedNode.data.config?.query || ''}
                        placeholder="SELECT * FROM table..."
                        className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50 font-mono text-sm"
                        rows={6}
                      />
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">Table Name</Label>
                      <Input
                        defaultValue={selectedNode.data.config?.table || ''}
                        placeholder="table_name"
                        className="bg-white/5 border-white/10 rounded-xl text-white"
                      />
                    </div>
                  </>
                )}

                {selectedNode.data.nodeType?.includes('if') && (
                  <div>
                    <Label className="text-white mb-2 block">Condition</Label>
                    <Textarea
                      defaultValue={selectedNode.data.config?.condition || ''}
                      placeholder="e.g., user.age > 18 || status === 'active'"
                      className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-[#aeb9e1]/50 font-mono"
                      rows={3}
                    />
                  </div>
                )}

                {selectedNode.data.nodeType?.includes('http') && (
                  <>
                    <div>
                      <Label className="text-white mb-2 block">Method</Label>
                      <Select defaultValue={selectedNode.data.config?.method || 'GET'}>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#191919] border-white/10">
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">URL</Label>
                      <Input
                        defaultValue={selectedNode.data.config?.url || ''}
                        placeholder="https://api.example.com/endpoint"
                        className="bg-white/5 border-white/10 rounded-xl text-white"
                      />
                    </div>
                  </>
                )}

                <Separator className="bg-white/10" />

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="w-full rounded-xl bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Settings
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => handleNodeDuplicate()}
                    variant="outline"
                    className="w-full rounded-xl border-white/10 text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate Node
                  </Button>

                  <Button
                    onClick={() => handleNodeDelete()}
                    variant="outline"
                    className="w-full rounded-xl border-[#F46D6B]/30 text-[#F46D6B] hover:bg-[#F46D6B]/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Node
                  </Button>
                </div>

                {/* Tips */}
                <div className="p-3 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                  <p className="text-[#00E5FF] text-xs flex items-start gap-2">
                    <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Connect nodes by dragging from the output port to an input port</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <Settings className="w-16 h-16 mx-auto mb-4 text-[#aeb9e1]" />
                <h4 className="text-white mb-2">No Node Selected</h4>
                <p className="text-[#aeb9e1] text-sm">
                  Click on a node in the canvas to view and edit its settings
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-[#191919]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-2 z-[100]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => handleNodeDuplicate(contextMenu.nodeId)}
            className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded-lg flex items-center gap-2 text-sm"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
          <button
            onClick={() => handleNodeDelete(contextMenu.nodeId)}
            className="w-full px-4 py-2 text-left text-[#F46D6B] hover:bg-[#F46D6B]/10 rounded-lg flex items-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button
            className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded-lg flex items-center gap-2 text-sm"
          >
            <Power className="w-4 h-4" />
            Disable
          </button>
          <button
            className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded-lg flex items-center gap-2 text-sm"
          >
            <Edit3 className="w-4 h-4" />
            Rename
          </button>
        </div>
      )}
    </div>
  );
}
