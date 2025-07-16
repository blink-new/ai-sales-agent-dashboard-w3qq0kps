import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { 
  Search, 
  Filter, 
  Puzzle,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Database,
  BarChart3,
  CreditCard,
  Users,
  Globe,
  Zap,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Plus
} from 'lucide-react'

export function IntegrationsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const integrations = [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync meetings and events with your Google Calendar',
      category: 'calendar',
      icon: Calendar,
      status: 'connected',
      isEnabled: true,
      features: ['Two-way sync', 'Meeting scheduling', 'Automatic reminders'],
      setupTime: '2 minutes',
      popularity: 'Most popular'
    },
    {
      id: 'outlook-calendar',
      name: 'Outlook Calendar',
      description: 'Integrate with Microsoft Outlook for seamless scheduling',
      category: 'calendar',
      icon: Calendar,
      status: 'available',
      isEnabled: false,
      features: ['Calendar sync', 'Meeting invites', 'Availability tracking'],
      setupTime: '3 minutes',
      popularity: 'Popular'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Connect your Gmail account for email tracking and automation',
      category: 'email',
      icon: Mail,
      status: 'connected',
      isEnabled: true,
      features: ['Email tracking', 'Auto-responses', 'Template sync'],
      setupTime: '2 minutes',
      popularity: 'Most popular'
    },
    {
      id: 'outlook-email',
      name: 'Outlook Email',
      description: 'Integrate with Microsoft Outlook for email management',
      category: 'email',
      icon: Mail,
      status: 'available',
      isEnabled: false,
      features: ['Email sync', 'Tracking', 'Automation'],
      setupTime: '3 minutes',
      popularity: 'Popular'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Schedule and manage Zoom meetings directly from your dashboard',
      category: 'communication',
      icon: Phone,
      status: 'connected',
      isEnabled: true,
      features: ['Meeting scheduling', 'Recording access', 'Participant tracking'],
      setupTime: '2 minutes',
      popularity: 'Most popular'
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Integrate with Teams for video calls and collaboration',
      category: 'communication',
      icon: MessageSquare,
      status: 'available',
      isEnabled: false,
      features: ['Video calls', 'Chat integration', 'File sharing'],
      setupTime: '3 minutes',
      popularity: 'Popular'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates in your Slack workspace',
      category: 'communication',
      icon: MessageSquare,
      status: 'available',
      isEnabled: false,
      features: ['Real-time notifications', 'Deal updates', 'Team collaboration'],
      setupTime: '2 minutes',
      popularity: 'Popular'
    },
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      description: 'Sync leads and contacts with your HubSpot CRM',
      category: 'crm',
      icon: Database,
      status: 'available',
      isEnabled: false,
      features: ['Contact sync', 'Deal tracking', 'Activity logging'],
      setupTime: '5 minutes',
      popularity: 'Popular'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect with Salesforce for comprehensive CRM integration',
      category: 'crm',
      icon: Database,
      status: 'available',
      isEnabled: false,
      features: ['Lead management', 'Opportunity tracking', 'Custom fields'],
      setupTime: '10 minutes',
      popularity: 'Enterprise'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Process payments and track revenue from closed deals',
      category: 'payment',
      icon: CreditCard,
      status: 'available',
      isEnabled: false,
      features: ['Payment processing', 'Revenue tracking', 'Subscription management'],
      setupTime: '5 minutes',
      popularity: 'Popular'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps through Zapier automation',
      category: 'automation',
      icon: Zap,
      status: 'available',
      isEnabled: false,
      features: ['Workflow automation', '5000+ app connections', 'Custom triggers'],
      setupTime: '3 minutes',
      popularity: 'Power users'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Sales Navigator',
      description: 'Import prospects and track engagement from LinkedIn',
      category: 'social',
      icon: Users,
      status: 'coming-soon',
      isEnabled: false,
      features: ['Prospect import', 'Engagement tracking', 'Social selling'],
      setupTime: '5 minutes',
      popularity: 'Coming soon'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Integrations', count: integrations.length },
    { id: 'calendar', label: 'Calendar', count: integrations.filter(i => i.category === 'calendar').length },
    { id: 'email', label: 'Email', count: integrations.filter(i => i.category === 'email').length },
    { id: 'communication', label: 'Communication', count: integrations.filter(i => i.category === 'communication').length },
    { id: 'crm', label: 'CRM', count: integrations.filter(i => i.category === 'crm').length },
    { id: 'payment', label: 'Payment', count: integrations.filter(i => i.category === 'payment').length },
    { id: 'automation', label: 'Automation', count: integrations.filter(i => i.category === 'automation').length }
  ]

  const connectedIntegrations = integrations.filter(i => i.status === 'connected')

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'available': return <Plus className="w-4 h-4 text-gray-400" />
      case 'coming-soon': return <Clock className="w-4 h-4 text-yellow-500" />
      default: return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'available': return 'bg-blue-100 text-blue-800'
      case 'coming-soon': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-red-100 text-red-800'
    }
  }

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'Most popular': return 'bg-purple-100 text-purple-800'
      case 'Popular': return 'bg-blue-100 text-blue-800'
      case 'Enterprise': return 'bg-orange-100 text-orange-800'
      case 'Power users': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect your favorite tools and automate your workflow</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary">{connectedIntegrations.length} connected</Badge>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Manage
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Request Integration
          </Button>
        </div>
      </div>

      {/* Connected Integrations Summary */}
      {connectedIntegrations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Connected Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {connectedIntegrations.map((integration) => {
                const Icon = integration.icon
                return (
                  <div key={integration.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="p-2 bg-white rounded-lg">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{integration.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Switch checked={integration.isEnabled} size="sm" />
                        <span className="text-xs text-gray-600">
                          {integration.isEnabled ? 'Active' : 'Paused'}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => {
          const Icon = integration.icon
          return (
            <Card key={integration.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(integration.status)}
                        <Badge className={`text-xs ${getStatusColor(integration.status)}`}>
                          {integration.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getPopularityColor(integration.popularity)}`}>
                    {integration.popularity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{integration.description}</p>
                
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Features:</p>
                  <ul className="space-y-1">
                    {integration.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Setup time: {integration.setupTime}</span>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Learn more
                  </Button>
                </div>

                <div className="pt-2 border-t">
                  {integration.status === 'connected' ? (
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Switch checked={integration.isEnabled} />
                    </div>
                  ) : integration.status === 'available' ? (
                    <Button className="w-full" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" size="sm" disabled>
                      <Clock className="w-4 h-4 mr-2" />
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredIntegrations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Puzzle className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
            <p className="text-gray-600 text-center mb-4">
              Try adjusting your search terms or browse different categories
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
            }}>
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Integration Request */}
      <Card>
        <CardHeader>
          <CardTitle>Don't see what you need?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                Request a new integration and we'll prioritize it based on demand.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Most requested integrations are built within 30 days.
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Request Integration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}