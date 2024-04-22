import { BiLockAlt } from 'react-icons/bi'
import Image from 'next/image'
import '../../../utils/firebase/init'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getAuth, updateEmail, updateProfile } from 'firebase/auth'
import Swal from 'sweetalert2'
import { profile } from 'console'

type Inputs = {
  avatar: string
  username: string
  email: string
  description: string
}

export default function Settings() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>()

  const auth = getAuth()
  const user = auth.currentUser
  const avatar = user?.photoURL
  const username = user?.displayName
  const email = user?.email

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let errors: Array<string> = []
    if (user) {
      if (email != data.email) {
        updateEmail(user, data.email)
          .then(() => {})
          .catch((error) => {
            errors.push(error.code)
          })
      }
      if (username != data.username) {
        updateProfile(user, { displayName: data.username })
          .then(() => {})
          .catch((error) => {
            errors.push(error.code)
          })
      }
      if (errors.length >= 1) {
        Swal.fire({
          title: 'Error',
          text: 'Something happen while update your profile :(',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#FF800B',
        })
      } else {
        Swal.fire({
          title: 'Success',
          text: 'Your profile is updates successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#FF800B',
        })
      }
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-medium mb-5">Profile</h3>
      <form
        className="bg-gray-200 rounded-md p-12 mb-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-center gap-8 mb-7">
          <div className="w-28 h-28 shrink-0 relative">
            <Image
              src="/img/upload.svg"
              alt="sample avatar"
              layout="fill"
              objectFit="cover"
            />
            <Image
              src={avatar ? avatar : '/img/avatar.svg'}
              alt="sample avatar"
              layout="fill"
              objectFit="cover"
              className="duration-200 cursor-pointer hover:opacity-50"
            />
            <input type="text" {...register('avatar')} className="hidden" />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium mb-1">Username</label>
            <input
              className="py-1.5 px-5 text-lg rounded-md focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100"
              type="text"
              defaultValue={username ? username : ''}
              {...register('username')}
              placeholder="John Doe"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mb-7">
          <label className="font-medium mb-1">Email</label>
          <input
            className="py-1.5 px-5 text-lg rounded-md focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100"
            type="text"
            defaultValue={email ? email : ''}
            {...register('email', {
              required: true,
              pattern:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            })}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium mb-1">Description</label>
          <textarea
            className="py-2 px-5 text-lg rounded-md focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100"
            placeholder="Self-introduction here..."
            {...register('description')}
            rows={5}
          ></textarea>
        </div>
        <button className="text-white bg-primary-500 inline-block px-8 py-2 text-base rounded-full duration-200 hover:bg-primary-700 mt-6">
          Save
        </button>
      </form>
      <h3 className="text-2xl font-medium mb-5">Change Password</h3>
      <form className="bg-gray-200 rounded-md p-12">
        <div className="flex flex-col w-full mb-7 relative">
          <label className="font-medium mb-1">Old password</label>
          <input
            className="py-1.5 pl-10 pr-5 text-lg rounded-md focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100"
            type="password"
          />
          <BiLockAlt size={25} className="absolute left-3 bottom-2" />
        </div>
        <div className="flex flex-col w-full mb-7 relative">
          <label className="font-medium mb-1">New password</label>
          <input
            className="py-1.5 pl-10 pr-5 text-lg rounded-md focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100"
            type="password"
          />
          <BiLockAlt size={25} className="absolute left-3 bottom-2" />
        </div>
        <div className="flex flex-col w-full relative">
          <label className="font-medium mb-1">Confirm new password</label>
          <input
            className="py-1.5 pl-10 pr-5 text-lg rounded-md focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100"
            type="password"
          />
          <BiLockAlt size={25} className="absolute left-3 bottom-2" />
        </div>
        <button className="text-white bg-primary-500 inline-block px-8 py-2 text-base rounded-full duration-200 hover:bg-primary-700 mt-6">
          Save
        </button>
      </form>
    </div>
  )
}
