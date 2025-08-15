import API from '@/axios'

export async function getSessionByCode(sessionCode) {
  const res = await API.get(`/api/attendance/session/sId/${sessionCode}`)
  return res.data
}
