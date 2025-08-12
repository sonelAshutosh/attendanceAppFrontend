'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import API from '@/axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUser } from '@/context/userContext'
import { format } from 'date-fns'

export default function ClassroomDetails({ classroom }) {
  const user = useUser()
  const [open, setOpen] = useState(false)
  const [sessionCode, setSessionCode] = useState('')
  const [expireTime, setExpireTime] = useState('')
  const router = useRouter()

  // Generate 5-digit numeric code
  const generateSessionCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString()
    setSessionCode(code)
  }

  const handleSubmit = async () => {
    if (!sessionCode.trim() || !expireTime) return

    // Combine date & selected time into a full Date object
    const today = new Date()
    const [hours, minutes] = expireTime.split(':').map(Number)
    const expireDate = new Date(today)
    expireDate.setHours(hours, minutes, 0, 0)

    const res = await API.post(`/api/attendance/session`, {
      classroomId: classroom._id,
      code: sessionCode,
      qrToken: `${sessionCode}-${expireDate}-${hours}-${minutes}`,
      expiresAt: expireDate.toISOString(),
    })

    if (res.status === 201) {
      setOpen(false)
      setSessionCode('')
      setExpireTime('')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold truncate">
            {classroom.name}
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">Instructor</p>
            <p className="text-sm font-medium">{classroom.createdBy.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">Code</p>
            <p className="font-mono text-sm">{classroom.code}</p>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full my-4" onClick={() => setOpen(true)}>
        Create Attendance Session
      </Button>

      {/* Attendance Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Attendance Session</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Show today's date */}
            <p className="text-sm text-muted-foreground">
              Date: {format(new Date(), 'dd/MM/yyyy')}
            </p>

            {/* Code input with generate button */}
            <div className="flex gap-2">
              <Input
                placeholder="Attendance session code"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
              />
              <Button
                type="button"
                onClick={generateSessionCode}
                variant="outline"
              >
                Generate
              </Button>
            </div>

            {/* Time picker for expiration */}
            <div>
              <label className="block mb-1 text-sm text-muted-foreground">
                Expire At
              </label>
              <Input
                type="time"
                value={expireTime}
                onChange={(e) => setExpireTime(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Classroom Info
          </CardTitle>
          <CardDescription>
            Additional details about the classroom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Created On: {format(new Date(classroom.createdAt), 'dd-MM-yyyy')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
