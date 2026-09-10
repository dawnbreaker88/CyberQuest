import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { initAppNavbarScroll } from '../../animations/roadmapAnimations';
import { Shield, Sparkles, LogOut, Compass, Swords, User } from 'lucide-react';

export default function AppNavbar() {
  const navRef = useRef(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = initAppNavbarScroll(navRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'ROADMAP', href: '/app/roadmap', icon: Compass },
    { label: 'PLAY', href: '/app/play', icon: Swords },
    { label: 'PROFILE', href: '/app/profile', icon: User },
  ];

  const currentLevel = user?.stats?.level || user?.level || 1;
  const currentXp = user?.stats?.xp || user?.xp || 0;

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        ref={navRef}
        aria-label="Application Navigation"
        className="pointer-events-auto flex items-center justify-between w-full max-w-3xl rounded-xl border border-[#273347] bg-[#131925]/95 px-3 sm:px-5 py-2 backdrop-blur-md shadow-xl shadow-black/60 transition-all"
      >
        {/* Brand & Mascot */}
        <Link
          to="/app/roadmap"
          className="flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#F4F6F8] hover:text-[#39C6E8] transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#273347] bg-[#192131] flex items-center justify-center relative group-hover:border-[#39C6E8] transition-colors">
            <img 
              src="/mascot.jpg" 
              alt="CyberQuest Mascot" 
              className="w-full h-full object-cover object-center scale-110"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <span className="font-mono tracking-tight font-extrabold text-[13px]">
            CYBER<span className="text-[#39C6E8]">QUEST</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#192131] text-[#39C6E8] border border-[#3A4B68]'
                    : 'text-[#AAB3C0] hover:text-[#F4F6F8] hover:bg-[#192131]/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#39C6E8]' : 'text-[#6F7B8A]'}`} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Pill & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/app/profile"
            className="flex items-center gap-2 rounded-lg border border-[#273347] bg-[#192131] px-2.5 py-1 text-[11px] font-mono text-[#AAB3C0] hover:border-[#39C6E8] transition-all"
          >
            <span className="text-[#39C6E8] font-bold text-[10px] bg-[#39C6E8]/10 px-1.5 py-0.5 rounded">LVL 0{currentLevel}</span>
            <span className="text-[#FFB84D] font-medium hidden sm:inline">{currentXp} XP</span>
          </Link>

          <button
            onClick={handleLogout}
            title="Log out of CyberQuest"
            className="p-1.5 rounded-lg text-[#6F7B8A] hover:text-[#FF7468] hover:bg-[#FF7468]/10 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </div>
  );
}

