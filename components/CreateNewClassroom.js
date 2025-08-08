'use client'
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
import API from '@/axios'
import { useUser } from '@/context/userContext'

function CreateNewClassroom() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const user = useUser()

  const generateCode = () => {
    const randomCode = Math.random().toString(36).substr(2, 6).toUpperCase()
    setCode(randomCode)
  }

  if (!user || user.role !== 'teacher') return null

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed z-50 bg-green-500 shadow-lg bottom-6 right-6 w-14 h-14 hover:bg-green-600"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Classroom</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Input
            placeholder="Classroom Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              placeholder="Classroom Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="button" onClick={generateCode} variant="outline">
              Generate
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              if (!name.trim() || !code.trim()) {
                toast.error('Error', {
                  description: 'Please fill in all fields.',
                })
                return
              }

              try {
                const res = await API.post(`/api/classrooms`, {
                  name: name.trim(),
                  code: code.trim(),
                  teacherId: user.id,
                })
                if (res.status === 201) {
                  toast.success('Classroom created successfully!')
                  setName('')
                  setCode('')
                  setDialogOpen(false)
                }
              } catch (err) {
                console.error(err)
                toast.error('Error', {
                  description: 'Failed to create classroom. Please try again.',
                })
              }
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewClassroom
