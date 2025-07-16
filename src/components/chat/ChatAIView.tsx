import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Bot, 
  Send, 
  Mic, 
  Paperclip,
  Sparkles,
  MessageSquare,
  Clock,
  TrendingUp,
  Users,
  Target,
  Lightbulb,
  MoreVertical,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

export function ChatAIView() {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const conversations = [
    {
      id: 'conv-1',
      title: 'Lead Qualification Strategy',
      lastMessage: 'Based on your current pipeline, I recommend focusing on enterprise leads...',
      timestamp: '2 hours ago',
      messageCount: 12
    },
    {
      id: 'conv-2',
      title: 'Email Campaign Optimization',
      lastMessage: 'Your open rates could improve by 23% with these subject line changes...',
      timestamp: '1 day ago',
      messageCount: 8
    },
    {
      id: 'conv-3',
      title: 'Sales Forecast Analysis',
      lastMessage: 'Q1 projections show a 15% increase if current trends continue...',
      timestamp: '2 days ago',
      messageCount: 15
    }
  ]

  const messages = [
    {
      id: 1,
      type: 'user',
      content: 'Can you analyze my current sales pipeline and suggest improvements?',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      type: 'ai',
      content: `I've analyzed your sales pipeline and found several optimization opportunities:

**Current Pipeline Analysis:**
• 247 active leads across all stages
• 24% conversion rate (industry average: 20%)
• Average deal size: $12,500
• Sales cycle: 45 days

**Key Recommendations:**

1. **Focus on Enterprise Leads** - Your enterprise deals have a 35% higher close rate
2. **Improve Follow-up Timing** - Leads contacted within 24 hours convert 3x better
3. **Optimize Email Sequences** - A/B test your current templates for better engagement

**Immediate Actions:**
• Prioritize 12 high-value prospects in your "Warm" stage
• Schedule follow-ups for 8 leads that haven't been contacted in 5+ days
• Review pricing strategy for deals stuck in negotiation

Would you like me to create specific action items for any of these recommendations?`,
      timestamp: '2:31 PM',
      suggestions: [
        'Create action plan for enterprise leads',
        'Generate follow-up email templates',
        'Analyze pricing strategy'
      ]
    },
    {
      id: 3,
      type: 'user',
      content: 'Yes, please create an action plan for the enterprise leads.',
      timestamp: '2:35 PM'
    },
    {
      id: 4,
      type: 'ai',
      content: `**Enterprise Lead Action Plan**

**High Priority Prospects (Next 48 Hours):**

1. **TechCorp Inc. - Sarah Johnson**
   - Status: Demo scheduled for Tuesday
   - Action: Send pre-demo materials and agenda
   - Value: $45,000 potential deal

2. **Global Solutions - Emily Rodriguez**
   - Status: Proposal review stage
   - Action: Schedule follow-up call to address concerns
   - Value: $38,000 potential deal

3. **Innovation Labs - David Kim**
   - Status: Technical evaluation
   - Action: Connect with their IT team for integration discussion
   - Value: $52,000 potential deal

**This Week's Focus:**
• Prepare customized ROI calculations for each prospect
• Schedule technical deep-dive sessions
• Create case studies relevant to their industries

**Automated Actions I'll Take:**
• Send personalized follow-up sequences
• Schedule reminder notifications
• Update lead scores based on engagement

Shall I start implementing these actions and set up the automated sequences?`,
      timestamp: '2:36 PM',
      suggestions: [
        'Start automated sequences',
        'Schedule all follow-ups',
        'Generate ROI calculations'
      ]
    }
  ]

  const quickActions = [
    {
      title: 'Analyze Pipeline',
      description: 'Get insights on your current sales pipeline',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Lead Scoring',
      description: 'Update lead scores based on recent activity',
      icon: Target,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Email Templates',
      description: 'Generate personalized email templates',
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Meeting Prep',
      description: 'Prepare for upcoming sales meetings',
      icon: Users,
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const aiCapabilities = [
    'Pipeline analysis and optimization',
    'Lead scoring and qualification',
    'Email template generation',
    'Meeting preparation and follow-ups',
    'Sales forecasting and reporting',
    'Competitive analysis',
    'Pricing strategy recommendations',
    'Customer sentiment analysis'
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return
    
    // Simulate sending message
    setIsTyping(true)
    setMessage('')
    
    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chat with AI</h1>
          <p className="text-gray-600">Get intelligent insights and automate your sales processes</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="sales-assistant">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales-assistant">Sales Assistant</SelectItem>
              <SelectItem value="lead-analyzer">Lead Analyzer</SelectItem>
              <SelectItem value="email-writer">Email Writer</SelectItem>
              <SelectItem value="forecast-expert">Forecast Expert</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Chat History Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              Chat History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="p-3 cursor-pointer hover:bg-gray-50 border-b"
                >
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {conv.title}
                  </p>
                  <p className="text-xs text-gray-600 truncate mt-1">
                    {conv.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{conv.timestamp}</span>
                    <Badge variant="secondary" className="text-xs">
                      {conv.messageCount} msgs
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Chat Area */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Sales Assistant</h3>
                  <p className="text-sm text-gray-600">Online • Ready to help</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[500px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  } rounded-lg p-4`}>
                    {msg.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">AI Assistant</span>
                      </div>
                    )}
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm">
                        {msg.content}
                      </pre>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-xs ${
                        msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </span>
                      {msg.type === 'ai' && (
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {msg.suggestions && (
                      <div className="mt-3 space-y-1">
                        {msg.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="mr-2 mb-1 text-xs h-7"
                            onClick={() => setMessage(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">AI Assistant</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="border-t p-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={action.title}
                      variant="outline"
                      className="h-auto p-3 flex flex-col items-center space-y-1"
                      onClick={() => setMessage(`Help me with ${action.title.toLowerCase()}`)}
                    >
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium">{action.title}</span>
                    </Button>
                  )
                })}
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Ask me anything about your sales process..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[40px] max-h-[120px] resize-none pr-12"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-2 h-6 w-6 p-0"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            AI Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {aiCapabilities.map((capability, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{capability}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}