import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Construction } from 'lucide-react'

interface PlaceholderViewProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export function PlaceholderView({ title, description, icon }: PlaceholderViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            {icon || <Construction className="w-6 h-6 text-gray-600" />}
          </div>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            This feature is currently under development and will be available soon.
          </p>
          <Button variant="outline">
            Request Early Access
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}