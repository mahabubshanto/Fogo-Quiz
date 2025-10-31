import prisma from '../../../../../lib/prisma';

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return Object.fromEntries(header.split(';').map(s=>s.trim()).filter(Boolean).map(s=>{
    const [k,v] = s.split('=');
    return [k,v];
  }));
}
function isAdmin(req){ const cookies = parseCookies(req); return cookies.admin === 'true'; }

export default async function handler(req,res){
  if (!isAdmin(req)) return res.status(401).end();
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { title, description, questions } = req.body;
    await prisma.question.deleteMany({ where: { quizId: Number(id) }});
    await prisma.quiz.update({ where:{ id: Number(id) }, data:{ title, description }});
    for (const q of questions) {
      await prisma.question.create({
        data: {
          quizId: Number(id),
          text: q.text,
          options: JSON.stringify(q.options),
          answerIdx: q.answerIdx
        }
      });
    }
    res.json({ ok: true });
  } else if (req.method === 'DELETE') {
    await prisma.question.deleteMany({ where:{ quizId: Number(id) }});
    await prisma.quiz.delete({ where:{ id: Number(id) }});
    res.json({ ok: true });
  } else {
    res.status(405).end();
  }
}
