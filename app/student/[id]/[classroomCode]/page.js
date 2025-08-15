import API from '@/axios'
import ClassroomPage from './ClassroomPage'

export default async function Page({ params }) {
  const { classroomCode } = await params
  const classroom = await getClassroom(classroomCode)

  return <ClassroomPage classroom={classroom} />
}

async function getClassroom(classroomCode) {
  const res = await API.get(`/api/classrooms/class/${classroomCode}`, {
    cache: 'no-store',
  })
  if (res.status === 200) return res.data
  return null
}
