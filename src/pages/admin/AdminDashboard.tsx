import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { StorageStore } from '../../data/store';
import {
  EnrollmentSubmission,
  QuoteRequestSubmission,
  ContactMessage
} from '../../types';
import { PROGRAMS, PROJECTS, EVENTS, LEADERSHIP_TEAM, COMPANY_INFO } from '../../data/companyData';
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  GraduationCap,
  Briefcase,
  Calendar,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  RefreshCw,
  ExternalLink,
  Shield,
  ShieldAlert,
  ArrowUpRight,
  Database,
  Lock,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { navigate } = useRouter();

  const [activeModule, setActiveModule] = useState<
    'overview' | 'enrollments' | 'leads' | 'messages' | 'programs' | 'projects' | 'events' | 'settings'
  >('overview');

  const [enrollments, setEnrollments] = useState<EnrollmentSubmission[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequestSubmission[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals for detail inspection
  const [viewEnrollment, setViewEnrollment] = useState<EnrollmentSubmission | null>(null);
  const [viewQuote, setViewQuote] = useState<QuoteRequestSubmission | null>(null);
  const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);

  // Load from reactive store
  const refreshData = () => {
    setEnrollments(StorageStore.getEnrollments());
    setQuotes(StorageStore.getQuoteRequests());
    setMessages(StorageStore.getContactMessages());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Update status handlers
  const handleUpdateEnrollmentStatus = (id: string, status: EnrollmentSubmission['status']) => {
    StorageStore.updateEnrollmentStatus(id, status);
    refreshData();
    if (viewEnrollment && viewEnrollment.id === id) {
      setViewEnrollment(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleUpdateQuoteStatus = (id: string, status: QuoteRequestSubmission['status']) => {
    StorageStore.updateQuoteStatus(id, status);
    refreshData();
    if (viewQuote && viewQuote.id === id) {
      setViewQuote(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleUpdateMessageStatus = (id: string, status: ContactMessage['status']) => {
    StorageStore.updateMessageStatus(id, status);
    refreshData();
    if (viewMessage && viewMessage.id === id) {
      setViewMessage(prev => prev ? { ...prev, status } : null);
    }
  };

  // KPI Calculations
  const totalEnrollments = enrollments.length;
  const totalLeads = quotes.length;
  const pendingInquiries = messages.filter(m => m.status === 'Unread').length;
  const activeProgramsCount = PROGRAMS.length;
  const totalProjectsCount = PROJECTS.length;
  const upcomingEventsCount = EVENTS.filter(e => e.status === 'Upcoming').length;

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 flex flex-col pt-16">
      {/* Top Admin Notice Bar */}
      <div className="bg-[#102B4E] border-b border-[#D5AD63]/25 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-200 gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#D5AD63] shrink-0" />
          <span>
            <strong className="text-white">Admin Management Console</strong> · Prototype Mode (Connected to Client Reactive Store)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              StorageStore.resetToInitial();
              refreshData();
            }}
            className="hover:text-[#D5AD63] transition-colors flex items-center gap-1 text-[11px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo Records</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-[#D5AD63] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Exit to Public Website</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-[#09182E] border-r border-slate-800 p-4 shrink-0 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="px-3 py-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#D5AD63]">
                Aegis SaaS Platform
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                Executive Portal
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveModule('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  activeModule === 'overview'
                    ? 'bg-[#D5AD63] text-[#071426] font-semibold'
                    : 'text-slate-300 hover:bg-[#0C1E36] hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setActiveModule('enrollments')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  activeModule === 'enrollments'
                    ? 'bg-[#D5AD63] text-[#071426] font-semibold'
                    : 'text-slate-300 hover:bg-[#0C1E36] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Enrollments</span>
                </div>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                  {totalEnrollments}
                </span>
              </button>

              <button
                onClick={() => setActiveModule('leads')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  activeModule === 'leads'
                    ? 'bg-[#D5AD63] text-[#071426] font-semibold'
                    : 'text-slate-300 hover:bg-[#0C1E36] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4" />
                  <span>Leads & Quotes</span>
                </div>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                  {totalLeads}
                </span>
              </button>

              <button
                onClick={() => setActiveModule('messages')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  activeModule === 'messages'
                    ? 'bg-[#D5AD63] text-[#071426] font-semibold'
                    : 'text-slate-300 hover:bg-[#0C1E36] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Messages</span>
                </div>
                {pendingInquiries > 0 && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">
                    {pendingInquiries} new
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveModule('programs')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  activeModule === 'programs'
                    ? 'bg-[#D5AD63] text-[#071426] font-semibold'
                    : 'text-slate-300 hover:bg-[#0C1E36] hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Programs Directory</span>
              </button>

              <button
                onClick={() => setActiveModule('projects')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  activeModule === 'projects'
                    ? 'bg-[#D5AD63] text-[#071426] font-semibold'
                    : 'text-slate-300 hover:bg-[#0C1E36] hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Projects Showcase</span>
              </button>

              <button
                onClick={() => setActiveModule('events')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  activeModule === 'events'
                    ? 'bg-[#D5AD63] text-[#071426] font-semibold'
                    : 'text-slate-300 hover:bg-[#0C1E36] hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Events Schedule</span>
              </button>

              <button
                onClick={() => setActiveModule('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  activeModule === 'settings'
                    ? 'bg-[#D5AD63] text-[#071426] font-semibold'
                    : 'text-slate-300 hover:bg-[#0C1E36] hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Database & Settings</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div>Logged in as: <span className="text-white">Aegis Executive</span></div>
            <div className="text-[10px] text-slate-500">Security: Prototype Session</div>
          </div>
        </aside>

        {/* MAIN ADMIN WORKSPACE */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* MODULE: OVERVIEW */}
          {activeModule === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-white">Platform Analytics & Operations</h1>
                <p className="text-xs text-slate-400 mt-1">Real-time application pipeline and admissions monitor.</p>
              </div>

              {/* 6 Dashboard Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-4 rounded-xl bg-[#0C1E36] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Enrollments</span>
                  <div className="text-2xl font-bold text-[#D5AD63] font-mono tabular-nums">{totalEnrollments}</div>
                  <div className="text-[10px] text-emerald-400">Applications logged</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C1E36] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Total Leads</span>
                  <div className="text-2xl font-bold text-blue-400 font-mono tabular-nums">{totalLeads}</div>
                  <div className="text-[10px] text-slate-400">Enterprise quotes</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C1E36] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Unread Msgs</span>
                  <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">{pendingInquiries}</div>
                  <div className="text-[10px] text-slate-400">Pending review</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C1E36] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Active Progs</span>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">{activeProgramsCount}</div>
                  <div className="text-[10px] text-slate-400">Syllabi published</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C1E36] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Live Projects</span>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">{totalProjectsCount}</div>
                  <div className="text-[10px] text-slate-400">Portfolio cases</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C1E36] border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Upcoming</span>
                  <div className="text-2xl font-bold text-[#D5AD63] font-mono tabular-nums">{upcomingEventsCount}</div>
                  <div className="text-[10px] text-slate-400">Events scheduled</div>
                </div>
              </div>

              {/* Recent Enrollments Table */}
              <div className="p-6 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Recent Student Applications</h3>
                  <button
                    onClick={() => setActiveModule('enrollments')}
                    className="text-xs text-[#D5AD63] hover:underline"
                  >
                    View All {totalEnrollments}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Application ID</th>
                        <th className="py-2.5 px-3">Student Name</th>
                        <th className="py-2.5 px-3">Program</th>
                        <th className="py-2.5 px-3">Institution</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {enrollments.slice(0, 5).map(app => (
                        <tr key={app.id} className="hover:bg-[#102B4E]/30">
                          <td className="py-2.5 px-3 font-mono text-[#D5AD63]">{app.id}</td>
                          <td className="py-2.5 px-3 font-semibold text-white">{app.studentName}</td>
                          <td className="py-2.5 px-3 text-slate-300">{app.selectedProgram}</td>
                          <td className="py-2.5 px-3 text-slate-400 truncate max-w-[160px]">{app.institutionName}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              app.status === 'Enrolled' ? 'bg-emerald-500/20 text-emerald-400' :
                              app.status === 'Contacted' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => setViewEnrollment(app)}
                              className="text-xs text-[#D5AD63] hover:underline"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Quote Requests */}
              <div className="p-6 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Recent Enterprise Quote Inquiries</h3>
                  <button
                    onClick={() => setActiveModule('leads')}
                    className="text-xs text-[#D5AD63] hover:underline"
                  >
                    View All {totalLeads}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Quote ID</th>
                        <th className="py-2.5 px-3">Contact</th>
                        <th className="py-2.5 px-3">Organization</th>
                        <th className="py-2.5 px-3">Service</th>
                        <th className="py-2.5 px-3">Budget</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {quotes.map(q => (
                        <tr key={q.id} className="hover:bg-[#102B4E]/30">
                          <td className="py-2.5 px-3 font-mono text-[#D5AD63]">{q.id}</td>
                          <td className="py-2.5 px-3 text-white font-medium">{q.name}</td>
                          <td className="py-2.5 px-3 text-slate-300">{q.organization}</td>
                          <td className="py-2.5 px-3 text-slate-400">{q.serviceRequired}</td>
                          <td className="py-2.5 px-3 text-slate-300">{q.estimatedBudget}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-400">
                              {q.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => setViewQuote(q)}
                              className="text-xs text-[#D5AD63] hover:underline"
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MODULE: ENROLLMENTS */}
          {activeModule === 'enrollments' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Student Enrollment Applications</h1>
                  <p className="text-xs text-slate-400 mt-1">Review student applications, assign admissions status, and export rosters.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/enroll')}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#D5AD63] text-[#071426] rounded-lg"
                  >
                    + New Enrollment Form
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by student name, email, or institution..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0C1E36] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0C1E36] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Enrolled">Enrolled</option>
                </select>
              </div>

              {/* Full Table */}
              <div className="rounded-2xl bg-[#0C1E36] border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#09182E] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Application ID</th>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Program</th>
                      <th className="py-3 px-4">Institution & Year</th>
                      <th className="py-3 px-4">Phone / WhatsApp</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {enrollments
                      .filter(app => {
                        const matchQ =
                          app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.institutionName.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchStatus = statusFilter === 'All' || app.status === statusFilter;
                        return matchQ && matchStatus;
                      })
                      .map(app => (
                        <tr key={app.id} className="hover:bg-[#102B4E]/20">
                          <td className="py-3 px-4 font-mono text-[#D5AD63] font-semibold">{app.id}</td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{app.studentName}</div>
                            <div className="text-[11px] text-slate-400">{app.email}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{app.selectedProgram}</td>
                          <td className="py-3 px-4">
                            <div className="text-white truncate max-w-[180px]">{app.institutionName}</div>
                            <div className="text-[10px] text-slate-400">{app.yearOfStudy} · {app.district}</div>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-300">{app.phone}</td>
                          <td className="py-3 px-4">
                            <select
                              value={app.status}
                              onChange={e => handleUpdateEnrollmentStatus(app.id, e.target.value as any)}
                              className="px-2 py-1 rounded bg-[#071426] border border-slate-700 text-[11px] text-[#D5AD63] focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setViewEnrollment(app)}
                              className="px-2.5 py-1 text-xs bg-[#102B4E] hover:bg-[#D5AD63] hover:text-[#071426] rounded text-slate-200 font-medium transition-colors"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: LEADS */}
          {activeModule === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Enterprise Leads & Quotation Scopes</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage project proposals, client scopes, and status progressions.</p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0C1E36] border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#09182E] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Quote ID</th>
                      <th className="py-3 px-4">Client Contact</th>
                      <th className="py-3 px-4">Organization</th>
                      <th className="py-3 px-4">Required Service</th>
                      <th className="py-3 px-4">Budget & Timeline</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {quotes.map(q => (
                      <tr key={q.id} className="hover:bg-[#102B4E]/20">
                        <td className="py-3 px-4 font-mono text-[#D5AD63]">{q.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{q.name}</div>
                          <div className="text-[11px] text-slate-400">{q.email} · {q.phone}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-200 font-medium">{q.organization}</td>
                        <td className="py-3 px-4 text-slate-300">{q.serviceRequired}</td>
                        <td className="py-3 px-4">
                          <div className="text-white">{q.estimatedBudget}</div>
                          <div className="text-[10px] text-slate-400">{q.expectedTimeline}</div>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={q.status}
                            onChange={e => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                            className="px-2 py-1 rounded bg-[#071426] border border-slate-700 text-[11px] text-blue-300 focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setViewQuote(q)}
                            className="px-2.5 py-1 text-xs bg-[#102B4E] hover:bg-[#D5AD63] hover:text-[#071426] rounded text-slate-200 font-medium transition-colors"
                          >
                            Scope
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: MESSAGES */}
          {activeModule === 'messages' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-white">General & Partnership Messages</h1>

              <div className="rounded-2xl bg-[#0C1E36] border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#09182E] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Message ID</th>
                      <th className="py-3 px-4">Sender</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {messages.map(m => (
                      <tr key={m.id} className="hover:bg-[#102B4E]/20">
                        <td className="py-3 px-4 font-mono text-[#D5AD63]">{m.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{m.name}</div>
                          <div className="text-[11px] text-slate-400">{m.email}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{m.category}</td>
                        <td className="py-3 px-4 text-slate-200 max-w-[200px] truncate">{m.subject}</td>
                        <td className="py-3 px-4">
                          <select
                            value={m.status}
                            onChange={e => handleUpdateMessageStatus(m.id, e.target.value as any)}
                            className="px-2 py-1 rounded bg-[#071426] border border-slate-700 text-[11px] text-slate-300 focus:outline-none"
                          >
                            <option value="Unread">Unread</option>
                            <option value="Replied">Replied</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setViewMessage(m)}
                            className="px-2.5 py-1 text-xs bg-[#102B4E] hover:bg-[#D5AD63] hover:text-[#071426] rounded text-slate-200 font-medium transition-colors"
                          >
                            Read
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: PROGRAMS */}
          {activeModule === 'programs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Active Academic Programs</h1>
                  <p className="text-xs text-slate-400 mt-1">Review live syllabi, duration, and capstones across school and college tiers.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROGRAMS.map(prog => (
                  <div key={prog.id} className="p-6 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#D5AD63] uppercase">{prog.category}</span>
                      <span className="text-slate-400">{prog.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{prog.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{prog.overview}</p>
                    <div className="pt-2 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Mode: {prog.learningMode}</span>
                      <button
                        onClick={() => navigate(`/programs/${prog.slug}`)}
                        className="text-[#D5AD63] hover:underline flex items-center gap-1"
                      >
                        <span>Preview Live Page</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: PROJECTS */}
          {activeModule === 'projects' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-white">Engineering Project Showcase</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map(proj => (
                  <div key={proj.id} className="p-6 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
                    <div className="text-xs font-semibold text-[#D5AD63] uppercase">{proj.category}</div>
                    <h3 className="text-base font-bold text-white">{proj.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2">{proj.shortDescription}</p>
                    <div className="pt-2 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Duration: {proj.duration}</span>
                      <button
                        onClick={() => navigate(`/projects/${proj.slug}`)}
                        className="text-[#D5AD63] hover:underline flex items-center gap-1"
                      >
                        <span>View Architecture</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: EVENTS */}
          {activeModule === 'events' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-white">Events & Hackathons Schedule</h1>
              <div className="space-y-4">
                {EVENTS.map(ev => (
                  <div key={ev.id} className="p-6 rounded-xl bg-[#0C1E36] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-[#D5AD63] uppercase">{ev.type} · {ev.status}</span>
                      <h4 className="text-base font-bold text-white">{ev.title}</h4>
                      <p className="text-xs text-slate-400">{ev.date} · {ev.location}</p>
                    </div>
                    <span className="text-xs text-slate-300 bg-slate-900 px-3 py-1 rounded border border-slate-700 self-start md:self-auto">
                      {ev.capacity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE: SETTINGS & PRODUCTION DATABASE ARCHITECTURE */}
          {activeModule === 'settings' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h1 className="text-2xl font-bold text-white">Management Console Settings</h1>
                <p className="text-xs text-slate-400 mt-1">Platform architecture, security standards, and backend integration guidance.</p>
              </div>

              {/* Security & Prototype Architecture Notice as instructed */}
              <div className="p-6 rounded-2xl bg-[#0C1E36] border border-[#D5AD63]/40 space-y-4">
                <div className="flex items-center gap-2 text-[#D5AD63] font-bold text-base">
                  <Database className="w-5 h-5" />
                  <span>Production Backend & Database Integration Architecture</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This administrative interface is operating in a prototype management mode with deterministic client storage. To connect this platform to a persistent enterprise production backend, follow these architectural steps:
                </p>
                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[#D5AD63] font-mono">1.</span>
                    <span><strong>Relational Database:</strong> Connect PostgreSQL (via Cloud SQL / Supabase / Neon) using Drizzle ORM or Prisma to persist <code className="text-slate-200">enrollments</code>, <code className="text-slate-200">leads</code>, and <code className="text-slate-200">contact_messages</code> tables.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#D5AD63] font-mono">2.</span>
                    <span><strong>Authentication (RBAC):</strong> Implement Firebase Auth or OAuth 2.0 with session tokens and HttpOnly cookies, restricting admin endpoints (<code className="text-slate-200">/api/admin/*</code>) to verified corporate staff roles.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#D5AD63] font-mono">3.</span>
                    <span><strong>API Endpoints:</strong> Mount secure Express routes (<code className="text-slate-200">POST /api/enrollments</code>, <code className="text-slate-200">POST /api/quote-requests</code>, <code className="text-slate-200">POST /api/contact</code>) with schema validation and rate limiting.</span>
                  </div>
                </div>
              </div>

              {/* Portal Information */}
              <div className="p-6 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white">Organization Coordinates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 block">Organization Name:</span>
                    <span className="font-semibold text-white">{COMPANY_INFO.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Acronym:</span>
                    <span className="font-semibold text-white">{COMPANY_INFO.acronym}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Admissions Desk Email:</span>
                    <span className="font-mono text-slate-200">{COMPANY_INFO.contact.admissionsEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Solutions Engineering Email:</span>
                    <span className="font-mono text-slate-200">{COMPANY_INFO.contact.techEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* INSPECT ENROLLMENT MODAL */}
      {viewEnrollment && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-150"
          onClick={() => setViewEnrollment(null)}
        >
          <div
            className="relative max-w-xl w-full bg-[#0C1E36] border border-[#D5AD63]/30 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#D5AD63] uppercase">Enrollment Inspection</span>
                <h3 className="text-lg font-bold text-white">{viewEnrollment.studentName}</h3>
              </div>
              <button onClick={() => setViewEnrollment(null)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block">Application ID:</span>
                <span className="font-mono font-bold text-[#D5AD63]">{viewEnrollment.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Program:</span>
                <span className="text-white font-medium">{viewEnrollment.selectedProgram}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email:</span>
                <span className="text-white">{viewEnrollment.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone / WhatsApp:</span>
                <span className="text-white font-mono">{viewEnrollment.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Institution:</span>
                <span className="text-white">{viewEnrollment.institutionName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Department & Year:</span>
                <span className="text-white">{viewEnrollment.department} ({viewEnrollment.yearOfStudy})</span>
              </div>
              <div>
                <span className="text-slate-400 block">District:</span>
                <span className="text-white">{viewEnrollment.district}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Learning Mode:</span>
                <span className="text-white">{viewEnrollment.learningMode}</span>
              </div>
            </div>

            {viewEnrollment.additionalInfo && (
              <div className="p-3 rounded-lg bg-[#071426] border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 block text-[11px] mb-1">Student Aspirations / Notes:</span>
                {viewEnrollment.additionalInfo}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Set Status:</span>
                <select
                  value={viewEnrollment.status}
                  onChange={e => handleUpdateEnrollmentStatus(viewEnrollment.id, e.target.value as any)}
                  className="px-2 py-1 rounded bg-[#071426] border border-slate-700 text-xs text-[#D5AD63]"
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <button
                onClick={() => setViewEnrollment(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECT QUOTE MODAL */}
      {viewQuote && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-150"
          onClick={() => setViewQuote(null)}
        >
          <div
            className="relative max-w-xl w-full bg-[#0C1E36] border border-[#D5AD63]/30 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#D5AD63] uppercase">Enterprise Quote Scope</span>
                <h3 className="text-lg font-bold text-white">{viewQuote.organization}</h3>
              </div>
              <button onClick={() => setViewQuote(null)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block">Quote Ticket ID:</span>
                <span className="font-mono font-bold text-[#D5AD63]">{viewQuote.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Contact Person:</span>
                <span className="text-white font-medium">{viewQuote.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email:</span>
                <span className="text-white">{viewQuote.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone:</span>
                <span className="text-white font-mono">{viewQuote.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Service Required:</span>
                <span className="text-white font-medium">{viewQuote.serviceRequired}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Budget Bracket:</span>
                <span className="text-white">{viewQuote.estimatedBudget}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Expected Timeline:</span>
                <span className="text-white">{viewQuote.expectedTimeline}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#071426] border border-slate-800 text-xs text-slate-300">
              <span className="text-slate-400 block text-[11px] mb-1">Project Description & Architecture Requirements:</span>
              {viewQuote.projectDescription}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Set Status:</span>
                <select
                  value={viewQuote.status}
                  onChange={e => handleUpdateQuoteStatus(viewQuote.id, e.target.value as any)}
                  className="px-2 py-1 rounded bg-[#071426] border border-slate-700 text-xs text-blue-300"
                >
                  <option value="New">New</option>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <button
                onClick={() => setViewQuote(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECT MESSAGE MODAL */}
      {viewMessage && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-150"
          onClick={() => setViewMessage(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#0C1E36] border border-[#D5AD63]/30 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#D5AD63] uppercase">{viewMessage.category}</span>
                <h3 className="text-base font-bold text-white">{viewMessage.subject}</h3>
              </div>
              <button onClick={() => setViewMessage(null)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <div>From: <strong className="text-white">{viewMessage.name}</strong> ({viewMessage.email})</div>
              {viewMessage.phone && <div>Phone: <span className="font-mono">{viewMessage.phone}</span></div>}
            </div>

            <div className="p-4 rounded-xl bg-[#071426] border border-slate-800 text-xs text-slate-200 leading-relaxed">
              {viewMessage.message}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <button
                onClick={() => handleUpdateMessageStatus(viewMessage.id, 'Replied')}
                className="px-3 py-1.5 text-xs font-semibold bg-[#D5AD63] text-[#071426] rounded-lg"
              >
                Mark as Replied
              </button>
              <button
                onClick={() => setViewMessage(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
