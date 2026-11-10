import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  RotateCcw,
  Shield,
} from 'lucide-react';

export default function NetflixNavbar({
  activeCategory,
  onOpenStadium,
  onReplayIntro,
  searchQuery,
  onSearchChange,
  onScrollToSection,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      } else {
        onSearchChange?.('');
      }
      return next;
    });
  };

  const navItems = [
    { id: 'home', label: 'Home', sectionId: 'hero' },
    { id: 'friends', label: 'Our Friends', sectionId: 'row-people-behind-the-legend' },
    { id: 'family', label: 'Family', sectionId: 'section-message-from-home' },
  ];

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    if (onScrollToSection && item.sectionId) {
      onScrollToSection(item.sectionId);
    }
  };

  return (
    <header className={`nf-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nf-nav-left">
        {/* Mobile Hamburger Toggle */}
        <button
          className="nf-mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* RUTVIK+ Brand Logo */}
        <div
          className="nf-logo"
          onClick={() => onScrollToSection && onScrollToSection('hero')}
          role="button"
          tabIndex={0}
          aria-label="RUTVIK+ Home"
        >
          <span>RUTVIK</span>
          <span className="nf-logo-plus">+</span>
        </div>

        {/* Simplified Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="nf-nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`nf-nav-link ${activeCategory === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="nf-nav-right">
        {/* Switch to Preserved Stadium Edition */}
        <button
          type="button"
          className="nf-stadium-switch-btn"
          onClick={onOpenStadium}
          title="Switch to Matchday Stadium Edition"
        >
          <Shield size={14} color="#10b981" />
          <span>STADIUM EDITION</span>
        </button>

        {/* Expandable Search across the 9 birthday videos */}
        <div className={`nf-search-wrapper ${isSearchOpen ? 'open' : ''}`}>
          <button
            type="button"
            className="nf-icon-btn"
            onClick={handleToggleSearch}
            aria-label="Search Episodes"
          >
            <Search size={19} />
          </button>
          <input
            ref={searchInputRef}
            type="text"
            className="nf-search-input"
            placeholder="Search friends or family..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        {/* Profile Avatar & Dropdown */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            type="button"
            className="nf-profile-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-label="User Profile"
          >
            <div className="nf-profile-avatar">R</div>
            <ChevronDown
              size={14}
              style={{ transition: 'transform 0.2s', transform: isProfileOpen ? 'rotate(180deg)' : 'none' }}
            />
          </button>

          {isProfileOpen && (
            <div className="nf-dropdown-menu">
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>Rutvik (Captain #10)</div>
                <div style={{ fontSize: '0.75rem', color: '#46d369', fontWeight: 600 }}>RUTVIK+ Private Pass</div>
              </div>

              {onReplayIntro && (
                <button
                  type="button"
                  className="nf-dropdown-item"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onReplayIntro();
                  }}
                >
                  <RotateCcw size={15} color="#38bdf8" />
                  <span>Replay Cinematic Intro</span>
                </button>
              )}

              <button
                type="button"
                className="nf-dropdown-item"
                onClick={() => {
                  setIsProfileOpen(false);
                  onOpenStadium?.();
                }}
              >
                <Shield size={15} color="#10b981" />
                <span>Switch to Stadium Edition</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '68px',
            left: 0,
            right: 0,
            background: 'rgba(18, 18, 18, 0.98)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.25rem 1.5rem',
            zIndex: 890,
            backdropFilter: 'blur(16px)',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#e5e5e5',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    padding: '0.3rem 0',
                  }}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            {onReplayIntro && (
              <li style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  type="button"
                  className="nf-stadium-switch-btn"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                >
                  <RotateCcw size={15} color="#38bdf8" />
                  <span>REPLAY CINEMATIC INTRO</span>
                </button>
              </li>
            )}
            <li style={!onReplayIntro ? { paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' } : undefined}>
              <button
                type="button"
                className="nf-stadium-switch-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenStadium();
                }}
              >
                <Shield size={15} color="#10b981" />
                <span>OPEN STADIUM EDITION</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
