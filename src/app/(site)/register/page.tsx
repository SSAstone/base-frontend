"use client"
import { Form, Input } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import dynamic from 'next/dynamic'
import CloseOutlined from '@ant-design/icons/CloseOutlined'
import { useRouter } from 'next/navigation'

const Modal = dynamic(() => import('antd/lib/modal'), { ssr: false })


const RegisterPage = () => {
    const [show, setShow] = useState(false)

    const router = useRouter()

    return (
        <>
            <Modal
                className='otp-modal'
                open={show}
                footer={null}
            >
                <div className='flex justify-between items-center'>
                    <h1 className='text-center text-xl font-normal text-black'>Enter verification code</h1>
                    <CloseOutlined onClick={() => setShow(false)} />
                </div>
                <h1 className='pb-2 text-center text-gray-500'>{'Verify Code'}</h1>
                <p className='text-center text-gray-500'>Enter the verification code sent to your email</p>
                <div className="flex justify-center items-center">
                    <Form>
                        <Form.Item
                            name="otp"
                            className='my-8'
                        >
                            <OTPInput
                                numInputs={6} renderInput={(props) => <input {...props} />} inputStyle={{
                                    width: '50px',
                                    height: '48px',
                                    marginRight: '1rem',
                                    fontSize: '20px',
                                    border: '1px solid #F79C39',
                                    outline: 'none',
                                }} onChange={function (otp: string): void {
                                    console.log("🚀 ~ RegisterPage ~ otp:", otp)
                                    fetch(process.env.backendUrl + "/user/verified", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({ otp })
                                    }).then((res: any) => res.json()).then((data: any) => {
                                        console.log(data)
                                        if(data.status === 201){
                                            setShow(false)
                                            router.push("/login")
                                        }
                                    }).catch((err: any) => {
                                        console.log(err)
                                    })
                                }} />

                        </Form.Item>
                        <button className='bg-primary text-white w-full h-10 rounded-md mt-4 button_paragraph'  >{"Verify"}</button>
                    </Form>
                </div>
            </Modal>
            <div className='container h-screen flex justify-center items-center relative'>

                <div className="w-full">
                    <Link href="/login" className='absolute top-8 right-8'>Login</Link>
                    <div className="w-1/4 mx-auto">
                        <Form layout="vertical" onFinish={(values) => {
                            fetch(process.env.backendUrl + "/user", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(values)
                            }).then((res: any) => res.json()).then((data: any) => {
                                if(data.status === 201){
                                    setShow(true)
                                }

                            }).catch((err: any) => {
                                console.log(err)
                            })
                        }} className=" mt-8">
                            <Form.Item label="Username:" name={"username"} className=''>
                                <Input className='' placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Email:" name={"email"} className=''>
                                <Input className='' placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Password:" name={"password"}>
                                <Input className='' placeholder="Enter your email" />
                            </Form.Item>
                            <button className="w-full bg-black text-white py-2 rounded-lg">Continue</button>
                        </Form>
                    </div>
                    <p className="text-center mt-12">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </div>
        </>
    )
}



export default RegisterPage