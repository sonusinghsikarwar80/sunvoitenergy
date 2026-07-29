import React, { useContext, useEffect, useState } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustAndStats from './components/TrustAndStats';
import About from './components/About';
import Services from './components/Services';
import Calculators from './components/Calculators';
import Store from './components/Store';
import Projects from './components/Projects';
import TestimonialsAndBlog from './components/TestimonialsAndBlog';
import FAQAndContact from './components/FAQAndContact';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

import { Trash2, ShoppingCart, RefreshCw, X, MessageSquare, Phone, Coins, Calculator } from 'lucide-react';

/* ─────────────────────── Scroll to top on route change ─────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

/* ─────────────────────── Page Wrapper (adds navbar offset) ─────────────────────── */
function Page({ children }) {
  return (
    <div className="pt-20 min-h-screen">
      {children}
    </div>
  );
}

/* ─────────────────────── Home Page ─────────────────────── */
function HomePage() {
  return (
    <>
      <Hero />
      <TrustAndStats />
      <About />
      <Services />
      <Calculators />
    </>
  );
}

/* ─────────────────────── Main App Content ─────────────────────── */
function AppContent() {
  const {
    cart, removeFromCart, updateCartQty, placeOrder,
    compareList, toggleCompare, addToCart
  } = useContext(AppContext);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showQuickChat, setShowQuickChat] = useState(false);

  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const totalCartCost = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0
  );

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!custName || !custPhone || !custAddress) {
      alert('Please fill out all billing details.');
      return;
    }
    placeOrder({ customer: custName, itemsCount: cart.length, total: totalCartCost });
    setCustName(''); setCustPhone(''); setCustAddress('');
    navigate('/store');
  };

  return (
    <div className="relative font-sans text-solar-textDark dark:text-white transition-colors duration-300">

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-solar-primary to-solar-secondary z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Custom Cursor Follower */}
      <div className="custom-cursor hidden md:block" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
      <div className="custom-cursor-dot hidden md:block" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />

      <Navbar />

      <main className="min-h-screen">
        <ScrollToTop />
        <Routes>
          {/* ── Home ── */}
          <Route path="/" element={<HomePage />} />

          {/* ── About ── */}
          <Route path="/about" element={
            <Page><About /><TrustAndStats /></Page>
          } />

          {/* ── Services ── */}
          <Route path="/services" element={
            <Page><Services /></Page>
          } />

          {/* ── Store / E-Commerce ── */}
          <Route path="/store" element={
            <Page><Store /></Page>
          } />

          {/* ── Calculator ── */}
          <Route path="/calculator" element={
            <Page><Calculators /></Page>
          } />

          {/* ── Projects ── */}
          <Route path="/projects" element={
            <Page><Projects /></Page>
          } />

          {/* ── Blog ── */}
          <Route path="/blog" element={
            <Page><TestimonialsAndBlog /></Page>
          } />

          {/* ── Contact ── */}
          <Route path="/contact" element={
            <Page><FAQAndContact /></Page>
          } />

          {/* ── Admin ── */}
          <Route path="/admin" element={
            <Page><AdminPanel /></Page>
          } />

          {/* ── Cart ── */}
          <Route path="/cart" element={
            <div className="py-24 max-w-4xl mx-auto px-6 text-left animate-fade-in space-y-8">
              <h2 className="text-3xl font-extrabold text-solar-textDark dark:text-white uppercase tracking-wider">
                Shopping Cart
              </h2>
              {cart.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-850 rounded-3xl border space-y-4">
                  <span className="text-4xl block">🛒</span>
                  <h3 className="font-bold text-lg text-solar-textDark dark:text-white">Your Cart is Empty</h3>
                  <p className="text-xs text-gray-500">Add solar equipment from our online store to start checkout.</p>
                  <Link to="/store" className="px-6 py-2.5 bg-solar-primary text-white rounded-full font-bold text-xs hover-glow glow-btn uppercase inline-block">
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 bg-white dark:bg-gray-850 p-6 rounded-3xl border space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-b-0 last:pb-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-contain bg-white rounded-xl border p-1 flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <span className="font-bold text-xs sm:text-sm text-solar-textDark dark:text-white block truncate max-w-[200px]">{item.product.name}</span>
                          <span className="text-[10px] text-solar-primary font-bold">₹{(item.product.discountPrice || item.product.price).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-1 text-xs">
                          <button onClick={() => updateCartQty(item.product.id, item.quantity - 1)} className="font-extrabold px-1 hover:text-solar-primary">-</button>
                          <span className="font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQty(item.product.id, item.quantity + 1)} className="font-extrabold px-1 hover:text-solar-primary">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="lg:col-span-4 bg-solar-bgLight dark:bg-solar-bgDark p-6 rounded-3xl border space-y-6">
                    <div>
                      <h3 className="font-bold text-xs uppercase text-gray-400">Order Summary</h3>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-semibold">Total Price</span>
                        <span className="text-xl font-black text-solar-primary">₹{totalCartCost.toLocaleString()}</span>
                      </div>
                    </div>
                    <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                      <h4 className="font-bold text-[10px] uppercase text-gray-400">Delivery Details</h4>
                      <input type="text" required placeholder="Billing Full Name" value={custName} onChange={(e) => setCustName(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                      <input type="tel" required placeholder="Billing Phone Number" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                      <textarea rows="2" required placeholder="Full Shipping Address" value={custAddress} onChange={(e) => setCustAddress(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white resize-none"></textarea>
                      <button type="submit" className="w-full py-3 bg-solar-primary text-white rounded-xl font-bold text-xs uppercase hover-glow glow-btn">
                        Place Order
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          } />

          {/* ── Compare ── */}
          <Route path="/compare" element={
            <div className="py-24 max-w-5xl mx-auto px-6 text-left animate-fade-in space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-extrabold text-solar-textDark dark:text-white uppercase tracking-wider">Compare Products</h2>
                <Link to="/store" className="text-xs font-bold text-solar-primary hover:underline uppercase">Return to Store</Link>
              </div>
              {compareList.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-850 rounded-3xl border space-y-4">
                  <span className="text-4xl block">📊</span>
                  <h3 className="font-bold text-lg text-solar-textDark dark:text-white">Comparison Board Empty</h3>
                  <p className="text-xs text-gray-500">Select up to 3 products from the store catalogue to review side-by-side.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {compareList.map((prod) => (
                    <div key={prod.id} className="bg-white dark:bg-gray-850 p-6 rounded-3xl border space-y-4 relative flex flex-col justify-between h-[520px]">
                      <button onClick={() => toggleCompare(prod)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={18} /></button>
                      <div className="space-y-4 text-center">
                        <div className="h-32 flex items-center justify-center bg-white p-4 rounded-2xl border border-gray-100">
                          <img src={prod.images[0].startsWith('http') ? prod.images[0] : `${import.meta.env.BASE_URL}${prod.images[0].replace(/^\//, '')}`} alt={prod.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="text-left space-y-1">
                          <span className="text-[10px] font-bold text-solar-primary uppercase">{prod.category}</span>
                          <h4 className="font-extrabold text-sm text-solar-textDark dark:text-white line-clamp-1">{prod.name}</h4>
                          <span className="text-base font-black text-solar-primary">₹{(prod.discountPrice || prod.price).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex-1 border-t border-gray-100 dark:border-gray-800 pt-4 text-xs space-y-2 text-left">
                        {Object.entries(prod.specifications).slice(0, 5).map(([key, val], idx) => (
                          <div key={idx} className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/40 last:border-b-0">
                            <span className="text-gray-400">{key}</span>
                            <span className="font-semibold text-solar-textDark dark:text-white truncate max-w-[120px]">{val}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => { addToCart(prod, 1); alert('Added to cart!'); }} className="w-full py-2.5 bg-solar-primary text-white rounded-xl font-bold text-xs uppercase hover-glow glow-btn flex items-center justify-center gap-1.5">
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          } />
        </Routes>
      </main>

      {/* Floating Sticky Actions */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Calculate Subsidy pill button */}
        <button
          onClick={() => navigate('/calculator')}
          className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs tracking-wider text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #2E7D32 0%, #43A047 50%, #66BB6A 100%)',
            boxShadow: '0 8px 32px rgba(46,125,50,0.45), 0 2px 8px rgba(0,0,0,0.18)',
            border: '1.5px solid rgba(255,255,255,0.18)',
            letterSpacing: '0.08em',
          }}
        >
          <Calculator size={14} className="text-solar-yellow" />
          CALCULATE SUBSIDY
        </button>

        {/* WhatsApp / Chat circle button */}
        <button
          onClick={() => setShowQuickChat(!showQuickChat)}
          className="flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)',
            boxShadow: '0 8px 32px rgba(46,125,50,0.5), 0 2px 8px rgba(0,0,0,0.22)',
            border: '1.5px solid rgba(255,255,255,0.18)',
          }}
        >
          <MessageSquare size={22} />
        </button>
      </div>

      {/* WhatsApp Quick Chat Popup */}
      {showQuickChat && (
        <div className="fixed bottom-24 right-6 w-72 bg-white dark:bg-gray-850 rounded-3xl shadow-2xl border dark:border-gray-800 z-50 text-left animate-slide-up">
          <div className="bg-gradient-to-r from-solar-primary to-solar-secondary p-5 text-white rounded-t-3xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">☀️</div>
            <div>
              <span className="font-bold text-sm block">SunVoit Support</span>
              <span className="text-[10px] text-green-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-ping"></span>
                Online | Replies instantly
              </span>
            </div>
            <button onClick={() => setShowQuickChat(false)} className="ml-auto text-white/70 hover:text-white"><X size={18} /></button>
          </div>
          <div className="p-5 text-xs text-gray-500 dark:text-gray-400 space-y-4">
            <p className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
              Hello! Welcome to SunVoit Energy. How can we assist you today?
            </p>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="w-full py-2.5 bg-green-500 text-white font-bold rounded-xl text-center block hover:bg-green-600 transition-colors uppercase text-[11px]">
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppProvider>
  );
}
