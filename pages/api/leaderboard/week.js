import prisma from '../../../lib/prisma';
import { weekRangeFor } from '../../../lib/week';

export default async function handler(req,res){
  const [startISO, endISO] = weekRangeFor(new Date());
  const start = new Date(startISO);
  const end = new Date(endISO);
  const attempts = await prisma.attempt.findMany({
    where: { createdAt: { gte: start, lt: end } },
    include: { quiz: true },
    orderBy: { score: 'desc' },
    take: 50
  });
  const board = attempts.map(a => ({
    studentName: a.studentName,
    twitter: a.twitter,
    score: a.score,
    quizTitle: a.quiz.title,
    createdAt: a.createdAt
  }));
  res.json(board);
}
