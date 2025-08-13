'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import API from '@/axios'
import { Scanner } from '@yudiel/react-qr-scanner'

export default function SessionPage() {
  const [scannedData, setScannedData] = useState(null)

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
      await API.post('/attendance/mark', { qrData: scannedData })
      alert('Attendance marked successfully')
    } catch (error) {
      console.error(error)
      alert('Failed to mark attendance')
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
