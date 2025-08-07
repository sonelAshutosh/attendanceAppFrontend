'use client'

import { toast, Toaster } from 'sonner'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Navbar from '@/components/Navbar'
import React, { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import API from '@/axios'
import { UserContext } from '@/context/userContext'
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

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-montserrat',
})

const metaData = {
  title: 'Attendance App',
  description: 'A simple attendance management application',
  keywords: 'attendance, management, app, student, profile',
}

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false)
  const [classCode, setClassCode] = useState('')
  const [userData, setUserData] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Swipe detection
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const delta = touchEndX.current - touchStartX.current
    if (delta > 70) {
      setOpen(true)
    } else if (delta < -70) {
      setOpen(false)
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      const cookieMatch = document.cookie.match(/userId=([^;]+)/)
      const userId = cookieMatch?.[1]

      if (userId) {
        try {
          const res = await API.get(`/api/users/${userId}`)
          setUserData(res.data)
        } catch (error) {
          console.error('Failed to fetch user', error)
        }
      }
    }

    getUserData()
  }, [])

  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
      </head>
      <body
        className={`font-sans antialiased ${montserrat.className} h-screen w-screen`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <UserContext.Provider value={userData}>
          <div
            id="main-content"
            style={{
              transform: open ? 'translateX(16rem)' : 'translateX(0)',
              transition: `transform ${open ? '500ms' : '300ms'} ease`,
            }}
          >
            {!isAuthPage && <Navbar open={open} setOpen={setOpen} />}
            <div className="m-4">{children}</div>
          </div>

          {/* Move Dialog + Button here so it's not affected by margins */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Join a Classroom</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
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
                      const res = await API.post(`/api/classrooms/join`, {
                        classCode: classCode.trim(),
                      })
                      if (res.status === 200) {
                        toast('Success', {
                          description:
                            'You have successfully joined the classroom.',
                          type: 'success',
                        })
                      } else {
                        toast('Error', {
                          description:
                            'Failed to join the classroom. Please try again.',
                          type: 'error',
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
        </UserContext.Provider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
