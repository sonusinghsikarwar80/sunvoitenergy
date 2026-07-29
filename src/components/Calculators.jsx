import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { stateSubsidies } from '../data/mockData';
import {
  Calculator, ShieldAlert, Sparkles, TrendingUp, Leaf, Coins, Check,
  Info, Download, Mail, Phone, Sun, MapPin, Upload, MessageSquare, AlertCircle,
  X, Star, Zap, CheckCircle2, RotateCw, FileText, BarChart3, HelpCircle, Eye, ShieldCheck, TreePine, Car, Home, ArrowRight
} from 'lucide-react';

export default function Calculators() {
  const { language, addLead } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('savings');

  // Lead capture state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // 1. Savings Inputs
  const [monthlyBill, setMonthlyBill] = useState(14000);
  const [propertyType, setPropertyType] = useState('Residential');
  const [roofArea, setRoofArea] = useState(2850);
  const [selectedState, setSelectedState] = useState('Delhi');

  // Bonus Features States
  const [detectingLoc, setDetectingLoc] = useState(false);
  const [sunlightHours, setSunlightHours] = useState(5.2); // hrs/day peak sunlight
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [showSubsidyPopup, setShowSubsidyPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [pricingToggle, setPricingToggle] = useState('monthly');

  // 1. Savings Calculated Values
  const [systemSize, setSystemSize] = useState(11);
  const [estCost, setEstCost] = useState(605000);
  const [subsidy, setSubsidy] = useState(78000);
  const [finalPrice, setFinalPrice] = useState(527000);
  const [monthlySavings, setMonthlySavings] = useState(12880);
  const [paybackPeriod, setPaybackPeriod] = useState(3.4);
  const [carbonRed, setCarbonRed] = useState(15.9);

  // 2. EMI Inputs (derived from final price)
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanDuration, setLoanDuration] = useState(5); // in years
  const [monthlyEMI, setMonthlyEMI] = useState(8950);
  const [loanAmt, setLoanAmt] = useState(477000);

  // Live Customer Savings Ticker state
  const [liveSavings, setLiveSavings] = useState(8502340000);
  useEffect(() => {
    const t = setInterval(() => {
      setLiveSavings(prev => prev + Math.floor(Math.random() * 450) + 150);
    }, 1500);
    return () => clearInterval(t);
  }, []);

  // Detect state peak sunlight hours
  const sunlightData = {
    'Delhi': 5.2,
    'Maharashtra': 5.4,
    'Gujarat': 5.8,
    'Uttar Pradesh': 5.0,
    'Rajasthan': 6.0,
    'Karnataka': 5.5
  };

  // State auto-detect simulation
  const handleAutoDetect = () => {
    setDetectingLoc(true);
    setTimeout(() => {
      const states = Object.keys(stateSubsidies);
      const randomState = states[Math.floor(Math.random() * states.length)];
      setSelectedState(randomState);
      setDetectingLoc(false);
      alert(`Location auto-detected: State of ${randomState}`);
    }, 1200);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPhoto(file.name);
      alert(`AI Roof Analysis Complete:\nEstimated panels fitting: ${Math.round(roofArea / 22)} panels`);
    }
  };

  // Calculate Savings on change
  useEffect(() => {
    let size = Math.max(1, Math.round(monthlyBill / 1200));
    
    // Check if roof area supports it (typical 1kW needs ~100 sqft)
    const maxPossibleSize = Math.max(1, Math.floor(roofArea / 90));
    if (size > maxPossibleSize) {
      size = maxPossibleSize;
    }
    setSystemSize(size);

    setSunlightHours(sunlightData[selectedState] || 5.0);

    const stateConfig = stateSubsidies[selectedState] || { baseCostPerkW: 55000 };
    const cost = size * stateConfig.baseCostPerkW;
    setEstCost(cost);

    let subsidyAmt = 0;
    if (propertyType === 'Residential') {
      if (size === 1) {
        subsidyAmt = 30000;
      } else if (size === 2) {
        subsidyAmt = 60000;
      } else if (size >= 3) {
        subsidyAmt = 78000;
      }
    }
    setSubsidy(subsidyAmt);
    const finalPr = Math.max(20000, cost - subsidyAmt);
    setFinalPrice(finalPr);

    const mSavings = Math.round(monthlyBill * 0.92);
    setMonthlySavings(mSavings);

    const payback = finalPr / (mSavings * 12);
    setPaybackPeriod(Math.max(0.5, parseFloat(payback.toFixed(1))));

    setCarbonRed(parseFloat((size * 1.45).toFixed(1)));

    setDownPayment(Math.min(Math.round(finalPr * 0.25), finalPr - 10000));
    setLoanAmt(Math.max(0, finalPr - Math.min(Math.round(finalPr * 0.25), finalPr - 10000)));
  }, [monthlyBill, propertyType, roofArea, selectedState]);

  // Recalculate EMI
  useEffect(() => {
    const P = loanAmt;
    const r = (interestRate / 12) / 100;
    const n = loanDuration * 12;
    if (r === 0 || P === 0) {
      setMonthlyEMI(Math.round(P / n));
      return;
    }
    const emiVal = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyEMI(Math.round(emiVal));
  }, [loanAmt, interestRate, loanDuration]);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert('Please fill out all fields.');
      return;
    }
    addLead({
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      state: selectedState,
      bill: `₹${monthlyBill.toLocaleString()}`,
      size: `${systemSize} kW`,
      savings: `₹${monthlySavings.toLocaleString()}/mo`
    });
    setLeadSubmitted(true);
  };

  const handleDownloadProposal = () => {
    alert("Generating detailed 12-page PDF proposal... Download will start shortly!");
  };

  const handleEmailEstimate = () => {
    const email = prompt("Enter email address to send custom proposal:");
    if (email) {
      alert(`Success! Proposal sent to ${email}`);
    }
  };

  const getStepStatus = (step) => {
    if (step === 1) return true;
    if (step === 2) return monthlyBill > 1000;
    if (step === 3) return systemSize > 0;
    if (step === 4) return leadSubmitted;
    return false;
  };

  const plans = [
    {
      id: 'basic',
      name: 'Eco Basic',
      capacity: '3 kW Package',
      icon: '🌞',
      price: Math.round(finalPrice * 0.9),
      savingsVal: `Save up to ₹${Math.round(monthlySavings * 12 * 0.85).toLocaleString()}/yr`,
      payback: 'Recover Investment in 4.5 Years',
      roiPct: '18% Annual Return (ROI)',
      panels: 'Polycrystalline Modules',
      efficiency: '18.5% Rating',
      warranty: '10 Yr Craftsmanship',
      inverter: 'Standard String Inverter',
      ideal: 'Entry level budget setup',
      powerOutput: '3 kW',
      homesSupported: '1-2',
      timeline: '3 Days',
      badge: null
    },
    {
      id: 'standard',
      name: 'SunVoit Standard',
      capacity: '5 kW Package',
      icon: '⚡',
      price: finalPrice,
      savingsVal: `Save up to ₹${Math.round(monthlySavings * 12).toLocaleString()}/yr`,
      payback: 'Recover Investment in 3.8 Years',
      roiPct: '22% Annual Return (ROI)',
      panels: 'Mono-PERC Half Cut Panels',
      efficiency: '21.8% Peak Efficiency',
      warranty: '25 Yr Linear Warranty',
      inverter: 'Huawei Smart String Inverter',
      ideal: 'Best ROI & peak performance',
      powerOutput: '5 kW',
      homesSupported: '2-4',
      timeline: '4 Days',
      badge: '🔥 RECOMMENDED'
    },
    {
      id: 'premium',
      name: 'Luxe Smart Grid',
      capacity: '10 kW Package',
      icon: '🔋',
      price: Math.round(finalPrice * 1.25),
      savingsVal: `Save up to ₹${Math.round(monthlySavings * 12 * 1.3).toLocaleString()}/yr`,
      payback: 'Recover Investment in 3.2 Years',
      roiPct: '25% Annual Return (ROI)',
      panels: 'Bifacial Glass-Glass Panels',
      efficiency: '22.5% Maximum Yield',
      warranty: '30 Yr Performance Warranty',
      inverter: 'Smart Hybrid Inverter + App',
      ideal: 'Battery ready luxury setup',
      powerOutput: '10 kW',
      homesSupported: '4-6',
      timeline: '5 Days',
      badge: 'BEST VALUE'
    }
  ];

  return (
    <section id="calculator" className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-green-50/20 to-white dark:from-solar-bgDark dark:via-solar-bgDark/98 dark:to-gray-950 text-left">
      
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-solar-primary/5 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-solar-secondary/5 blur-[100px] animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(#2E7D32_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* ══════════ SECTION TITLE & STEP PROGRESS ══════════ */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-solar-primary uppercase block">
              INTENT SAVINGS ANALYZER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-solar-textDark dark:text-white uppercase leading-none tracking-tight" style={{ letterSpacing: '-0.04em' }}>
              Solar Savings &amp; EMI Calculator
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
              Configure your custom setup requirements, government subsidy benefits, final cost, and financing rates instantly.
            </p>
          </div>
            
          {/* Live Customer Savings Counter (Sleek Dashboard Pill) */}
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-md">
            <span className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              💰 Customer Savings:
            </span>
            <span className="text-base font-black text-solar-primary font-mono tracking-tight">
              ₹{liveSavings.toLocaleString()}
            </span>
          </div>

          {/* Step Progress Indicator (Apple-style thin line) */}
          <div className="max-w-md mx-auto flex items-center justify-between relative pt-6 pb-2">
            <div className="absolute left-0 right-0 top-[38px] h-[1.5px] bg-gray-200 dark:bg-gray-800 z-0" />
            <div 
              className="absolute left-0 top-[38px] h-[1.5px] bg-solar-primary transition-all duration-700 z-0" 
              style={{ width: `${getStepStatus(4) ? 100 : getStepStatus(3) ? 66 : getStepStatus(2) ? 33 : 0}%` }}
            />
            {[
              { num: 1, label: 'Property' },
              { num: 2, label: 'Bill' },
              { num: 3, label: 'Calculation' },
              { num: 4, label: 'Get Quote' }
            ].map((step, idx) => {
              const done = getStepStatus(step.num);
              return (
                <div key={idx} className="flex flex-col items-center relative z-10">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all border-2 duration-300 ${
                    done 
                      ? 'bg-solar-primary text-white border-solar-primary shadow-sm' 
                      : 'bg-white dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-800'
                  }`}>
                    {done && step.num < 4 ? '✔' : step.num}
                  </div>
                  <span className={`text-[8px] uppercase tracking-wider font-extrabold mt-2 ${done ? 'text-solar-primary' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button 
            onClick={() => setActiveTab('savings')}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:scale-102 ${
              activeTab === 'savings'
                ? 'bg-solar-primary text-white shadow-md shadow-solar-primary/20'
                : 'bg-white dark:bg-gray-800 text-solar-textDark dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <TrendingUp size={14} />
            Savings &amp; Cost
          </button>
          <button 
            onClick={() => setActiveTab('emi')}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:scale-102 ${
              activeTab === 'emi'
                ? 'bg-solar-primary text-white shadow-md shadow-solar-primary/20'
                : 'bg-white dark:bg-gray-800 text-solar-textDark dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <Coins size={14} />
            EMI &amp; Finance
          </button>
        </div>

        {/* ══════════ MAIN TAB LAYOUT ══════════ */}
        <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-gray-150 dark:border-gray-800 text-left shadow-lg relative overflow-hidden">
          
          {/* TAB 1: SAVINGS & COST */}
          {activeTab === 'savings' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT COLUMN: Inputs & Options */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* AI Badge header */}
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div className="flex items-center gap-1.5 text-solar-primary">
                    <Zap size={14} className="fill-solar-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Smart AI Calculator</span>
                    <span className="text-[9px] bg-solar-primary/10 px-2 py-0.5 rounded-full font-bold uppercase">99.8% Accurate</span>
                  </div>
                  <span className="text-[10px] font-bold text-solar-primary bg-solar-primary/8 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sun size={12} className="text-yellow-500" /> {sunlightHours} Hrs Peak Sun
                  </span>
                </div>

                {/* State Select with Auto Detect */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">Select State</label>
                    <button
                      onClick={handleAutoDetect}
                      disabled={detectingLoc}
                      className="text-xs font-bold text-solar-primary hover:underline flex items-center gap-1"
                    >
                      <MapPin size={12} /> {detectingLoc ? 'Detecting...' : 'Auto Detect Location'}
                    </button>
                  </div>
                  <input 
                    list="states-list"
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    placeholder="Type or select state..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white font-semibold focus:ring-1 focus:ring-solar-primary outline-none transition-all text-sm"
                  />
                  <datalist id="states-list">
                    {Object.keys(stateSubsidies).map((st) => (
                      <option key={st} value={st} />
                    ))}
                  </datalist>
                </div>

                {/* Property Selection & Floating Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Property type buttons */}
                  <div className="md:col-span-8 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">Property Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Residential', 'Commercial', 'Industrial'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setPropertyType(type)}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all duration-355 ${
                            propertyType === type
                              ? 'bg-solar-primary text-white border-solar-primary shadow-sm'
                              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-solar-textDark dark:text-gray-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Floating Benefits on left */}
                  <div className="md:col-span-4 bg-solar-primary/5 dark:bg-solar-primary/10 p-3 rounded-xl border border-solar-primary/10 text-left space-y-1.5 self-end">
                    {[
                      'Free Installation',
                      'Free Site Survey',
                      '25 Year Warranty'
                    ].map((b, i) => (
                      <div key={i} className="flex items-center gap-1 text-[9px] font-bold text-gray-500 dark:text-gray-300 uppercase">
                        <Check size={11} className="text-solar-primary flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly bill slider with standard layout */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">
                    <span>Monthly Electricity Bill</span>
                    <span className="px-2.5 py-1 bg-solar-primary/10 text-solar-primary text-xs font-extrabold rounded-lg">₹{monthlyBill.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="50000" 
                    step="500"
                    value={monthlyBill} 
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full accent-solar-primary cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                  </div>
                </div>

                {/* Roof Area slider with standard layout */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">
                    <span>Available Roof Area</span>
                    <span className="px-2.5 py-1 bg-solar-primary/10 text-solar-primary text-xs font-extrabold rounded-lg">{roofArea} Sq.Ft.</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="5000" 
                    step="50"
                    value={roofArea} 
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full accent-solar-primary cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>100 sqft</span>
                    <span>5,000 sqft</span>
                  </div>
                </div>

                {/* AI Roof Photo Upload */}
                <div className="border border-dashed border-gray-300 dark:border-gray-700 hover:border-solar-primary rounded-xl p-6 text-center cursor-pointer relative bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handlePhotoUpload} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                  />
                  <div className="flex flex-col items-center gap-2 text-xs text-gray-550 dark:text-gray-400">
                    <Upload size={22} className="text-solar-primary" />
                    <span className="font-extrabold text-solar-textDark dark:text-white">Drag &amp; Drop Roof Image</span>
                    <span className="text-[10px] text-gray-400">or <span className="text-solar-primary font-bold underline">Browse Files</span></span>
                    {uploadedPhoto && (
                      <span className="mt-1 px-3 py-1 bg-solar-primary/10 rounded-full text-solar-primary font-bold text-[10px]">
                        ✓ {uploadedPhoto}
                      </span>
                    )}
                  </div>
                </div>

                {/* AI recommendation Box */}
                <div className="bg-solar-primary/5 border-l-4 border-solar-primary p-4 rounded-r-xl flex gap-3 text-xs">
                  <Sparkles className="text-solar-primary flex-shrink-0" size={16} />
                  <div className="text-gray-750 dark:text-gray-300 space-y-1.5 flex-1">
                    <div className="font-black text-solar-primary uppercase tracking-widest text-[9px]">AI Recommendation</div>
                    <p className="font-bold text-solar-textDark dark:text-white">{systemSize}kW System is perfect for your needs</p>
                    <div className="grid grid-cols-2 gap-2 pt-1 font-bold text-[10px] text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">✔ 92% Bill Saving</span>
                      <span className="flex items-center gap-1">✔ ROI in {paybackPeriod} Years</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Outputs & Impact Visualizers */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                  <h3 className="font-black text-base text-solar-textDark dark:text-white uppercase tracking-wider">
                    Calculation Analysis
                  </h3>
                  
                  {/* Circular Payback Meter */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="20" cy="20" r="17" className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="2.5" fill="transparent" />
                        <circle 
                          cx="20" 
                          cy="20" 
                          r="17" 
                          className="stroke-solar-primary transition-all duration-1000" 
                          strokeWidth="2.5" 
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 17}
                          strokeDashoffset={2 * Math.PI * 17 * (1 - Math.min(1, 3.4 / paybackPeriod))}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-[10px] font-black text-solar-primary leading-none">{paybackPeriod}</span>
                        <span className="text-[5px] text-gray-400 font-black uppercase mt-0.5">Yrs</span>
                      </div>
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-[8px] font-black uppercase text-gray-400 tracking-wider">Payback / ROI</div>
                      <div className="text-xs font-bold text-solar-primary mt-0.5">{paybackPeriod} Years</div>
                    </div>
                  </div>
                </div>

                {/* Right panel stats (Glass cards style) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800 shadow-sm text-left">
                    <span className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">Recommended Capacity</span>
                    <span className="text-xl font-black text-solar-primary block mt-1">{systemSize} kW</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800 shadow-sm text-left relative group">
                    <span className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">Government Subsidy</span>
                    <span className="text-xl font-black text-solar-secondary block mt-1">₹{subsidy.toLocaleString()}</span>
                    <button 
                      onClick={() => setShowSubsidyPopup(true)} 
                      className="absolute top-2.5 right-2.5 text-gray-400 hover:text-solar-primary"
                    >
                      <Info size={13} />
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800 shadow-sm text-left">
                    <span className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">Estimated Cost</span>
                    <span className="text-lg font-black text-solar-textDark dark:text-white block mt-1">₹{estCost.toLocaleString()}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800 shadow-sm text-left">
                    <span className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">Est. Final Price</span>
                    <span className="text-xl font-black text-solar-primary block mt-1">₹{finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Monthly Bill Comparison (Before vs After Solar) */}
                <div className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-gray-150 dark:border-gray-800 space-y-3.5">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Monthly Bill Comparison</span>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-650 dark:text-gray-300">
                        <span>Before Solar</span>
                        <span className="font-extrabold">₹{monthlyBill.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gray-600 h-full w-full rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-solar-primary">
                        <span>After Solar</span>
                        <span className="font-extrabold">₹{Math.round(monthlyBill * 0.08).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-solar-primary h-full rounded-full" style={{ width: '8%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-solar-primary/10 p-2.5 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-black text-solar-primary uppercase text-[10px]">Estimated Savings</span>
                    <span className="font-black text-solar-primary">₹{monthlySavings.toLocaleString()} / Mo</span>
                  </div>
                </div>

                {/* ROI Timeline (Breakeven chart) */}
                <div className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-gray-150 dark:border-gray-800 space-y-3">
                  <span className="text-[9px] font-black text-gray-450 uppercase tracking-widest block">ROI Timeline (Break-Even)</span>
                  <div className="space-y-2 text-xs">
                    {[
                      { yr: 'Year 1', pct: '25%', w: 'w-[25%]', bg: 'bg-solar-primary/40' },
                      { yr: 'Year 2', pct: '50%', w: 'w-[50%]', bg: 'bg-solar-primary/60' },
                      { yr: 'Year 3', pct: '75%', w: 'w-[75%]', bg: 'bg-solar-primary/80' },
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-gray-500 font-bold w-12">{step.yr}</span>
                        <div className="flex-1 mx-3 bg-gray-100 dark:bg-gray-900 h-4 rounded-lg overflow-hidden relative">
                          <div className={`${step.bg} h-full ${step.w}`} />
                          <span className="absolute inset-0 flex items-center justify-start pl-2 text-[9px] font-extrabold text-solar-textDark dark:text-white">{step.pct} Recovered</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-bold w-12">Year 4</span>
                      <div className="flex-1 mx-3 bg-gray-100 dark:bg-gray-900 h-4 rounded-lg overflow-hidden relative">
                        <div className="bg-solar-secondary h-full w-full animate-pulse" />
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white">Investment Fully Recovered ✅</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings and Projected Net */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3.5 bg-solar-primary/10 rounded-xl border border-solar-primary/20 text-xs">
                      <span className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">Monthly Savings</span>
                      <span className="text-base font-black text-solar-primary block mt-1">₹{monthlySavings.toLocaleString()}</span>
                    </div>
                    <div className="p-3.5 bg-solar-primary/10 rounded-xl border border-solar-primary/20 text-xs">
                      <span className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">25-Yr Net Savings</span>
                      <span className="text-base font-black text-solar-primary block mt-1">₹{(monthlySavings * 12 * 25).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Savings Growth Chart */}
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-150 dark:border-gray-800 text-xs flex flex-col justify-between">
                    <span className="text-[9px] font-black text-gray-450 uppercase block tracking-wider mb-2">Savings Growth</span>
                    <div className="space-y-2 font-bold text-[9px] text-gray-550">
                      {[
                        { y: 'Year 1', val: '₹1.2L', w: 'w-[10%]' },
                        { y: 'Year 5', val: '₹6.5L', w: 'w-[30%]' },
                        { y: 'Year 10', val: '₹15L', w: 'w-[60%]' },
                        { y: 'Year 25', val: '₹38.6L', w: 'w-full' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="w-10 text-left">{item.y}</span>
                          <div className="flex-1 mx-2 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div className={`bg-solar-primary h-full ${item.w}`} />
                          </div>
                          <span className="font-extrabold text-solar-textDark dark:text-white">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Included System Components */}
                <div className="p-4 bg-white/50 dark:bg-gray-800/40 rounded-xl border border-gray-150 dark:border-gray-800 text-xs space-y-2">
                  <span className="text-[9px] font-black text-gray-450 uppercase tracking-widest block text-left">Included System Components</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {[
                      `${systemSize * 2} Mono PERC Panels`,
                      `${systemSize}kW Inverter`,
                      'Installation Included',
                      'Monitoring App Tracker',
                      'Net Metering Ready'
                    ].map((comp, idx) => (
                      <span key={idx} className="flex items-center gap-1 font-bold text-solar-textDark dark:text-gray-300">
                        <Check size={12} className="text-solar-primary" /> {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Environmental Card Overhaul */}
                <div className="p-4 bg-green-500/5 dark:bg-green-950/20 border border-green-500/15 rounded-xl text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-solar-primary uppercase text-[9px] tracking-widest">
                    <Leaf size={14} className="fill-solar-primary text-solar-primary" /> Environmental Impact
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center font-bold text-solar-textDark dark:text-gray-300 text-[10px]">
                    <div className="p-2.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-850 shadow-sm flex flex-col items-center">
                      <TreePine size={16} className="text-green-600 mb-1" />
                      <span className="font-black text-solar-primary">{Math.round(systemSize * 75)} Trees</span>
                      <span className="text-[8px] text-gray-400 mt-0.5">Planted</span>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-850 shadow-sm flex flex-col items-center">
                      <Car size={16} className="text-green-600 mb-1" />
                      <span className="font-black text-solar-primary">16 Tons</span>
                      <span className="text-[8px] text-gray-400 mt-0.5">CO₂ Reduced</span>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-850 shadow-sm flex flex-col items-center">
                      <Home size={16} className="text-green-600 mb-1" />
                      <span className="font-black text-solar-primary">{Math.round(systemSize / 2) || 1} Homes</span>
                      <span className="text-[8px] text-gray-400 mt-0.5">Powered</span>
                    </div>
                  </div>
                </div>

                {/* PDF Proposal Download */}
                <div className="flex gap-2">
                  <button 
                    onClick={handleDownloadProposal} 
                    className="flex-1 py-3.5 bg-solar-primary text-white rounded-xl text-xs font-black hover:shadow-lg flex items-center justify-center gap-2 hover:scale-102 active:scale-98 transition-all"
                  >
                    <FileText size={15} /> Download Proposal (12 Pages) PDF
                  </button>
                  <button 
                    onClick={handleEmailEstimate} 
                    className="py-3.5 px-4 border border-solar-primary text-solar-primary hover:bg-solar-primary hover:text-white rounded-xl text-xs font-black transition-colors"
                  >
                    <Mail size={14} />
                  </button>
                </div>

                {/* Trust Badges Strip */}
                <div className="text-center pt-2">
                  <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
                    ⭐⭐⭐⭐⭐ Rated 4.9 | 15,000+ Happy Customers | 25 Year Warranty | MNRE Approved
                  </span>
                </div>

                {/* Lead Form Submit */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  {!leadSubmitted ? (
                    <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-left">
                      <h4 className="text-[9px] uppercase font-black text-gray-400 dark:text-gray-500 tracking-wider">Speak to Expert / WhatsApp proposal</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="px-3.5 py-3 text-xs rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-850 dark:text-white outline-none focus:ring-1 focus:ring-solar-primary transition-all font-semibold"
                        />
                        <input 
                          type="tel" 
                          placeholder="Phone Number" 
                          required
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="px-3.5 py-3 text-xs rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-850 dark:text-white outline-none focus:ring-1 focus:ring-solar-primary transition-all font-semibold"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-3 bg-green-600 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-green-700 transition-colors">
                          <MessageSquare size={13} /> Chat with Solar Expert
                        </button>
                        <button type="submit" className="flex-1 py-3 bg-solar-primary text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-1.5">
                          <Zap size={13} /> Get Instant Quote
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-4 bg-green-500/10 rounded-xl text-center space-y-2 border border-green-500/20">
                      <div className="w-8 h-8 bg-solar-primary text-white rounded-full flex items-center justify-center mx-auto">
                        <Check size={16} />
                      </div>
                      <h4 className="font-black text-xs text-solar-primary uppercase">Proposal Submitted!</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold">A solar specialist will contact you shortly.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EMI & FINANCE */}
          {activeTab === 'emi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="font-extrabold text-lg text-solar-textDark dark:text-white uppercase tracking-wider">
                  Configure Solar Loan Financing
                </h3>

                {/* Down Payment slider */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">
                    <span>Down Payment</span>
                    <span className="px-2.5 py-1 bg-solar-primary/10 text-solar-primary text-xs font-extrabold rounded-lg">₹{downPayment.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max={finalPrice - 10000} 
                    step="5000"
                    value={downPayment} 
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full accent-solar-primary cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>₹10,000</span>
                    <span>₹{Math.round(finalPrice * 0.8).toLocaleString()}</span>
                  </div>
                </div>

                {/* Derived Loan Amount */}
                <div className="p-4 bg-white/50 dark:bg-gray-800/40 rounded-xl border border-gray-150 dark:border-gray-850 text-xs shadow-sm">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-500 uppercase tracking-wider text-[8px] block">Derived Loan Amount (Cost - Downpayment)</span>
                    <span className="text-solar-primary font-black text-sm">₹{loanAmt.toLocaleString()}</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">
                    <span>Interest Rate</span>
                    <span className="px-2.5 py-1 bg-solar-primary/10 text-solar-primary text-xs font-extrabold rounded-lg">{interestRate}% p.a.</span>
                  </div>
                  <input 
                    type="range" 
                    min="6" 
                    max="15" 
                    step="0.1"
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-solar-primary cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">
                    <span>Loan Duration</span>
                    <span className="px-2.5 py-1 bg-solar-primary/10 text-solar-primary text-xs font-extrabold rounded-lg">{loanDuration} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="1"
                    value={loanDuration} 
                    onChange={(e) => setLoanDuration(Number(e.target.value))}
                    className="w-full accent-solar-primary cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>1 Year</span>
                    <span>10 Years</span>
                  </div>
                </div>

                {/* Financing Options Checklist */}
                <div className="p-4 bg-solar-primary/5 dark:bg-solar-primary/10 border border-solar-primary/10 rounded-xl text-xs space-y-2 shadow-sm">
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block">Financing Options</span>
                  <div className="grid grid-cols-3 gap-2 font-black text-solar-primary text-[9px]">
                    <span className="flex items-center gap-1">✔ No Cost EMI</span>
                    <span className="flex items-center gap-1">✔ 0% Fee</span>
                    <span className="flex items-center gap-1">✔ Up to 7 Years</span>
                  </div>
                </div>
              </div>

              {/* Output Display */}
              <div className="lg:col-span-6 bg-white/45 dark:bg-gray-900/40 p-6 sm:p-8 rounded-[28px] border border-gray-150 dark:border-gray-800 backdrop-blur-md flex flex-col justify-between h-full space-y-6">
                <div>
                  <h3 className="font-extrabold text-lg text-solar-textDark dark:text-white uppercase tracking-wider">
                    EMI Cost Breakdown
                  </h3>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Estimates are based on simple compounding reducing interest rates.</p>
                </div>

                <div className="py-6 text-center border-y border-gray-200 dark:border-gray-800 space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase block tracking-widest">Estimated Monthly EMI</span>
                  <span className="text-4xl font-black text-solar-primary block font-mono">₹{monthlyEMI.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">For {loanDuration * 12} Months tenure</span>
                </div>

                <div className="text-xs text-gray-500 space-y-2.5">
                  <div className="flex justify-between">
                    <span className="font-bold">Down Payment Made</span>
                    <span className="font-black text-solar-textDark dark:text-white">₹{downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Loan Principal Amount</span>
                    <span className="font-black text-solar-textDark dark:text-white">₹{loanAmt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Interest Rate Charged</span>
                    <span className="font-black text-solar-textDark dark:text-white">{interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Total Interest Payable</span>
                    <span className="font-black text-solar-textDark dark:text-white">₹{Math.max(0, monthlyEMI * loanDuration * 12 - loanAmt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-2.5 font-black text-sm text-solar-textDark dark:text-white">
                    <span>Total Cost (Principal + Interest)</span>
                    <span>₹{(downPayment + monthlyEMI * loanDuration * 12).toLocaleString()}</span>
                  </div>
                </div>

                {/* Quick actions for EMI */}
                <div className="flex gap-2">
                  <button 
                    onClick={handleDownloadProposal} 
                    className="flex-1 py-3 bg-solar-primary text-white rounded-xl text-xs font-black hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-102 active:scale-98 transition-all"
                  >
                    <FileText size={15} /> Download Proposal (12 Pages) PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ══════════ PLAN COMPARISON SECTION ══════════ */}
        <div className="space-y-8 mt-12 border-t border-gray-150 dark:border-gray-800/60 pt-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-black tracking-[0.25em] text-solar-primary uppercase block">Compare Packages</span>
            <h3 className="text-2xl sm:text-4xl font-black text-solar-textDark dark:text-white uppercase tracking-tight" style={{ letterSpacing: '-0.03em' }}>
              Choose the Perfect Solar Package
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Compare our residential solar packages and choose the best solution based on your energy usage and budget.
            </p>
          </div>

          {/* Pricing metric view toggle */}
          <div className="flex justify-center gap-2 mb-8 bg-gray-150 dark:bg-gray-800/60 p-1 rounded-full max-w-xs mx-auto border border-gray-200/20 shadow-inner">
            {['monthly', 'lifetime', 'roi'].map((mode) => (
              <button
                key={mode}
                onClick={() => setPricingToggle(mode)}
                className={`flex-1 py-2 px-3 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${
                  pricingToggle === mode
                    ? 'bg-solar-primary text-white shadow-sm'
                    : 'text-gray-450 hover:text-solar-primary dark:text-gray-300'
                }`}
              >
                {mode === 'monthly' ? 'Monthly' : mode === 'lifetime' ? 'Lifetime' : 'ROI'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-6 rounded-[28px] border bg-white/70 dark:bg-gray-850/80 flex flex-col justify-between space-y-6 cursor-pointer relative transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl ${
                  selectedPlan === plan.id 
                    ? 'border-solar-primary ring-2 ring-solar-primary/20 shadow-xl scale-[1.01] bg-gradient-to-b from-white to-solar-primary/[0.02] dark:to-solar-primary/[0.01]'
                    : 'border-gray-250/70 dark:border-gray-800 hover:border-solar-primary/50'
                }`}
                style={{ border: selectedPlan === plan.id ? '2px solid #2E7D32' : '1px solid rgba(46,125,50,0.15)' }}
              >
                {/* Active Recommended Badge */}
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-solar-primary text-white font-black text-[9px] px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                    {plan.badge}
                  </span>
                )}

                {/* Active checkmark */}
                {selectedPlan === plan.id && (
                  <div className="absolute top-4 right-4 bg-solar-primary text-white p-1 rounded-full shadow">
                    <Check size={12} />
                  </div>
                )}
                
                <div className="text-left space-y-4">
                  {/* Icon & Tiny labels */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-solar-primary/10 flex items-center justify-center text-2xl shadow-inner">
                      {plan.icon}
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-gray-400 border px-2 py-0.5 rounded-md dark:border-gray-800">{plan.capacity}</span>
                  </div>

                  <div>
                    <span className="text-[9px] font-black text-solar-primary uppercase tracking-wider block">Plan Option</span>
                    <h4 className="font-black text-lg text-solar-textDark dark:text-white mt-0.5 uppercase tracking-tight">{plan.name}</h4>
                  </div>

                  {/* Pricing Layout */}
                  <div className="py-3 border-y border-gray-150 dark:border-gray-800/60 space-y-1">
                    <span className="text-[8px] text-gray-400 uppercase font-black tracking-wider block">Starting From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-solar-textDark dark:text-white font-mono">₹{plan.price.toLocaleString()}</span>
                      <span className="text-[9px] text-gray-450 dark:text-gray-500 font-semibold">*Incl. Installation</span>
                    </div>
                    {/* Dynamic savings text */}
                    <span className="text-[10px] font-bold text-solar-secondary block">
                      {pricingToggle === 'monthly' ? plan.savingsVal : pricingToggle === 'lifetime' ? `Est. Lifetime Save: ₹${Math.round(plan.price * 2.8).toLocaleString()}` : plan.payback}
                    </span>
                    <span className="text-[9px] text-gray-400 font-semibold block">
                      {pricingToggle === 'roi' ? plan.roiPct : `Or EMI from ₹${Math.round(plan.price / 84).toLocaleString()}/month*`}
                    </span>
                  </div>
                  
                  {/* Features list checklist */}
                  <div className="space-y-2 text-xs font-bold text-gray-600 dark:text-gray-300 pt-1">
                    <div className="flex items-center gap-2">
                      <Check size={13} className="text-solar-primary flex-shrink-0" />
                      <span>{plan.panels}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={13} className="text-solar-primary flex-shrink-0" />
                      <span>{plan.efficiency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={13} className="text-solar-primary flex-shrink-0" />
                      <span>{plan.inverter}</span>
                    </div>
                    {/* Small badge tags */}
                    <div className="flex gap-2 pt-1">
                      <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-solar-primary/10 text-solar-primary rounded-md">{plan.warranty.split(' ')[0]} YR Warranty</span>
                      <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-solar-secondary/10 text-solar-secondary rounded-md">MNRE Approved</span>
                    </div>
                    <div className="text-[9px] text-gray-400 font-bold flex items-center gap-1.5 pt-1.5">
                      <span>⚡ Installation Timeline:</span>
                      <span className="text-solar-primary font-black uppercase">{plan.timeline}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-left pt-2.5 border-t border-gray-150 dark:border-gray-800">
                    <span className="text-[8px] text-gray-400 block font-bold uppercase tracking-wider">Ideal For</span>
                    <p className="text-[11px] text-gray-500 font-bold mt-0.5">{plan.ideal}</p>
                  </div>
                  {/* Action CTA Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleScrollTo('contact'); }}
                    className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                      selectedPlan === plan.id 
                        ? 'bg-solar-primary text-white hover:bg-solar-primary-dark shadow-md shadow-solar-primary/20 scale-[1.01]'
                        : 'bg-white/40 dark:bg-gray-800/40 border border-solar-primary/40 text-solar-primary hover:bg-solar-primary hover:text-white'
                    }`}
                  >
                    <span>{selectedPlan === plan.id ? '✓ Selected Plan' : 'Choose This Plan'}</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Row Table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-150 dark:border-gray-800 bg-white/50 dark:bg-gray-900/40 backdrop-blur-md text-xs">
            <div className="grid grid-cols-4 p-3 bg-solar-primary/5 dark:bg-solar-primary/10 border-b border-gray-150 dark:border-gray-800 font-extrabold text-[10px] uppercase text-gray-400 tracking-wider">
              <span>Specification</span>
              <span className="text-center">Eco Basic</span>
              <span className="text-center">Standard</span>
              <span className="text-center">Luxe Smart</span>
            </div>
            <div className="grid grid-cols-4 p-3.5 border-b border-gray-150 dark:border-gray-800/40">
              <span className="font-bold text-gray-500 dark:text-gray-400">Power Output</span>
              <span className="text-center font-bold text-solar-textDark dark:text-white">3 kW</span>
              <span className="text-center font-bold text-solar-textDark dark:text-white">5 kW</span>
              <span className="text-center font-bold text-solar-textDark dark:text-white">8 kW</span>
            </div>
            <div className="grid grid-cols-4 p-3.5">
              <span className="font-bold text-gray-500 dark:text-gray-400">Homes Supported</span>
              <span className="text-center font-bold text-solar-textDark dark:text-white">1-2</span>
              <span className="text-center font-bold text-solar-textDark dark:text-white">2-4</span>
              <span className="text-center font-bold text-solar-textDark dark:text-white">4-6</span>
            </div>
          </div>

          {/* ROI Savings Calculator Link */}
          <div className="text-center pt-2">
            <button 
              onClick={() => handleScrollTo('calculator')}
              className="text-[10px] font-black text-solar-primary hover:underline uppercase tracking-widest flex items-center gap-1.5 mx-auto"
            >
              Not sure? Calculate Your Savings →
            </button>
          </div>

          {/* Trust Footer */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 border-t border-gray-150 dark:border-gray-800/60 mt-12 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <span>✔ 5000+ Installations</span>
            <span>✔ 25 Years Warranty</span>
            <span>✔ MNRE Approved</span>
            <span>✔ Free Site Survey</span>
          </div>
        </div>

      </div>

      {/* ══════════ PM Surya Ghar Subsidy Information Modal ══════════ */}
      {showSubsidyPopup && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowSubsidyPopup(false)}
        >
          <div 
            className="relative bg-white dark:bg-solar-bgDark p-6 sm:p-8 rounded-3xl shadow-2xl border max-w-md w-full text-left space-y-5 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSubsidyPopup(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-full text-gray-500 dark:text-white"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-2 text-solar-primary">
              <Sun size={22} className="animate-spin-slow" />
              <h3 className="font-extrabold text-lg uppercase tracking-wider">PM Surya Ghar Yojana</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Under the Government of India's benchmark rooftop solar scheme, residential properties receive direct subsidies deposited into their billing account post-installation:
            </p>

            <div className="space-y-2 border-y border-gray-150 dark:border-gray-800 py-3 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-solar-textDark dark:text-white">1 kW System</span>
                <span className="font-bold text-solar-primary">₹30,000 Subsidy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-solar-textDark dark:text-white">2 kW System</span>
                <span className="font-bold text-solar-primary">₹60,000 Subsidy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-solar-textDark dark:text-white">3 kW or Higher Systems</span>
                <span className="font-bold text-solar-primary">₹78,000 Capped Subsidy</span>
              </div>
            </div>

            <div className="bg-solar-primary/5 dark:bg-solar-primary/10 p-3 rounded-xl border border-solar-primary/10 flex gap-2 text-[11px] text-gray-550 leading-normal">
              <AlertCircle size={15} className="text-solar-primary flex-shrink-0" />
              <span>We handle the entire application process on the national portal for you from start to finish.</span>
            </div>

            <button 
              onClick={() => setShowSubsidyPopup(false)}
              className="w-full py-2.5 bg-solar-primary text-white font-bold text-xs uppercase rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
