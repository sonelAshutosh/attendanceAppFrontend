import API from '@/axios'
import ClassroomPage from './ClassroomPage'

export default async function Page({ params }) {
  const { classroomId } = params
  const classroom = await getClassroom(classroomId)

  return <ClassroomPage classroom={classroom} />
}

async function getClassroom(classroomId) {
  const res = await API.get(`/api/classrooms/class/${classroomId}`, {
    cache: 'no-store',
  })
  if (res.status === 200) return res.data
  return null
}
