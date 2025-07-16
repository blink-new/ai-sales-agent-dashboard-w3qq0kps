import { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { DashboardOverview } from './components/dashboard/DashboardOverview'
import { AnalyticsView } from './components/analytics/AnalyticsView'
import { LeadsView } from './components/leads/LeadsView'
import { ConversationsView } from './components/conversations/ConversationsView'
import { MailboxView } from './components/mailbox/MailboxView'
import { CallsView } from './components/calls/CallsView'
import { CalendarView } from './components/calendar/CalendarView'
import { ChatAIView } from './components/chat/ChatAIView'
import { IntegrationsView } from './components/integrations/IntegrationsView'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />
      case 'analytics':
        return <AnalyticsView />
      case 'leads':
        return <LeadsView />
      case 'conversations':
        return <ConversationsView />
      case 'mailbox':
        return <MailboxView />
      case 'calls':
        return <CallsView />
      case 'calendar':
        return <CalendarView />
      case 'chat-ai':
        return <ChatAIView />
      case 'integrations':
        return <IntegrationsView />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App