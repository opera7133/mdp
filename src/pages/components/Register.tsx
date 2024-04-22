import Link from 'next/link'
import { BiEnvelope, BiLockAlt } from 'react-icons/bi'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import '../../utils/firebase/init'

type Inputs = {
  email: string
  password: string
  repassword: string
}

function RegisterForm() {
  const auth = getAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch('/api/manage')
    const { error } = await res.json()
    if (error) {
      console.log(error)
      return
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        router.push('/accounts/')
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Register failed :(',
          icon: 'error',
          confirmButtonColor: '#FF800B',
        })
      })
  }
  return (
    <form
      className="bg-gray-200 py-5 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-2xl font-medium mb-5">Register</h3>
      <div className="mx-auto px-8 flex flex-col items-start gap-1 relative mb-5">
        <label>Email</label>
        <BiEnvelope size={25} className="absolute left-12 bottom-2" />
        <input
          type="email"
          placeholder="john.doe@example.com"
          {...register('email', {
            required: true,
            pattern:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          })}
          className={`${
            errors.email && 'ring-2 ring-red-500'
          } w-full rounded-full py-2 pr-4 pl-12 focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100`}
        />
      </div>
      <div className="mx-auto px-8 flex flex-col items-start gap-1 relative mb-5">
        <label>Password</label>
        <BiLockAlt size={25} className="absolute left-12 top-9" />
        <input
          type="password"
          {...register('password', {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
          className={`${
            errors.password && 'ring-2 ring-red-500'
          } w-full rounded-full py-2 pr-4 pl-12 focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100`}
        />
        <p className="mt-2 text-gray-700 text-xs text-left">
          Minimum eight characters, at least one uppercase letter, one lowercase
          letter, one number and one special character
        </p>
      </div>
      <div className="mx-auto px-8 flex flex-col items-start gap-1 relative mb-5">
        <label>Confirm password</label>
        <BiLockAlt size={25} className="absolute left-12 bottom-2" />
        <input
          type="password"
          {...register('repassword', {
            required: true,
            validate: (input) => input === getValues('password'),
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
          className={`${
            errors.repassword && 'ring-2 ring-red-500'
          } w-full rounded-full py-2 pr-4 pl-12 focus:ring-primary-500 focus:outline-none focus:ring-2 duration-100`}
        />
      </div>
      <button className="text-white bg-primary-500 inline-block px-6 py-1.5 text-base rounded-full duration-200 hover:bg-primary-700 my-10">
        Register
      </button>
      <p className="mt-2">
        By submitting this form, you agree to our
        <br />
        <Link href="/tos">
          <a className="text-primary-500">Terms of Service</a>
        </Link>{' '}
        and{' '}
        <Link href="/privacy">
          <a className="text-primary-500">Privacy Policy</a>
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
