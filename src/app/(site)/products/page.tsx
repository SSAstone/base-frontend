import Image from 'next/image'
import React from 'react'
import { CheckCircleFilled } from '@ant-design/icons'
import Link from 'next/link'

const ProductsPage = () => {
    return (
        <div className='h-screen'>
            <div className="bg-slate-300 ">
                <div className="container py-12">
                    <div className="">
                        <h1 className="text-3xl font-bold">E-Commerce</h1>
                        <p>Make your own e-commerce. An e-commerce is a form of electronic commerce which allows consumers to directly buy goods or services from a seller.</p>
                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
            <div className="container mt-12">
                <div className="relative p-6 flex items-start gap-6 rounded-xl bg-slate-300">
                    <div className="w-1/2">
                        <Image className='h-52 object-fill' src="/e-comm/hester.png" alt="ecommerce" width={1000} height={1000}></Image>

                    </div>
                    <div className="w-1/2 ">
                        <div className="space-y-2">
                            <div className="flex gap-3 items-center">
                                <CheckCircleFilled />
                                <h3>Make your own e-commerce.</h3>
                            </div>
                            <div className="flex gap-3 items-center">
                                <CheckCircleFilled />
                                <h3>Make your own e-commerce. Make your own</h3>
                            </div>
                            <div className="flex gap-3 items-center">
                                <CheckCircleFilled />
                                <h3>Make your own e-commerce. Make your own </h3>
                            </div>
                            <div className="flex gap-3 items-center">
                                <CheckCircleFilled />
                                <h3>Make your own e-commerce. Make your own</h3>
                            </div>
                            <div className="flex gap-3 items-center">
                                <CheckCircleFilled />
                                <h3>Make your own e-commerce. Make your own </h3>
                            </div>
                        </div>
                        <div className="absolute space-x-8 right-0 bottom-0 p-6">
                            <Link href="/e-commerce" className='animate-pulse hover:underline'>Get Started</Link>
                            <button className='animate-pulse hover:underline'>Make your own</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage