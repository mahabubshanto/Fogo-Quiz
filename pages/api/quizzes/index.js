import prisma from '../../../lib/prisma';

export default async function handler(req,res){
  if (req.method === 'GET') {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(quizzes);
  } else {
    res.status(405).end();
  }
}
