import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { EVENTS } from '../data/companyData';
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle2, ChevronRight, Award } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingEvents = EVENTS.filter(e => e.status === 'Upcoming');
  const pastEvents = EVENTS.filter(e => e.status === 'Past');
  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09182E] to-[#071426]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
            Campus & Community Calendar
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Events, Workshops & Hackathons
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Convening aspiring technologists, college faculties, and industry mentors for intense hands-on coding marathons, AI symposiums, and career panels.
          </p>
        </div>
      </section>

      {/* 2. TABS & EVENTS LIST */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[#D5AD63] text-[#071426] shadow-md shadow-[#D5AD63]/25'
                  : 'bg-[#0C1E36] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'past'
                  ? 'bg-[#D5AD63] text-[#071426] shadow-md shadow-[#D5AD63]/25'
                  : 'bg-[#0C1E36] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Past Symposiums ({pastEvents.length})
            </button>
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Demonstration Schedule
          </span>
        </div>

        <div className="space-y-8">
          {displayedEvents.map(event => (
            <div
              key={event.id}
              className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 hover:border-[#D5AD63]/40 transition-all shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D5AD63] bg-[#071426] px-2.5 py-1 rounded border border-[#D5AD63]/25">
                      {event.type}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Mode: {event.mode}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#D5AD63]" />
                      <span>{event.date} · {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D5AD63]" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#D5AD63]" />
                      <span>Speaker / Lead: {event.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#D5AD63]" />
                      <span>Capacity: {event.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
                  {event.status === 'Upcoming' ? (
                    <>
                      <button
                        onClick={() => navigate('/enroll')}
                        className="w-full sm:w-auto px-6 py-3 text-xs font-semibold bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] rounded-xl transition-all shadow-md shadow-[#D5AD63]/20 flex items-center justify-center gap-2"
                      >
                        <span>Reserve Attendee Seat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigate('/contact')}
                        className="w-full sm:w-auto px-6 py-2.5 text-xs text-slate-300 hover:text-white border border-slate-700 rounded-xl transition-colors"
                      >
                        Institutional Delegation Inquiry
                      </button>
                    </>
                  ) : (
                    <div className="text-xs text-slate-400 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center w-full">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                      <div>Completed Session</div>
                      <div className="text-[11px] text-slate-400 mt-1">Recordings accessible on student portal</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
