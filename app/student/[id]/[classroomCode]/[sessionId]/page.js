'use client'

import React, { use, useState } from 'react'
import { Button } from '@/components/ui/button'
import API from '@/axios'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useUser } from '@/context/userContext'
import { toast } from 'sonner'

export default function SessionPage({ params }) {
  const [scannedData, setScannedData] = useState(null)
  const user = useUser()
  const { classroomCode } = use(params)

  const handleScan = (result) => {
    if (result && result.length > 0) {
      setScannedData(result[0].rawValue)
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  const markAttendance = async () => {
    try {
      const [sessionCode, sessionValidTime] = scannedData.split('-')

      const ipRes = await fetch('https://api64.ipify.org?format=json')
      const { ip } = await ipRes.json()

      const userAgent = navigator.userAgent

      const res = await API.post('/api/attendanceRecords/', {
        userId: user.id,
        classroomCode,
        sessionCode,
        ipAddress: ip,
        userAgent,
        sessionValidTime,
      })
      if (res.status === 201) {
        toast.success('Success', {
          description: 'Attendance marked successfully',
        })
        setScannedData(null)
      } else {
        toast.error('Error', {
          description: 'Failed to mark attendance',
        })
      }
    } catch (error) {
      console.error(error)
      toast.error('Error', {
        description: 'Failed to mark attendance',
      })
    }
  }

  return (
    <div className="p-4">
      {!scannedData ? (
        <Scanner onScan={handleScan} onError={handleError} />
      ) : (
        <>
          <p>Scanned: {scannedData}</p>
          <Button onClick={markAttendance}>Mark Today&apos;s Attendance</Button>
        </>
      )}
    </div>
  )
}
