'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import API from '@/axios'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await API.post('/api/users/login', {
      email,
      password,
    })

    if (res.status !== 200) {
      toast('Invalid Credentials', {
        type: 'error',
      })
    } else {
      toast('Login Successful', {
        type: 'success',
      })
    }

    document.cookie = `accessToken=${res.data.accessToken}; path=/`
    document.cookie = `userId=${res.data.userId}; path=/`
    router.push('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-md">
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-bold text-center">Login</h2>

            <Input
              id="email"
              type="email"
              placeholder="Email (without @iitj.ac.in)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                const localPart = email.split('@')[0]
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

            <Button type="submit" className="w-full">
              Login
            </Button>

            <p className="text-sm text-center">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
