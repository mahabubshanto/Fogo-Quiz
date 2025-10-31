import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (u)=>fetch(u).then(r=>r.json());

export default function Results(){
  const router = useRouter();
  const { attemptId } = router.query;
  const { data } = useSWR(attemptId ? `/api/attempts/${attemptId}` : null, fetcher);

  if (!data) return <div className="p-6">Loading result…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Your Results</h2>
      <p className="mt-2">Name: <strong>{data.studentName}</strong> — @{data.twitter}</p>
      <p className="mt-2">Score: <strong>{data.score}/{data.total}</strong></p>
      <div className="mt-4 card">
        <h3 className="font-semibold mb-2">Answers</h3>
        {data.questions.map((q, i) => (
          <div key={q.id} className="mb-3">
            <div className="font-semibold">Q{i+1}. {q.text}</div>
            <div className="text-sm">Your answer: {q.yourAnswer}</div>
            <div className="text-sm">Correct answer: {q.correct}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
