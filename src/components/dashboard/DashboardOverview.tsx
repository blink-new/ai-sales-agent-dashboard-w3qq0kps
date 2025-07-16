import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MetricsCards } from './MetricsCards'
import { Bot, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'

const recentActivity = [
  {
    id: 1,
    type: 'ai_followup',
    message: 'AI sent follow-up email to John Smith',
    time: '2 minutes ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'meeting_scheduled',
    message: 'Meeting scheduled with Sarah Johnson',
    time: '15 minutes ago',
    status: 'success'
  },
  {
    id: 3,
    type: 'lead_qualified',
    message: 'New lead qualified: Tech Corp',
    time: '1 hour ago',
    status: 'info'
  },
  {
    id: 4,
    type: 'call_missed',
    message: 'Missed call from David Wilson',
    time: '2 hours ago',
    status: 'warning'
  }
]

const aiTasks = [
  {
    id: 1,
    task: 'Send follow-up emails to 12 warm leads',
    status: 'in_progress',
    progress: 75
  },
  {
    id: 2,
    task: 'Qualify 8 new inbound leads',
    status: 'pending',
    progress: 0
  },
  {
    id: 3,
    task: 'Schedule meetings for qualified prospects',
    status: 'completed',
    progress: 100
  }
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <MetricsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-primary" />
              <span>AI Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {task.status === 'completed' && (
                      <Badge className="bg-green-50 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {task.status === 'in_progress' && (
                      <Badge className="bg-blue-50 text-blue-700">
                        <Clock className="w-3 h-3 mr-1" />
                        In Progress
                      </Badge>
                    )}
                    {task.status === 'pending' && (
                      <Badge className="bg-gray-50 text-gray-700">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
                {task.status === 'in_progress' && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{task.progress}%</div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <Bot className="w-6 h-6" />
              <span className="text-sm">Start AI Campaign</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Clock className="w-6 h-6" />
              <span className="text-sm">Schedule Meeting</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm">Add Lead</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <AlertCircle className="w-6 h-6" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}