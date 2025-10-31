import Link from 'next/link';

export default function QuizCard({ quiz }) {
  return (
    <div className="border rounded-lg p-4 mb-3">
      <h3 className="text-lg font-semibold">{quiz.title}</h3>
      <p className="text-sm text-gray-600">{quiz.description}</p>
      <div className="mt-3">
        <Link href={`/quiz/${quiz.id}`}>
          <a className="btn btn-orange">Take Quiz</a>
        </Link>
      </div>
    </div>
  );
}
