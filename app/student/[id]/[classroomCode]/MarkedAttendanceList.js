'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import API from '@/axios'
import { useParams } from 'next/navigation'

export default function MarkedAttendanceList({ classroom }) {
  const { id: userId } = useParams()
  const [attendances, setAttendances] = useState([])

  useEffect(() => {
    async function fetchAttendances() {
      const res = await API.get(
        `/api/attendanceRecords/student/${userId}/classroom/${classroom?._id}`
      )
      setAttendances(res.data.attendanceRecords)
    }
    fetchAttendances()
  }, [])

  return (
    <Card className="border shadow-md border-primary/10 bg-muted/40">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          Classroom Info
          {attendances.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {attendances.length} Marked
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-sm">
          {attendances.length > 0
            ? `You have marked attendance ${attendances.length} times in this classroom.`
            : 'No attendance records found.'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            Created On:{' '}
            <span className="font-medium text-foreground">
              {format(new Date(classroom.createdAt), 'dd-MM-yyyy')}
            </span>
          </p>
        </div>

        <Separator className="mb-3" />

        {attendances.length > 0 ? (
          <ul className="space-y-2">
            {attendances.map((record) => (
              <li
                key={record._id}
                className="flex items-center justify-between px-3 py-2 transition-colors border rounded-lg border-border bg-background/50 hover:bg-accent/20"
              >
                <span className="text-sm font-medium">
                  {format(new Date(record.scannedAt), 'dd-MM-yyyy')}
                </span>
                <Badge variant="outline">
                  {format(new Date(record.scannedAt), 'HH:mm')}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            No attendance history yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
