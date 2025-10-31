import Link from 'next/link';
import useSWR from 'swr';
import Layout from '../components/Layout';
import QuizCard from '../components/QuizCard';
import Leaderboard from '../components/Leaderboard';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function Home() {
  const { data: quizzes } = useSWR('/api/quizzes', fetcher);
  const { data: board } = useSWR('/api/leaderboard/week', fetcher);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Orange Quiz — Take a Test</h1>
          <p className="mt-2 text-gray-700">Enter your name and Twitter username when you start.</p>
        </header>

        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Available Quizzes</h2>
            {!quizzes && <div>Loading…</div>}
            {quizzes?.map(q => <QuizCard key={q.id} quiz={q} />)}
          </div>

          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Weekly Leaderboard</h2>
            <Leaderboard board={board || []} />
          </div>
        </section>

        <footer className="text-sm text-gray-500">
          <Link href="/admin"><a className="underline">Admin panel</a></Link>
        </footer>
      </div>
    </Layout>
  );
}
