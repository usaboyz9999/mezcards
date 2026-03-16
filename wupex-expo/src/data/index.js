// ─── COLORS ──────────────────────────────────────────────────────────────────
export const DARK_COLORS = {
  bg: '#0d0b1e', bg2: '#1a1535', bg3: '#110e2a',
  border: '#2a1f4a', text: '#ffffff', textSub: '#e2d9f3',
  textMuted: '#9575b8', accent: '#fbbf24',
  primary: '#7c3aed', primary2: '#a855f7',
  green: '#34d399', red: '#f87171',
};

export const LIGHT_COLORS = {
  bg: '#f5f3ff', bg2: '#ffffff', bg3: '#ede9fe',
  border: '#ddd6fe', text: '#1e1b4b', textSub: '#312e81',
  textMuted: '#6d28d9', accent: '#d97706',
  primary: '#7c3aed', primary2: '#a855f7',
  green: '#059669', red: '#dc2626',
};

export const COLORS = DARK_COLORS; // backward compat

// ─── CURRENCIES ──────────────────────────────────────────────────────────────
export const CURRENCIES = [
  { code: 'USD', symbol: '$',   name: 'US Dollar',       nameAr: 'دولار أمريكي',    flag: '🇺🇸' },
  { code: 'SAR', symbol: '﷼',  name: 'Saudi Riyal',     nameAr: 'ريال سعودي',      flag: '🇸🇦' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham',      nameAr: 'درهم إماراتي',    flag: '🇦🇪' },
  { code: 'KWD', symbol: 'K.D', name: 'Kuwaiti Dinar',   nameAr: 'دينار كويتي',     flag: '🇰🇼' },
  { code: 'QAR', symbol: 'R.Q', name: 'Qatari Riyal',    nameAr: 'ريال قطري',       flag: '🇶🇦' },
  { code: 'BHD', symbol: 'B.D', name: 'Bahraini Dinar',  nameAr: 'دينار بحريني',    flag: '🇧🇭' },
  { code: 'OMR', symbol: 'R.O', name: 'Omani Rial',      nameAr: 'ريال عُماني',     flag: '🇴🇲' },
  { code: 'EUR', symbol: '€',   name: 'Euro',             nameAr: 'يورو',            flag: '🇪🇺' },
  { code: 'GBP', symbol: '£',   name: 'British Pound',   nameAr: 'جنيه إسترليني',   flag: '🇬🇧' },
  { code: 'EGP', symbol: 'E£',  name: 'Egyptian Pound',  nameAr: 'جنيه مصري',       flag: '🇪🇬' },
  { code: 'TRY', symbol: '₺',   name: 'Turkish Lira',    nameAr: 'ليرة تركية',      flag: '🇹🇷' },
  { code: 'JPY', symbol: '¥',   name: 'Japanese Yen',    nameAr: 'ين ياباني',       flag: '🇯🇵' },
];

// ─── CATEGORIES (for ProductsScreen filter tabs) ───────────────────────────
export const CATEGORIES = [
  'All', 'Gift Cards', 'Gaming', 'Streaming', 'Mobile', 'Subscriptions', 'VPN', 'Education',
];

// ─── DEMO USERS ───────────────────────────────────────────────────────────────
export const DEMO_USERS = [
  { id: 1, name: 'Admin', username: 'admin', email: 'admin@mezcards.com', password: 'admin123', wallet: 500, avatar: 'AD', spent: 125.48 },
  { id: 2, name: 'Test User', username: 'user', email: 'user@test.com', password: 'user123', wallet: 0, avatar: 'TU', spent: 0 },
];

export const INITIAL_ORDERS = [
  { id: '#ORD-4821', name: 'PlayStation Plus 1 Year', customer: 'Admin', date: '15 Mar', amount: '$59.99', status: 'completed' },
  { id: '#ORD-3917', name: 'Steam Wallet $50', customer: 'Admin', date: '12 Mar', amount: '$50.00', status: 'completed' },
  { id: '#ORD-2743', name: 'Netflix Premium 1M', customer: 'Admin', date: '10 Mar', amount: '$15.49', status: 'completed' },
];

export const INITIAL_TRANSACTIONS = [
  { icon: '🎮', name: 'PlayStation Plus 1 Year', date: '15 Mar', amount: '-$59.99', type: 'debit', color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
  { icon: '🎮', name: 'Steam Wallet $50', date: '12 Mar', amount: '-$50.00', type: 'debit', color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
  { icon: '🎬', name: 'Netflix Premium', date: '10 Mar', amount: '-$15.49', type: 'debit', color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
  { icon: '💳', name: 'Wallet Top-up', date: '8 Mar', amount: '+$200.00', type: 'credit', color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
];

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  // Gift Cards
  {
    id: 1, name: 'Amazon Gift Card', short: '🛍️', cat: 'Gift Cards',
    desc: 'Shop millions of items on Amazon. The perfect gift for any occasion.',
    colors: ['#232f3e', '#ff9900'],
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&q=80',
    pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  {
    id: 2, name: 'iTunes & App Store', short: '🍎', cat: 'Gift Cards',
    desc: 'Redeem on App Store, Apple Music, Apple TV+ and iCloud.',
    colors: ['#555', '#aaa'],
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    pkgs: [{ a: '$15', p: 15 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }],
  },
  {
    id: 3, name: 'Google Play Gift Card', short: '▶️', cat: 'Gift Cards',
    desc: 'Buy apps, games, movies and books on Google Play Store.',
    colors: ['#4285f4', '#34a853'],
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80',
    pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }],
  },
  {
    id: 4, name: 'Noon Gift Card', short: '🌟', cat: 'Gift Cards',
    desc: 'Shop fashion, electronics, home & beauty on Noon.',
    colors: ['#f5c518', '#1a1a1a'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&q=80',
    pkgs: [{ a: '50 SAR', p: 13.5 }, { a: '100 SAR', p: 27 }, { a: '200 SAR', p: 53 }],
  },
  {
    id: 5, name: 'Starbucks Gift Card', short: '☕', cat: 'Gift Cards',
    desc: 'Treat yourself or a friend to your favorite Starbucks drink.',
    colors: ['#00704a', '#1e3932'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }],
  },
  {
    id: 6, name: 'IKEA Gift Card', short: '🏠', cat: 'Gift Cards',
    desc: 'Use on furniture, home accessories and more at IKEA stores.',
    colors: ['#0058a3', '#ffda1a'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    pkgs: [{ a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  // Gaming
  {
    id: 10, name: 'Steam Wallet', short: '🎮', cat: 'Gaming',
    desc: 'Add funds to your Steam wallet. Buy games, DLC and in-game items.',
    colors: ['#1b2838', '#4a90d9'],
    image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=400&q=80',
    pkgs: [{ a: '$5', p: 5 }, { a: '$10', p: 10 }, { a: '$20', p: 20 }, { a: '$50', p: 50 }],
  },
  {
    id: 11, name: 'PlayStation Store (PSN)', short: 'PS', cat: 'Gaming',
    desc: 'Add funds to PlayStation wallet. Buy games and PS exclusives.',
    colors: ['#003087', '#0070d1'],
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80',
    pkgs: [{ a: '$10', p: 10 }, { a: '$20', p: 20 }, { a: '$50', p: 50 }],
  },
  {
    id: 12, name: 'Xbox Game Pass Ultimate', short: '🎯', cat: 'Gaming',
    desc: '100+ games on console, PC & cloud. EA Play included.',
    colors: ['#107c10', '#0a5009'],
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 14.99 }, { a: '3 Months', p: 38.99 }],
  },
  {
    id: 13, name: 'PUBG Mobile UC', short: '🔫', cat: 'Gaming',
    desc: 'Unknown Cash for PUBG Mobile. Buy outfits, crates and upgrades.',
    colors: ['#c8a84b', '#4a3728'],
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80',
    pkgs: [{ a: '60 UC', p: 0.99 }, { a: '325 UC', p: 4.99 }, { a: '660 UC', p: 9.99 }, { a: '1800 UC', p: 24.99 }],
  },
  {
    id: 14, name: 'Free Fire Diamonds', short: '💎', cat: 'Gaming',
    desc: 'Diamonds for Garena Free Fire. Unlock characters, skins and pets.',
    colors: ['#f04000', '#ff8c00'],
    image: 'https://images.unsplash.com/photo-1535223289429-462ea9301402?w=400&q=80',
    pkgs: [{ a: '100 Diamonds', p: 1.49 }, { a: '310 Diamonds', p: 3.99 }, { a: '520 Diamonds', p: 6.49 }, { a: '1060 Diamonds', p: 12.99 }],
  },
  {
    id: 15, name: 'Valorant Points (VP)', short: '🔺', cat: 'Gaming',
    desc: 'Riot Points for Valorant. Buy weapon skins, agents and battle pass.',
    colors: ['#ff4655', '#0f1923'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80',
    pkgs: [{ a: '475 VP', p: 4.99 }, { a: '1000 VP', p: 9.99 }, { a: '2050 VP', p: 19.99 }],
  },
  {
    id: 16, name: 'Roblox Robux', short: '🟥', cat: 'Gaming',
    desc: 'In-game currency for Roblox. Customize avatar and buy game passes.',
    colors: ['#e8192c', '#a01020'],
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&q=80',
    pkgs: [{ a: '400 Robux', p: 4.99 }, { a: '800 Robux', p: 9.99 }, { a: '1700 Robux', p: 19.99 }],
  },
  {
    id: 17, name: 'Mobile Legends Diamonds', short: '💠', cat: 'Gaming',
    desc: 'Diamonds for ML: Bang Bang. Buy skins, heroes and battle effects.',
    colors: ['#00a8ff', '#0652dd'],
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80',
    pkgs: [{ a: '56 Diamonds', p: 0.99 }, { a: '170 Diamonds', p: 2.99 }, { a: '565 Diamonds', p: 9.99 }],
  },
  {
    id: 18, name: 'Genshin Impact Crystals', short: '⚔️', cat: 'Gaming',
    desc: 'Genesis Crystals for Genshin Impact. Pull your favorite characters.',
    colors: ['#3b5bdb', '#845ef7'],
    image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=400&q=80',
    pkgs: [{ a: '60 Crystals', p: 0.99 }, { a: '300 Crystals', p: 4.99 }, { a: '980 Crystals', p: 14.99 }],
  },
  {
    id: 19, name: 'Minecraft Java + Bedrock', short: '⛏️', cat: 'Gaming',
    desc: 'Full access to Minecraft Java & Bedrock editions. Build and explore.',
    colors: ['#5b8a2d', '#3c5a1a'],
    image: 'https://images.unsplash.com/photo-1587095951604-287a0b3d7b99?w=400&q=80',
    pkgs: [{ a: 'Full Game', p: 29.99 }],
  },
  // Streaming
  {
    id: 20, name: 'Netflix Premium', short: '🎬', cat: 'Streaming',
    desc: 'Unlimited movies & TV in 4K Ultra HD. Up to 4 screens at once.',
    colors: ['#141414', '#e50914'],
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 15.49 }, { a: '3 Months', p: 43.99 }, { a: '6 Months', p: 83.99 }],
  },
  {
    id: 21, name: 'Spotify Premium', short: '🎵', cat: 'Streaming',
    desc: 'Ad-free music streaming. Download and listen offline anytime.',
    colors: ['#191414', '#1db954'],
    image: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 9.99 }, { a: '3 Months', p: 26.99 }, { a: '6 Months', p: 49.99 }],
  },
  {
    id: 22, name: 'Disney+ Premium', short: '🏰', cat: 'Streaming',
    desc: 'Marvel, Star Wars, Pixar, Disney & Nat Geo. All in one place.',
    colors: ['#0b1426', '#113ccf'],
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 7.99 }, { a: '3 Months', p: 21.99 }, { a: '1 Year', p: 79.99 }],
  },
  {
    id: 23, name: 'YouTube Premium', short: '▶️', cat: 'Streaming',
    desc: 'Ad-free YouTube, background play, offline downloads & YouTube Music.',
    colors: ['#ff0000', '#900'],
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 13.99 }, { a: '3 Months', p: 38.99 }],
  },
  {
    id: 24, name: 'Shahid VIP', short: '🌙', cat: 'Streaming',
    desc: 'Arabic content, Ramadan series, movies and live sports in HD.',
    colors: ['#1a0a3b', '#7b2d8b'],
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 5.99 }, { a: '3 Months', p: 14.99 }, { a: '1 Year', p: 49.99 }],
  },
  {
    id: 25, name: 'Apple TV+', short: '🍎', cat: 'Streaming',
    desc: 'Award-winning Apple Original series, films and documentaries.',
    colors: ['#1d1d1f', '#515154'],
    image: 'https://images.unsplash.com/photo-1611532736573-418856b1b9a0?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 9.99 }, { a: '3 Months', p: 26.99 }],
  },
  {
    id: 26, name: 'Anghami Plus', short: '🎶', cat: 'Streaming',
    desc: 'Largest Arabic music platform. 70M+ songs, ad-free listening.',
    colors: ['#000', '#ff5c5c'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 3.99 }, { a: '3 Months', p: 9.99 }, { a: '1 Year', p: 34.99 }],
  },
  // Mobile
  {
    id: 30, name: 'STC Recharge (Saudi)', short: '📱', cat: 'Mobile',
    desc: 'Instant STC prepaid recharge. Calls, SMS and mobile internet.',
    colors: ['#6a0dad', '#9b59b6'],
    image: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=400&q=80',
    pkgs: [{ a: '10 SAR', p: 2.7 }, { a: '25 SAR', p: 6.7 }, { a: '50 SAR', p: 13.4 }, { a: '100 SAR', p: 26.7 }],
  },
  {
    id: 31, name: 'Mobily Recharge (Saudi)', short: '📲', cat: 'Mobile',
    desc: 'Instant Mobily prepaid recharge for your Saudi number.',
    colors: ['#00843d', '#005428'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
    pkgs: [{ a: '10 SAR', p: 2.7 }, { a: '25 SAR', p: 6.7 }, { a: '50 SAR', p: 13.4 }],
  },
  {
    id: 32, name: 'Zain Recharge (Saudi)', short: '📡', cat: 'Mobile',
    desc: 'Instant Zain prepaid recharge. Stay connected anywhere.',
    colors: ['#e4002b', '#a0001e'],
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&q=80',
    pkgs: [{ a: '10 SAR', p: 2.7 }, { a: '25 SAR', p: 6.7 }, { a: '50 SAR', p: 13.4 }],
  },
  {
    id: 33, name: 'TikTok Coins', short: '🎵', cat: 'Mobile',
    desc: 'Send virtual gifts to your favorite TikTok creators live.',
    colors: ['#010101', '#fe2c55'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
    pkgs: [{ a: '65 Coins', p: 0.99 }, { a: '330 Coins', p: 4.99 }, { a: '660 Coins', p: 9.99 }, { a: '1321 Coins', p: 19.99 }],
  },
  // Subscriptions
  {
    id: 40, name: 'PlayStation Plus (PS+)', short: 'PS+', cat: 'Subscriptions',
    desc: 'Free monthly games, online multiplayer and exclusive discounts.',
    colors: ['#003087', '#0070d1'],
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=400&q=80',
    pkgs: [{ a: 'Essential 1M', p: 9.99 }, { a: 'Extra 1M', p: 14.99 }, { a: 'Premium 1M', p: 17.99 }, { a: 'Essential 1Y', p: 59.99 }],
  },
  {
    id: 41, name: 'Microsoft 365 Personal', short: 'M365', cat: 'Subscriptions',
    desc: 'Word, Excel, PowerPoint, Outlook + 1TB OneDrive cloud storage.',
    colors: ['#d83b01', '#ea6f24'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 6.99 }, { a: '1 Year', p: 69.99 }],
  },
  {
    id: 42, name: 'iCloud+ Storage', short: '☁️', cat: 'Subscriptions',
    desc: 'Store photos, videos and files securely on Apple iCloud.',
    colors: ['#1d1d1f', '#0a84ff'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80',
    pkgs: [{ a: '50GB / Mo', p: 0.99 }, { a: '200GB / Mo', p: 2.99 }, { a: '2TB / Mo', p: 9.99 }],
  },
  {
    id: 43, name: 'Google One', short: '🔵', cat: 'Subscriptions',
    desc: 'Extra Google storage for Drive, Gmail and Photos. Share with family.',
    colors: ['#4285f4', '#34a853'],
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&q=80',
    pkgs: [{ a: '100GB / Mo', p: 1.99 }, { a: '200GB / Mo', p: 2.99 }, { a: '2TB / Mo', p: 9.99 }],
  },
  // VPN
  {
    id: 50, name: 'NordVPN', short: '🔒', cat: 'VPN',
    desc: 'Fast, secure VPN. 5500+ servers in 59 countries. No-logs.',
    colors: ['#4687ff', '#3a5ecc'],
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 11.95 }, { a: '1 Year', p: 59.88 }],
  },
  {
    id: 51, name: 'ExpressVPN', short: '⚡', cat: 'VPN',
    desc: 'Ultra-fast VPN. 160+ locations. Best choice for streaming.',
    colors: ['#da3940', '#7a0000'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 12.95 }, { a: '6 Months', p: 59.95 }, { a: '1 Year', p: 99.95 }],
  },
  {
    id: 52, name: 'Surfshark VPN', short: '🦈', cat: 'VPN',
    desc: 'Unlimited devices. CleanWeb blocks ads and malware.',
    colors: ['#1c9cde', '#0f6b9e'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 12.95 }, { a: '1 Year', p: 47.88 }],
  },
  // Education
  {
    id: 60, name: 'Udemy Personal Plan', short: '📚', cat: 'Education',
    desc: 'Access 12,000+ top courses in tech, business, design and more.',
    colors: ['#a435f0', '#6d28d9'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 19.99 }, { a: '1 Year', p: 119.99 }],
  },
  {
    id: 61, name: 'Duolingo Plus', short: '🦉', cat: 'Education',
    desc: 'Learn any language ad-free. Unlimited hearts and streak repair.',
    colors: ['#58cc02', '#1cb0f6'],
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 6.99 }, { a: '1 Year', p: 59.99 }],
  },
];