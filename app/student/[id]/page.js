import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import API from '@/axios'

export default async function StudentPage({ params }) {
  const { id } = await params
  const classrooms = await getStudentClassrooms(id)

  if (!classrooms) {
    return <p>Loading Student Classrooms...</p>
  }

  return (
    <div>
      <div className="space-y-6">
        {classrooms.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classrooms.map((classroom) => (
              <Link key={classroom._id} href={`${id}/${classroom.code}`}>
                <Card className="transition-all cursor-pointer hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {classroom.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Instructor: {classroom.teacherName || 'Unknown'}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Code: <span className="font-mono">{classroom.code}</span>
                    </p>
                    {classroom.joinedAt && (
                      <p className="text-xs text-muted-foreground">
                        Joined on:{' '}
                        {new Date(classroom.joinedAt).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            You haven’t joined any classrooms yet.
          </p>
        )}
      </div>
    </div>
  )
}

export async function getStudentClassrooms(studentId) {
  const res = await API.get(`/api/classrooms/enrolledBy/${studentId}`, {
    cache: 'no-store',
  })

  if (res.status === 200) {
    return res.data
  }
  throw new Error('Failed to fetch classrooms')
}
