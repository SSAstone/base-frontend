"use client"
import UploadImage from '@/components/ui/upload_Image'
import ApiFetcher from '@/hooks/use_fetch'
import { Form, Input, Select, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'

const AddPage = () => {
    const { Get, Post, Delete } = new ApiFetcher()
    const [form] = Form.useForm()
    const { data, isLoading, refetch } = Get("/category") as any
    const { mutation, isSuccess, isPending } = Post("/product") as any

    return (
        <div className='mt-5'>
            <Form form={form} layout="vertical" className='w-1/2' onFinish={(values) => {
                mutation.mutate({
                    ...values,
                    image: values?.image && values?.image[0]?.originFileObj
                })
            }}>
                <Form.Item label="Product Name" name={"name"}>
                    <Input className='w-full p-2 border border-slate-300 rounded focus:outline-none' type="text" placeholder="Enter product name" />
                </Form.Item>
                <Form.Item label="Price" name={"price"}>
                    <Input className='w-full p-2 border border-slate-300 rounded focus:outline-none' type="number" placeholder="Enter price" />
                </Form.Item>
                <Form.Item label="Description" name={"description"}>
                    <TextArea className='w-full p-2 border border-slate-300 rounded focus:outline-none' placeholder="Enter description" rows={4} />
                </Form.Item>
                    <UploadImage label="Image" name={"image"}></UploadImage>
                <Form.Item label="Category" name={"category"}>
                    <Select>
                        {
                            data?.data?.map((category: any) => <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <button className='btn'>Add Product</button>
            </Form>
        </div>
    )
}

export default AddPage