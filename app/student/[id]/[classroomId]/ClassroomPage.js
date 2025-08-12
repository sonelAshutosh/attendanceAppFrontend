'use client'

import { use, useState } from 'react'
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

export default function ClassroomPage({ classroom }) {
  const user = useUser()
  const [open, setOpen] = useState(false)
  const [sessionCode, setSessionCode] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (!sessionCode.trim()) return
    router.push(`/student/${user.id}/${classroom.code}/${sessionCode}`)
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
        Mark Attendance
      </Button>

      {/* Attendance Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Session Code</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Attendance session code"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
          />
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
