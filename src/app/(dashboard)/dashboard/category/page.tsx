"use client"
import { Col, Form, Input, Modal, Row, Spin } from 'antd'
import React, { useEffect } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ApiFetcher, { deleteData } from '@/hooks/use_fetch'
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined'
import UploadImage from '@/components/ui/upload_Image'
import Image from 'next/image'

const CategoryPage = () => {
    const apiFetcher = new ApiFetcher();
    const { Post, Get, Delete, formPost } = new ApiFetcher();
    const { mutation, isSuccess, isPending } = Post("/category", {}) as any
    const { mutation: imageMutation } = formPost("/others/upload-image") as any
    const { data, refetch } = Get("/category") as any

    const [open, setOpen] = React.useState(false);
    const [editData, setEditData] = React.useState({} as any);

    return (
        <div>
            <Form layout="vertical" className='' onFinish={(values) => {

                const data = {
                    image: values?.image && values?.image[0]?.originFileObj
                }

                imageMutation.mutate(data, {
                    onSuccess: (data: any) => {
                        mutation.mutate({
                            ...values,
                            image: data?.data && data?.data
                        }, {
                            onSuccess: () => {
                                refetch()
                            }
                        })
                        // refetch()
                    }
                })

                // mutation.mutate(values)
            }}>
                <Row gutter={16} className='w-full'>
                    <Col xs={24} md={12}>
                        <Form.Item label="Category Name" name={"name"}>
                            <Input className='w-full p-2 border border-slate-300 rounded focus:outline-none' placeholder="Enter category name"></Input>
                        </Form.Item>
                        {isPending ? <Spin></Spin> : <button className='btn'>Add Category</button>}
                    </Col>
                    <Col xs={24} md={12}>
                        <UploadImage name="image" label="Category Image"></UploadImage>
                    </Col>
                </Row>
            </Form>

            <div>
                <Table className='w-full'>
                    <TableHeader className='w-full'>
                        <TableRow className='w-full'>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead colSpan={2} className='text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        {data?.data.map((item: any) => (
                            <TableRow key={item._id} className='w-full'>
                                <TableCell className="font-medium">{item._id}</TableCell>
                                <TableCell className="font-medium">
                                    {item?.image && <Image className='w-[40px] h-[40px]' src={item?.image} alt={"image"} width={50} height={50}></Image>}
                                </TableCell>
                                <TableCell>
                                    <div className='flex group items-center relative'>
                                        <Form layout="vertical" onFinish={(values) => mutation.mutate({ _id: item?._id, name: values?.name })} className='w-full'>
                                            <Form.Item name={"name"}>
                                                <input className='w-full p-2 border border-none bg-transparent rounded focus:outline-none' defaultValue={item?.name} type="text" />
                                                {<button className='bg-green-500 text-white rounded-full pt-1 pb-[3px] hidden px-[7px] cursor-pointer group-hover:block absolute right-0 top-[7px]'>
                                                    <CheckOutlined />
                                                </button>}
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </TableCell>
                                <TableCell colSpan={2} className='space-x-3 text-right'>
                                    <button onClick={() => {
                                        
                                        setOpen(true)
                                    }} className='btn'>Edit</button>
                                    <button onClick={async () => {
                                        await deleteData(`/category/${item._id}`).then(() => refetch())
                                    }} className='btn'>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>

            <Modal open={open} maskClosable={false} onCancel={() => setOpen(false)} title="Edit Category" footer={null}>
                <Form layout="vertical" className='w-full'>
                    <UploadImage name="image"></UploadImage>
                    <Form.Item name={"name"}>
                        <input className='w-full p-2 border border-none bg-transparent rounded focus:outline-none' type="text" />
                    </Form.Item>
                    <button className='bg-green-500 text-white rounded-full pt-1 pb-[3px] hidden px-[7px] cursor-pointer group-hover:block absolute right-0 top-[7px]'>
                        <CheckOutlined />
                    </button>
                </Form>
            </Modal>

        </div>
    )
}

export default CategoryPage