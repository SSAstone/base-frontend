"use client"
import { Form, Input } from 'antd'
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

const CategoryPage = () => {
    const apiFetcher = new ApiFetcher();
    const { Post, Get, Delete } = new ApiFetcher();
    const { mutation, isSuccess, isPending } = Post("/category", {}) as any
    const { data, refetch } = Get("/category") as any
    // const { deleteData } = Delete("/category") as any
    // const { data, refetch, deleteData } = apiFetcher.generateFetcher('/category') as any



    return (
        <div>
            <Form layout="vertical" className='w-1/2' onFinish={(values) => {
                mutation.mutate(values)
                refetch()
            }}>
                <Form.Item label="Category Name" name={"name"}>
                    <Input className='w-full p-2 border border-slate-300 rounded focus:outline-none' placeholder="Enter category name"></Input>
                </Form.Item>

                <button className='btn'>Add Category</button>
            </Form>

            <div>
                <Table className='w-full'>
                    <TableHeader className='w-full'>
                        <TableRow className='w-full'>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead colSpan={2} className='text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        {data?.data.map((item: any) => (
                            <TableRow key={item._id} className='w-full'>
                                <TableCell className="font-medium">{item._id}</TableCell>
                                <TableCell>
                                    <div className='flex group items-center relative'>
                                        <Form  layout="vertical" onFinish={(values) => mutation.mutate({ _id: item?._id, name: values?.name })} className='w-full'>
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
                                    {/* <button onClick={() => console.log(item._id)} className='btn'>Edit</button> */}
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

        </div>
    )
}

export default CategoryPage