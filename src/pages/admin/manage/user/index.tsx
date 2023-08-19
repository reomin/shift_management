import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import { useState } from 'react'
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

//submitを押した時に、usersテーブルに登録する処理をする

export default function Home() {

  const [name, setName] = useState('');
  const [level, setLevel] = useState('初心者');

  const apiUrl = process.env.NEXT_PUBLIC_URL;

  console.log(apiUrl);
  console.log(process.env.NEXT_PUBLIC_URL);
  console.log(name);
  console.log(level);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // APIエンドポイントにPOSTリクエストを送信
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, level }),
      });

      const data = await response.json();
      console.log(data.message);
      
      location.href = '/admin/manage/user/list';

    } catch (error) {
      alert("エラーが発生しました");
      console.error('Error saving user:', error);
      // エラー処理を追加
    }
  };

  return (
    <Layout>
        <Box className='mt-8 w-2/3 mx-auto '>
            <div>
            <FormControl>
                <FormLabel>名前を入力</FormLabel>
                <Input placeholder="name" 
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <FormErrorMessage>エラーが起きています</FormErrorMessage>
            </FormControl>
            </div>

            <div className='mt-12 flex justify-center'>
            <FormControl>
              <RadioGroup defaultValue="初心者" value={level} onChange={setLevel}>
                <HStack spacing="24px">
                  <Radio value="1">上級</Radio>
                  <Radio value="2">中級</Radio>
                  <Radio value="3">初心者</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            </div>

            <div className='flex justify-center'>
            <Button mt={4} colorScheme="teal" type="submit" onClick={handleSubmit}>
                登録
            </Button>
            </div>
        </Box>
  </Layout>
  )
}