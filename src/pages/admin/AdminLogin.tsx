import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { authService, AdminUser } from '../../services/authService';
import { Shield, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: (user: AdminUser) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('admin@aegisacademy.in');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await authService.login(email, password);
      if (res.success && res.user) {
        onSuccess(res.user);
      } else {
        setError(res.error || 'Invalid credentials. Please verify your administrative email and password.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0077FE]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Return to website */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Aegis Academy</span>
      </button>

      <div className="relative z-10 max-w-md w-full bg-[#061434]/90 border border-white/15 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0052CC] to-[#00A3FF] mx-auto flex items-center justify-center text-white shadow-[0_0_24px_rgba(0,163,255,0.4)]">
            <Shield className="w-7 h-7" />
          </div>
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#38BDF8]">
            AEGIS ACADEMY ENTERPRISE
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Administrative Portal
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Restricted access. Authenticate with verified credentials to manage enrollments, admissions, and institutional leads.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Administrative Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@aegisacademy.in"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#020617]/70 border border-white/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Secure Master Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#020617]/70 border border-white/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF]"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-between">
              <span>Default key: <code className="text-[#38BDF8] bg-slate-800/80 px-1 py-0.5 rounded font-mono">Aegis@Admin2026!</code></span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold text-xs tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #0A2B66 0%, #0052CC 60%, #0077FE 100%)',
                border: '1px solid rgba(0, 163, 255, 0.4)',
                boxShadow: '0 8px 24px -4px rgba(0, 119, 254, 0.4)'
              }}
            >
              <span>{loading ? 'Authenticating Credentials...' : 'Sign In to Management Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="border-t border-white/10 pt-4 text-center">
          <div className="text-[11px] text-slate-400">
            Audit logging enabled • Encrypted session tokens
          </div>
        </div>
      </div>
    </div>
  );
};
