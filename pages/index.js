import Head from 'next/head';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Tong</title>
        <meta name="Tong Chat App" content="" />
        <link rel="icon" href="/new_favicon.ico" />
      </Head>

      <Sidebar />
    </div>
  )
}
