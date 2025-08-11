'use client'

import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    if (user.role === 'teacher') {
      router.replace(`/teacher/${user.id}`)
    } else if (user.role === 'student') {
      router.replace(`/student/${user.id}`)
    }
  }, [user, router])

  return null
}
