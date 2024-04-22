import Link from 'next/link'

interface ButtonProps {
  primary?: boolean
  bgColor?: string
  hoverbgColor?: string
  label: string
  href: string
  className?: string
  onClick?: () => void
}

export const Button = ({
  primary = false,
  bgColor,
  hoverbgColor,
  label,
  href,
  className,
  ...props
}: ButtonProps) => {
  const bg = primary ? 'bg-primary-500 text-white' : bgColor
  const bgHover = primary ? 'bg-primary-700' : hoverbgColor
  return (
    <Link href={href}>
      <a
        className={`${bg} ${className} inline-block px-6 py-1.5 text-base rounded-full duration-200 hover:bg-primary-700`}
      >
        {label}
      </a>
    </Link>
  )
}
