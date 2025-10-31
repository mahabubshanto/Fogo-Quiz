export default function Layout({ children }) {
  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold" style={{color:'var(--orange-600)'}}>🔶 Orange Quiz</div>
          <div className="text-sm text-gray-600">Simple quizzes for students</div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
