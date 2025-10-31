import prisma from '../lib/prisma';

export default async function handler(req,res){
  if (req.method !== 'POST') return res.status(405).end();
  const { quizId, studentName, twitter, answers } = req.body;
  const quiz = await prisma.quiz.findUnique({ where:{ id: Number(quizId) }, include:{ questions:true }});
  if (!quiz) return res.status(404).json({error:'Quiz not found'});
  let score = 0;
  const details = [];
  quiz.questions.forEach((q, idx) => {
    const your = answers[idx];
    const correct = q.answerIdx;
    if (your === correct) score++;
    details.push({
      id: q.id,
      text: q.text,
      yourAnswer: your != null ? JSON.parse(q.options)[your] : null,
      correct: JSON.parse(q.options)[correct]
    });
  });

  const attempt = await prisma.attempt.create({
    data: {
      studentName,
      twitter,
      quizId: quiz.id,
      score,
      total: quiz.questions.length,
      answers: JSON.stringify(answers)
    }
  });

  res.json({ attemptId: attempt.id, score, total: quiz.questions.length });
}
