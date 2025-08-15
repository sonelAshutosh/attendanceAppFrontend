import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, CalendarDays, Eye } from 'lucide-react'
import { format } from 'date-fns'
import API from '@/axios'
import Link from 'next/link'

export default async function TeacherPage({ params }) {
  const { id } = await params
  const classrooms = await getTeacherClassrooms(id)

  if (!classrooms) {
    return <p>Loading Teacher Classrooms...</p>
  }

  return (
    <div>
      <div className="space-y-6">
        {classrooms.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classrooms.map((classroom) => (
              <Link key={classroom._id} href={`${id}/${classroom.code}`}>
                <Card
                  key={classroom._id}
                  className="flex flex-col justify-between transition-all hover:shadow-lg hover:border-primary/50"
                >
                  {/* Header */}
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold truncate">
                      {classroom.name}
                    </CardTitle>
                    <p className="font-mono text-sm text-muted-foreground">
                      Code: {classroom.code}
                    </p>
                  </CardHeader>

                  {/* Content */}
                  <CardContent className="space-y-3">
                    {/* Created Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4" />
                      {format(new Date(classroom.createdAt), 'dd MMM yyyy')}
                    </div>

                    {/* //TODO:add student count here */}
                    {/* Students Count */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {classroom.studentsCount || 0} students
                    </div>
                  </CardContent>

                  {/* Footer */}
                  {/* <CardFooter className="flex justify-between pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => console.log('View classroom', classroom._id)}
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  className="gap-1"
                  onClick={() => console.log('Manage classroom', classroom._id)}
                >
                  Manage
                </Button>
              </CardFooter> */}
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            You haven’t created any classrooms yet.
          </p>
        )}
      </div>
    </div>
  )
}

export async function getTeacherClassrooms(teacherId) {
  const res = await API.get(`/api/classrooms/createdBy/${teacherId}`, {
    cache: 'no-store',
  })

  if (res.status === 200) {
    return res.data
  }
  throw new Error('Failed to fetch classrooms')
}
