import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/companyData';
import { GalleryItem } from '../types';
import { X, ZoomIn, Calendar, Tag } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Workshops',
    'Events',
    'Training Sessions',
    'Team Activities',
    'Campus Activities',
    'Projects'
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09182E] to-[#071426]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
            Campus Visual Chronicle
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive Campus Gallery
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Moments from our hands-on engineering labs, hackathons, faculty training symposiums, and student project demonstrations.
          </p>
        </div>
      </section>

      {/* 2. GALLERY GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeCategory === cat
                  ? 'bg-[#D5AD63] text-[#071426] shadow-md shadow-[#D5AD63]/25'
                  : 'bg-[#0C1E36] text-slate-300 hover:text-white hover:bg-[#102B4E] border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0C1E36] border border-slate-800 hover:border-[#D5AD63]/40 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#071426]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-[#071426]/90 border border-[#D5AD63] text-[#D5AD63]">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 text-[10px] uppercase font-semibold text-white bg-[#071426]/90 px-2 py-0.5 rounded border border-slate-700">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#D5AD63] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D5AD63]" />
                    <span>{item.date}</span>
                  </span>
                  <span className="text-[#D5AD63] font-medium">Click to enlarge</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0C1E36] border border-[#D5AD63]/30 rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#071426]/90 text-slate-300 hover:text-white border border-slate-700 hover:border-[#D5AD63]"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black/60 flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-6 bg-[#0C1E36] border-t border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs uppercase tracking-wider text-[#D5AD63] font-semibold bg-[#071426] px-2.5 py-1 rounded border border-[#D5AD63]/20">
                  {selectedItem.category}
                </span>
                <span className="text-xs text-slate-400">{selectedItem.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{selectedItem.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
