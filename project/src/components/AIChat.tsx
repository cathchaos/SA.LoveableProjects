import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your Building Assistant. Ask me about trash pickup, wifi, or parking rules!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      let reply = "I'm not sure about that. Please contact the manager.";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('wifi')) reply = "The lobby WiFi password is: BuildingSafe2024";
      else if (lowerInput.includes('trash') || lowerInput.includes('garbage')) reply = "Trash pickup is every Tuesday and Friday morning at 7:00 AM.";
      else if (lowerInput.includes('parking')) reply = "Guest parking is located in the basement, spots -10 to -15.";
      else if (lowerInput.includes('pool') || lowerInput.includes('swim')) reply = "The pool is open daily from 8:00 AM to 10:00 PM.";
      else if (lowerInput.includes('hello') || lowerInput.includes('hi')) reply = "Hi there! How can I help you with your apartment today?";

      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-gray-100 mb-4 overflow-hidden pointer-events-auto animate-fade-in transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Concierge AI</h3>
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition"><X className="h-4 w-4" /></button>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-sm"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6 animate-pulse" />}
      </button>
    </div>
  );
};

export default AIChat;