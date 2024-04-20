"use client"
import { useAuth } from '@/context/user_context';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Dropdown, Menu } from 'antd';
import ApiFetcher from '@/hooks/use_fetch';

interface Item {
  name: string;
  image: string | { name: string; image: string }[];
}

const items: Item[] = [
  {
    name: 'Fanion',
    image: '/e-comm/bank.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/com.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/send.jpg',
  },
  {
    name: 'group',
    image: [
      {
        name: 'Hester',
        image: '/e-comm/mony.jpg',
      },
      {
        name: 'Hester',
        image: '/e-comm/send.jpg',
      },
      {
        name: 'Fanion',
        image: '/e-comm/bank.jpg',
      },
      {
        name: 'Hester',
        image: '/e-comm/com.jpg',
      }
    ],
  },
  {
    name: 'Fanion',
    image: '/e-comm/bank.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/com.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/mony.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/com.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/mony.jpg',
  },
  {
    name: 'Hester',
    image: '/e-comm/com.jpg',
  }
]

export default function Home() {
  const indexArr = items.findIndex(item => Array.isArray(item.image));

  const { Get } = new ApiFetcher();

  const { data, isLoading, refetch } = Get('/product') as any;
  const { data: category } = Get('/category') as any;

  const newArray = Array.from({ length: 10 }, (_, index) => data?.data?.docs[index % data?.data?.docs?.length]);
  console.log(newArray);

  return (
    <div className="">
      <div className="container">
        <div className='flex justify-end'>
          <Dropdown overlay={
            <div className='bg-white p-5 rounded space-y-2'>
              <p className="text-lg">Logout</p>
              <p className="text-lg">Profile</p>
            </div>

          }>
            <UserOutlined className="py-3 text-3xl cursor-pointer" />
          </Dropdown>
        </div>
        <div className="text-center pt-32 pb-20 ">
          <h1 className="text-5xl font-bold">E-Commerce</h1>
          <p>Make your own e-commerce</p>
        </div>

        <div className="">
          <div className="bg-white py-5 flex justify-center gap-8 items-center ">
            <h1>Make your</h1>
            <h1>Make your</h1>
            <h1>Make your</h1>
            <h1>Make your</h1>
            <h1>Make your</h1>
          </div>
          <div className="mt-5">
            <div className="bg-slate-300 grid grid-cols-8 gap-2">
              {
                Array.from({ length: 10 }, (_, index) => category?.data[index % category?.data.length]).map((item: any, index: number) => (
                  <div key={index} className={`relative overflow-hidden bg-white 
                    ${index === indexArr && 'col-span-2 row-span-2 '}
                    ${index === 1 && 'row-span-2'} 
                    ${index === 5 && 'col-span-2'} 
                    ${index === 8 && 'col-span-2'}
                  }`}>
                    <h1 className="absolute bottom-0 w-full text-center bg-slate-200 py-2 bg-opacity-60">{item?.name}</h1>
                    <div className="items-center h-28 justify-center">
                      {Array.isArray(item?.image) ? (
                        <div className="w-full grid grid-cols-2 gap-2 p-2 bg-slate-500">
                          {item?.image.map((subItem: any, subIndex: number) => (
                            <div key={subIndex} className="w-full overflow-hidden">
                              <Image className='object-cover h-28 hover:scale-125 duration-300' src={subItem?.image} alt="ecommerce" width={1000} height={1000} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Image className='object-fill hover:scale-125 duration-300' src={item?.image} alt="ecommerce" width={1000} height={1000} />
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <h1 className="text-5xl font-bold fredoka">For You</h1>
          <div className="grid grid-cols-6 gap-4 mt-3">
            {
              Array.from({ length: 9 }, (_, index) => data?.data?.docs[index % data?.data?.docs?.length]).map((item: any, index: number) => <div key={index} className={`bg-white ${index === 2 && ' row-span-2 col-span-2 '}} overflow-hidden p-5 relative`}>
                <div className="w-full h-52">
                  <Image className='object-fill hover:scale-125 duration-300' src={item?.image} alt="ecommerce" width={1000} height={1000} />
                </div>
                <div className="absolute left-0 right-0 bottom-0 w-full px-5 bg-slate-400 py-2 bg-opacity-60">
                  <h1>{item?.name}</h1>
                </div>
              </div>)
            }
          </div>
        </div>
        {/* <div className='mt-12'>
          <h1 className="text-5xl font-bold">Best Sellers</h1>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <div className="bg-white row-span-2 col-span-2">
              <div className="w-full ">
                <Image className='object-fill h-52 hover:scale-125 duration-300' src="/e-comm/mony.jpg" alt="ecommerce" width={1000} height={1000} />
              </div>
            </div>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item: number, index) => <div key={index} className='bg-white'>
                <div className="w-full h-52">
                  <Image className='object-fill hover:scale-125 duration-300' src="/e-comm/mony.jpg" alt="ecommerce" width={1000} height={1000} />
                </div>
              </div>)
            }
          </div>
        </div> */}
        {/*
        <div className='mt-12'>
          <h1 className="text-5xl font-bold">Trending</h1>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <div className="bg-white row-span-2 col-span-2">
              <div className="w-full ">
                <Image className='object-fill h-52 hover:scale-125 duration-300' src="/e-comm/mony.jpg" alt="ecommerce" width={1000} height={1000} />
              </div>
            </div>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item: number, index) => <div key={index} className='bg-white'>
                <div className="w-full h-52">
                  <Image className='object-fill h-52 hover:scale-125 duration-300' src="/e-comm/mony.jpg" alt="ecommerce" width={1000} height={1000} />
                </div>
              </div>)
            }

          </div>
        </div> */}
      </div>
    </div>
  );
}
