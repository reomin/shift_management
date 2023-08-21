'use client'

import { useState,useEffect } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
} from '@chakra-ui/react'

import { User } from '@/types'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'


import { useToast } from '@chakra-ui/react'
import Layout from '@/components/layout'

const Form1 = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [users, setUsers] = useState<User[]>([]);
  const [date,setSelectedDate] =useState('')

  const handleItemClick = (item:any) => {
    // item を使用して必要な処理を行う
    setName(item.name);
    setId(item.id);
    console.log(date);
  };

  const handleDateChange =(e:any) =>{
    setSelectedDate(e.target.value);
  }

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/users`); 
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleButtonClick =async()=>{
     // APIリクエストを行う
     const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/shifts`, {
      method: 'POST', // 例: POSTリクエストを送信
      headers: {
        'Content-Type': 'application/json', // リクエストヘッダーを設定
      },
      body: JSON.stringify({ uid: id, date: date }), // 送信するデータをJSON形式に変換して設定
    });


    if (response.ok) {
      alert(
       "成功"
      );
    } else {
      alert("失敗");
    }

  }


  return (
    <Box className='mt-8 m-8 w-1/3 mx-auto'>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" mt-8>
        シフトを作成する
      </Heading>
      
      <FormControl >
        <FormLabel>ユーザー</FormLabel>
        <Input placeholder="name" value={name} readOnly />
      </FormControl>

      <Box className='mt-8'>
            {/* userを選択させる */}
            <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button}>
                  {isOpen ? 'Close' : 'ユーザーを選択する'}
                </MenuButton>
                <MenuList>
                  {users.map(item => (
                    <MenuItem key={item.id} onClick={() => handleItemClick(item)}>{item.name}</MenuItem>
                  ))}
                </MenuList>
              </>
            )}
            </Menu>
      </Box>
      
    <Box className='mt-8'>
      <Input
        placeholder="date"
        size="md"
        type="datetime-local"
        value={date} // useStateで管理している値をセット
        onChange={handleDateChange} // 入力値の変更時に呼ばれる関数を設定
      />
    </Box>

    <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
            <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleButtonClick}>
                Submit
              </Button>
            </Flex>
          </Flex>
    </ButtonGroup>

    </Box>
  )
}


export default function Multistep() {
  return (
    <Layout>
      <div >
        <Form1 />
      </div>
    </Layout>
  )
}