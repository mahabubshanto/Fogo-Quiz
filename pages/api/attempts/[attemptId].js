import prisma from '../../../lib/prisma';

export default async function handler(req,res){
  const { attemptId } = req.query;
  const attempt = await prisma.attempt.findUnique({ where: { id: Number(attemptId) }});
  if (!attempt) return res.status(404).end();
  const quiz = await prisma.quiz.findUnique({ where:{ id: attempt.quizId }, include:{ questions:true }});
  const answers = JSON.parse(attempt.answers);
  const questions = quiz.questions.map((q, i) => ({
    id: q.id,
    text: q.text,
    yourAnswer: answers[i] != null ? JSON.parse(q.options)[answers[i]] : null,
    correct: JSON.parse(q.options)[q.answerIdx]
  }));
  res.json({
    ...attempt,
    questions
  });
}
