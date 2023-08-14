import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import { useState, useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    RadioGroup,
    Radio,
    HStack,
    Button,
    Input,
    VStack,
    Box
  } from '@chakra-ui/react'
import { User } from '@/types'

//submitを押した時に、usersテーブルに登録する処理をする

export default function List() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
      async function fetchUsers() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/users`); 
        const data = await response.json();
        setUsers(data);
      }
      fetchUsers();
    }, []);

  return (
    <Layout>
        <Box className='mt-8 w-2/3 mx-auto '>
            <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            </div>
        </Box>
  </Layout>
  )
}