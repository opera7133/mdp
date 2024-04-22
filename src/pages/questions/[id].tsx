import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import { BsHeart, BsTwitter } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'

export default function Post({ question }: { question: any }) {
  return (
    <div>
      <Head>
        <title>{question['title']} | MDP</title>
      </Head>

      <article className="container mx-auto max-w-5xl min-h-screen py-10 flex gap-3">
        <div className="inline-flex flex-col gap-2">
          <a
            href="#"
            className="inline-block p-2.5 border-solid border border-primary-500 rounded-full text-primary-500 hover:bg-primary-500 hover:text-white duration-200"
          >
            <BsHeart size={20} />
          </a>
          <a
            href="#"
            className="inline-block p-2.5 border-solid border border-primary-500 rounded-full text-primary-500 hover:bg-primary-500 hover:text-white duration-200"
          >
            <BsTwitter size={20} />
          </a>
          <a
            href="#"
            className="inline-block p-2.5 border-solid border border-primary-500 rounded-full text-primary-500 hover:bg-primary-500 hover:text-white duration-200"
          >
            <FaFacebookF size={20} />
          </a>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">{question['title']}</h2>
          <div className="prose md:prose-lg lg:prose-xl max-w-full">
            {question['body']}
          </div>
        </div>
      </article>
    </div>
  )
}

export async function getStaticPaths() {
  const prisma = new PrismaClient()
  const id = await prisma.questions.findMany({
    select: {
      id: true,
    },
  })
  return {
    paths: id.map((path: any) => ({
      params: {
        id: path.id.toString(),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  const prisma = new PrismaClient()
  const question = await prisma.questions.findUnique({
    where: {
      id: params.id,
    },
  })
  return {
    props: {
      question,
    },
  }
}
