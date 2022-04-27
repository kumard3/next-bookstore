// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  success: boolean

}

type Response = {
  success: any
  error: string
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest,
  res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    //@ts-ignore
    return await addBook(req, res)
  } else if (req.method === 'GET') {
    //@ts-ignore
    return await readBooks(req, res)
  }
  else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}

async function addBook(req: NextApiRequest, res: NextApiResponse<Response>) {
  const body = req.body;
  try {
    //@ts-ignore
    const newEntry = await prisma.bookSuggestion.create({
      data: {
        bookeTitle: body.bookTitle,
        bookeAuthor: body.bookAuthor,
        bookeGenre: body.bookGenre,
      }
    });
    //@ts-ignore
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating question", success: false });
  }
}


async function readBooks(req: NextApiRequest,
  res: NextApiResponse) {
  try {
    const books = await prisma.bookSuggestion.findMany();
    //@ts-ignore
    return res.status(200).json(books, { success: true });
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Error reading", success: false });
  }
}