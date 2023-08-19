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



    const handleDelete = (id: number) => {
        // ユーザーを削除するロジックをここに追加
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      };
    
      // 編集ボタンがクリックされたときの処理
      const handleEdit = (id: number) => {
        // 編集の処理をここに追加
      };

  return (
    <Layout>
        <Box className='mt-8 w-2/3 mx-auto '>
            <div>
            <h1>ユーザー一覧</h1>
            <ul>
                {users.map((user) => (
                <li className='mt-8 p-2 container border border-black-800' key={user.id}>
                {user.name}
                <div className='flex justify-end'>
                <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'pink.400'}
                    marginLeft={'1rem'}
                    _hover={{
                    bg: 'pink.300',
                    }} onClick={() => handleEdit(user.id)}>
                    編集
                </Button>

                <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'pink.400'}
                    marginLeft={'1rem'}
                    _hover={{
                    bg: 'pink.300',
                    }} onClick={() => handleDelete(user.id)}>
                    削除
                </Button>
                </div>
              </li>
                ))}
            </ul>
            </div>
        </Box>
  </Layout>
  )
}