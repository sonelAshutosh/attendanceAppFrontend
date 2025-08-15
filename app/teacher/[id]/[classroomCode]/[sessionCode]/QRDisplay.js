'use client'

import { QRCodeCanvas } from 'qrcode.react'

export default function QRDisplay({ session }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="mb-4 text-2xl font-bold">{session.classroomId.name}</h1>
      <p className="mb-6 text-muted-foreground">
        Code: <span className="font-mono">{session.sessionCode}</span>
      </p>
      <QRCodeCanvas value={session.qrToken} size={256} includeMargin />
      <p className="mt-4 text-sm text-muted-foreground">
        Expires at: {new Date(session.expiresAt).toLocaleString()}
      </p>
    </div>
  )
}
