import React, { createContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Localization & Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('svTheme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('svLang') || 'en');

  // E-commerce state
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('svCart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('svWishlist')) || []);
  const [compareList, setCompareList] = useState(() => JSON.parse(localStorage.getItem('svCompare')) || []);

  // Search overlay & Active Views
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('landing'); // landing, store, product-detail, admin, cart, checkout, compare
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Admin Database Mock (Quotes, Contacts, Catalog, Orders)
  const [catalog, setCatalog] = useState(() => {
    const saved = localStorage.getItem('svCatalog');
    if (!saved) return initialProducts;
    try {
      const parsed = JSON.parse(saved);
      // Auto-sync images from initialProducts in case they were updated/fixed
      return parsed.map(p => {
        const initial = initialProducts.find(ip => ip.id === p.id);
        if (initial) {
          // If the primary image has changed, sync the entire images array
          if (initial.images[0] !== p.images[0]) {
            return { ...p, images: initial.images };
          }
        }
        return p;
      });
    } catch (e) {
      return initialProducts;
    }
  });
  
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('svLeads');
    return saved ? JSON.parse(saved) : [
      { id: 'lead-1', name: 'Aarav Sharma', phone: '9876543210', email: 'aarav@gmail.com', state: 'Delhi', bill: '₹6,500', size: '5 kW', status: 'Pending', date: '2026-07-28' },
      { id: 'lead-2', name: 'Neha Patel', phone: '9123456789', email: 'neha@gmail.com', state: 'Gujarat', bill: '₹12,000', size: '10 kW', status: 'Approved', date: '2026-07-27' }
    ];
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('svMessages');
    return saved ? JSON.parse(saved) : [
      { id: 'msg-1', name: 'Rajesh Kumar', email: 'rajesh@gmail.com', subject: 'Dealership Inquiry', message: 'Interested in partnering with SunVoit in UP region.', date: '2026-07-28' }
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('svOrders');
    return saved ? JSON.parse(saved) : [
      { id: 'order-101', customer: 'Aarav Sharma', itemsCount: 2, total: 31000, status: 'Shipped', date: '2026-07-28' }
    ];
  });

  // Sync Themes with document DOM
  useEffect(() => {
    const root = window.document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('svTheme', theme);
  }, [theme]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('svLang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('svCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('svWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('svCompare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('svCatalog', JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem('svLeads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('svMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('svOrders', JSON.stringify(orders));
  }, [orders]);

  // Global functions
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'hi' : 'en');

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
    }
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const toggleCompare = (product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 products.');
        return prev;
      }
      return [...prev, product];
    });
  };

  // Admin and Form submission actions
  const addLead = (lead) => {
    setLeads(prev => [{ ...lead, id: `lead-${Date.now()}`, date: new Date().toISOString().split('T')[0], status: 'Pending' }, ...prev]);
  };

  const updateLeadStatus = (leadId, status) => {
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status } : lead));
  };

  const addContactMessage = (msg) => {
    setMessages(prev => [{ ...msg, id: `msg-${Date.now()}`, date: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  const addProductToCatalog = (product) => {
    setCatalog(prev => [{ ...product, id: `sv-${Date.now()}` }, ...prev]);
  };

  const removeProductFromCatalog = (productId) => {
    setCatalog(prev => prev.filter(p => p.id !== productId));
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `order-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setCurrentView('store');
    alert('Thank you! Your order has been placed successfully.');
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      language, toggleLanguage,
      cart, addToCart, updateCartQty, removeFromCart, clearCart,
      wishlist, toggleWishlist,
      compareList, toggleCompare,
      searchQuery, setSearchQuery,
      currentView, setCurrentView,
      selectedProductId, setSelectedProductId,
      catalog, addProductToCatalog, removeProductFromCatalog,
      leads, addLead, updateLeadStatus,
      messages, addContactMessage,
      orders, placeOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};
