"use client"
import { UserContext } from '@/context/user_context';
import instance from '@/hooks/fetch';
import useFetchGet from '@/hooks/get_fetch';
import { useQuery } from '@tanstack/react-query';

import React, { useState } from 'react';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, isLoading, refetch }: any = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await instance.get('/user/me');
            return res.data;
        }
    })
    
    const logout = () => {
        document.cookie = "accessToken=;";
    }

    const value = { data, isLoading, logout, refetch };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;