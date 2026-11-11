import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_ITEMS } from '../data/companyData';
import { GalleryItem } from '../types';
import { X, ZoomIn, Calendar, ChevronLeft, ChevronRight, Layers, Sparkles, MapPin } from 'lucide-react';

const ARUNAI_CAROUSEL_IMAGES = [
  {
    step: 1,
    title: 'Sequence 1: Design Foundations & Information Architecture',
    src: '/images/gallery/uiux-workshop-arunai-1.jpeg',
    caption: 'Introduction to design thinking, user persona mapping, and wireframing at Arunai Engineering College, Tiruvannamalai.'
  },
  {
    step: 2,
    title: 'Sequence 2: Hands-on Digital Prototyping in Figma',
    src: '/images/gallery/uiux-workshop-arunai-2.jpeg',
    caption: 'Hands-on digital canvas prototyping, component hierarchy, and design system exercises at Arunai Engineering College, Tiruvannamalai.'
  },
  {
    step: 3,
    title: 'Sequence 3: Interactive User Experience & Component Labs',
    src: '/images/gallery/uiux-workshop-arunai-3.jpeg',
    caption: 'Interactive user testing, user journey workflows, and design critique session at Arunai Engineering College, Tiruvannamalai.'
  },
  {
    step: 4,
    title: 'Sequence 4: Student Design Showcase & Project Presentations',
    src: '/images/gallery/uiux-workshop-arunai-4.jpeg',
    caption: 'Student design presentations, final prototype evaluation, and industry feedback at Arunai Engineering College, Tiruvannamalai.'
  }
];

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    category: string;
    caption: string;
    date: string;
    images: string[];
    currentIndex: number;
  } | null>(null);

  // Arunai Feature Carousel State
  const [arunaiIndex, setArunaiIndex] = useState<number>(0);
  const [isHoveringArunai, setIsHoveringArunai] = useState<boolean>(false);
  const arunaiTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance Arunai carousel when cursor is placed on the image
  useEffect(() => {
    if (isHoveringArunai) {
      arunaiTimerRef.current = setInterval(() => {
        setArunaiIndex(prev => (prev + 1) % ARUNAI_CAROUSEL_IMAGES.length);
      }, 1500);
    } else {
      if (arunaiTimerRef.current) {
        clearInterval(arunaiTimerRef.current);
        arunaiTimerRef.current = null;
      }
    }
    return () => {
      if (arunaiTimerRef.current) clearInterval(arunaiTimerRef.current);
    };
  }, [isHoveringArunai]);

  // Handle cursor movement across horizontal width to scrub through images 1 to 4
  const handleArunaiMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = Math.min(Math.max(x / rect.width, 0), 0.999);
    const index = Math.floor(progress * ARUNAI_CAROUSEL_IMAGES.length);
    if (index !== arunaiIndex) {
      setArunaiIndex(index);
    }
  };

  const handleArunaiPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setArunaiIndex(prev => (prev === 0 ? ARUNAI_CAROUSEL_IMAGES.length - 1 : prev - 1));
  };

  const handleArunaiNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setArunaiIndex(prev => (prev + 1) % ARUNAI_CAROUSEL_IMAGES.length);
  };

  const categories = [
    'All',
    'Workshops',
    'Events',
    'Training Sessions',
    'Campus Activities'
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    const images = item.images && item.images.length > 0 ? item.images : [item.imageUrl];
    setSelectedItem({
      title: item.title,
      category: item.category,
      caption: item.caption,
      date: item.date,
      images,
      currentIndex: 0
    });
  };

  const handleOpenArunaiLightbox = () => {
    setSelectedItem({
      title: `UI/UX Workshop – Arunai Engineering College, Tiruvannamalai (${ARUNAI_CAROUSEL_IMAGES[arunaiIndex].title})`,
      category: 'Workshops',
      caption: ARUNAI_CAROUSEL_IMAGES[arunaiIndex].caption,
      date: '2026',
      images: ARUNAI_CAROUSEL_IMAGES.map(img => img.src),
      currentIndex: arunaiIndex
    });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') setSelectedItem(null);
      if (e.key === 'ArrowLeft' && selectedItem.images.length > 1) {
        setSelectedItem(prev => prev ? {
          ...prev,
          currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
        } : null);
      }
      if (e.key === 'ArrowRight' && selectedItem.images.length > 1) {
        setSelectedItem(prev => prev ? {
          ...prev,
          currentIndex: (prev.currentIndex + 1) % prev.images.length
        } : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

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
            Moments from our hands-on engineering labs, UI/UX workshops, school outreach sessions, and collegiate bootcamps.
          </p>
        </div>
      </section>

      {/* 2. FEATURED CAROUSEL: ARUNAI ENGINEERING COLLEGE UI/UX WORKSHOP */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0C1E36] border border-[#D5AD63]/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5AD63] mb-1">
                <Sparkles className="w-4 h-4 text-[#D5AD63]" />
                <span>Featured Interactive Workshop Series (Sequence 1 to 4)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                UI/UX Design Workshop – Arunai Engineering College, Tiruvannamalai
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-[#071426] px-3.5 py-1.5 rounded-full border border-slate-700 self-start lg:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#D5AD63] animate-pulse" />
              <span>Place cursor on image to move one by one (1 → 4)</span>
            </div>
          </div>

          {/* Interactive Carousel Viewport */}
          <div
            onMouseEnter={() => setIsHoveringArunai(true)}
            onMouseLeave={() => setIsHoveringArunai(false)}
            onMouseMove={handleArunaiMouseMove}
            onClick={handleOpenArunaiLightbox}
            className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer group shadow-2xl"
          >
            {/* Active Sequence Image */}
            <img
              src={ARUNAI_CAROUSEL_IMAGES[arunaiIndex].src}
              alt={ARUNAI_CAROUSEL_IMAGES[arunaiIndex].title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.endsWith('.jpeg')) target.src = target.src.replace('.jpeg', '.jpg');
                else if (target.src.endsWith('.jpg')) target.src = target.src.replace('.jpg', '.jpeg');
              }}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/90 via-[#071426]/25 to-transparent" />

            {/* Top Sequence Progress Indicators (4 steps) */}
            <div className="absolute top-4 inset-x-4 flex gap-2 z-10 pointer-events-none">
              {ARUNAI_CAROUSEL_IMAGES.map((img, idx) => (
                <div
                  key={img.step}
                  className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm transition-all"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      idx === arunaiIndex
                        ? 'bg-[#D5AD63] w-full shadow-[0_0_8px_rgba(213,173,99,0.8)]'
                        : idx < arunaiIndex
                        ? 'bg-white/60 w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Left/Right Click Overlays */}
            <button
              onClick={handleArunaiPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#071426]/80 text-white hover:bg-[#D5AD63] hover:text-[#071426] border border-slate-700 transition-all z-20 cursor-pointer opacity-80 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleArunaiNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#071426]/80 text-white hover:bg-[#D5AD63] hover:text-[#071426] border border-slate-700 transition-all z-20 cursor-pointer opacity-80 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Caption and Sequence Counter */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-10">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-[#D5AD63] text-[#071426] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  <span>Image {arunaiIndex + 1} of 4</span>
                  <span>•</span>
                  <span>Sequence {arunaiIndex + 1}</span>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white drop-shadow-md">
                  {ARUNAI_CAROUSEL_IMAGES[arunaiIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-2 drop-shadow">
                  {ARUNAI_CAROUSEL_IMAGES[arunaiIndex].caption}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[11px] font-medium text-slate-300 bg-[#071426]/80 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-[#D5AD63]" />
                  <span>Click to Expand Full-Res</span>
                </span>
              </div>
            </div>
          </div>

          {/* 4 Sequence Thumbnail Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {ARUNAI_CAROUSEL_IMAGES.map((img, idx) => (
              <button
                key={img.step}
                onClick={() => setArunaiIndex(idx)}
                onMouseEnter={() => setArunaiIndex(idx)}
                className={`p-2 rounded-xl text-left transition-all border cursor-pointer flex items-center gap-2.5 ${
                  idx === arunaiIndex
                    ? 'bg-[#071426] border-[#D5AD63] shadow-md'
                    : 'bg-[#071426]/50 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                  <img
                    src={img.src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className={`text-xs font-bold truncate ${idx === arunaiIndex ? 'text-[#D5AD63]' : 'text-slate-300'}`}>
                    Sequence {idx + 1}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    Arunai College
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ALL GALLERY ITEMS GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
              Complete Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              All Campus Photos & Outreaches
            </h2>
          </div>

          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#D5AD63] text-[#071426] shadow-md shadow-[#D5AD63]/25'
                    : 'bg-[#0C1E36] text-slate-300 hover:text-white hover:bg-[#102B4E] border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <GalleryGridCard
              key={item.id}
              item={item}
              onOpen={() => handleOpenLightbox(item)}
            />
          ))}
        </div>
      </section>

      {/* 4. LIGHTBOX MODAL WITH MULTI-IMAGE CAROUSEL NAVIGATION */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0C1E36] border border-[#D5AD63]/30 rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#071426]/90 text-slate-300 hover:text-white border border-slate-700 hover:border-[#D5AD63] cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next controls if multiple images exist */}
            {selectedItem.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(prev => prev ? {
                      ...prev,
                      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
                    } : null);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#071426]/80 text-white hover:bg-[#D5AD63] hover:text-[#071426] border border-slate-700 transition-colors cursor-pointer"
                  aria-label="Previous sequence image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(prev => prev ? {
                      ...prev,
                      currentIndex: (prev.currentIndex + 1) % prev.images.length
                    } : null);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#071426]/80 text-white hover:bg-[#D5AD63] hover:text-[#071426] border border-slate-700 transition-colors cursor-pointer"
                  aria-label="Next sequence image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="max-h-[70vh] bg-black/80 flex items-center justify-center overflow-hidden relative">
              <img
                src={selectedItem.images[selectedItem.currentIndex]}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('.jpeg')) target.src = target.src.replace('.jpeg', '.jpg');
                  else if (target.src.endsWith('.jpg')) target.src = target.src.replace('.jpg', '.jpeg');
                }}
                className="w-full h-auto max-h-[70vh] object-contain select-none"
              />

              {selectedItem.images.length > 1 && (
                <div className="absolute top-4 left-4 text-xs font-bold font-mono text-[#071426] bg-[#D5AD63] px-3 py-1 rounded-full shadow-md">
                  Sequence {selectedItem.currentIndex + 1} of {selectedItem.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Strip inside Modal */}
            {selectedItem.images.length > 1 && (
              <div className="p-3 bg-[#071426] border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto">
                {selectedItem.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedItem(prev => prev ? { ...prev, currentIndex: i } : null)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 cursor-pointer transition-all shrink-0 ${
                      i === selectedItem.currentIndex ? 'border-[#D5AD63] scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt={`Step ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

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

interface GalleryGridCardProps {
  item: GalleryItem;
  onOpen: () => void;
}

const GalleryGridCard: React.FC<GalleryGridCardProps> = ({ item, onOpen }) => {
  const images = item.images && item.images.length > 0 ? item.images : [item.imageUrl];
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hovering, setHovering] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // If item has multiple sequence images, hover advances sequence one by one
  useEffect(() => {
    if (hovering && images.length > 1) {
      timerRef.current = setInterval(() => {
        setActiveIdx(prev => (prev + 1) % images.length);
      }, 1200);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hovering, images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (images.length <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = Math.min(Math.max(x / rect.width, 0), 0.999);
    const index = Math.floor(progress * images.length);
    if (index !== activeIdx) {
      setActiveIdx(index);
    }
  };

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0C1E36] border border-slate-800 hover:border-[#D5AD63]/40 transition-all duration-300 shadow-xl flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img
          src={images[activeIdx]}
          alt={item.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.endsWith('.jpeg')) target.src = target.src.replace('.jpeg', '.jpg');
            else if (target.src.endsWith('.jpg')) target.src = target.src.replace('.jpg', '.jpeg');
          }}
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

        {images.length > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#071426]/90 px-2 py-0.5 rounded text-[10px] font-mono text-[#D5AD63] border border-[#D5AD63]/40">
            <Layers className="w-3 h-3" />
            <span>{activeIdx + 1}/{images.length}</span>
          </div>
        )}

        {/* Step bars for multi-image items */}
        {images.length > 1 && (
          <div className="absolute bottom-2 inset-x-3 flex gap-1 z-10 pointer-events-none">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i === activeIdx ? 'bg-[#D5AD63]' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
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
          <span className="text-[#D5AD63] font-medium">
            {images.length > 1 ? 'Hover: 1→4 • Click to view' : 'Click to enlarge'}
          </span>
        </div>
      </div>
    </div>
  );
};
