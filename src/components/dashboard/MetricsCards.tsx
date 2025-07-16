import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Users, MessageSquare, Phone, Calendar } from 'lucide-react'

const metrics = [
  {
    title: 'Total Leads',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Active Conversations',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Calls Today',
    value: '42',
    change: '-3.1%',
    trend: 'down',
    icon: Phone,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Meetings Scheduled',
    value: '18',
    change: '+15.7%',
    trend: 'up',
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown
        
        return (
          <Card key={metric.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <Icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendIcon className={`w-3 h-3 ${
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        metric.trend === 'up' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}