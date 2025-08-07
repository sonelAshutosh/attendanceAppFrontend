'use client'

import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import API from '@/axios'

function Navbar({ open, setOpen }) {
  const [studentName, setStudentName] = useState('')

  useEffect(() => {
    const getStudentName = async () => {
      const cookieMatch = document.cookie.match(/userId=([^;]+)/)
      const userId = cookieMatch?.[1]

      if (userId) {
        try {
          const res = await API.get(`/api/users/${userId}`)
          const user = res.data.name.split(' ')[0]
          setStudentName(user || 'Student')
        } catch (error) {
          console.error('Failed to fetch user', error)
          setStudentName('Student')
        }
      }
    }

    getStudentName()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm bg-white z-10 relative">
        {/* Left menu button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle className="hidden">Menu</SheetTitle>
              <SheetDescription className="hidden">
                Navigate through the options below.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-4 ml-4 space-y-4">
              <p className="font-semibold text-lg">Navigation</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:underline">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/logout" className="hover:underline text-red-500">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>

        {/* Right side welcome */}
        <div className="text-lg font-medium">Hello, {studentName}</div>
      </div>
    </>
  )
}

export default Navbar
