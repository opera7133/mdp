import Link from 'next/link'
import { BsHeartFill } from 'react-icons/bs'

interface ArticleProps {
  key: number
  title: string
  tags: Array<string>
  likes: number
  date: string
  avatar?: string
  href: string
  onClick?: () => void
}

export const Article = ({
  key,
  title,
  tags,
  likes,
  date,
  avatar,
  href,
  ...props
}: ArticleProps) => {
  return (
    <Link href={href}>
      <a className="inline-block bg-gray-200 p-4 rounded-md relative" key={key}>
        <h3 className="text-xl">{title}</h3>
        <ul className="flex flex-row gap-2">
          {tags.map((tag, index) => {
            return <li key={index}>#{tag}</li>
          })}
        </ul>
        <p className="text-sm pt-5">{date}</p>
        <div className="absolute right-4 bottom-4 flex flex-row gap-2 items-center">
          <div className="bg-primary-500 text-white p-1.5 rounded-full">
            <BsHeartFill size={12} />
          </div>
          {likes}
        </div>
      </a>
    </Link>
  )
}
