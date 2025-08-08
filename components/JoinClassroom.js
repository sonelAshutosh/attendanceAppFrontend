import React, { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@/context/userContext'
import API from '@/axios'

function JoinClassroom() {
  const user = useUser()
  const [classCode, setClassCode] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  if (!user || user.role !== 'student') return null

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed z-50 shadow-lg bottom-6 right-6 w-14 h-14"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join a Classroom</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Input
            placeholder="Enter class code"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              if (classCode.trim()) {
                const res = await API.post(
                  `/api/classrooms/join/${classCode.trim()}`,
                  {
                    studentId: user.id,
                  }
                )
                if (res.status === 201) {
                  toast.success('Success', {
                    description: 'You have successfully joined the classroom.',
                  })
                  //   TODO: Update state or refetch classrooms, status
                } else if (res.status === 200) {
                  toast.error('Error', {
                    description: res.data.message,
                  })
                } else {
                  toast.error('Error', {
                    description:
                      'Failed to join the classroom. Please try again.',
                  })
                }
                setDialogOpen(false)
                setClassCode('')
              }
            }}
          >
            Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default JoinClassroom
