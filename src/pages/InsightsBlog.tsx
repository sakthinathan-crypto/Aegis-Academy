import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { INSIGHTS } from '../data/companyData';
import { InsightArticle } from '../types';
import { Search, Calendar, Clock, User, ArrowRight, ArrowLeft, Tag } from 'lucide-react';

export const InsightsBlog: React.FC = () => {
  const { params, navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(() => {
    if (params.articleSlug) {
      return INSIGHTS.find(a => a.slug === params.articleSlug) || null;
    }
    return null;
  });

  const categories = [
    'All',
    'Artificial Intelligence',
    'Technology',
    'Education',
    'Career Development'
  ];

  const filteredArticles = INSIGHTS.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // If viewing single article
  if (activeArticle) {
    return (
      <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => {
              setActiveArticle(null);
              navigate('/insights');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5AD63] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Insights</span>
          </button>

          <header className="space-y-4 border-b border-slate-800 pb-8">
            <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold bg-[#0C1E36] px-3 py-1 rounded-md border border-[#D5AD63]/25">
              {activeArticle.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {activeArticle.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D5AD63]" />
                <span className="text-slate-200">{activeArticle.author}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D5AD63]" />
                <span>{activeArticle.publishedDate}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D5AD63]" />
                <span>{activeArticle.readTime}</span>
              </span>
            </div>
          </header>

          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            {activeArticle.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {activeArticle.tags.map(t => (
                <span key={t} className="text-[11px] text-slate-300 bg-[#0C1E36] px-2.5 py-1 rounded-md border border-slate-700">
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveArticle(null);
                navigate('/insights');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#102B4E] text-slate-200 hover:text-white rounded-lg transition-colors"
            >
              Browse More Articles
            </button>
          </footer>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09182E] to-[#071426]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
            Knowledge Base & Perspectives
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Aegis Insights & Publications
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Engineering essays, academic curriculum analyses, and deep-dives into modern AI architectures authored by Aegis mentors and researchers.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & CATEGORY FILTER */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#D5AD63] text-[#071426]'
                    : 'bg-[#0C1E36] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles & topics..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0C1E36] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
            />
          </div>
        </div>

        {/* 3. ARTICLES LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(art => (
            <article
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="group cursor-pointer rounded-2xl bg-[#0C1E36] border border-slate-800 p-6 flex flex-col justify-between hover:border-[#D5AD63]/40 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[#D5AD63] font-semibold uppercase">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#D5AD63] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>By {art.author}</span>
                <span className="text-[#D5AD63] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
