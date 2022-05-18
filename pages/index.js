import Head from 'next/head'
import Image from 'next/image'
import '../styles/Home.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Link href="/weather-to-music/recommendations">
          <a>Home</a>
        </Link>
      </div>
    )
  }
  return (
    <div className='c-horiz c-vert'>
      Not signed in <br />
      <button className='sign-in-btn' onClick={() => signIn()}>Sign in</button>
    </div>
  )
}