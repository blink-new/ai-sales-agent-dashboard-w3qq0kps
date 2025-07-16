import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Filter, Plus, Phone, Mail, Calendar, MoreHorizontal } from 'lucide-react'

const leads = [
  {
    id: 1,
    name: 'John Smith',
    company: 'TechCorp Inc.',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    status: 'hot',
    score: 92,
    lastContact: '2 hours ago',
    source: 'Website',
    value: '$45,000'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'Digital Solutions',
    email: 'sarah@digitalsol.com',
    phone: '+1 (555) 234-5678',
    status: 'warm',
    score: 78,
    lastContact: '1 day ago',
    source: 'LinkedIn',
    value: '$32,000'
  },
  {
    id: 3,
    name: 'Mike Chen',
    company: 'StartupXYZ',
    email: 'mike@startupxyz.com',
    phone: '+1 (555) 345-6789',
    status: 'cold',
    score: 45,
    lastContact: '5 days ago',
    source: 'Referral',
    value: '$18,000'
  },
  {
    id: 4,
    name: 'Emily Davis',
    company: 'Enterprise Corp',
    email: 'emily@enterprise.com',
    phone: '+1 (555) 456-7890',
    status: 'hot',
    score: 88,
    lastContact: '30 minutes ago',
    source: 'Cold Email',
    value: '$67,000'
  }
]

const statusColors = {
  hot: 'bg-red-50 text-red-700 border-red-200',
  warm: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  cold: 'bg-blue-50 text-blue-700 border-blue-200',
  closed: 'bg-green-50 text-green-700 border-green-200'
}

export function LeadsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600">Manage and track your sales prospects</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`/api/placeholder/40/40`} />
                    <AvatarFallback className="bg-primary text-white">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.company}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status and Score */}
              <div className="flex items-center justify-between">
                <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                  {lead.status.toUpperCase()}
                </Badge>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Score: {lead.score}</div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-primary rounded-full"
                      style={{ width: `${lead.score}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {lead.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {lead.phone}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Value:</span>
                  <div className="font-medium text-gray-900">{lead.value}</div>
                </div>
                <div>
                  <span className="text-gray-500">Source:</span>
                  <div className="font-medium text-gray-900">{lead.source}</div>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last contact: {lead.lastContact}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Meet
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-red-700">Hot Leads</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">28</div>
              <div className="text-sm text-yellow-700">Warm Leads</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-blue-700">Cold Leads</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-green-700">Closed Won</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}