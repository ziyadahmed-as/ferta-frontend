"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Smile, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const Chatbot = () => {
  const { user } = useAuth();
  const params = useParams();
  const courseId = params?.id;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Fatra Academy Assistant. How can I help you with your learning journey today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const query = inputText.trim();
    const newUserMsg = { id: Date.now(), text: query, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const endpoint = user ? "/ai/learning-assistant/" : "/ai/chat/";
      const payload: any = { query };
      if (user && courseId) {
        payload.course_id = courseId;
      }
      const response = await api.post(endpoint, payload);
      
      const botResponse = {
        id: Date.now() + 1,
        text: response.data.response || response.data.summary || "I've processed your request. Is there anything else you'd like to know?",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (err: any) {
      console.error("AI Assistant Error:", err);
      const errorMsg = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting to my brain right now. Please try again in a moment!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 font-sans">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[380px] sm:w-[420px] h-[600px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden bottom-24 right-0 absolute ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="p-6 gradient-primary text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8 blur-xl" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                  <Sparkles size={24} className="text-white fill-white/20" />
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-tight">Fatra Academy Assistant</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-[10px] uppercase font-bold opacity-80 tracking-widest">Active & Ready</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all relative z-10"
                title="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white dark:bg-slate-950/50 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-auto shadow-sm ${
                      msg.sender === "user" 
                        ? "bg-indigo-100 text-indigo-600" 
                        : "bg-indigo-100 text-indigo-600"
                    }`}>
                      {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-500/10" 
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-auto">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl rounded-bl-none shadow-sm flex items-center gap-1.5 border border-slate-100 dark:border-slate-700">
                       <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-duration:0.6s]" />
                       <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.1s]" />
                       <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSend} className="flex gap-2 items-center bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-indigo-300 dark:focus-within:border-indigo-600 transition-all">
                <button type="button" title="Attach file" className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask anything..."
                  title="Message Input"
                  className="flex-1 bg-transparent border-none outline-none font-medium text-slate-700 dark:text-slate-200 py-2 px-1 text-sm placeholder:text-slate-400"
                />
                <button type="button" title="Emojis" className="p-2 text-slate-400 hover:text-indigo-500 transition-colors hidden sm:block">
                  <Smile size={18} />
                </button>
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  title="Send Message"
                  aria-label="Send Message"
                  className="w-10 h-10 gradient-primary text-white rounded-xl flex items-center justify-center transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 disabled:shadow-none active:scale-95"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">Powered by Fatra Academy AI • Always learning</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 gradient-primary text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all border-none relative group"
        title={isOpen ? "Close Assistant" : "Chat with AI"}
        aria-label={isOpen ? "Close Assistant" : "Chat with AI"}
      >
        <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="relative">
              <MessageCircle size={28} className="fill-white/10" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-indigo-600 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Chatbot;
