import prisma from '../../../lib/prisma';

export default async function handler(req,res){
  const { id } = req.query;
  if (req.method === 'GET') {
    const quiz = await prisma.quiz.findUnique({ where: { id: Number(id) }, include: { questions: true }});
    res.json(quiz);
  } else {
    res.status(405).end();
  }
}
