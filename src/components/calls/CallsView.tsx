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
  Phone, 
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Play,
  Pause,
  Download,
  Clock,
  Calendar,
  User,
  Bot,
  MoreVertical
} from 'lucide-react'

export function CallsView() {
  const [selectedCall, setSelectedCall] = useState<string | null>('call-1')
  const [isPlaying, setIsPlaying] = useState(false)

  const calls = [
    {
      id: 'call-1',
      contact: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      phone: '+1 (555) 123-4567',
      type: 'incoming',
      status: 'completed',
      duration: '24:15',
      timestamp: '2 hours ago',
      hasRecording: true,
      hasTranscript: true,
      outcome: 'Demo Scheduled',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'call-2',
      contact: 'Michael Chen',
      company: 'StartupXYZ',
      phone: '+1 (555) 987-6543',
      type: 'outgoing',
      status: 'completed',
      duration: '18:42',
      timestamp: '4 hours ago',
      hasRecording: true,
      hasTranscript: true,
      outcome: 'Follow-up Required',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'call-3',
      contact: 'Emily Rodriguez',
      company: 'Global Solutions',
      phone: '+1 (555) 456-7890',
      type: 'missed',
      status: 'missed',
      duration: '0:00',
      timestamp: '1 day ago',
      hasRecording: false,
      hasTranscript: false,
      outcome: 'Callback Scheduled',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'call-4',
      contact: 'David Kim',
      company: 'Innovation Labs',
      phone: '+1 (555) 321-0987',
      type: 'outgoing',
      status: 'completed',
      duration: '31:28',
      timestamp: '2 days ago',
      hasRecording: true,
      hasTranscript: true,
      outcome: 'Proposal Sent',
      avatar: '/api/placeholder/32/32'
    }
  ]

  const callTranscript = {
    'call-1': {
      contact: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      duration: '24:15',
      timestamp: 'Today at 2:15 PM',
      summary: 'Discussed CRM integration requirements, timeline, and pricing. Customer is interested in enterprise features and wants to schedule a demo.',
      keyPoints: [
        'Customer needs CRM integration for 500+ users',
        'Timeline requirement: 3-month implementation',
        'Budget approved for enterprise tier',
        'Demo scheduled for next Tuesday'
      ],
      transcript: [
        { speaker: 'You', time: '00:15', text: 'Hi Sarah, thanks for taking the time to speak with me today. I understand you\'re looking into CRM integration solutions?' },
        { speaker: 'Sarah Johnson', time: '00:28', text: 'Yes, that\'s right. We\'ve been using a legacy system and it\'s time for an upgrade. We have about 500 users across different departments.' },
        { speaker: 'You', time: '00:45', text: 'Perfect. Our enterprise solution is designed exactly for organizations your size. Can you tell me more about your current pain points?' },
        { speaker: 'Sarah Johnson', time: '01:02', text: 'The main issues are data silos between departments and lack of real-time reporting. We need something that can integrate with our existing tools.' },
        { speaker: 'AI Assistant', time: '01:20', text: '[Auto-note] Customer mentioned integration requirements - flagged for technical team follow-up' },
        { speaker: 'You', time: '01:25', text: 'Our platform excels at integrations. We have pre-built connectors for most major business tools. What\'s your timeline looking like?' },
        { speaker: 'Sarah Johnson', time: '01:40', text: 'We\'d like to have everything implemented within 3 months. Is that realistic?' },
        { speaker: 'You', time: '01:52', text: 'Absolutely. For an organization your size, we typically see 2-3 month implementations. I\'d love to show you a demo of how this would work for TechCorp.' }
      ],
      nextSteps: [
        'Schedule product demo for next Tuesday',
        'Send enterprise pricing proposal',
        'Connect with technical team for integration assessment'
      ]
    }
  }

  const getCallIcon = (type: string, status: string) => {
    if (status === 'missed') return <PhoneMissed className="w-4 h-4 text-red-500" />
    if (type === 'incoming') return <PhoneIncoming className="w-4 h-4 text-green-500" />
    if (type === 'outgoing') return <PhoneOutgoing className="w-4 h-4 text-blue-500" />
    return <Phone className="w-4 h-4 text-gray-500" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'missed': return 'bg-red-100 text-red-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calls</h1>
          <p className="text-gray-600">Call management and voice transcripts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Calls</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="missed">Missed</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <PhoneCall className="w-4 h-4 mr-2" />
            New Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Calls List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Calls</CardTitle>
              <Badge variant="secondary">{calls.length}</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search calls..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {calls.map((call) => (
                <div
                  key={call.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                    selectedCall === call.id 
                      ? 'bg-blue-50 border-l-blue-500' 
                      : 'border-l-transparent'
                  }`}
                  onClick={() => setSelectedCall(call.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={call.avatar} />
                      <AvatarFallback>
                        {call.contact.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {call.contact}
                        </p>
                        <div className="flex items-center space-x-1">
                          {getCallIcon(call.type, call.status)}
                          {call.hasRecording && (
                            <Play className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{call.company}</p>
                      <p className="text-xs text-gray-600">{call.phone}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{call.timestamp}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{call.duration}</span>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(call.status)}`}>
                          {call.outcome}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call Detail */}
        <Card className="lg:col-span-2">
          {selectedCall && callTranscript[selectedCall] ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{callTranscript[selectedCall].contact}</h3>
                      <p className="text-sm text-gray-600">{callTranscript[selectedCall].company}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {callTranscript[selectedCall].duration}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {callTranscript[selectedCall].timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      {isPlaying ? (
                        <Pause className="w-4 h-4" onClick={() => setIsPlaying(false)} />
                      ) : (
                        <Play className="w-4 h-4" onClick={() => setIsPlaying(true)} />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-6">
                  {/* Call Summary */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Call Summary</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {callTranscript[selectedCall].summary}
                    </p>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Points</h4>
                    <ul className="space-y-1">
                      {callTranscript[selectedCall].keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Transcript */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Transcript</h4>
                    <div className="max-h-64 overflow-y-auto space-y-3 bg-gray-50 p-3 rounded-lg">
                      {callTranscript[selectedCall].transcript.map((entry, index) => (
                        <div key={index} className="flex space-x-3">
                          <span className="text-xs text-gray-500 font-mono w-12 flex-shrink-0">
                            {entry.time}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`text-xs font-medium ${
                                entry.speaker === 'You' ? 'text-blue-600' :
                                entry.speaker === 'AI Assistant' ? 'text-purple-600' :
                                'text-gray-900'
                              }`}>
                                {entry.speaker}
                              </span>
                              {entry.speaker === 'AI Assistant' && (
                                <Bot className="w-3 h-3 text-purple-600" />
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{entry.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
                    <ul className="space-y-1">
                      {callTranscript[selectedCall].nextSteps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <Phone className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Select a call to view details and transcript</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}