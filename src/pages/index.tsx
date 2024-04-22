import { PrismaClient } from '@prisma/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Article } from './components/SingleArticle'
import { Question } from './components/SingleQuestion'

const Home: NextPage = ({ posts, questions }) => {
  return (
    <div>
      <Head>
        <title>MDP | Platform for developers</title>
      </Head>
      <main className="font-title container mx-auto max-w-5xl my-14">
        <div className="mx-4">
          <h2 className="text-3xl font-semibold my-5">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            {posts.map((post: any, index: number) => {
              return (
                <Article
                  key={index}
                  href={`/blog/${post.id}`}
                  title={post.title}
                  tags={[]}
                  date=""
                  likes={post.likes}
                />
              )
            })}
          </div>
          <h2 className="text-3xl font-semibold my-5">Recent Questions</h2>
          <div className="grid grid-cols-1 gap-y-3">
            {questions.map((question: any, index: number) => {
              return (
                <Question
                  key={index}
                  href={`/questions/${question.id}`}
                  title={question.title}
                  score={question.likes}
                  body={question.body.replace(/<[^>]+>/g, '')}
                  replies={5}
                  views={15}
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const posts = await prisma.blog.findMany()
  const questions = await prisma.questions.findMany()
  return {
    props: { posts, questions },
  }
}

export default Home
