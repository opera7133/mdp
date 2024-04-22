import type { NextApiRequest, NextApiResponse } from 'next'
import { LimitChecker } from '../../lib/limitChecker'
import { PrismaClient } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

const limitChecker = LimitChecker()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const type = req.body.type
  if (type === "question") {
    await prisma.questions.create({
      data: {
        id: ulid(),
        user_id: req.body.userid,
        title: req.body.title,
        body: req.body.body,
      },
    })
    return res.status(200).json({})
  } else {
    await prisma.blog.create({
      data: {
        id: ulid(),
        user_id: req.body.userid,
        title: req.body.title,
        body: req.body.body,
      },
    })
    return res.status(200).json({})
  }
}

export default handler