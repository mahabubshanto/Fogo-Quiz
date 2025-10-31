import { useState } from 'react';

export default function AdminQuizForm({ quiz = {}, onClose }) {
  const [title, setTitle] = useState(quiz.title || '');
  const [description, setDescription] = useState(quiz.description || '');
  const [questions, setQuestions] = useState(quiz.questions?.map(q => ({...q, options: JSON.parse(q.options)})) || [
    { text:'', options:['',''], answerIdx:0 }
  ]);

  function addQuestion(){
    setQuestions(prev => [...prev, { text:'', options:['',''], answerIdx:0 }]);
  }
  function save(){
    const payload = {
      id: quiz.id,
      title, description,
      questions: questions.map(q => ({
        text: q.text,
        options: q.options,
        answerIdx: parseInt(q.answerIdx,10)
      }))
    };
    const url = '/api/admin/quizzes' + (quiz.id ? `/${quiz.id}` : '');
    fetch(url, { method: quiz.id ? 'PUT' : 'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload)})
      .then(r=>r.ok ? onClose() : alert('Error'));
  }

  return (
    <div className="mt-6 card">
      <h3 className="font-semibold mb-2">{quiz.id ? 'Edit Quiz' : 'New Quiz'}</h3>
      <input className="border p-2 w-full mb-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />

      <div className="space-y-4">
        {questions.map((q,i)=>(
          <div key={i} className="p-3 border rounded">
            <input className="w-full border p-2 mb-2" placeholder={`Question ${i+1}`} value={q.text} onChange={e=>{ const copy=[...questions]; copy[i].text=e.target.value; setQuestions(copy); }} />
            <div className="space-y-2">
              {q.options.map((opt,j)=>(
                <div key={j} className="flex gap-2">
                  <input className="flex-1 border p-2" value={opt} onChange={e=>{ const copy=[...questions]; copy[i].options[j]=e.target.value; setQuestions(copy); }} />
                  <input type="radio" name={`ans${i}`} checked={q.answerIdx===j} onChange={()=>{ const copy=[...questions]; copy[i].answerIdx=j; setQuestions(copy); }} />
                </div>
              ))}
              <button onClick={()=>{ const copy=[...questions]; copy[i].options.push(''); setQuestions(copy); }} className="px-2 py-1 rounded border text-sm">Add option</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="btn btn-orange" onClick={save}>Save</button>
        <button className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
        <button className="px-3 py-2 border rounded" onClick={addQuestion}>Add question</button>
      </div>
    </div>
  );
}
