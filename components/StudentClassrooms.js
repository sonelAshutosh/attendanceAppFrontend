import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function StudentClassrooms({ classrooms }) {
  return (
    <div className="space-y-6">
      {classrooms.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classrooms.map((classroom) => (
            <Card
              key={classroom._id}
              className="transition-all hover:shadow-lg hover:border-primary/50"
            >
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
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          You haven’t joined any classrooms yet.
        </p>
      )}
    </div>
  )
}
