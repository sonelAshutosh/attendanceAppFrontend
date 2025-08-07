import { Toaster } from 'sonner'
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'Student Attendance System',
  description: 'A web application for managing student attendance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={`font-sans  antialiased ${montserrat.className}`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
