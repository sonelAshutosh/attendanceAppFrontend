import { getSessionByCode } from './getSessionByCode'
import QRDisplay from './QRDisplay'

export default async function SessionPage({ params }) {
  const { sessionCode } = params
  const session = await getSessionByCode(sessionCode)
  return <QRDisplay session={session} />
}
