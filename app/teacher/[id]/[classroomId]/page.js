import API from '@/axios'
import ClassroomDetails from './ClassroomDetails'

export default async function Page({ params }) {
  const { classroomId } = params
  const classroom = await getClassroom(classroomId)

  return <ClassroomDetails classroom={classroom} />
}

async function getClassroom(classroomId) {
  const res = await API.get(`/api/classrooms/class/${classroomId}`, {
    cache: 'no-store',
  })
  if (res.status === 200) return res.data
  return null
}
