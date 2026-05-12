import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Send, MessageSquare, Plus, Info } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm MediLens AI. Select a prescription or ask me any medical questions you have about your medications." }
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-xl"></div>
      
      <div className="relative z-10 flex flex-col h-screen">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 pt-28 pb-8 flex overflow-hidden">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col w-80 mr-8 space-y-6">
            <Card className="flex-1 bg-white/5 border-white/10 p-6 flex flex-col">
              <Button className="w-full justify-start space-x-2 mb-8" icon={Plus}>
                New Chat
              </Button>
              <div className="flex-1 overflow-y-auto space-y-4">
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest px-2">Recent Sessions</p>
                <div className="space-y-1">
                  {['Paracetamol Side Effects', 'Diabetes Meds Info', 'Interactions Check'].map((chat, i) => (
                    <button key={i} className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-white/60 text-sm transition-colors flex items-center">
                      <MessageSquare size={14} className="mr-3 opacity-50" />
                      {chat}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col space-y-6">
            <Card className="flex-1 bg-brand-card/40 backdrop-blur-md border-white/5 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-cyan/20 rounded-xl flex items-center justify-center">
                    <MessageSquare className="text-brand-cyan" size={20} />
                  </div>
                  <div>
                    <h2 className="text-white font-bold">Ask MediLens AI</h2>
                    <p className="text-xs text-brand-cyan">AI Assistant • llama-3.2-90b</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user' 
                      ? 'bg-brand-cyan text-brand-navy rounded-tr-none font-medium' 
                      : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/5">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 pr-3 focus-within:border-brand-cyan transition-colors">
                  <input 
                    type="text" 
                    placeholder="Ask about side effects, dosages, or interactions..."
                    className="flex-1 bg-transparent border-none text-white px-4 py-2 focus:outline-none text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button size="sm" icon={Send} disabled={!input.trim()}>
                    Send
                  </Button>
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center text-[10px] text-white/30 uppercase font-bold">
                    <Info size={12} className="mr-1.5" />
                    For informational purposes only
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
