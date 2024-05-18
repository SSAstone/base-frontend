"use client"
import { useAuth } from '@/context/user_context';
import { useSocket } from '@/providers/socket_provider';
import { Form, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client';

const Messages = ({ username, group }: any) => {
    // const socket: any = useMemo(() => io("http://localhost:5550", {
    //     withCredentials: true,
    // }), []);

    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log("connected", socket.id);
    //     });
    //     socket.on("test-response", (data: any) => {
    //         console.log("message", data);
    //     })
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [socket]);
    const { logout, data } = useAuth()
    console.log("🚀 ~ Messages ~ data:", data)
    useEffect(() => {
      if(data) {
        
      }
    }, [])

    const socket = useSocket();
    const [messages, setMessages] = useState([]) as any;
    console.log("🚀 ~ Messages ~ messages:", messages)
    const [message, setMessage] = useState('');
    const [receiver, setReceiver] = useState('');
  
    useEffect(() => {
      if (socket) {
        socket.on('message', (newMessage : any) => {
          setMessages((prevMessages : any) => [...prevMessages, newMessage]);
        });
  
        // Fetch previous messages
        const fetchMessages = async () => {
          try {
            const response = await axios.get('http://localhost:5550/messages');
            setMessages(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchMessages();
  
        if (group) {
          socket.emit('joinGroup', group);
        }
      }
    }, [socket, group]);
  
    const sendMessage = () => {
      const newMessage = {
        sender: username,
        receiver: group ? group : receiver,
        content: message,
        group: !!group,
      };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    };


    return (
        <div>
          <h1>Chat</h1>
          <div>
            {messages.map((msg : any, index : any) => (
              <div key={index}>
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>
          {!group && (
            <input
              type="text"
              placeholder="Receiver"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          )}
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )
}

export default Messages