import React from 'react';
import { useGame } from '../../context/GameContext';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const { breadcrumbs, activeStage, setActiveStage, setView } = useGame();

  return (
    <div className="flex items-center justify-between py-2 px-1 text-xs text-slate-400 mb-3 border-b border-slate-800/80">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="font-rpg font-semibold text-rose-400">QUEST</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <span
              className={`whitespace-nowrap ${
                idx === breadcrumbs.length - 1
                  ? 'text-slate-100 font-bold'
                  : 'hover:text-rose-300 cursor-pointer transition'
              }`}
              onClick={() => {
                if (idx === 0) {
                  setActiveStage(null);
                  setView('home');
                } else if (idx === 1 && breadcrumbs[0] === 'Bản Đồ') {
                  setActiveStage(null);
                  setView('map');
                }
              }}
            >
              {crumb}
            </span>
            {idx < breadcrumbs.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {activeStage && (
        <button
          onClick={() => setActiveStage(null)}
          className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Thoát màn</span>
        </button>
      )}
    </div>
  );
};
