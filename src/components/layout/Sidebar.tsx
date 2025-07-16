import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar,
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
  Puzzle
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'mailbox', label: 'Mailbox', icon: Mail },
  { id: 'calls', label: 'Calls', icon: Phone },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'chat-ai', label: 'Chat with AI', icon: Bot },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Sales AI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 h-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  isCollapsed && "px-2 justify-center",
                  isActive && "bg-primary text-white shadow-sm"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-2 border-t border-gray-200">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-3",
            isCollapsed && "px-2 justify-center"
          )}
        >
          <Settings className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
          {!isCollapsed && (
            <span className="text-sm font-medium">Settings</span>
          )}
        </Button>
      </div>
    </div>
  )
}