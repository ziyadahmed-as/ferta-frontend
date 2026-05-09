"use client";

import React, { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

interface AiTutorSidebarProps {
  aiSidebarOpen: boolean;
  setAiSidebarOpen: (open: boolean) => void;
  chatHistory: { role: 'user' | 'ai', content: string }[];
  isAiTyping: boolean;
  chatEndRef: RefObject<HTMLDivElement | null>;
  chatQuery: string;
  setChatQuery: (query: string) => void;
  handleAskAI: (e: React.FormEvent) => void;
}

export const AiTutorSidebar: React.FC<AiTutorSidebarProps> = ({
  aiSidebarOpen, setAiSidebarOpen, chatHistory, isAiTyping, chatEndRef,
  chatQuery, setChatQuery, handleAskAI
}) => {
  return (
    <AnimatePresence>
      {aiSidebarOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 350, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="flex-shrink-0 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col z-20 absolute right-0 lg:relative h-full"
        >
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">AI Learning Assistant</h3>
                <p className="text-[10px] text-cyan-600 uppercase font-bold tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" /> Online
                </p>
              </div>
            </div>
            <button
              title="Close AI Assistant"
              aria-label="Close AI Assistant"
              onClick={() => setAiSidebarOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-sm border border-slate-200 dark:border-slate-700'
                  }`}>
                  <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: (msg.content || "").replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef as any} />
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <form onSubmit={handleAskAI} className="relative flex items-center">
              <input
                type="text"
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                placeholder="Ask a question about this lesson..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-slate-200"
              />
              <button
                type="submit"
                title="Send Message"
                aria-label="Send Message"
                disabled={!chatQuery.trim() || isAiTyping}
                className="absolute right-2 p-1.5 gradient-primary text-white rounded-lg disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
            <p className="text-center mt-2 text-[9px] text-slate-400 uppercase tracking-widest font-bold">
              Context-Aware AI Protocol Active
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
