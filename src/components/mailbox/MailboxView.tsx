import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  Mail, 
  MailOpen,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreVertical,
  Paperclip,
  Send,
  Bot
} from 'lucide-react'

export function MailboxView() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>('email-1')
  const [isComposing, setIsComposing] = useState(false)

  const emails = [
    {
      id: 'email-1',
      from: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      subject: 'Re: CRM Integration Proposal',
      preview: 'Thanks for the detailed proposal. I have a few questions about the timeline...',
      timestamp: '2:15 PM',
      isRead: false,
      isStarred: true,
      hasAttachment: true,
      labels: ['prospect', 'high-priority']
    },
    {
      id: 'email-2',
      from: 'AI Assistant',
      email: 'ai@salesagent.com',
      subject: 'Follow-up: Michael Chen - StartupXYZ',
      preview: 'Automated follow-up sent to Michael Chen regarding pricing discussion...',
      timestamp: '11:30 AM',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      labels: ['ai-generated', 'follow-up']
    },
    {
      id: 'email-3',
      from: 'Emily Rodriguez',
      email: 'emily@globalsolutions.com',
      subject: 'Enterprise Plan Inquiry',
      preview: 'Hi, I\'m interested in learning more about your enterprise plan features...',
      timestamp: 'Yesterday',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      labels: ['prospect', 'enterprise']
    },
    {
      id: 'email-4',
      from: 'David Kim',
      email: 'david@innovationlabs.com',
      subject: 'Demo Confirmation',
      preview: 'Looking forward to our demo session next Tuesday at 2 PM...',
      timestamp: '2 days ago',
      isRead: true,
      isStarred: true,
      hasAttachment: false,
      labels: ['scheduled', 'demo']
    }
  ]

  const emailContent = {
    'email-1': {
      from: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      to: 'you@salesagent.com',
      subject: 'Re: CRM Integration Proposal',
      timestamp: 'Today at 2:15 PM',
      content: `Hi there,

Thank you for the comprehensive CRM integration proposal. I've reviewed it with our technical team and we're impressed with the approach.

I have a few questions:

1. What's the expected timeline for the data migration phase?
2. Can you provide more details about the API integration process?
3. What kind of training will be provided for our team?

We're looking to make a decision by the end of this week, so a quick response would be appreciated.

Best regards,
Sarah Johnson
Technical Director, TechCorp Inc.`,
      attachments: ['CRM_Requirements.pdf', 'Technical_Specs.docx']
    }
  }

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'prospect': return 'bg-green-100 text-green-800'
      case 'high-priority': return 'bg-red-100 text-red-800'
      case 'ai-generated': return 'bg-blue-100 text-blue-800'
      case 'follow-up': return 'bg-yellow-100 text-yellow-800'
      case 'enterprise': return 'bg-purple-100 text-purple-800'
      case 'scheduled': return 'bg-indigo-100 text-indigo-800'
      case 'demo': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mailbox</h1>
          <p className="text-gray-600">Integrated email management and tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="inbox">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inbox">Inbox</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="drafts">Drafts</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => setIsComposing(true)}>
            <Mail className="w-4 h-4 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Email List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Inbox</CardTitle>
              <Badge variant="secondary">{emails.filter(e => !e.isRead).length} unread</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search emails..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                    selectedEmail === email.id 
                      ? 'bg-blue-50 border-l-blue-500' 
                      : 'border-l-transparent'
                  } ${!email.isRead ? 'bg-blue-25' : ''}`}
                  onClick={() => setSelectedEmail(email.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2">
                      {email.isRead ? (
                        <MailOpen className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Mail className="w-4 h-4 text-blue-600" />
                      )}
                      {email.isStarred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${
                          !email.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'
                        }`}>
                          {email.from}
                        </p>
                        <div className="flex items-center space-x-1">
                          {email.hasAttachment && (
                            <Paperclip className="w-3 h-3 text-gray-400" />
                          )}
                          {email.from === 'AI Assistant' && (
                            <Bot className="w-3 h-3 text-blue-600" />
                          )}
                        </div>
                      </div>
                      <p className={`text-sm truncate ${
                        !email.isRead ? 'font-medium text-gray-900' : 'text-gray-600'
                      }`}>
                        {email.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">{email.preview}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{email.timestamp}</span>
                        <div className="flex flex-wrap gap-1">
                          {email.labels.slice(0, 2).map((label) => (
                            <Badge key={label} className={`text-xs px-1.5 py-0.5 ${getLabelColor(label)}`}>
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Detail */}
        <Card className="lg:col-span-2">
          {isComposing ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Compose Email</CardTitle>
                  <Button variant="ghost" onClick={() => setIsComposing(false)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <Input placeholder="To: recipient@example.com" />
                  <Input placeholder="Subject" />
                  <Textarea 
                    placeholder="Write your message..." 
                    className="min-h-[300px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => setIsComposing(false)}>
                      Cancel
                    </Button>
                    <Button>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : selectedEmail && emailContent[selectedEmail] ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{emailContent[selectedEmail].subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      From: {emailContent[selectedEmail].from} &lt;{emailContent[selectedEmail].email}&gt;
                    </p>
                    <p className="text-xs text-gray-500">{emailContent[selectedEmail].timestamp}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-900">
                      {emailContent[selectedEmail].content}
                    </pre>
                  </div>
                  
                  {emailContent[selectedEmail].attachments && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Attachments:</p>
                      <div className="space-y-2">
                        {emailContent[selectedEmail].attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <Paperclip className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{attachment}</span>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <Button>
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline">
                      <Forward className="w-4 h-4 mr-2" />
                      Forward
                    </Button>
                    <Button variant="outline">
                      <Bot className="w-4 h-4 mr-2" />
                      AI Suggest Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Select an email to view details</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}