import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Phone, 
  Mail,
  Calendar,
  Target,
  Clock,
  BarChart3
} from 'lucide-react'

export function AnalyticsView() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'Active Leads',
      value: '1,247',
      change: '+8.1%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600'
    }
  ]

  const channelPerformance = [
    { channel: 'Email', leads: 456, conversion: '28%', revenue: '$45,200' },
    { channel: 'Phone', leads: 324, conversion: '35%', revenue: '$38,900' },
    { channel: 'Social Media', leads: 289, conversion: '18%', revenue: '$22,100' },
    { channel: 'Website', leads: 178, conversion: '42%', revenue: '$18,300' }
  ]

  const aiActivity = [
    { action: 'Follow-up emails sent', count: 127, status: 'completed' },
    { action: 'Calls scheduled', count: 34, status: 'completed' },
    { action: 'Lead scoring updates', count: 89, status: 'completed' },
    { action: 'Pending responses', count: 12, status: 'pending' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Comprehensive sales analytics and performance insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelPerformance.map((channel) => (
                <div key={channel.channel} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{channel.channel}</p>
                      <p className="text-sm text-gray-600">{channel.leads} leads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{channel.revenue}</p>
                    <Badge variant="secondary">{channel.conversion} conversion</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Activity */}
        <Card>
          <CardHeader>
            <CardTitle>AI Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiActivity.map((activity) => (
                <div key={activity.action} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">Last 24 hours</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-900">{activity.count}</span>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive chart coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}