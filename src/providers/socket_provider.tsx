"use client"
import { useAuth } from '@/context/user_context';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const SocketContext = createContext<any>(null);

export const useSocket = () => useContext(SocketContext);

interface User {
  _id: string;
}

interface Props {
  user: User | null;
}


export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket<any> | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([] as any);

  const { user } = useAuth();

  // useEffect(() => {
  //   const socketIo = io('http://localhost:5550') as any; // Backend URL
  //   setSocket(socketIo);

  //   return () => {
  //     socketIo.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    if (user) {
      const socketIo: Socket<any> = io('http://localhost:5550', {
        query: {
          userId: user._id
        }
      });

      socketIo.on('getOnlineUsers', (data: any) => {
        console.log(data);
        setOnlineUsers(data);
      });
      setSocket(socketIo);
      return () => {
        socketIo.close();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};
