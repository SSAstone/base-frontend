"use client"
import ApiFetcher from '@/hooks/use_fetch';
import { getAllUser } from '@/lib/end_piont';
import { Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/providers/socket_provider';
import { useAuth } from '@/context/user_context';
import axios from 'axios';

const Page = () => {
  const { Get } = new ApiFetcher();
  const { data } = Get(getAllUser) as any;
  const [messages, setMessages] = useState([]) as any;
  const [active, setActive] = useState(false) as any;
  const [selectUser, setSelectUser] = useState({} as any);
  const {socket, onlineUsers} = useSocket();
  console.log("🚀 ~ Page ~ onlineUsers:", onlineUsers)
  const { user } = useAuth();

  useEffect(() => {
    if (user && user?._id) {
      socket?.emit('joinGroup', user._id);
    }
  }, [user, socket]);

  useEffect(() => {
    if (socket) {
      const handleMessage = (newMessage: any) => {
        console.log("🚀 ~ handleMessage ~ newMessage:", newMessage)
        setActive(true);
        setMessages((prevMessages: any) => {
          const messageExists = prevMessages.some((msg: any) => msg._id === newMessage._id);
          if (!messageExists) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
      };

      socket?.on('message', handleMessage);

      return () => {
        socket?.off('message', handleMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket?.on('startMessage', (data: any) => {
        console.log("🚀 ~ socket.on ~ data:", data)
        // setActive(data);
      });
    }
  }, [socket]);

  const fetchMessages = async (senderId: string, receiverId: string) => {
    try {
      const response = await axios.get('http://localhost:5550/messages', {
        params: {
          senderId,
          receiverId,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='h-screen'>
      <Row>
        <Col span={6}>
          {data?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setMessages([]);
                socket?.emit('joinGroup', item._id);
                setSelectUser(item);
                fetchMessages(user?._id, item._id);
              }}
              className="p-3 flex items-center gap-3 cursor-pointer"
            >
              <div className="rounded-full p-2 font-bold w-10 text-center text-xl bg-slate-400 text-white relative">
                { onlineUsers?.includes(item?._id) && <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></div>}
                {item?.username.slice(0, 2)}
              </div>
              <div>
                <h1 className='text-xl font-medium'>{item?.username}</h1>
                <h1>{item?.email}</h1>
              </div>
            </div>
          ))}
        </Col>
        <Col span={18} className='border-2 border-blue-600'>
          <div className='text-3xl font-bold border-b-2 border-black py-3'>{selectUser?.username || user?.username}</div>
          <div className='p-5'>
            {messages.map((msg: any, index: number) => (
              <div key={index} className={`p-3 ${msg.senderId === user?._id ? 'text-right flex flex-row-reverse' : 'text-left'}`}>
                <strong>{msg.senderId === user?._id ? ':You' : `${selectUser?.username || user?.username}:`}</strong> {msg.content}
              </div>
            ))}
          </div>
          <Form
            className='p-5'
            onFinish={(values) => {
              const newMessage = {
                senderId: user?._id,
                receiverId: selectUser?._id,
                content: values.message,
                group: selectUser?._id || user?._id,
              };
              socket?.emit('sendMessage', newMessage);
              setMessages((prevMessages: any) => [...prevMessages, { ...newMessage, _id: Date.now().toString() }]);
            }}
          >
            <Form.Item name="message">
              <input type="text" placeholder='message' />
            </Form.Item>
            <button type='submit'>Submit</button>
          </Form>
        </Col>
      </Row>
      {/* <div className="absolute bottom-5 left-5">
        <div onClick={() => setActive(false)} className="relative">
          { active && <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-600 -z-10"></div>}
          <h1 className='text-xl font-medium'>
            {user?.username}
          </h1>
        </div>
      </div> */}
    </div>
  );
};

export default Page;
