// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db'

type Data = {
   name: string
}

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   // which company to fetch
   // check if company is fresh in tables
   // fetch company from api
   // save company to data base

   res.status(200).json({ name: 'John Doe' })
}
