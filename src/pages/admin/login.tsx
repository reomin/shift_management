import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
    <div className="grid grid-cols-2 w-2/3 mx-auto">
    </div>
  </Layout>
  )
}
