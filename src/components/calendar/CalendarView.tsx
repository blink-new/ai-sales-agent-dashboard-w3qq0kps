import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  Filter,
  MoreVertical
} from 'lucide-react'

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')

  const events = [
    {
      id: 'event-1',
      title: 'Demo - TechCorp Inc.',
      contact: 'Sarah Johnson',
      type: 'demo',
      date: '2024-01-16',
      time: '2:00 PM - 3:00 PM',
      duration: '1 hour',
      location: 'Zoom Meeting',
      attendees: ['Sarah Johnson', 'Mike Wilson'],
      status: 'confirmed',
      description: 'Product demonstration for CRM integration project',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'event-2',
      title: 'Follow-up Call - StartupXYZ',
      contact: 'Michael Chen',
      type: 'call',
      date: '2024-01-16',
      time: '4:30 PM - 5:00 PM',
      duration: '30 minutes',
      location: 'Phone Call',
      attendees: ['Michael Chen'],
      status: 'confirmed',
      description: 'Discuss pricing and next steps',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'event-3',
      title: 'Discovery Call - Global Solutions',
      contact: 'Emily Rodriguez',
      type: 'discovery',
      date: '2024-01-17',
      time: '10:00 AM - 11:00 AM',
      duration: '1 hour',
      location: 'Google Meet',
      attendees: ['Emily Rodriguez', 'James Park'],
      status: 'pending',
      description: 'Initial discovery call to understand requirements',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 'event-4',
      title: 'Proposal Review - Innovation Labs',
      contact: 'David Kim',
      type: 'meeting',
      date: '2024-01-18',
      time: '3:00 PM - 4:00 PM',
      duration: '1 hour',
      location: 'Office Conference Room A',
      attendees: ['David Kim', 'Lisa Chen', 'Alex Thompson'],
      status: 'confirmed',
      description: 'Review and finalize proposal details',
      avatar: '/api/placeholder/32/32'
    }
  ]

  const todayEvents = events.filter(event => event.date === '2024-01-16')
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date('2024-01-16'))

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'demo': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'call': return 'bg-green-100 text-green-800 border-green-200'
      case 'discovery': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'meeting': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />
      case 'demo': 
      case 'meeting': return <Video className="w-4 h-4" />
      default: return <CalendarIcon className="w-4 h-4" />
    }
  }

  // Simple calendar grid for the month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDay = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay))
      currentDay.setDate(currentDay.getDate() + 1)
    }
    
    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateStr)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Schedule and manage meetings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={view} onValueChange={(value: 'month' | 'week' | 'day') => setView(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(currentDate)
                    newDate.setMonth(newDate.getMonth() - 1)
                    setCurrentDate(newDate)
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold">{formatDate(currentDate)}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(currentDate)
                    newDate.setMonth(newDate.getMonth() + 1)
                    setCurrentDate(newDate)
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {view === 'month' && (
              <div className="grid grid-cols-7 gap-0">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 border-b">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {generateCalendarDays().map((date, index) => {
                  const dayEvents = getEventsForDate(date)
                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border-b border-r ${
                        !isCurrentMonth(date) ? 'bg-gray-50' : ''
                      } ${isToday(date) ? 'bg-blue-50' : ''}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        !isCurrentMonth(date) ? 'text-gray-400' :
                        isToday(date) ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)}`}
                            onClick={() => setSelectedEvent(event.id)}
                          >
                            <div className="flex items-center space-x-1">
                              {getEventIcon(event.type)}
                              <span className="truncate">{event.title}</span>
                            </div>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayEvents.length > 0 ? (
                todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                      selectedEvent === event.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-600">{event.time}</p>
                        <Badge className={`text-xs mt-1 ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No events scheduled for today
                </p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={event.avatar} />
                      <AvatarFallback>
                        {event.contact.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-600">{event.contact}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()} • {event.time.split(' - ')[0]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Event Details */}
          {selectedEvent && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Event Details</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const event = events.find(e => e.id === selectedEvent)
                  if (!event) return null
                  
                  return (
                    <>
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Attendees</p>
                        <div className="space-y-1">
                          {event.attendees.map((attendee, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {attendee.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">{attendee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">Edit</Button>
                        <Button size="sm" variant="outline" className="flex-1">Join</Button>
                      </div>
                    </>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}