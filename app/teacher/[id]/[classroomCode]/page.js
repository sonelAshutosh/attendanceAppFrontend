import API from '@/axios'
import ClassroomDetails from './ClassroomDetails'

export default async function Page({ params }) {
  const { classroomCode } = params
  const classroom = await getClassroom(classroomCode)

  return <ClassroomDetails classroom={classroom} />
}

async function getClassroom(classroomCode) {
  const res = await API.get(`/api/classrooms/class/${classroomCode}`, {
    cache: 'no-store',
  })
  if (res.status === 200) return res.data
  return null
}
