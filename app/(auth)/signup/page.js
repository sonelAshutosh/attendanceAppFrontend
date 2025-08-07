'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import API from '@/axios'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !rollNumber || !email || !password || !confirmPassword) {
      toast('Error', {
        description: 'Please fill in all fields',
        type: 'error',
        variant: 'destructive',
      })
      return
    }

    if (password !== confirmPassword) {
      toast('Error', {
        description: 'Passwords do not match',
        type: 'error',
        variant: 'destructive',
      })
      return
    }

    try {
      const res = await API.post('/api/users', {
        name,
        rollNumber,
        email,
        password,
      })

      if (res.status === 201) {
        toast('Success', {
          description: 'Account created successfully',
          type: 'success',
        })
        router.push('/login')
      } else {
        toast('Error', {
          description: res?.data?.message || 'Failed to create account',
          type: 'error',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast('Error', {
        description:
          err?.response?.data?.message || 'An unexpected error occurred',
        type: 'error',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

            <Input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <Input
              id="rollNumber"
              type="text"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <Input
              id="email"
              type="email"
              placeholder="Email (without @iitj.ac.in)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                const localPart = e.target.value.split('@')[0]
                setEmail(`${localPart}@iitj.ac.in`)
              }}
              className="bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <p className="text-sm text-center">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
