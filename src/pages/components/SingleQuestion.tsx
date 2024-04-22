import Link from 'next/link'
import { MdMessage } from 'react-icons/md'
import { BsEyeFill } from 'react-icons/bs'

interface QuestionProps {
  key: number
  title: string
  score: number
  replies: number
  views: number
  href: string
  body: string
  onClick?: () => void
}

export const Question = ({
  key,
  title,
  score,
  replies,
  views,
  href,
  body,
  ...props
}: QuestionProps) => {
  return (
    <Link href={href}>
      <a
        className="bg-gray-200 p-4 rounded-md inline-flex items-center gap-4 justify-between"
        key={key}
      >
        <div className="flex flex-row items-center gap-4">
          <p className="text-2xl">{score}</p>
          <div>
            <h3 className="text-xl">{title}</h3>
            <p>{body}</p>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <MdMessage />
            {replies}
          </div>
          <div className="flex flex-row items-center gap-2">
            <BsEyeFill />
            {views}
          </div>
        </div>
      </a>
    </Link>
  )
}
