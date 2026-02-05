import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

const AiAssistant = () => {
  // STATIC DATA: Initial greeting
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm your HealthSync AI assistant. Describe your symptoms, and I'll suggest a specialist or home remedies." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add User Message
    const userMsg = { type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // DYNAMIC DATA: Calls Backend API (Gemini)
      const response = await api.diagnose(userMsg.text);
      
      const botResponseText = (
        <div className="space-y-2">
          <p><strong>Possible Specialist:</strong> {response.specialist}</p>
          <p>{response.explanation}</p>
          <div className="bg-emerald-50 p-3 rounded-lg mt-2">
            <p className="font-bold text-xs uppercase text-emerald-600 mb-1">Self-Care Tips:</p>
            <ul className="list-disc ml-4 text-sm">
              {response.tips?.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        </div>
      );

      setMessages(prev => [...prev, { type: 'bot', content: botResponseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: "I'm having trouble connecting to the server. Please try again later." }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in h-[calc(100vh-100px)] flex flex-col">
      <div className="bg-white p-6 rounded-t-[2rem] border-b border-slate-100 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center"><Sparkles size={20} /></div>
          <div>
            <h1 className="text-xl font-black text-slate-800">Health Assistant</h1>
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${msg.type === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-100 text-indigo-600'}`}>
              {msg.type === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`p-4 rounded-2xl max-w-[80%] text-sm font-medium leading-relaxed shadow-sm ${msg.type === 'user' ? 'bg-white text-slate-800 rounded-tr-none' : 'bg-indigo-600 text-white rounded-tl-none'}`}>
              {msg.content || msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="flex gap-4"><div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center"><Bot size={20} /></div><div className="p-4 bg-white rounded-2xl rounded-tl-none text-slate-400 italic text-sm">Analyzing symptoms...</div></div>}
      </div>

      <form onSubmit={handleSend} className="bg-white p-4 rounded-b-[2rem] shadow-xl border-t border-slate-100 flex gap-4">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-50 rounded-xl px-4 py-3 outline-none font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition-all"
          placeholder="Type your symptoms here..." 
        />
        <button disabled={loading} className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default AiAssistant;