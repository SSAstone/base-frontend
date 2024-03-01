"use client"
import { useAuth } from '@/context/user_context'
import { Form, Input, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginPage = () => {
    const { refetch } = useAuth()
    const router = useRouter()
    
    return (
        <div className="w-full relative ">
            <div className="bg-black absolute left-0 top-0 w-1/2 h-full"></div>
            <div className="flex items-center container h-screen relative">
                <div className="absolute right-0 top-8">
                    <Link href="/register">Create an account</Link>
                </div>
                <div className="w-1/2 bg-black h-full"></div>
                <div className="w-1/2 ">
                    <div className="px-10 lg:px-24 mx-auto">
                        <h1 className="text-3xl font-bold text-center">Login to your account</h1>
                        <p className="text-center text-gray-500 mt-2">Right Email and Password to login to your account</p>
                        <Form layout="vertical" onFinish={(values) => {
                            fetch(process.env.backendUrl + "/user/login", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(values),
                                credentials: 'include'
                            }).then((res : any) => res.json()).then((data : any) => {
                                if(data.status === 201) {
                                    refetch()
                                    message.success(data.message)
                                    router.push("/")
                                }
                            }).catch((err : any) => {
                                console.log(err)
                            })                            
                        }} className=" mt-8">
                            <Form.Item label="Username or Email:" name={"username_email"} className=''>
                                <Input className='' placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Password:" name={"password"}>
                                <Input className='' placeholder="Enter your email" />
                            </Form.Item>
                            <button className="w-full bg-black text-white py-2 rounded-lg">Continue</button>
                        </Form>
                        <p className="text-center mt-12">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage