interface InputBarProps {
  currentMessage: string;
  setCurrentMessage: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

export default function InputBar({ 
  currentMessage, 
  setCurrentMessage, 
  onSubmit,
  isProcessing 
}: InputBarProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 md:p-5 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm border-t border-blue-100/50 flex-shrink-0">
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-blue-100/50 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/20 transition-all duration-300">
        <button
          type="button"
          className="p-2 rounded-xl text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
        
        <input
          type="text"
          placeholder={isProcessing ? "Processing your request..." : "Ask me anything..."}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          disabled={isProcessing}
          className="flex-grow px-3 py-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base disabled:opacity-60"
        />
        
        <button
          type="button"
          className="p-2 rounded-xl text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
          </svg>
        </button>
        
        <button
          type="submit"
          disabled={isProcessing || !currentMessage.trim()}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl p-3 shadow-md transition-all duration-200 group flex-shrink-0"
        >
          <svg className="w-5 h-5 text-white transform rotate-45 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
      
      <div className="flex justify-center mt-2 text-xs text-gray-400">
        <span>SearchFlow AI • Powered by GPT-4 • Real-time search</span>
      </div>
    </form>
  );
}