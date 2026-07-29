export const initialProducts = [
  {
    id: 'sv-panel-mono-450',
    category: 'Solar Panels',
    name: 'SunVoit Maxima 450W Mono-PERC',
    description: 'Ultra-high efficiency monocrystalline module with advanced multi-busbar technology. Delivering maximum power output in low light conditions.',
    price: 18500,
    discountPrice: 15500,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80'
    ],
    specifications: {
      'Cell Type': 'Monocrystalline PERC (144 Cells)',
      'Efficiency': '21.8%',
      'Max Power': '450 Watts',
      'Open Circuit Voltage': '49.8V',
      'Short Circuit Current': '11.4A',
      'Weight': '23.5 kg',
      'Dimensions': '2094 x 1038 x 35 mm',
      'Warranty': '25 Years Performance Warranty'
    },
    features: [
      'Anti-PID (Potential Induced Degradation) protection',
      'Excellent performance in high temperature and low-light environments',
      'Heavy mechanical load resistance (snow 5400 Pa, wind 2400 Pa)',
      '10-year product craftsmanship warranty'
    ],
    availability: 'In Stock',
    warranty: '25 Years Linear Performance Warranty'
  },
  {
    id: 'sv-panel-bifacial-550',
    category: 'Solar Panels',
    name: 'SunVoit Aurora Bifacial 550W',
    description: 'Double-sided power generation generating up to 30% additional energy from ground reflection (albedo). Perfect for commercial projects and solar farms.',
    price: 26000,
    discountPrice: 22000,
    rating: 5.0,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542332213-9b5a5a3fab90?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80'
    ],
    specifications: {
      'Cell Type': 'Bifacial Monocrystalline (N-Type)',
      'Efficiency': '22.5%',
      'Max Power': '550 Watts',
      'Bifaciality': '70% ± 5%',
      'Open Circuit Voltage': '50.2V',
      'Short Circuit Current': '13.9A',
      'Weight': '28.6 kg',
      'Dimensions': '2279 x 1134 x 35 mm',
      'Warranty': '30 Years Bifacial Warranty'
    },
    features: [
      'Generates power from back side, maximizing land utilization',
      'N-type cell technology with near-zero LID (Light Induced Degradation)',
      'Frameless design preventing dust accumulation',
      'Perfect match with trackers for commercial layouts'
    ],
    availability: 'In Stock',
    warranty: '30 Years Performance Warranty'
  },
  {
    id: 'sv-inv-hybrid-10kw',
    category: 'Solar Inverters',
    name: 'SunVoit Nexa 10kW Hybrid Inverter',
    description: 'Smart 3-Phase hybrid inverter with dual MPPT. Seamlessly manages power from solar panels, battery storage, and utility grid to run homes and offices.',
    price: 145000,
    discountPrice: 125000,
    rating: 4.8,
    reviewsCount: 64,
    images: [
      '/solar-inverter.jpg',
      'https://images.unsplash.com/photo-1562076046-724774afc978?auto=format&fit=crop&w=600&q=80'
    ],
    specifications: {
      'Nominal AC Output': '10,000 Watts',
      'Grid Type': 'Three-Phase',
      'Number of MPPT': '2',
      'Max Efficiency': '98.2%',
      'Protection Rating': 'IP65 Water & Dust Proof',
      'Communication': 'Wi-Fi / RS485 / GPRS',
      'Weight': '24.0 kg',
      'Warranty': '10 Years Standard'
    },
    features: [
      'Seamless transition to backup power in < 10ms',
      'Mobile app dashboard for real-time tracking',
      'Compatible with leading lithium storage units',
      'Smart load management & export control capabilities'
    ],
    availability: 'In Stock',
    warranty: '10 Years Product Warranty'
  },
  {
    id: 'sv-bat-lithium-15kwh',
    category: 'Lithium Batteries',
    name: 'SunVoit PowerVault 15kWh Smart Battery',
    description: 'Tesla-style premium lithium iron phosphate (LiFePO4) home battery. Features smart BMS, expandable modular structure, and luxury wall-mount aesthetic.',
    price: 320000,
    discountPrice: 280000,
    rating: 5.0,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&w=600&q=80'
    ],
    specifications: {
      'Chemistry': 'LiFePO4 (Lithium Iron Phosphate)',
      'Energy Capacity': '15.36 kWh',
      'Nominal Voltage': '51.2V',
      'Max Charge/Discharge': '150A / 150A',
      'Cycle Life': '6,000+ Cycles @ 80% DoD',
      'IP Rating': 'IP65 Wall Mount',
      'Dimensions': '650 x 850 x 180 mm',
      'Weight': '118 kg'
    },
    features: [
      'Advanced BMS (Battery Management System) safeguards cell integrity',
      'Slim profile, modular design (expandable up to 6 units)',
      'Passive liquid cooling preventing overheating',
      'Touchscreen UI for local status checking'
    ],
    availability: 'In Stock',
    warranty: '10 Years Unlimited Cycle Warranty'
  },
  {
    id: 'sv-heater-sol-300',
    category: 'Solar Water Heaters',
    name: 'SunVoit ThermoFlow 300L Water Heater',
    description: 'Evacuated Tube Collector (ETC) pressurized solar water heater. Delivering piping hot water even in extreme cold conditions.',
    price: 45000,
    discountPrice: 38000,
    rating: 4.7,
    reviewsCount: 57,
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80'
    ],
    specifications: {
      'Capacity': '300 Liters Per Day',
      'Number of Tubes': '24 ETC Tubes',
      'Inner Tank Material': 'Stainless Steel SUS304-2B (Food Grade)',
      'Outer Tank Material': 'Galvanized steel with powder coating',
      'Insulation': 'High-density Polyurethane foam (55mm)',
      'Backup Heating': '2.0 kW Integrated electrical heater',
      'Working Pressure': '6 Bar Max'
    },
    features: [
      'High-performance three-target vacuum tubes absorb maximum heat',
      'Sacrificial magnesium anode prevents corrosion in hard water',
      'Safety pressure relief valves pre-installed',
      'Thick insulation keeps water hot for up to 72 hours'
    ],
    availability: 'In Stock',
    warranty: '7 Years Warranty'
  },
  {
    id: 'sv-acc-ev-charger',
    category: 'Solar Accessories',
    name: 'SunVoit Smart EV Fast Charger 22kW',
    description: 'Eco-friendly smart electric vehicle charging station. Draws power directly from solar or battery grids to charge your EV at maximum speed.',
    price: 68000,
    discountPrice: 55000,
    rating: 4.9,
    reviewsCount: 41,
    images: [
      '/ev-charger.jpg',
      'https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&w=600&q=80'
    ],
    specifications: {
      'Power Rating': '22 kW (Three-Phase)',
      'Connector Type': 'Type 2 Tethered (5m cable)',
      'Dynamic Balancing': 'Included (adjusts to home load)',
      'Enclosure': 'IP65 / IK10 impact resistant',
      'Smart Control': 'RFID, Bluetooth, Wi-Fi, App control',
      'Dimensions': '320 x 200 x 110 mm',
      'Weight': '6.2 kg'
    },
    features: [
      'Three Modes: Solar Only, Eco (mix), and Fast (grid + solar)',
      'Built-in DC leakage protection (Type A + 6mA DC)',
      'Allows scheduling charging sessions to match sunrise peak',
      'Compact Tesla-styled space grey matte enclosure'
    ],
    availability: 'In Stock',
    warranty: '3 Years Warranty'
  }
];

