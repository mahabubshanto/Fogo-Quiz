import useSWR from 'swr';
import { useState } from 'react';
import Router from 'next/router';
import AdminQuizForm from '../../components/AdminQuizForm';

const fetcher = (u)=>fetch(u).then(r=>r.json());

export default function AdminQuizzes(){
  const { data } = useSWR('/api/admin/quizzes', fetcher);
  const [editing, setEditing] = useState(null);

  if (!data) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Quizzes</h2>
      <div className="mb-6">
        <button onClick={()=>setEditing({})} className="btn btn-orange">Create New Quiz</button>
      </div>

      <div className="space-y-4">
        {data.map(q => (
          <div key={q.id} className="card flex justify-between items-center">
            <div>
              <div className="font-semibold">{q.title}</div>
              <div className="text-sm text-gray-500">{q.description}</div>
            </div>
            <div className="space-x-2">
              <button onClick={()=>setEditing(q)} className="px-3 py-1 rounded border">Edit</button>
              <button onClick={async ()=>{ if (!confirm('Delete?')) return; await fetch('/api/admin/quizzes/'+q.id, { method:'DELETE' }); Router.reload(); }} className="px-3 py-1 rounded border text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && <AdminQuizForm quiz={editing} onClose={()=>{ setEditing(null); Router.reload(); }} />}
    </div>
  );
}
