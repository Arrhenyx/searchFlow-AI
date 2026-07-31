export default function Header() {
  return (
    <header className="relative flex items-center justify-between px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-lg flex-shrink-0">
      <div className="absolute inset-0 bg-[url('/api/placeholder/100/100')] opacity-5 mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm"></div>
          <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-white font-bold text-xl tracking-tight">SearchFlow AI</h1>
          <p className="text-blue-100 text-xs font-medium opacity-80">Intelligent Search Assistant</p>
        </div>
      </div>

      <div className="flex items-center gap-1 relative">
        <button className="text-white/80 text-xs px-3 py-1.5 font-medium hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
          Home
        </button>
        <button className="text-white bg-white/15 text-xs px-3 py-1.5 font-medium hover:bg-white/25 rounded-lg transition-all duration-200 backdrop-blur-sm">
          Chat
        </button>
        <button className="text-white/80 text-xs px-3 py-1.5 font-medium hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
          History
        </button>
        <button className="text-white/80 text-xs px-3 py-1.5 font-medium hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
          Settings
        </button>
      </div>
    </header>
  );
}