'use client'

import { Toaster } from 'sonner'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { useRef, useState } from 'react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-montserrat',
})

// export const metadata = {
//   title: 'Student Attendance System',
//   description: 'A web application for managing student attendance',
// }

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false)

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
      setOpen(true) // open the drawer if swiped right
    }
  }

  return (
    <html lang="en" className={montserrat.variable}>
      <body
        className={`font-sans  antialiased ${montserrat.className} h-screen w-screen border-2`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          id="main-content"
          style={{
            transform: open ? 'translateX(16rem)' : 'translateX(0)',
            transition: `transform ${open ? '500ms' : '300ms'} `,
          }}
        >
          <Navbar open={open} setOpen={setOpen} />
          <div>{children}</div>
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
