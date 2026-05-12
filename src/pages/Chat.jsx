import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import useGroq from '../hooks/useGroq';
import { Send, MessageSquare, Plus, Info, User, Bot, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Chat = () => {
  const { chatWithAI, analyzing } = useGroq();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm MediLens AI. How can I help you with your medications today?" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || analyzing) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Get only the last 10 messages for context to keep it efficient
      const history = messages.concat(userMessage).slice(-10);
      const response = await chatWithAI(history);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      toast.error("Failed to get response from AI.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-xl"></div>
      
      <div className="relative z-10 flex flex-col h-screen">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 pt-28 pb-8 flex overflow-hidden">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col w-80 mr-8 space-y-6">
            <Card className="flex-1 bg-white/5 border-white/10 p-6 flex flex-col">
              <Button 
                onClick={() => setMessages([{ role: 'assistant', content: "Hello! I'm MediLens AI. How can I help you today?" }])}
                className="w-full justify-start space-x-2 mb-8" 
                icon={Plus}
              >
                New Chat
              </Button>
              <div className="flex-1 overflow-y-auto space-y-4">
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest px-2">Suggestions</p>
                <div className="space-y-1">
                  {[
                    'Common side effects of Paracetamol?',
                    'Can I take Ibuprofen with food?',
                    'Explain Metformin dosage.',
                    'What if I miss a dose?'
                  ].map((suggestion, i) => (
                    <button 
                      key={i} 
                      onClick={() => setInput(suggestion)}
                      className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-white/60 text-xs transition-colors flex items-center"
                    >
                      <MessageSquare size={12} className="mr-3 opacity-50" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col space-y-6">
            <Card className="flex-1 bg-brand-card/40 backdrop-blur-md border-white/5 overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-cyan/20 rounded-xl flex items-center justify-center">
                    <Bot className="text-brand-cyan" size={20} />
                  </div>
                  <div>
                    <h2 className="text-white font-bold">MediLens AI Assistant</h2>
                    <p className="text-[10px] text-brand-cyan uppercase font-bold tracking-widest">Medical Support Online</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center mb-1">
                        <Bot size={12} className="text-brand-cyan" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                      msg.role === 'user' 
                      ? 'bg-brand-cyan text-brand-navy rounded-br-none font-medium' 
                      : 'bg-white/10 border border-white/10 text-white rounded-bl-none backdrop-blur-md'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mb-1">
                        <User size={12} className="text-white/40" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {analyzing && (
                  <div className="flex justify-start items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center">
                      <Bot size={12} className="text-brand-cyan" />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                      <Loader2 size={16} className="text-brand-cyan animate-spin" />
                      <span className="text-xs text-white/40">MediLens is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white/5 border-t border-white/5">
                <form onSubmit={handleSendMessage} className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 pr-3 focus-within:border-brand-cyan transition-all duration-300">
                  <input 
                    type="text" 
                    placeholder="Ask about side effects, dosages, or interactions..."
                    className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={analyzing}
                  />
                  <Button 
                    type="submit"
                    size="sm" 
                    icon={analyzing ? Loader2 : Send} 
                    disabled={!input.trim() || analyzing}
                    className={analyzing ? 'animate-pulse' : ''}
                  >
                    {analyzing ? 'Processing...' : 'Send'}
                  </Button>
                </form>
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center text-[10px] text-white/20 uppercase font-bold tracking-tighter">
                    <Info size={10} className="mr-1.5" />
                    MediLens AI provides information only. Always consult a doctor for medical decisions.
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
