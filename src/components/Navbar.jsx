import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  Sun, Moon, Search, ShoppingBag, Globe,
  Phone, X, Heart, RefreshCw, ChevronDown, Menu
} from 'lucide-react';

export default function Navbar() {
  const {
    theme, toggleTheme,
    language, toggleLanguage,
    cart, wishlist, compareList,
    searchQuery, setSearchQuery
  } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
    setProductsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: language === 'hi' ? 'मुख्य'          : 'Home',       path: '/' },
    { label: language === 'hi' ? 'हमारे बारे में' : 'About',      path: '/about' },
    { label: language === 'hi' ? 'सेवाएं'          : 'Services',   path: '/services' },
    { label: language === 'hi' ? 'कैलकुलेटर'       : 'Calculator', path: '/calculator' },
    { label: language === 'hi' ? 'संपर्क'           : 'Contact',    path: '/contact' },
  ];

  const productCategories = [
    { label: 'Solar Panels',      path: '/store' },
    { label: 'Solar Inverters',   path: '/store' },
    { label: 'Lithium Batteries', path: '/store' },
    { label: 'Solar Water Heaters', path: '/store' },
    { label: 'EV Accessories',    path: '/store' },
    { label: 'Admin Dashboard',   path: '/admin' },
  ];

  const linkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'text-solar-primary'
        : 'text-solar-textDark dark:text-gray-300 hover:text-solar-primary'
    }`;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-premium py-3 shadow-md' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">

        {/* ── Brand Logo ── */}
        <button
          onClick={() => go('/')}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-solar-primary to-solar-yellow flex items-center justify-center text-white font-bold text-lg shadow">
            S
          </div>
          <span className="font-bold text-xl tracking-tight">
            <span className="bg-gradient-to-r from-solar-primary to-solar-secondary bg-clip-text text-transparent">SunVoit</span>
            <span className="text-solar-textDark dark:text-white"> Energy</span>
          </span>
        </button>

        {/* ── Desktop Nav Links ── */}
        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={linkClass(link.path)}
            >
              {link.label}
            </button>
          ))}

          {/* Products Dropdown */}
          <div className="relative" onMouseLeave={() => setProductsOpen(false)}>
            <button
              onMouseEnter={() => setProductsOpen(true)}
              onClick={() => go('/store')}
              className={`${linkClass('/store')} flex items-center gap-1`}
            >
              {language === 'hi' ? 'उत्पाद' : 'Products'}
              <ChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 glass-premium rounded-2xl p-4 shadow-2xl border animate-fade-in space-y-1">
                {productCategories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => go(cat.path)}
                    className="block w-full text-left text-sm py-2 px-3 rounded-xl hover:bg-solar-primary/10 hover:text-solar-primary text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right Side Icons ── */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Search */}
          <button onClick={() => setShowSearch(!showSearch)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Search size={19} className="text-solar-textDark dark:text-gray-200" />
          </button>

          {/* Theme Toggle (Desktop only, hidden < sm) */}
          <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block">
            {theme === 'light'
              ? <Moon size={19} className="text-solar-textDark" />
              : <Sun size={19} className="text-yellow-400" />}
          </button>

          {/* Language (Desktop only, hidden < sm) */}
          <button onClick={toggleLanguage} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:flex items-center gap-1">
            <Globe size={17} className="text-solar-textDark dark:text-gray-200" />
            <span className="uppercase text-xs font-semibold text-solar-textDark dark:text-gray-200">{language}</span>
          </button>

          {/* Wishlist */}
          <button onClick={() => go('/store')} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden md:block">
            <Heart size={19} className="text-red-500" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">{wishlist.length}</span>
            )}
          </button>

          {/* Compare */}
          <button onClick={() => go('/compare')} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden md:block">
            <RefreshCw size={19} className="text-solar-primary" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-solar-primary text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">{compareList.length}</span>
            )}
          </button>

          {/* Cart */}
          <button onClick={() => go('/cart')} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ShoppingBag size={19} className="text-solar-textDark dark:text-gray-200" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-solar-secondary text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">{totalCartItems}</span>
            )}
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors hidden md:flex items-center justify-center"
          >
            <Phone size={17} />
          </a>

          {/* Get Free Quote — CTA */}
          <button
            onClick={() => go('/calculator')}
            className="hidden sm:block px-4 py-2 bg-gradient-to-r from-solar-primary to-solar-secondary text-white rounded-full font-semibold text-xs hover-glow glow-btn"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.01em' }}
          >
            {language === 'hi' ? 'मुफ़्त कोट' : 'Free Quote'}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            {mobileOpen ? <X size={22} className="text-solar-textDark dark:text-white" /> : <Menu size={22} className="text-solar-textDark dark:text-white" />}
          </button>
        </div>
      </div>

      {/* ── Search Bar ── */}
      {showSearch && (
        <div className="absolute top-full left-0 w-full glass shadow-inner py-4 px-6 flex justify-center animate-slide-down">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder={language === 'hi' ? 'सोलर पैनल, बैटरी खोजें...' : 'Search solar panels, batteries...'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (location.pathname !== '/store') navigate('/store');
              }}
              autoFocus
              className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-black/50 backdrop-blur-md outline-none focus:ring-2 focus:ring-solar-primary dark:text-white text-sm"
            />
            <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile Drawer Menu ── */}
      {mobileOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full glass-premium shadow-2xl border-t dark:border-gray-800 py-6 px-6 flex flex-col gap-1 animate-slide-down max-h-[85vh] overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`text-left py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-solar-primary/10 text-solar-primary'
                  : 'text-solar-textDark dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => go('/store')}
            className={`text-left py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              isActive('/store')
                ? 'bg-solar-primary/10 text-solar-primary'
                : 'text-solar-textDark dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {language === 'hi' ? 'उत्पाद / स्टोर' : 'Products / Store'}
          </button>

          <div className="border-t border-gray-200 dark:border-gray-800 mt-3 pt-3">
            <button
              onClick={() => go('/calculator')}
              className="w-full py-3 bg-gradient-to-r from-solar-primary to-solar-secondary text-white rounded-xl font-bold text-sm"
            >
              💰 {language === 'hi' ? 'मुफ़्त कोट लें' : 'Get Free Quote'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
