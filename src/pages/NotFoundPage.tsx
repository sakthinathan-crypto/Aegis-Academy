import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ArrowLeft, Compass, GraduationCap, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative flex items-center justify-center">
          <span className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-slate-800 select-none animate-pulse">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold gold-gradient-text tracking-wider">
              PAGE NOT FOUND
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">
            Lost in the Digital Landscape?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            The page you are looking for may have been moved, renamed, or is currently undergoing architectural maintenance.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 text-xs font-semibold bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] rounded-xl transition-all shadow-md shadow-[#D5AD63]/25 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => navigate('/education')}
            className="px-5 py-2.5 text-xs font-semibold bg-[#102B4E] text-slate-200 hover:text-white rounded-xl hover:bg-[#153663] transition-colors border border-slate-700 flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-[#D5AD63]" />
            <span>Explore Programs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
