import { useState } from "react";
import {
  Bot,
  Users,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  Edit,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import CreateAgentModal from "../CreateAgentModal";
import LiveDemoPage from "../LiveDemoPage";
import AgentEditorPage from "../AgentEditorPage";

const agents = [
  {
    id: "1",
    name: "Customer Support AI",
    icon: "C",
    color: "bg-[#732CFF]/20 border-[#732CFF]/30",
    textColor: "text-[#732CFF]",
    status: "active",
    users: 1247,
  },
  {
    id: "2",
    name: "Sales Assistant",
    icon: "S",
    color: "bg-[#606283]/20 border-[#606283]/30",
    textColor: "text-[#606283]",
    status: "active",
    users: 892,
  },
  {
    id: "3",
    name: "HR Onboarding Bot",
    icon: "H",
    color: "bg-[#F46D6B]/20 border-[#F46D6B]/30",
    textColor: "text-[#F46D6B]",
    status: "active",
    users: 345,
  },
  {
    id: "4",
    name: "Technical Support",
    icon: "T",
    color: "bg-[#535E82]/20 border-[#535E82]/30",
    textColor: "text-[#535E82]",
    status: "paused",
    users: 567,
  },
  {
    id: "5",
    name: "Marketing AI",
    icon: "M",
    color: "bg-[#aeb9e1]/20 border-[#aeb9e1]/30",
    textColor: "text-[#aeb9e1]",
    status: "active",
    users: 1034,
  },
  {
    id: "6",
    name: "Lead Qualifier",
    icon: "L",
    color: "bg-[#606283]/20 border-[#606283]/30",
    textColor: "text-[#606283]",
    status: "active",
    users: 723,
  },
];

// New data for the analytics dashboard
const messagesPerSessionData = [
  { date: "Oct 3", value: 1.2 },
  { date: "Oct 7", value: 1.8 },
  { date: "Oct 11", value: 1.4 },
  { date: "Oct 15", value: 1.6 },
  { date: "Oct 18", value: 1.9 },
  { date: "Oct 22", value: 1.7 },
  { date: "Oct 31", value: 1.6 },
];

const messagesData = [
  { date: "Oct 3", messages: 8 },
  { date: "Oct 8", messages: 12 },
  { date: "Oct 13", messages: 6 },
  { date: "Oct 18", messages: 15 },
  { date: "Oct 23", messages: 10 },
  { date: "Oct 28", messages: 14 },
];

const threeMonthsData = [
  { month: "Aug", messages: 24 },
  { month: "Sep", messages: 18 },
  { month: "Oct", messages: 32 },
];

const llmActivityData = [
  { date: "Oct 3", activity: 12 },
  { date: "Oct 9", activity: 18 },
  { date: "Oct 15", activity: 8 },
  { date: "Oct 21", activity: 22 },
  { date: "Oct 27", activity: 16 },
];

const llmPerformanceData = [
  { date: "Oct 3", min: 45, avg: 65, max: 85 },
  { date: "Oct 9", min: 50, avg: 70, max: 90 },
  { date: "Oct 15", min: 40, avg: 60, max: 80 },
  { date: "Oct 21", min: 55, avg: 75, max: 95 },
  { date: "Oct 27", min: 48, avg: 68, max: 88 },
];

const llmCostsData = [
  { date: "Oct 3", sum: 0.2, avg: 0.05, max: 0.1 },
  { date: "Oct 9", sum: 0.4, avg: 0.08, max: 0.15 },
  { date: "Oct 15", sum: 0.1, avg: 0.03, max: 0.06 },
  { date: "Oct 21", sum: 0.6, avg: 0.12, max: 0.2 },
  { date: "Oct 27", sum: 0.3, avg: 0.06, max: 0.12 },
];

const userTypesData = [
  { name: "New Users", value: 45, color: "#732CFF" },
  { name: "Returning", value: 35, color: "#606283" },
  { name: "Premium", value: 20, color: "#aeb9e1" },
];

export default function HomePage() {
  const [selectedAgent, setSelectedAgent] = useState<
    string | null
  >(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Show editor if active
  if (showEditor) {
    return (
      <AgentEditorPage 
        onBack={() => {
          setShowEditor(false);
          setShowLiveDemo(false);
          setShowCreateModal(false);
        }} 
      />
    );
  }

  // Show live demo if active
  if (showLiveDemo) {
    return (
      <LiveDemoPage 
        onContinue={() => {
          setShowLiveDemo(false);
          setShowEditor(true);
        }} 
      />
    );
  }

  if (selectedAgent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedAgent(null)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm text-white"
            >
              ← Back to Agents
            </button>
            <h2 className="text-2xl text-white">
              Agent Analytics Dashboard
            </h2>
          </div>
          <button
            onClick={() => setShowEditor(true)}
            className="px-6 py-3 rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-white font-semibold flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Agent
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-[#aeb9e1] text-sm font-medium">
                  Total Users
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#732CFF]/20 flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-5 h-5 text-[#732CFF]" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    5
                  </span>
                  <span className="text-[#aeb9e1] flex items-center gap-1 text-sm font-medium bg-white/10 px-2 py-1 rounded-full">
                    <ArrowUp className="w-3 h-3" />
                    12%
                  </span>
                </div>
                <p className="text-[#aeb9e1] text-sm">
                  Last Month Users
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-[#aeb9e1] text-sm font-medium">
                  Sessions
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#606283]/20 flex items-center justify-center backdrop-blur-sm">
                  <Activity className="w-5 h-5 text-[#606283]" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    10
                  </span>
                  <span className="text-[#aeb9e1] flex items-center gap-1 text-sm font-medium bg-white/10 px-2 py-1 rounded-full">
                    <ArrowUp className="w-3 h-3" />
                    8%
                  </span>
                </div>
                <p className="text-[#aeb9e1] text-sm">
                  Last Month Sessions
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-[#aeb9e1] text-sm font-medium">
                  Messages
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#535E82]/20 flex items-center justify-center backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5 text-[#535E82]" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    32
                  </span>
                  <span className="text-[#aeb9e1] flex items-center gap-1 text-sm font-medium bg-white/10 px-2 py-1 rounded-full">
                    <ArrowUp className="w-3 h-3" />
                    15%
                  </span>
                </div>
                <p className="text-[#aeb9e1] text-sm">
                  Last 30 Days
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-[#aeb9e1] text-sm font-medium">
                  LLM Costs
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#F46D6B]/20 flex items-center justify-center backdrop-blur-sm">
                  <DollarSign className="w-5 h-5 text-[#F46D6B]" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    $1.60
                  </span>
                  <span className="text-[#F46D6B] flex items-center gap-1 text-sm font-medium bg-[#F46D6B]/10 px-2 py-1 rounded-full">
                    <ArrowUp className="w-3 h-3" />
                    5%
                  </span>
                </div>
                <p className="text-[#aeb9e1] text-sm">
                  Last 30 Days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-semibold text-sm">
                Last Month Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-[#aeb9e1]">
                  Bot Messages
                </span>
                <span className="text-white font-bold">16</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-[#aeb9e1]">
                  User Messages
                </span>
                <span className="text-white font-bold">16</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-[#aeb9e1]">Sessions</span>
                <span className="text-white font-bold">10</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white font-semibold">
                Messages per Session
              </CardTitle>
              <span className="text-sm text-[#aeb9e1]">
                Last 30 Days
              </span>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={messagesPerSessionData}>
                  <defs>
                    <linearGradient
                      id="colorMessagesPerSession"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#732CFF"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#732CFF"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2A2A2A"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#aeb9e1"
                    fontSize={12}
                  />
                  <YAxis stroke="#aeb9e1" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191919",
                      border:
                        "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(12px)",
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#732CFF"
                    fillOpacity={1}
                    fill="url(#colorMessagesPerSession)"
                    strokeWidth={2}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages Chart - Changed to Line Chart */}
          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white font-semibold">
                Messages
              </CardTitle>
              <span className="text-sm text-[#aeb9e1]">
                Last 30 Days
              </span>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={messagesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2A2A2A"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#aeb9e1"
                    fontSize={12}
                  />
                  <YAxis stroke="#aeb9e1" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191919",
                      border:
                        "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(12px)",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#606283"
                    strokeWidth={3}
                    dot={{
                      fill: "#606283",
                      r: 4,
                      strokeWidth: 2,
                      stroke: "white",
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#606283",
                      stroke: "white",
                      strokeWidth: 2,
                    }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 3 Months Overview - Changed to Line Chart */}
          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white font-semibold">
                Last 3 Months Overview
              </CardTitle>
              <span className="text-sm text-[#aeb9e1]">
                Last 30 Days
              </span>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={threeMonthsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2A2A2A"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#aeb9e1"
                    fontSize={12}
                  />
                  <YAxis stroke="#aeb9e1" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191919",
                      border:
                        "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(12px)",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#aeb9e1"
                    strokeWidth={3}
                    dot={{
                      fill: "#aeb9e1",
                      r: 6,
                      strokeWidth: 2,
                      stroke: "white",
                    }}
                    activeDot={{
                      r: 8,
                      fill: "#aeb9e1",
                      stroke: "white",
                      strokeWidth: 2,
                    }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* LLM Activity */}
          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white font-semibold">
                LLM Activity
              </CardTitle>
              <span className="text-sm text-[#aeb9e1]">
                Last 30 Days
              </span>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={llmActivityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2A2A2A"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#aeb9e1"
                    fontSize={12}
                  />
                  <YAxis stroke="#aeb9e1" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191919",
                      border:
                        "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(12px)",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="#535E82"
                    strokeWidth={3}
                    dot={{
                      fill: "#535E82",
                      r: 4,
                      strokeWidth: 2,
                      stroke: "white",
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#535E82",
                      stroke: "white",
                      strokeWidth: 2,
                    }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* LLM Performance */}
          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white font-semibold">
                LLM Performance
              </CardTitle>
              <span className="text-sm text-[#aeb9e1]">
                Last 30 Days
              </span>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={llmPerformanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2A2A2A"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#aeb9e1"
                    fontSize={12}
                  />
                  <YAxis stroke="#aeb9e1" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191919",
                      border:
                        "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(12px)",
                      color: "white",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="min"
                    stroke="#732CFF"
                    strokeWidth={2}
                    dot={{ fill: "#732CFF", r: 3 }}
                    animationDuration={1500}
                    name="Minimum"
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="#606283"
                    strokeWidth={2}
                    dot={{ fill: "#606283", r: 3 }}
                    animationDuration={1500}
                    name="Average"
                  />
                  <Line
                    type="monotone"
                    dataKey="max"
                    stroke="#aeb9e1"
                    strokeWidth={2}
                    dot={{ fill: "#aeb9e1", r: 3 }}
                    animationDuration={1500}
                    name="Maximum"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* LLM Costs */}
          <Card className="bg-[#191919] border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white font-semibold">
                LLM Costs
              </CardTitle>
              <span className="text-sm text-[#aeb9e1]">
                Last 30 Days
              </span>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={llmCostsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2A2A2A"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#aeb9e1"
                    fontSize={12}
                  />
                  <YAxis stroke="#aeb9e1" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191919",
                      border:
                        "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(12px)",
                      color: "white",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sum"
                    stroke="#732CFF"
                    strokeWidth={3}
                    dot={{
                      fill: "#732CFF",
                      r: 4,
                      strokeWidth: 2,
                      stroke: "white",
                    }}
                    animationDuration={1500}
                    name="Sum USD $"
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="#606283"
                    strokeWidth={2}
                    dot={{ fill: "#606283", r: 3 }}
                    animationDuration={1500}
                    name="Average USD $"
                  />
                  <Line
                    type="monotone"
                    dataKey="max"
                    stroke="#F46D6B"
                    strokeWidth={2}
                    dot={{ fill: "#F46D6B", r: 3 }}
                    animationDuration={1500}
                    name="Maximum USD $"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-white">
              My AI Agents
            </h2>
            <p className="text-[#aeb9e1] mt-2">
              Manage and monitor your AI agents
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeb9e1]" />
              <input
                type="text"
                placeholder="Search agents..."
                className="pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#732CFF]/50 transition-all text-white placeholder:text-[#aeb9e1]/50 w-64 outline-none"
              />
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-xl bg-[#732CFF] hover:bg-[#732CFF]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-white font-semibold"
            >
              + Create New Agent
            </button>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="bg-[#191919] border-white/10 rounded-2xl hover:border-[#732CFF]/50 transition-all duration-300 cursor-pointer group hover:scale-105 shadow-lg hover:shadow-2xl backdrop-blur-sm"
            onClick={() => setSelectedAgent(agent.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl ${agent.color} flex items-center justify-center text-2xl ${agent.textColor} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {agent.name.charAt(0)}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    agent.status === "active"
                      ? "bg-[#aeb9e1]/20 text-[#aeb9e1] border border-[#aeb9e1]/30"
                      : "bg-[#F46D6B]/20 text-[#F46D6B] border border-[#F46D6B]/30"
                  }`}
                >
                  {agent.status}
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {agent.name}
              </h3>
              <div className="flex items-center gap-2 text-[#aeb9e1]">
                <Users className="w-4 h-4" />
                <span>
                  {agent.users.toLocaleString()} users
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between group-hover:border-white/20 transition-colors">
                <span className="text-[#aeb9e1] group-hover:text-white transition-colors">
                  View Analytics
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#732CFF]/20 flex items-center justify-center group-hover:bg-[#732CFF]/30 transition-colors">
                  <TrendingUp className="w-4 h-4 text-[#732CFF]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>

      {/* Create Agent Modal */}
      <CreateAgentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onComplete={() => {
          setShowCreateModal(false);
          setShowLiveDemo(true);
        }}
      />
    </>
  );
}