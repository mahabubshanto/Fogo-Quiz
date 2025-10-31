import { useState } from 'react';
import Router from 'next/router';

export default function AdminIndex(){
  const [pw, setPw] = useState('');
  async function login(){
    const res = await fetch('/api/admin/login', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ password: pw })
    });
    if (res.ok) {
      Router.push('/admin/quizzes');
    } else {
      alert('Invalid password');
    }
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Admin Login</h2>
      <input className="border p-2 w-full mt-4" placeholder="Admin password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
      <div className="mt-4">
        <button className="btn btn-orange" onClick={login}>Login</button>
      </div>
    </div>
  );
}
