import React from 'react';

interface TopBarProps {
  activeTab: 'adaptive' | 'lineage' | 'reverse' | 'science';
  onSelectTab: (tab: 'adaptive' | 'lineage' | 'reverse' | 'science') => void;
  onOpenContribution: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenContribution,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <button
            onClick={() => onSelectTab('adaptive')}
            className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 tracking-tight whitespace-nowrap shrink-0 text-left cursor-pointer hover:opacity-85 transition-opacity"
          >
            Culinary Echo
          </button>

          {/* Zone 2: 4-5 single-line clean text nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => onSelectTab('adaptive')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'adaptive'
                  ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                  : 'hover:text-stone-900 hover:border-b-2 hover:border-stone-300'
              }`}
            >
              Adaptive Cooking
            </button>
            <button
              onClick={() => onSelectTab('lineage')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'lineage'
                  ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                  : 'hover:text-stone-900 hover:border-b-2 hover:border-stone-300'
              }`}
            >
              Living Contributions
            </button>
            <button
              onClick={() => onSelectTab('reverse')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'reverse'
                  ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                  : 'hover:text-stone-900 hover:border-b-2 hover:border-stone-300'
              }`}
            >
              Reverse Recreation
            </button>
            <button
              onClick={() => onSelectTab('science')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'science'
                  ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                  : 'hover:text-stone-900 hover:border-b-2 hover:border-stone-300'
              }`}
            >
              Flavor Science
            </button>
          </nav>

          {/* Zone 3: 1 primary action button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenContribution}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Add Living Echo
            </button>
          </div>
        </div>

        {/* Mobile Nav Strip (clean single-line horizontal scroll) */}
        <div className="flex md:hidden items-center gap-4 py-2 overflow-x-auto text-xs font-medium text-stone-600 border-t border-stone-100 scrollbar-none">
          <button
            onClick={() => onSelectTab('adaptive')}
            className={`whitespace-nowrap py-1 cursor-pointer ${
              activeTab === 'adaptive' ? 'text-stone-900 font-bold border-b border-stone-900' : 'text-stone-500'
            }`}
          >
            Adaptive Cooking
          </button>
          <button
            onClick={() => onSelectTab('lineage')}
            className={`whitespace-nowrap py-1 cursor-pointer ${
              activeTab === 'lineage' ? 'text-stone-900 font-bold border-b border-stone-900' : 'text-stone-500'
            }`}
          >
            Living Contributions
          </button>
          <button
            onClick={() => onSelectTab('reverse')}
            className={`whitespace-nowrap py-1 cursor-pointer ${
              activeTab === 'reverse' ? 'text-stone-900 font-bold border-b border-stone-900' : 'text-stone-500'
            }`}
          >
            Reverse Recreation
          </button>
          <button
            onClick={() => onSelectTab('science')}
            className={`whitespace-nowrap py-1 cursor-pointer ${
              activeTab === 'science' ? 'text-stone-900 font-bold border-b border-stone-900' : 'text-stone-500'
            }`}
          >
            Flavor Science
          </button>
        </div>
      </div>
    </header>
  );
};
