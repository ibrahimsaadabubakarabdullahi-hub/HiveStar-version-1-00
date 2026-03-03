'use client';

import { useChat } from 'ai/react';
import { Send, Copy, Trash2, Star, Users } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';

const examplePrompts = [
  "What is the future of swarm intelligence?",
  "Explain quantum entanglement like a hive mind",
  "Help me brainstorm a sci-fi story set in a star hive",
  "How can Kantana AI Industries change the world?",
];

export default function HiveStar() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
  });

  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-amber-400 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-2xl tracking-tighter">HiveStar</div>
              <div className="text-xs text-zinc-500 -mt-1">Kantana AI Industries Ltd</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Clear Chat
            </button>
            <a href="https://kantana.ai" target="_blank" className="text-violet-400 hover:text-violet-300 flex items-center gap-1">
              <Users className="w-4 h-4" /> About Kantana
            </a>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-zinc-800 bg-zinc-950/50 p-6 hidden lg:block">
          <div className="mb-8">
            <div className="uppercase text-xs tracking-widest text-zinc-500 mb-3">The Hive Collective</div>
            <div className="text-xl font-semibold leading-tight">
              Welcome, Starling.<br />
              I am HiveStar.
            </div>
          </div>

          <div className="mb-6">
            <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Example Prompts</div>
            {examplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  const fakeEvent = { target: { value: prompt } } as any;
                  handleInputChange(fakeEvent);
                  setTimeout(() => handleSubmit(fakeEvent), 10);
                }}
                className="block w-full text-left px-4 py-3 text-sm hover:bg-zinc-900 rounded-2xl mb-2 transition-colors border border-transparent hover:border-violet-500/30"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-500">
            Built by Kantana AI Industries Ltd<br />
            Powered by Grok • xAI
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-500 via-purple-500 to-amber-400 rounded-3xl flex items-center justify-center mb-8 rotate-12">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl font-bold tracking-tighter mb-3">HiveStar</h1>
                <p className="max-w-md text-zinc-400 text-lg">
                  The collective intelligence of a thousand stars.<br />
                  Ask me anything.
                </p>
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
                  <div className={`max-w-3xl ${m.role === 'user' ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-zinc-900 border border-zinc-800'} rounded-3xl px-6 py-4`}>
                    <div className="flex items-center gap-3 mb-2">
                      {m.role === 'assistant' ? (
                        <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-xl flex items-center justify-center">
                          <Star className="w-4 h-4 text-zinc-950" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 bg-zinc-700 rounded-xl" />
                      )}
                      <span className="font-medium text-sm">{m.role === 'user' ? 'You' : 'HiveStar'}</span>
                    </div>

                    <div className="prose prose-invert max-w-none text-[15px]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>

                    {m.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(m.content, m.id)}
                        className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copied === m.id ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl px-6 py-4 flex items-center gap-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-xl flex items-center justify-center animate-pulse">
                    <Star className="w-4 h-4 text-zinc-950" />
                  </div>
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="border-t border-zinc-800 bg-zinc-950 p-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask HiveStar anything..."
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-violet-500 rounded-3xl py-4 pl-6 pr-16 text-lg placeholder:text-zinc-500 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 transition-colors w-11 h-11 rounded-2xl flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-zinc-500 mt-4">
                HiveStar can make mistakes. Consider checking important info.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
