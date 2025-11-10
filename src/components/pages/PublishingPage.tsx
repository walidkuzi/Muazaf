import { FileText, Star, ThumbsUp, ThumbsDown, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const transcriptions = [
  {
    id: '1',
    user: 'John Doe',
    agent: 'Customer Support AI',
    date: '2024-11-01 14:30',
    duration: '5:23',
    messages: 12,
    sentiment: 'positive',
    transcript: 'User asked about account issues, agent provided password reset assistance.'
  },
  {
    id: '2',
    user: 'Jane Smith',
    agent: 'Sales Assistant',
    date: '2024-11-01 13:15',
    duration: '8:45',
    messages: 18,
    sentiment: 'neutral',
    transcript: 'User inquired about pricing plans, agent explained different tiers.'
  },
  {
    id: '3',
    user: 'Mike Johnson',
    agent: 'Technical Support',
    date: '2024-11-01 11:20',
    duration: '12:30',
    messages: 24,
    sentiment: 'positive',
    transcript: 'User reported bug, agent provided workaround and escalated to dev team.'
  },
  {
    id: '4',
    user: 'Sarah Williams',
    agent: 'Customer Support AI',
    date: '2024-11-01 09:45',
    duration: '3:15',
    messages: 8,
    sentiment: 'negative',
    transcript: 'User frustrated with delayed response, agent apologized and offered compensation.'
  },
];

const evaluations = [
  {
    id: '1',
    agent: 'Customer Support AI',
    period: 'Last 7 days',
    accuracy: 94,
    responseTime: '1.2s',
    satisfaction: 4.8,
    resolved: 87,
    totalConversations: 342
  },
  {
    id: '2',
    agent: 'Sales Assistant',
    period: 'Last 7 days',
    accuracy: 91,
    responseTime: '1.5s',
    satisfaction: 4.6,
    resolved: 82,
    totalConversations: 267
  },
  {
    id: '3',
    agent: 'Technical Support',
    period: 'Last 7 days',
    accuracy: 89,
    responseTime: '2.1s',
    satisfaction: 4.5,
    resolved: 79,
    totalConversations: 156
  },
];

export default function PublishingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white">Publishing & Analytics</h2>
        <p className="text-[#aeb9e1] mt-2">Review transcriptions and performance evaluations</p>
      </div>

      <Tabs defaultValue="transcriptions">
        <TabsList className="bg-[#191919] border-white/10 border p-1 rounded-xl">
          <TabsTrigger value="transcriptions" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Transcriptions
          </TabsTrigger>
          <TabsTrigger value="evaluations" className="rounded-lg data-[state=active]:bg-white/10 text-[#aeb9e1] data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Evaluations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transcriptions" className="space-y-4 mt-6">
          {transcriptions.map((transcript) => (
            <Card key={transcript.id} className="bg-[#191919] border-white/10 rounded-xl hover:border-[#732CFF]/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#732CFF]/20">
                      <FileText className="w-6 h-6 text-[#732CFF]" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-white">{transcript.user}</h3>
                      <div className="flex items-center gap-3 text-[#aeb9e1]">
                        <span>Agent: {transcript.agent}</span>
                        <span>•</span>
                        <span>{transcript.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    className={`rounded-lg ${
                      transcript.sentiment === 'positive' ? 'bg-[#aeb9e1]/20 text-[#aeb9e1] border-[#aeb9e1]/30 border' :
                      transcript.sentiment === 'neutral' ? 'bg-[#606283]/20 text-[#606283] border-[#606283]/30 border' :
                      'bg-[#F46D6B]/20 text-[#F46D6B] border-[#F46D6B]/30 border'
                    }`}
                  >
                    {transcript.sentiment}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-[#2A2A2A] border-white/10 border p-3 rounded-lg">
                    <p className="text-[#aeb9e1] mb-1">Duration</p>
                    <p className="text-white">{transcript.duration}</p>
                  </div>
                  <div className="bg-[#2A2A2A] border-white/10 border p-3 rounded-lg">
                    <p className="text-[#aeb9e1] mb-1">Messages</p>
                    <p className="text-white">{transcript.messages}</p>
                  </div>
                  <div className="bg-[#2A2A2A] border-white/10 border p-3 rounded-lg">
                    <p className="text-[#aeb9e1] mb-1">Sentiment</p>
                    <div className="flex items-center gap-2">
                      {transcript.sentiment === 'positive' && (
                        <div className="w-7 h-7 rounded bg-[#aeb9e1]/20 flex items-center justify-center">
                          <ThumbsUp className="w-4 h-4 text-[#aeb9e1]" />
                        </div>
                      )}
                      {transcript.sentiment === 'negative' && (
                        <div className="w-7 h-7 rounded bg-[#F46D6B]/20 flex items-center justify-center">
                          <ThumbsDown className="w-4 h-4 text-[#F46D6B]" />
                        </div>
                      )}
                      {transcript.sentiment === 'neutral' && <span className="w-4 h-4 text-white">➖</span>}
                      <span className="capitalize text-white">{transcript.sentiment}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-[#aeb9e1]">{transcript.transcript}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-4 mt-6">
          {evaluations.map((evaluation) => (
            <Card key={evaluation.id} className="bg-[#191919] border-white/10 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="mb-1 text-white">{evaluation.agent}</h3>
                    <p className="text-[#aeb9e1]">{evaluation.period}</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] border-white/10 border rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-[#F46D6B]/20 flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#F46D6B] fill-[#F46D6B]" />
                    </div>
                    <span className="text-xl text-white">{evaluation.satisfaction}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#aeb9e1]">Accuracy</span>
                      <span className="text-white">{evaluation.accuracy}%</span>
                    </div>
                    <Progress value={evaluation.accuracy} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#aeb9e1]">Resolved</span>
                      <span className="text-white">{evaluation.resolved}%</span>
                    </div>
                    <Progress value={evaluation.resolved} className="h-2" />
                  </div>
                  <div className="bg-[#2A2A2A] border-white/10 border p-3 rounded-lg">
                    <p className="text-[#aeb9e1] mb-1">Response Time</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#aeb9e1]" />
                      <span className="text-white">{evaluation.responseTime}</span>
                    </div>
                  </div>
                  <div className="bg-[#2A2A2A] border-white/10 border p-3 rounded-lg">
                    <p className="text-[#aeb9e1] mb-1">Conversations</p>
                    <p className="text-white">{evaluation.totalConversations}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="mb-3 text-white">Performance Breakdown</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#aeb9e1]">Understanding</span>
                        <span className="text-white">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#aeb9e1]">Helpfulness</span>
                        <span className="text-white">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#aeb9e1]">Professionalism</span>
                        <span className="text-white">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