export const stateSubsidies = {
  'Delhi': { subsidy2kW: 36000, subsidy3kW: 54000, subsidyAbove3kW: 78000, baseCostPerkW: 55000 },
  'Maharashtra': { subsidy2kW: 34000, subsidy3kW: 51000, subsidyAbove3kW: 75000, baseCostPerkW: 58000 },
  'Gujarat': { subsidy2kW: 38000, subsidy3kW: 57000, subsidyAbove3kW: 80000, baseCostPerkW: 54000 },
  'Uttar Pradesh': { subsidy2kW: 35000, subsidy3kW: 52000, subsidyAbove3kW: 76000, baseCostPerkW: 56000 },
  'Rajasthan': { subsidy2kW: 33000, subsidy3kW: 49000, subsidyAbove3kW: 72000, baseCostPerkW: 53000 },
  'Karnataka': { subsidy2kW: 32000, subsidy3kW: 48000, subsidyAbove3kW: 70000, baseCostPerkW: 60000 }
};

export const showcaseProjects = [
  {
    id: 1,
    title: 'The Green Vista Estate',
    category: 'Residential',
    location: 'Lonavala, Maharashtra',
    capacity: '15 kW Grid-Tied System',
    description: 'A luxurious off-grid mansion powered completely by custom-fitted monocrystalline panels integrated directly into sloping wooden roofs.',
    imageBefore: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', // Beautiful house
    imageAfter: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80', // Solar rooftop
    droneImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    savings: '₹22,000 / month'
  },
  {
    id: 2,
    title: 'Apex Manufacturing Unit',
    category: 'Industrial',
    location: 'Greater Noida, UP',
    capacity: '2.5 MW Ground & Roof Grid',
    description: 'Large manufacturing plant layout with Tier-1 bifacial modules utilizing double-sided tracking system to maximize factory runtimes.',
    imageBefore: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    droneImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    savings: '₹1.8 Lakhs / month'
  },
  {
    id: 3,
    title: 'Eco-Smart IT TechPark',
    category: 'Commercial',
    location: 'Bangalore, Karnataka',
    capacity: '500 kW Hybrid Microgrid',
    description: 'Multi-tenant commercial complex outfitted with EV charging ports, 200kWh lithium batteries, and automated microgrid export sensors.',
    imageBefore: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    droneImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    savings: '₹4.5 Lakhs / month'
  }
];

