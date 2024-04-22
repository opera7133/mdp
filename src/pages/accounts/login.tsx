import type { NextPage } from 'next'
import '../../utils/firebase/init'
import { getAuth } from 'firebase/auth'
import Head from 'next/head'
import LoginForm from '../components/Login'
import { useState } from 'react'
import RegisterForm from '../components/Register'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const [form, setForm] = useState('login')
  const router = useRouter()
  if (getAuth().currentUser) {
    router.push('/accounts/')
  }
  return (
    <div>
      <Head>
        {form === 'login' ? (
          <title>Log in | MDP</title>
        ) : (
          <title>Register | MDP</title>
        )}
      </Head>
      <main className="font-title container mx-auto max-w-md my-14 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          {form === 'login' ? 'Welcome Back!' : 'Welcome to MDP!'}
        </h2>
        <div>
          <div
            className={`w-1/2 cursor-pointer inline-block border-t-4 duration-200 ${
              form === 'login' ? 'border-primary-500' : 'border-gray-500'
            } rounded-tl-md py-2`}
            onClick={() => setForm('login')}
          >
            Log in
          </div>
          <div
            className={`w-1/2 cursor-pointer inline-block border-t-4 duration-200 ${
              form === 'register' ? 'border-primary-500' : 'border-gray-500'
            } rounded-tr-md py-2`}
            onClick={() => setForm('register')}
          >
            Register
          </div>
        </div>
        {form === 'login' ? <LoginForm /> : <RegisterForm />}
      </main>
    </div>
  )
}

export default Login
