import { getAuth, signOut } from 'firebase/auth'
import Head from 'next/head'
import '../../utils/firebase/init'
import { AuthProvider } from '../../context/AuthContext'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { IoDocumentText, IoSettingsSharp } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'
import { BsHeartFill } from 'react-icons/bs'
import { useState } from 'react'
import Articles from '../components/accounts/Articles'
import Questions from '../components/accounts/Questions'
import Likes from '../components/accounts/Likes'
import Settings from '../components/accounts/Settings'

export default function Account() {
  const [show, setShow] = useState('articles')
  const auth = getAuth()
  const user = auth.currentUser
  const name = user?.displayName ? user.displayName : 'User'
  return (
    <AuthProvider>
      <div>
        <Head>
          <title>{show.charAt(0).toUpperCase() + show.slice(1)} | MDP</title>
        </Head>
        <main className="container my-10 mx-auto max-w-6xl min-h-screen font-title">
          <h2 className="text-3xl font-semibold mb-5">Hello {name}!</h2>
          <div className="flex flex-row gap-5">
            <div className="inline-flex flex-col gap-2">
              <a
                href="#"
                onClick={() => setShow('articles')}
                className={`flex flex-row justify-center items-center gap-2 px-12 py-2 rounded-full duration-200 ${
                  show === 'articles'
                    ? 'bg-primary-500 text-white hover:bg-primary-700'
                    : 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'
                }`}
              >
                <IoDocumentText size={20} />
                Articles
              </a>
              <a
                href="#"
                onClick={() => setShow('questions')}
                className={`flex flex-row justify-center items-center gap-2 px-12 py-2 rounded-full duration-200 ${
                  show === 'questions'
                    ? 'bg-primary-500 text-white hover:bg-primary-700'
                    : 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'
                }`}
              >
                <AiFillQuestionCircle size={22.5} />
                Questions
              </a>
              <a
                href="#"
                onClick={() => setShow('likes')}
                className={`flex flex-row justify-center items-center gap-2 px-12 py-2 rounded-full duration-200 ${
                  show === 'likes'
                    ? 'bg-primary-500 text-white hover:bg-primary-700'
                    : 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'
                }`}
              >
                <BsHeartFill size={17} />
                Likes
              </a>
              <a
                href="#"
                onClick={() => setShow('settings')}
                className={`flex flex-row justify-center items-center gap-2 px-12 py-2 rounded-full duration-200 ${
                  show === 'settings'
                    ? 'bg-primary-500 text-white hover:bg-primary-700'
                    : 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'
                }`}
              >
                <IoSettingsSharp size={20} />
                Settings
              </a>
              <a
                href="#"
                onClick={() => signOut(auth)}
                className="flex flex-row justify-center items-center gap-2 px-12 py-2 rounded-full border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white duration-200"
              >
                <MdLogout size={20} />
                Log out
              </a>
            </div>
            {show === 'articles' && <Articles />}
            {show === 'questions' && <Questions />}
            {show === 'likes' && <Likes />}
            {show === 'settings' && <Settings />}
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
