import API from '@/axios'

export default async function ClassroomPage({ params }) {
  const { classroomId } = await params
  const classroom = await getClassroom(classroomId)

  if (!classroom) {
    return <>Loading...</>
  }

  return (
    <div>
      <h1 className="text-xl font-bold">{classroom.name}</h1>
      <p>Instructor: {classroom.createdBy.name}</p>
      <p>Code: {classroom.code}</p>
    </div>
  )
}

async function getClassroom(classroomId) {
  const res = await API.get(`/api/classrooms/class/${classroomId}`, {
    cache: 'no-store',
  })

  if (res.status === 200) {
    return res.data
  }

  return null
}
