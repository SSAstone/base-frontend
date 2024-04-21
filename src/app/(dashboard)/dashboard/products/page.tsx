"use client"
import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ApiFetcher, { deleteData } from '@/hooks/use_fetch'
import Image from 'next/image'
import Link from 'next/link'


export default function Products() {
  const { Get } = new ApiFetcher()

  const { data, refetch } = Get('/product') as any

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead className="">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.docs?.map((invoice: any) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice._id}</TableCell>
              <TableCell className="">
                <Image  className='w-[40px] h-[40px]' src={invoice?.image} alt={"image"} width={50} height={50}></Image>
              </TableCell>
              <TableCell>{invoice?.name}</TableCell>
              <TableCell>{invoice?.category?.name}</TableCell>
              <TableCell className='space-x-3 text-right'>
                <Link  className='btn' href={`/dashboard/products/${invoice._id}`}>Edit</Link>
                <button onClick={async () => {
                  await deleteData(`/product/${invoice._id}`).then(() => refetch())
                }} className='btn'>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="w-full">
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell colSpan={4} className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
