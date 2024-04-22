import Link from 'next/link'
import Image from 'next/image'

function Footer() {
  return (
    <div className="bg-black text-white text-lg">
      <div className="font-title container mx-auto max-w-7xl">
        <footer className="mx-6 py-12 grid grid-cols-2 items-center">
          <div>
            <Link href="/">
              <a className="inline-block">
                <div className="h-10 w-36 relative">
                  <Image
                    src="/img/mdp-logo-white.svg"
                    alt="MDP logo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </a>
            </Link>
            <p className="text-base mt-4">MDP is a platform for developers.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/about">
              <a className="text-xl">About</a>
            </Link>
            <a
              href="https://support.vcborn.com"
              rel="noopener noreferrer"
              target="_blank"
              className="text-xl"
            >
              Contact
            </a>
            <Link href="/privacy">
              <a className="text-xl">Privacy Policy</a>
            </Link>
            <Link href="/tos">
              <a className="text-xl">Terms of Service</a>
            </Link>
          </div>
        </footer>
        <div className="py-3 text-base mx-6">
          Copyright &copy; 2022{' '}
          <a
            href="https://vcborn.com"
            rel="noopener noreferrer"
            target="_blank"
            className="duration-200 hover:opacity-70"
          >
            VCborn
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default Footer
