import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Lock, Mail, User, AlertCircle } from 'lucide-react';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name || !email || !password) {
        throw new Error('Please fill in all fields.');
      }
      await signup({ name, email, password });
      navigate('/app/roadmap', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title & Tagline */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest text-[#73D6B1] bg-[#73D6B1]/10 px-2 py-0.5 rounded uppercase font-bold">
            NEW AGENT RECRUIT
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F4F6F8] uppercase">
          START YOUR QUEST
        </h1>
        <p className="text-xs text-[#AAB3C0] font-normal leading-relaxed">
          Create your account and begin training your instincts against deception.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-[#FF7468]/30 bg-[#FF7468]/10 p-3.5 text-xs text-[#FF7468] font-mono flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="signup-name" className="text-[11px] font-mono uppercase text-[#AAB3C0] tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#39C6E8]" />
            <span>NAME / AGENT HANDLE</span>
          </label>
          <input
            id="signup-name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Prabhath"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#273347] bg-[#0D1119] px-3.5 py-2.5 text-xs text-[#F4F6F8] placeholder-[#6F7B8A] focus:border-[#73D6B1] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="text-[11px] font-mono uppercase text-[#AAB3C0] tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#73D6B1]" />
            <span>EMAIL ADDRESS</span>
          </label>
          <input
            id="signup-email"
            type="email"
            required
            autoComplete="email"
            placeholder="agent@cyberquest.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#273347] bg-[#0D1119] px-3.5 py-2.5 text-xs text-[#F4F6F8] placeholder-[#6F7B8A] focus:border-[#73D6B1] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signup-password" className="text-[11px] font-mono uppercase text-[#AAB3C0] tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#FFB84D]" />
            <span>PASSWORD</span>
          </label>
          <input
            id="signup-password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#273347] bg-[#0D1119] px-3.5 py-2.5 text-xs text-[#F4F6F8] placeholder-[#6F7B8A] focus:border-[#73D6B1] focus:outline-none transition-colors"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-cq-primary cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'INITIALIZING PROFILE...' : 'START YOUR QUEST'}</span>
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </button>
        </div>
      </form>

      {/* Switch to Login */}
      <div className="pt-4 border-t border-[#1C2433] text-center text-xs text-[#AAB3C0]">
        Already have an account?{' '}
        <Link to="/login" className="text-[#39C6E8] hover:text-[#75DDF2] font-bold underline-offset-4 hover:underline transition-colors">
          LOG IN →
        </Link>
      </div>

    </div>
  );
}
