import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  User,
  Bot,
  Phone,
  Mail,
  MoreVertical
} from 'lucide-react'

export function ConversationsView() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('conv-1')

  const conversations = [
    {
      id: 'conv-1',
      contact: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      lastMessage: 'Thanks for the proposal. When can we schedule a demo?',
      timestamp: '2 hours ago',
      status: 'active',
      unread: 2,
      channel: 'email',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'conv-2',
      contact: 'Michael Chen',
      company: 'StartupXYZ',
      lastMessage: 'AI: Follow-up email sent regarding pricing discussion',
      timestamp: '4 hours ago',
      status: 'ai-handled',
      unread: 0,
      channel: 'email',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'conv-3',
      contact: 'Emily Rodriguez',
      company: 'Global Solutions',
      lastMessage: 'Can you provide more details about the enterprise plan?',
      timestamp: '1 day ago',
      status: 'pending',
      unread: 1,
      channel: 'phone',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'conv-4',
      contact: 'David Kim',
      company: 'Innovation Labs',
      lastMessage: 'AI: Scheduled demo for next Tuesday at 2 PM',
      timestamp: '2 days ago',
      status: 'scheduled',
      unread: 0,
      channel: 'email',
      avatar: '/api/placeholder/32/32'
    }
  ]

  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      content: 'Hi, I received your proposal for our CRM integration project. It looks comprehensive.',
      timestamp: '10:30 AM',
      type: 'received'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you for reviewing it! I\'m glad you found it comprehensive. Do you have any specific questions about the implementation timeline?',
      timestamp: '10:45 AM',
      type: 'sent'
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      content: 'Yes, I\'m particularly interested in the data migration process. How long would that typically take?',
      timestamp: '11:15 AM',
      type: 'received'
    },
    {
      id: 4,
      sender: 'AI Assistant',
      content: 'Based on similar projects, data migration for a company of TechCorp\'s size typically takes 2-3 weeks. I\'ve scheduled a technical deep-dive call for tomorrow.',
      timestamp: '11:20 AM',
      type: 'ai'
    },
    {
      id: 5,
      sender: 'Sarah Johnson',
      content: 'Thanks for the proposal. When can we schedule a demo?',
      timestamp: '2:15 PM',
      type: 'received'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'ai-handled': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'scheduled': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />
      case 'phone': return <Phone className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conversations</h1>
          <p className="text-gray-600">Track and manage all customer conversations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="ai-handled">AI Handled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Badge variant="secondary">{conversations.length}</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                    selectedConversation === conversation.id 
                      ? 'bg-blue-50 border-l-blue-500' 
                      : 'border-l-transparent'
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>
                        {conversation.contact.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.contact}
                        </p>
                        <div className="flex items-center space-x-1">
                          {getChannelIcon(conversation.channel)}
                          {conversation.unread > 0 && (
                            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{conversation.company}</p>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        <Badge className={`text-xs ${getStatusColor(conversation.status)}`}>
                          {conversation.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversation Detail */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                      <p className="text-sm text-gray-600">TechCorp Inc. • sarah@techcorp.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        message.type === 'sent' 
                          ? 'bg-primary text-white' 
                          : message.type === 'ai'
                          ? 'bg-blue-100 text-blue-900 border border-blue-200'
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg p-3`}>
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-1 mb-1">
                            <Bot className="w-3 h-3" />
                            <span className="text-xs font-medium">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Select a conversation to view details</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}