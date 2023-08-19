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

  console.log(name);
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
                    <MenuItem key={item.id} onClick={() => setName(item.name)}>{item.name}</MenuItem>
                  ))}
                </MenuList>
              </>
            )}
            </Menu>
      </Box>

    <Box className='mt-8'>
      <Input
        placeholder="Select Date and Time"
        size="md"
        type="datetime-local"
      />
    </Box>
    </Box>
  )
}


export default function Multistep() {
  const toast = useToast()
  const [step, setStep] = useState(1)

  return (

    <Layout>
      <div >
        <Form1 />
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
            <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }}>
                Submit
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </div>
    </Layout>
  )
}