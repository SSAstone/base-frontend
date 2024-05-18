"use client"
import { useAuth } from '@/context/user_context'
import { useRouter } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth()
    const router = useRouter()

  if ( user?.role === "user_service" || user?.role !== "admin") {
    isLoading ? null : router.push('/')
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Layout