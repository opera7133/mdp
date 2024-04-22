import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineMenu, AiFillQuestionCircle } from 'react-icons/ai'
import { IoClose, IoDocumentText } from 'react-icons/io5'
import Image from 'next/image'
import { Button } from './Button'
import { Listbox } from '@headlessui/react'
import '../../utils/firebase/init'
import { getAuth } from 'firebase/auth'

function Header() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [type, setType] = useState('article')
  const [isauth, setAuth] = useState(false)
  useEffect(() => {
    const auth = getAuth()
    const user = auth.currentUser ? true : false
    setAuth(user)
  }, [])

  return (
    <div className="bg-black text-white text-lg">
      <div className="container mx-auto">
        <header className="font-title mx-6 py-4 flex flex-row justify-between items-center">
          <Link href="/">
            <a>
              <div className="h-7 w-24 relative">
                <Image
                  src="/img/mdp-logo-white.svg"
                  alt="MDP logo"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </a>
          </Link>
          <div className="w-full max-w-4xl relative hidden md:block">
            <Listbox value={type} onChange={setType}>
              <Listbox.Button className="absolute left-0 bg-primary-500 duration-100 hover:bg-primary-700 px-5 rounded-full h-full">
                {type === 'article' ? (
                  <IoDocumentText size={20} />
                ) : (
                  <AiFillQuestionCircle size={20} />
                )}
              </Listbox.Button>
              <Listbox.Options className="absolute left-0 bg-primary-500 rounded-2xl px-5 flex flex-col gap-4 cursor-pointer">
                <Listbox.Option className="pt-2" value="article">
                  <IoDocumentText size={20} />
                </Listbox.Option>
                <Listbox.Option className="pb-2" value="question">
                  <AiFillQuestionCircle size={20} />
                </Listbox.Option>
              </Listbox.Options>
            </Listbox>
            <input
              id="search"
              type="text"
              className="text-black text-base pl-20 w-full py-1.5 rounded-full focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100"
              placeholder={
                type === 'article'
                  ? 'Search articles...'
                  : 'Search questions...'
              }
            />
          </div>
          {!showSidebar && (
            <AiOutlineMenu
              className="text-3xl md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          )}
          <div
            className={`top-0 -right-1 w-[50vw] bg-black pt-20 pl-10 text-white fixed h-full z-40 ease-in-out duration-300 ${
              showSidebar ? 'translate-x-0 ' : 'translate-x-full'
            }`}
          >
            <div>
              <button
                className="flex text-5xl text-white cursor-pointer fixed right-7 top-5 z-50"
                aria-label="Show Sidebar"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <IoClose size={40} />
              </button>
            </div>
            <div className="inline-flex flex-col gap-6 text-3xl">
              <Button
                href={isauth ? '/accounts/login' : '/accounts/'}
                label={isauth ? 'Log in' : 'Account'}
                primary={true}
              />
            </div>
          </div>
          <div className="hidden md:block">
            <Button
              href={isauth ? '/accounts/login' : '/accounts/'}
              label={isauth ? 'Log in' : 'Account'}
              primary={true}
            />
          </div>
        </header>
      </div>
    </div>
  )
}

export default Header
