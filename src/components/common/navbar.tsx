"use client"
import { useAuth } from '@/context/user_context'
import { Dropdown } from 'antd'
import { MenuProps } from 'antd/lib'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const { logout, data } = useAuth()
    const router = useRouter()

    const items: MenuProps['items'] = [
        {
            label: <Link href="/services/e-commerce">E-commerce</Link>,
            key: "1",
        },
        {
            label: "LMS",
            key: "2",
        },
        {
            label: "Blog",
            key: "3",
        },
        {
            label: "Company",
            key: "4",
        },
        {
            label: <div className='my-4'>
                <hr className='w-full mb-2' />
                <h1>Sign In</h1>
                <h1>Sign In</h1>
            </div>,
            key: "5",
        }
    ]

    return (
        <div className='fij px-24 py-6'>
            <div className="fi gap-16">
                <Link href='/'>Nav Logo</Link>
                <div className="fi gap-6">
                    <Dropdown menu={{ items }} placement="bottom" arrow overlayStyle={{ width: "150px" }}>
                        <h1 className='cursor-pointer'>Products</h1>
                    </Dropdown>
                    <h1>Features</h1>
                    <h1>Pricing</h1>
                    <h1>Resources</h1>
                </div>
            </div>
            <div className="fi gap-6">
                <Link href="/login">Login</Link>
                {
                    data?.data?.role === "user_service" && <Link href="/services">Get Started</Link>
                }
                {
                    data?.data?.role === "admin" && <Link href="/dashboard">Dashboard</Link>
                }
                <button className='cursor-pointer' onClick={() => {
                    router.push("/login")
                    logout()
                }}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar