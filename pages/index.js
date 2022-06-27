import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className={`${styles.container} ${styles['c-horiz']} ${styles['c-vert']}`}>
        Signed in as {session.user.email} <br />
        <button className={styles['sign-in-out-btn']} onClick={() => signOut()}>Sign out</button>
        <Link href="/weather-to-music/recommendations">
          <a>Get Song Recommendations</a>
        </Link>
      </div>
    )
  }
  return (
    // accessing object's properties using [] cause dash doesn't work with properties
    <div className={`${styles.container} ${styles['c-horiz']} ${styles['c-vert']}`}>
      Not signed in <br />
      <button className={styles['sign-in-out-btn']} onClick={() => signIn()}>Sign in</button>
    </div>
  )
}