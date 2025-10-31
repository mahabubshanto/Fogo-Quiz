export default function Leaderboard({ board }) {
  if (!board?.length) return <div>No scores yet this week — be the first!</div>;
  return (
    <ol className="space-y-2">
      {board.map((b, i) => (
        <li key={b.twitter || b.studentName} className="flex justify-between items-center">
          <div>
            <div className="font-semibold">{i+1}. {b.studentName} <span className="text-sm text-gray-500">@{b.twitter}</span></div>
            <div className="text-xs text-gray-500">Quiz: {b.quizTitle}</div>
          </div>
          <div className="text-lg font-bold">{b.score}</div>
        </li>
      ))}
    </ol>
  );
}
