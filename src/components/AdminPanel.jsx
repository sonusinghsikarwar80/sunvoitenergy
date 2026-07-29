import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LayoutDashboard, Users, ShoppingBag, Database, MessageSquare, Plus, Trash2, ArrowUpRight, TrendingUp, Check, X } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminPanel() {
  const {
    leads, updateLeadStatus,
    orders,
    messages,
    catalog, addProductToCatalog, removeProductFromCatalog
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('dashboard');

  // Add Product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCat, setNewProdCat] = useState('Solar Panels');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Graph Data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Solar Capacity Generated (MWh)',
        data: [120, 150, 220, 270, 310, 390, 420],
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        tension: 0.3
      },
      {
        label: 'Platform Lead Registrations',
        data: [15, 32, 45, 60, 58, 85, 92],
        borderColor: '#FFD54F',
        backgroundColor: 'rgba(255, 213, 79, 0.1)',
        tension: 0.3
      }
    ]
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) {
      alert('Please fill out product name and price');
      return;
    }
    addProductToCatalog({
      name: newProdName,
      category: newProdCat,
      price: Number(newProdPrice),
      description: newProdDesc,
      rating: 5.0,
      reviewsCount: 0,
      images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80'],
      specifications: { 'Warranty': '10 Years Standard' },
      features: ['Premium component added via admin dashboard panel.'],
      availability: 'In Stock'
    });
    setNewProdName('');
    setNewProdPrice('');
    setNewProdDesc('');
    alert('Product added successfully!');
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 bg-white dark:bg-gray-850 p-4 sm:p-6 rounded-3xl border shadow-md whitespace-nowrap scrollbar-none">
          <h2 className="font-extrabold text-sm uppercase text-gray-400 tracking-widest mb-4 hidden lg:block">Admin Suite</h2>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-solar-primary text-white shadow-md'
                : 'text-solar-textDark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard size={16} /> Dashboard & Analytics
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-solar-primary text-white shadow-md'
                : 'text-solar-textDark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Users size={16} /> Quote Leads ({leads.length})
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-solar-primary text-white shadow-md'
                : 'text-solar-textDark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ShoppingBag size={16} /> Shop Orders ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'catalog'
                ? 'bg-solar-primary text-white shadow-md'
                : 'text-solar-textDark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Database size={16} /> Product Catalog ({catalog.length})
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'messages'
                ? 'bg-solar-primary text-white shadow-md'
                : 'text-solar-textDark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <MessageSquare size={16} /> Support Inbox ({messages.length})
          </button>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9 space-y-6">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 bg-white dark:bg-gray-850 rounded-3xl border shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Total Installed</span>
                  <span className="text-2xl font-black text-solar-primary block mt-1">352.4 MW</span>
                </div>
                <div className="p-5 bg-white dark:bg-gray-850 rounded-3xl border shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Quote Leads</span>
                  <span className="text-2xl font-black text-solar-primary block mt-1">{leads.length} Active</span>
                </div>
                <div className="p-5 bg-white dark:bg-gray-850 rounded-3xl border shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Sales Orders</span>
                  <span className="text-2xl font-black text-solar-primary block mt-1">{orders.length} Placed</span>
                </div>
                <div className="p-5 bg-white dark:bg-gray-850 rounded-3xl border shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Support Mail</span>
                  <span className="text-2xl font-black text-solar-primary block mt-1">{messages.length} New</span>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white dark:bg-gray-850 p-6 rounded-3xl border shadow-md">
                <h3 className="font-extrabold text-sm uppercase text-solar-textDark dark:text-white mb-4 tracking-wider">
                  Platform Growth & Output Performance
                </h3>
                <div className="h-64">
                  <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="bg-white dark:bg-gray-850 p-6 rounded-3xl border shadow-md space-y-4 animate-fade-in">
              <h3 className="font-extrabold text-base text-solar-textDark dark:text-white uppercase tracking-wider">
                Quote & ROI Leads Management
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Details</th>
                      <th className="pb-3">State</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-150 dark:border-gray-800/40">
                        <td className="py-3.5">
                          <span className="font-bold text-solar-textDark dark:text-white block">{lead.name}</span>
                          <span className="text-[10px] text-gray-400">{lead.phone} | {lead.email}</span>
                        </td>
                        <td className="py-3.5">
                          <span className="block">Bill: <span className="font-semibold">{lead.bill}</span></span>
                          <span className="block text-[10px] text-gray-400">Size: {lead.size}</span>
                        </td>
                        <td className="py-3.5 font-medium">{lead.state}</td>
                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                            lead.status === 'Approved' ? 'bg-green-500/10 text-solar-primary' : 'bg-solar-yellow/10 text-yellow-600'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right flex gap-2 justify-end">
                          {lead.status === 'Pending' && (
                            <button 
                              onClick={() => updateLeadStatus(lead.id, 'Approved')}
                              className="p-1 bg-solar-primary/10 text-solar-primary hover:bg-solar-primary hover:text-white rounded-md"
                              title="Approve"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button 
                            className="p-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-md"
                            title="Delete"
                          >
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-gray-850 p-6 rounded-3xl border shadow-md space-y-4 animate-fade-in">
              <h3 className="font-extrabold text-base text-solar-textDark dark:text-white uppercase tracking-wider">
                E-Commerce Fulfillments
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Total Value</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id} className="border-b border-gray-150 dark:border-gray-800/40">
                        <td className="py-3.5 font-bold text-solar-primary">{ord.id}</td>
                        <td className="py-3.5 font-medium">{ord.customer}</td>
                        <td className="py-3.5">{ord.itemsCount} Products</td>
                        <td className="py-3.5 font-bold">₹{ord.total.toLocaleString()}</td>
                        <td className="py-3.5 text-right">
                          <span className="px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase bg-blue-500/10 text-blue-600">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
              
              {/* Product creator */}
              <div className="md:col-span-5 bg-white dark:bg-gray-850 p-6 rounded-3xl border shadow-md space-y-4">
                <h4 className="font-extrabold text-sm uppercase text-solar-textDark dark:text-white tracking-wider">Add New Product</h4>
                <form onSubmit={handleAddProduct} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Product Name</label>
                    <input 
                      type="text" 
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Category</label>
                    <select 
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                    >
                      <option value="Solar Panels">Solar Panels</option>
                      <option value="Solar Inverters">Solar Inverters</option>
                      <option value="Lithium Batteries">Lithium Batteries</option>
                      <option value="Solar Water Heaters">Solar Water Heaters</option>
                      <option value="Solar Accessories">Solar Accessories</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Price (₹)</label>
                    <input 
                      type="number" 
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Description</label>
                    <textarea 
                      rows="3"
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white resize-none"
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full py-2.5 bg-solar-primary text-white rounded-xl text-xs font-bold hover-glow glow-btn uppercase flex items-center justify-center gap-1.5">
                    <Plus size={14} /> Add Product
                  </button>
                </form>
              </div>

              {/* Product catalog list table */}
              <div className="md:col-span-7 bg-white dark:bg-gray-850 p-6 rounded-3xl border shadow-md space-y-4">
                <h4 className="font-extrabold text-sm uppercase text-solar-textDark dark:text-white tracking-wider">Catalog Inventory</h4>
                <div className="overflow-y-auto max-h-[360px]">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-850 text-gray-400 uppercase font-bold">
                        <th className="pb-3">Product</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalog.map((prod) => (
                        <tr key={prod.id} className="border-b border-gray-100 dark:border-gray-800/40">
                          <td className="py-2.5 font-bold text-solar-textDark dark:text-white truncate max-w-[120px]">{prod.name}</td>
                          <td className="py-2.5 text-gray-500">{prod.category}</td>
                          <td className="py-2.5 font-semibold">₹{prod.price.toLocaleString()}</td>
                          <td className="py-2.5 text-right">
                            <button 
                              onClick={() => removeProductFromCatalog(prod.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Delete"
                            >
                              <Trash2 size={14} />
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

          {activeTab === 'messages' && (
            <div className="bg-white dark:bg-gray-850 p-6 rounded-3xl border shadow-md space-y-4 animate-fade-in">
              <h3 className="font-extrabold text-base text-solar-textDark dark:text-white uppercase tracking-wider">
                Support Mailbox
              </h3>
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-2xl bg-solar-bgLight/40 dark:bg-gray-800/30 border border-gray-150 dark:border-gray-800 text-xs text-left space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-sm text-solar-textDark dark:text-white block">{msg.name}</span>
                        <span className="text-[10px] text-gray-400">{msg.email} | Subject: <span className="font-semibold">{msg.subject}</span></span>
                      </div>
                      <span className="text-[10px] text-gray-400">{msg.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed border-t border-gray-200/40 dark:border-gray-850 pt-2">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
