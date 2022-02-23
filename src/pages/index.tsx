import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={'flex h-screen items-center justify-center bg-gradient-to-tr from-purple-500 via-yellow-500 to-blue-600'}>
      <span className='text-4xl'>Texto</span>
    </div>
  )
}
