import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        // creating a new todo.
        const { title } = req.body
        const result = await prisma.todo.create({
            data: {
                title,
            },
        })
        return res.json(result)
    }
}