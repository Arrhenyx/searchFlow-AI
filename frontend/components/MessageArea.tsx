import React from 'react';

interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
  error?: string;
}

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}

const TypingAnimation = () => {
  return (
    <div className="flex items-center gap-1.5 px-2">
      <div className="w-2 h-2 bg-blue-400 rounded-full typing-dot"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full typing-dot"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full typing-dot"></div>
    </div>
  );
};

const SearchStages = ({ searchInfo }: { searchInfo: SearchInfo }) => {
  if (!searchInfo || !searchInfo.stages || searchInfo.stages.length === 0) return null;

  return (
    <div className="mb-3 mt-1 relative pl-5">
      <div className="flex flex-col space-y-3 text-sm">
        {searchInfo.stages.includes('searching') && (
          <div className="relative animate-fade-in">
            <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30"></div>
            {searchInfo.stages.includes('reading') && (
              <div className="absolute -left-[7px] top-4 w-0.5 h-[calc(100%+0.75rem)] bg-gradient-to-b from-blue-400 to-cyan-400"></div>
            )}
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-blue-600 text-xs uppercase tracking-wider">🔍 Searching</span>
              <div className="flex flex-wrap gap-2">
                <div className="bg-blue-50 text-xs px-3 py-1.5 rounded-xl border border-blue-200/50 inline-flex items-center gap-1.5 shadow-sm">
                  <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <span className="text-blue-700 font-medium">{searchInfo.query}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {searchInfo.stages.includes('reading') && (
          <div className="relative animate-fade-in">
            <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/30"></div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-cyan-600 text-xs uppercase tracking-wider">📖 Reading sources</span>
              {searchInfo.urls && searchInfo.urls.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pl-1">
                  {searchInfo.urls.map((url, index) => (
                    <div key={index} className="bg-cyan-50/70 text-xs px-2.5 py-1 rounded-lg border border-cyan-200/50 text-cyan-700 truncate max-w-[180px] shadow-sm hover:shadow-md transition-shadow">
                      <span className="font-mono text-[10px]">{typeof url === 'string' ? url.substring(0, 30) : JSON.stringify(url).substring(0, 30)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {searchInfo.stages.includes('writing') && (
          <div className="relative animate-fade-in">
            <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30"></div>
            <span className="font-semibold text-emerald-600 text-xs uppercase tracking-wider">✍️ Writing response</span>
          </div>
        )}

        {searchInfo.stages.includes('error') && (
          <div className="relative animate-fade-in">
            <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg shadow-red-500/30"></div>
            <span className="font-semibold text-red-600 text-xs uppercase tracking-wider">❌ Error</span>
            <div className="pl-1 text-xs text-red-500 mt-1 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200/50">
              {searchInfo.error || "An error occurred during search."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MessageArea({ messages }: { messages: Message[] }) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto bg-gradient-to-b from-white via-blue-50/30 to-white px-4 md:px-6 py-4 md:py-6">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${message.isUser ? 'items-end' : 'items-start'}`}>
              {!message.isUser && message.searchInfo && (
                <SearchStages searchInfo={message.searchInfo} />
              )}

              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.isUser
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 rounded-tr-none'
                    : 'bg-white/80 backdrop-blur-sm text-gray-800 border border-blue-100/50 shadow-lg shadow-blue-500/10 rounded-tl-none'
                }`}
              >
                {message.isLoading ? (
                  <TypingAnimation />
                ) : (
                  <div className="whitespace-pre-wrap break-words text-sm md:text-base leading-relaxed">
                    {message.content || (
                      <span className="text-gray-400 italic text-xs">Waiting for response...</span>
                    )}
                  </div>
                )}
              </div>

              <div className={`text-xs text-gray-400 mt-1 px-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                {message.isUser ? 'You' : 'SearchFlow AI'}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}