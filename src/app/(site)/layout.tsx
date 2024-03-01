"use client"
import Navbar from '@/components/navbar'
import { usePathname } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname()
    return (
        <div>
            {
                !(path === "/login" || path === "/register") && <Navbar></Navbar>
            }
            {children}
        </div>
    )
}

export default Layout