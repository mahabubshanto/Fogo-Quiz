import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function QuizPage() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [name, setName] = useState('');
  const [twitter, setTwitter] = useState('');
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/quizzes/${id}`).then(r=>r.json()).then(setQuiz);
  }, [id]);

  function select(qIdx, optIdx){
    setAnswers(prev => ({...prev, [qIdx]: optIdx}));
  }

  async function submit(){
    const res = await fetch('/api/submit', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ quizId: quiz.id, studentName: name, twitter, answers })
    });
    const json = await res.json();
    router.push(`/results/${json.attemptId}`);
  }

  if (!quiz) return <div className="p-6">Loading quiz…</div>;
  if (!started) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-3">{quiz.title}</h2>
        <p className="mb-4">{quiz.description}</p>
        <div className="mb-3">
          <input className="border p-2 w-full mb-2" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="border p-2 w-full" placeholder="Twitter username (without @)" value={twitter} onChange={e=>setTwitter(e.target.value)} />
        </div>
        <button disabled={!name || !twitter} onClick={()=>setStarted(true)} className="btn btn-orange">Start Quiz</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-3">{quiz.title}</h2>
      <div className="space-y-6">
        {quiz.questions.map((q, idx) => {
          const opts = JSON.parse(q.options);
          return (
            <div key={q.id} className="card">
              <div className="font-semibold">Q{idx+1}. {q.text}</div>
              <div className="mt-3 space-y-2">
                {opts.map((o,optIdx) => (
                  <label key={optIdx} className={`block p-2 rounded-lg border ${answers[idx]===optIdx ? 'bg-orange-50 border-orange-300' : 'bg-white'}`}>
                    <input type="radio" name={`q${idx}`} checked={answers[idx]===optIdx} onChange={()=>select(idx, optIdx)} /> {' '}
                    {o}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <button onClick={submit} className="btn btn-orange">Submit</button>
      </div>
    </div>
  );
}
