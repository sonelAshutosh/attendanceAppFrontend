'use client'

import React from 'react'
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
import { useUser } from '@/context/userContext'

function Navbar({ open, setOpen }) {
  const user = useUser()
  const studentName = user?.name?.split(' ')[0] || ''

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm bg-white z-10 relative">
        {/* Left menu button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="border-2">
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
                  <Link href="/profile" className="hover:underline">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li>
                  <Button
                    onClick={() => {
                      // Delete cookies by setting them with past expiry
                      document.cookie = 'accessToken=; Max-Age=0; path=/'
                      document.cookie = 'userId=; Max-Age=0; path=/'

                      // Redirect to logout page (or homepage)
                      window.location.href = '/'
                    }}
                    variant="destructive"
                    className="hover:underline hover:cursor-pointer"
                  >
                    Logout
                  </Button>
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
