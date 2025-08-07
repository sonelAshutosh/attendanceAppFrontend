'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/context/userContext'

export default function Profile() {
  const user = useUser()

  if (!user) return <p className="p-6 text-gray-500">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-md border bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-lg font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Roll Number</p>
            <p className="text-lg font-medium">{user.rollNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <Badge variant="outline" className="text-sm capitalize">
              {user.role}
            </Badge>
          </div>
          {user.createdAt && (
            <div>
              <p className="text-sm text-muted-foreground">Joined On</p>
              <p className="text-lg font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
