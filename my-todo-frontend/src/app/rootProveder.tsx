'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { DataTodo } from '@/context/contexts';
import { CardDoProps } from '@/types/cardtodo';

export default function RootProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [data ,setdata] = useState<CardDoProps[]>([])


  return <QueryClientProvider client={queryClient}>
    <DataTodo.Provider value={{data ,setdata}}>
      {children}
    </DataTodo.Provider>
    </QueryClientProvider>;
}
