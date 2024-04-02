"use client"
import { useAuth } from '@/context/user_context'
import { useRouter } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useAuth()
    const router = useRouter()

  if ( data?.data?.role === "user_service" || data?.data?.role !== "admin") {
    isLoading ? null : router.push('/')
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Layout