export const blogGuides = [
  {
    id: 1,
    title: 'How to claim PM Surya Ghar Muft Bijli Yojana Subsidy',
    category: 'Government Schemes',
    date: 'July 25, 2026',
    readTime: '6 min read',
    excerpt: 'A complete step-by-step guide explaining the applications, documentation, and verification required to receive up to ₹78,000 solar subsidy directly in your bank account.',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fab90?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Lithium vs. Tubular Batteries: Which is best for your Solar Grid?',
    category: 'Solar Guides',
    date: 'June 18, 2026',
    readTime: '8 min read',
    excerpt: 'An in-depth analysis of battery cycle life, depth of discharge, initial setup costs, and long-term warranties to help you pick the best backup battery.',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: '5 Crucial Solar Panels Maintenance Tips for Peak Summer Output',
    category: 'Maintenance Tips',
    date: 'May 04, 2026',
    readTime: '4 min read',
    excerpt: 'Keep your solar arrays clean and running at maximum efficiency. Learn about water pressure rules, cleaning schedules, and simple safety practices.',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80'
  }
];

export const faqAccordions = [
  {
    question: 'What is the lifespan and warranty on SunVoit Solar Panels?',
    answer: 'All our Tier-1 Monocrystalline and Bifacial solar modules come with a 10 to 12-year product workmanship warranty and a 25 to 30-year linear performance warranty. They typically generate active clean energy for over 30 years.'
  },
  {
    question: 'How does the Government solar subsidy work?',
    answer: 'Under PM Surya Ghar Muft Bijli Yojana, residential projects are eligible for ₹30,000 per kW up to 2kW, and an additional ₹18,000 for the 3rd kW. The total subsidy is capped at ₹78,000. Our subsidy calculator automatically details this for your state.'
  },
  {
    question: 'Can I charge my Electric Vehicle with home solar panels?',
    answer: 'Absolutely! Our smart 22kW EV Chargers integrate directly with solar inverter panels. You can prioritize solar-only charging, ensuring your electric car charges 100% on zero-cost green energy.'
  },
  {
    question: 'What happens during a power outage or on cloudy days?',
    answer: 'With a Hybrid Inverter and Battery Vault, your home switches seamlessly (in less than 10 milliseconds) to battery storage, meaning you experience zero power interruption. On cloudy days, solar production decreases but panels still generate 10-25% of their typical power.'
  }
];
