'use client'

import { useUser } from '@/context/userContext'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import API from '@/axios' // ✅ Import your API instance
import TeacherClassrooms from '@/components/TeacherClassrooms'
import StudentClassrooms from '@/components/StudentClassrooms'

export default function Home() {
  const user = useUser()
  const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    if (!user?.id) return // wait until user is loaded

    const fetchTeacherClassrooms = async () => {
      try {
        const res = await API.get(`/api/classrooms/createdBy/${user.id}`)
        if (res.status === 200) {
          console.log('Teacher classrooms:', res.data)
          setClassrooms(res.data)
        } else {
          toast.error('Failed to fetch classrooms. Please try again.')
        }
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong fetching classrooms.')
      }
    }

    const fetchStudentClassrooms = async () => {
      try {
        const res = await API.get(`/api/classrooms/enrolledBy/${user.id}`)
        if (res.status === 200) {
          console.log('Student classrooms:', res.data)
          setClassrooms(res.data)
        } else {
          toast.error('Failed to fetch classrooms. Please try again.')
        }
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong fetching classrooms.')
      }
    }

    if (user.role === 'teacher') {
      fetchTeacherClassrooms()
    } else if (user.role === 'student') {
      fetchStudentClassrooms()
    }
  }, [user])

  if (user?.role === 'teacher') {
    return <TeacherClassrooms user={user} classrooms={classrooms} />
  } else if (user?.role === 'student') {
    return <StudentClassrooms user={user} classrooms={classrooms} />
  }

  return null
}
