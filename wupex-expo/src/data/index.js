// ─── COLORS ──────────────────────────────────────────────────────────────────
export const DARK_COLORS = {
  bg: '#0d0b1e', bg2: '#1a1535', bg3: '#110e2a',
  border: '#2a1f4a', text: '#ffffff', textSub: '#e2d9f3',
  textMuted: '#9575b8', accent: '#fbbf24',
  primary: '#7c3aed', primary2: '#a855f7',
  green: '#34d399', red: '#f87171',
};

export const LIGHT_COLORS = {
  bg: '#f8f5ff', bg2: '#ffffff', bg3: '#ede9fe',
  border: '#ddd6fe', text: '#1e1b4b', textSub: '#312e81',
  textMuted: '#6d28d9', accent: '#d97706',
  primary: '#7c3aed', primary2: '#a855f7',
  green: '#059669', red: '#dc2626',
};

export const COLORS = DARK_COLORS;

// ─── CURRENCIES ──────────────────────────────────────────────────────────────
export const CURRENCIES = [
  { code: 'USD', symbol: '$',    name: 'US Dollar',      nameAr: 'دولار أمريكي',   flag: '🇺🇸' },
  { code: 'SAR', symbol: 'SR',   name: 'Saudi Riyal',    nameAr: 'ريال سعودي',     flag: '🇸🇦' },
  { code: 'AED', symbol: 'AED',  name: 'UAE Dirham',     nameAr: 'درهم إماراتي',   flag: '🇦🇪' },
  { code: 'KWD', symbol: 'KD',   name: 'Kuwaiti Dinar',  nameAr: 'دينار كويتي',    flag: '🇰🇼' },
  { code: 'QAR', symbol: 'QR',   name: 'Qatari Riyal',   nameAr: 'ريال قطري',      flag: '🇶🇦' },
  { code: 'BHD', symbol: 'BD',   name: 'Bahraini Dinar', nameAr: 'دينار بحريني',   flag: '🇧🇭' },
  { code: 'OMR', symbol: 'RO',   name: 'Omani Rial',     nameAr: 'ريال عُماني',    flag: '🇴🇲' },
  { code: 'EUR', symbol: '€',    name: 'Euro',            nameAr: 'يورو',           flag: '🇪🇺' },
  { code: 'GBP', symbol: '£',    name: 'British Pound',  nameAr: 'جنيه إسترليني',  flag: '🇬🇧' },
  { code: 'EGP', symbol: 'EGP',  name: 'Egyptian Pound', nameAr: 'جنيه مصري',      flag: '🇪🇬' },
  { code: 'TRY', symbol: '₺',    name: 'Turkish Lira',   nameAr: 'ليرة تركية',     flag: '🇹🇷' },
  { code: 'JPY', symbol: '¥',    name: 'Japanese Yen',   nameAr: 'ين ياباني',      flag: '🇯🇵' },
];

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
export const CATEGORIES = [
  'All', 'Gift Cards', 'Gaming', 'Streaming',
  'Mobile', 'Subscriptions', 'VPN', 'Education', 'Software', 'Chat Apps',
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
  // ── Gift Cards ─────────────────────────────────────────────────────────────
  {
    id: 1, name: 'Amazon Gift Card', short: 'AMZ', cat: 'Gift Cards',
    desc: 'Shop millions of items. The perfect gift for every occasion and every budget.',
    colors: ['#232f3e', '#ff9900'],
    image: 'https://read.cardtonic.com/wp-content/uploads/2023/04/All-You-Need-To-Know-About-Amazon-Gift-Card.jpg',
    badge: 'Popular', badgeColor: '#f97316',
    pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  {
    id: 2, name: 'Apple iTunes & App Store', short: 'APPLE', cat: 'Gift Cards',
    desc: 'Redeem on App Store, Apple Music, Apple TV+, iCloud and more.',
    colors: ['#1d1d1f', '#6e6e73'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJYuq41m0sbXSJ0JO0DouC70HMX-MtY9IJA&s',
    pkgs: [{ a: '$15', p: 15 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  {
    id: 3, name: 'Google Play Gift Card', short: 'PLAY', cat: 'Gift Cards',
    desc: 'Buy apps, games, movies, books and subscriptions on Google Play.',
    colors: ['#4285f4', '#34a853'],
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCxthNqJXkAnGM_v_i7JFXIMuBibRXybWW1vTg3L3sIV99BA_Lyog7KmjwMwL2TqPO8KOFf9uSKAubjkamIPEuIxfgItBYiTueOeHXZj-JOb3x6tHLum5nRUKL_2xKsEEhtjZ0dpfyLD5bLry6v9HXIDihWzh51cy359fwnHcXX6EiUQ3ClVg7hHFdC-w/s1200/Smart%20Ways%20to%20Use%20Google%20Play%20Gift%20Cards.jpg',
    pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }],
  },
  {
    id: 4, name: 'Noon Gift Card', short: 'NOON', cat: 'Gift Cards',
    desc: 'Shop fashion, electronics, home & beauty on Noon.com.',
    colors: ['#f5c518', '#1a1a1a'],
    image: 'https://emirabiz.com/fileadmin/images/articles/how-to-sell-on-noon-fb.jpg',
    pkgs: [{ a: '50 SAR', p: 13.5 }, { a: '100 SAR', p: 27 }, { a: '200 SAR', p: 53 }, { a: '500 SAR', p: 133 }],
  },
  {
    id: 5, name: 'Starbucks Gift Card', short: 'STBKS', cat: 'Gift Cards',
    desc: 'Treat yourself or a friend to your favorite Starbucks beverage or food.',
    colors: ['#00704a', '#1e3932'],
    image: 'https://i5.walmartimages.com/asr/041ce509-fc7c-4109-8dbb-70b8ffbebe7d.f3af37597d1ea801e56438a3a3892b8b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }],
  },
  {
    id: 6, name: 'IKEA Gift Card', short: 'IKEA', cat: 'Gift Cards',
    desc: 'Use on furniture, accessories and home decor at any IKEA store.',
    colors: ['#0058a3', '#ffda1a'],
    image: 'https://assets-raffall.ams3.cdn.digitaloceanspaces.com/raffalls/30352/promo_1593533582_5376.png',
    pkgs: [{ a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  {
    id: 7, name: 'Visa Gift Card', short: 'VISA', cat: 'Gift Cards',
    desc: 'Accepted everywhere Visa debit cards are accepted worldwide.',
    colors: ['#1a1f71', '#f7a600'],
    image: 'https://giftogram.com/hubfs/%5BGIFTOGRAM%5D%20Website%20Images/open-graph-image-prepaid-cards.jpg',
    badge: 'New', badgeColor: '#10b981',
    pkgs: [{ a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }, { a: '$200', p: 200 }],
  },
  {
    id: 8, name: 'PayPal Gift Card', short: 'PAYPL', cat: 'Gift Cards',
    desc: 'Add funds to any PayPal account. Shop anywhere PayPal is accepted.',
    colors: ['#003087', '#009cde'],
    image: 'https://cloud.paysend.com/strapi/prod/how_to_send_money_via_paypal_1200_af825d4785.png',
    pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }],
  },

  // ── Gaming ──────────────────────────────────────────────────────────────────
  {
    id: 10, name: 'Steam Wallet', short: 'STEAM', cat: 'Gaming',
    desc: 'Add funds to your Steam wallet. Buy games, DLC, and in-game items.',
    colors: ['#1b2838', '#66c0f4'],
    image: 'https://dropinblog.net/34253310/files/featured/imagem-2024-09-23-133404744.png',
    badge: 'Hot', badgeColor: '#ef4444',
    pkgs: [{ a: '$5', p: 5 }, { a: '$10', p: 10 }, { a: '$20', p: 20 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  {
    id: 11, name: 'PlayStation Store (PSN)', short: 'PSN', cat: 'Gaming',
    desc: 'Add funds to your PlayStation wallet for games, add-ons and more.',
    colors: ['#003087', '#0070d1'],
    image: 'https://jadeals.com/wp-content/uploads/PlayStation-PSN-Gift-Cards.jpg',
    pkgs: [{ a: '$10', p: 10 }, { a: '$20', p: 20 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  {
    id: 12, name: 'Xbox Game Pass Ultimate', short: 'XBOX', cat: 'Gaming',
    desc: '100+ high-quality games on console, PC and cloud. Includes EA Play.',
    colors: ['#107c10', '#0a5009'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwpc9NPuQuSxzRHM6l06u5NtJNQaiDVsFnnA&s',
    pkgs: [{ a: '1 Month', p: 14.99 }, { a: '3 Months', p: 38.99 }, { a: '6 Months', p: 74.99 }],
  },
  {
    id: 13, name: 'PUBG Mobile UC', short: 'PUBG', cat: 'Gaming',
    desc: 'Unknown Cash for PUBG Mobile. Buy outfits, crates and upgrades.',
    colors: ['#c8a84b', '#6b4c1e'],
    image: 'https://www.razercarddelivery.com/_next/image?url=https%3A%2F%2Fgiftnix-product-images.s3.us-west-2.amazonaws.com%2Fpubg-digital-gift-card-email-delivery-2x&w=750&q=75',
    badge: 'Popular', badgeColor: '#f97316',
    pkgs: [{ a: '60 UC', p: 0.99 }, { a: '325 UC', p: 4.99 }, { a: '660 UC', p: 9.99 }, { a: '1800 UC', p: 24.99 }, { a: '3850 UC', p: 49.99 }],
  },
  {
    id: 14, name: 'Free Fire Diamonds', short: 'FF', cat: 'Gaming',
    desc: 'Diamonds for Garena Free Fire. Unlock characters, skins and exclusive pets.',
    colors: ['#f04000', '#ff8c00'],
    image: 'https://jadeals.com/wp-content/uploads/iTune-Gift-Cards-layout-squared-no-writing.jpg',
    pkgs: [{ a: '100 Dia', p: 1.49 }, { a: '310 Dia', p: 3.99 }, { a: '520 Dia', p: 6.49 }, { a: '1060 Dia', p: 12.99 }, { a: '2180 Dia', p: 25.99 }],
  },
  {
    id: 15, name: 'Valorant Points (VP)', short: 'VAL', cat: 'Gaming',
    desc: 'Riot Points for Valorant. Buy weapon skins, agents and battle pass.',
    colors: ['#ff4655', '#0f1923'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUFbL7Z73uo1r47NXIOgeO_dBJ6fOzEiPkzg&s',
    pkgs: [{ a: '475 VP', p: 4.99 }, { a: '1000 VP', p: 9.99 }, { a: '2050 VP', p: 19.99 }, { a: '3650 VP', p: 34.99 }],
  },
  {
    id: 16, name: 'Roblox Robux', short: 'ROB', cat: 'Gaming',
    desc: 'In-game currency for Roblox. Customize your avatar and unlock game passes.',
    colors: ['#e8192c', '#8b0000'],
    image: 'https://images.rbxcdn.com/d572cc8714e0ec771ad8268977880ddf.png',
    pkgs: [{ a: '400 Robux', p: 4.99 }, { a: '800 Robux', p: 9.99 }, { a: '1700 Robux', p: 19.99 }, { a: '4500 Robux', p: 49.99 }],
  },
  {
    id: 17, name: 'Mobile Legends Diamonds', short: 'MLBB', cat: 'Gaming',
    desc: 'Diamonds for MLBB. Buy skins, heroes and exclusive battle effects.',
    colors: ['#00a8ff', '#0652dd'],
    image: 'https://www.datocms-assets.com/103962/1768898337-mobile-legends-4x3.png',
    pkgs: [{ a: '56 Dia', p: 0.99 }, { a: '170 Dia', p: 2.99 }, { a: '565 Dia', p: 9.99 }, { a: '1135 Dia', p: 19.99 }],
  },
  {
    id: 18, name: 'Genshin Impact Crystals', short: 'GI', cat: 'Gaming',
    desc: 'Genesis Crystals for Genshin Impact. Pull your favorite characters and weapons.',
    colors: ['#3b5bdb', '#845ef7'],
    image: 'https://i.ytimg.com/vi/cJ5TQcUQjcI/maxresdefault.jpg',
    pkgs: [{ a: '60 Crystals', p: 0.99 }, { a: '300 Crystals', p: 4.99 }, { a: '980 Crystals', p: 14.99 }, { a: '1980 Crystals', p: 29.99 }],
  },
  {
    id: 19, name: 'Minecraft Java + Bedrock', short: 'MC', cat: 'Gaming',
    desc: 'Full access to Minecraft Java & Bedrock editions. Build, explore and survive.',
    colors: ['#5b8a2d', '#3c5a1a'],
    image: 'https://cdn.shopify.com/s/files/1/0573/3207/2630/files/Minecraft_cardimagesquare_2147da89-ad66-4c38-a939-d4af7bc8c67b_255x@2x.progressive.jpg?v=1760934530',
    pkgs: [{ a: 'Full Game', p: 29.99 }],
  },
  {
    id: 20, name: 'League of Legends RP', short: 'LOL', cat: 'Gaming',
    desc: 'Riot Points for LoL. Buy champions, skins, ward skins and more.',
    colors: ['#c89b3c', '#1e2328'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG1220Ej3aOMeO4fQN2-O-LO4QMsY5dk6xqQ&s',
    badge: 'New', badgeColor: '#10b981',
    pkgs: [{ a: '650 RP', p: 4.99 }, { a: '1380 RP', p: 9.99 }, { a: '2800 RP', p: 19.99 }],
  },
  {
    id: 21, name: 'Call of Duty Points (CP)', short: 'COD', cat: 'Gaming',
    desc: 'CoD Points for Call of Duty. Buy operator bundles, weapon blueprints.',
    colors: ['#1a1a1a', '#ff6600'],
    image: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/12/All-Call-Of-Duty-Games-Spin-Offs-How-Many-Explained.jpg?w=1200&h=675&fit=crop',
    pkgs: [{ a: '500 CP', p: 4.99 }, { a: '1100 CP', p: 9.99 }, { a: '2400 CP', p: 19.99 }, { a: '5000 CP', p: 39.99 }],
  },

  // ── Streaming ───────────────────────────────────────────────────────────────
  {
    id: 30, name: 'Netflix Premium', short: 'NFLX', cat: 'Streaming',
    desc: 'Unlimited movies & TV shows in 4K Ultra HD. Up to 4 screens simultaneously.',
    colors: ['#141414', '#e50914'],
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80',
    badge: 'Hot', badgeColor: '#ef4444',
    pkgs: [{ a: '1 Month', p: 15.49 }, { a: '3 Months', p: 43.99 }, { a: '6 Months', p: 83.99 }],
  },
  {
    id: 31, name: 'Spotify Premium', short: 'SPTFY', cat: 'Streaming',
    desc: 'Ad-free music streaming with unlimited skips. Download and listen offline.',
    colors: ['#191414', '#1db954'],
    image: 'https://cdn.dlcompare.com/game_tetiere/upload/gamecardimage/file/spotify-gift-card-file-ad18bc0a.jpg.webp',
    pkgs: [{ a: '1 Month', p: 9.99 }, { a: '3 Months', p: 26.99 }, { a: '6 Months', p: 49.99 }, { a: '1 Year', p: 89.99 }],
  },
  {
    id: 32, name: 'Disney+ Premium', short: 'DIS+', cat: 'Streaming',
    desc: 'Marvel, Star Wars, Pixar, Disney & Nat Geo — all in one subscription.',
    colors: ['#0b1426', '#113ccf'],
    image: 'https://giftano.com/cdn-cgi/image/width=600,format=auto/https://static-cdn.giftano.com/fls/merchants/disney-plus-2.png',
    pkgs: [{ a: '1 Month', p: 7.99 }, { a: '3 Months', p: 21.99 }, { a: '1 Year', p: 79.99 }],
  },
  {
    id: 33, name: 'YouTube Premium', short: 'YTPREM', cat: 'Streaming',
    desc: 'Ad-free YouTube, background play, offline downloads & YouTube Music included.',
    colors: ['#ff0000', '#800000'],
    image: 'https://jubaly.com/wp-content/uploads/2024/08/Youtube.webp',
    pkgs: [{ a: '1 Month', p: 13.99 }, { a: '3 Months', p: 38.99 }, { a: '1 Year', p: 139.99 }],
  },
  {
    id: 34, name: 'Shahid VIP', short: 'SHAHID', cat: 'Streaming',
    desc: 'Best Arabic content, Ramadan exclusives, movies and live sports in 4K.',
    colors: ['#1a0a3b', '#7b2d8b'],
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrzYWEic4d0WnnRwuyDWC3Kc7q9XSysrDxRMxHF4JoOmA1S7Js71jZoTJuqNVPiPQsSuwikct6EYWsorIhu8R2Kb26aaSVLIKVbBCqSdSSrawvJG-StXuH_Ib4IVFkzNITmD_tYPvqdCFa/s1600/%25D9%2583%25D9%258A%25D9%2581%25D9%258A%25D8%25A9-%25D8%25A7%25D9%2584%25D8%25A5%25D8%25B4%25D8%25AA%25D8%25B1%25D8%25A7%25D9%2583-%25D9%2581%25D9%258A-%25D8%25B4%25D8%25A7%25D9%2587%25D8%25AF-%25D8%25A8%25D9%2584%25D8%25B3.webp',
    pkgs: [{ a: '1 Month', p: 5.99 }, { a: '3 Months', p: 14.99 }, { a: '6 Months', p: 26.99 }, { a: '1 Year', p: 49.99 }],
  },
  {
    id: 35, name: 'Apple TV+', short: 'ATV+', cat: 'Streaming',
    desc: 'Award-winning Apple Originals — series, films, and documentaries.',
    colors: ['#1d1d1f', '#515154'],
    image: 'https://images.macrumors.com/t/NIobPt2xH9eU_DTUcH0_p5Sn8P8=/1600x0/article-new/2025/10/apple-tv-rebrand-icon.jpg',
    pkgs: [{ a: '1 Month', p: 9.99 }, { a: '3 Months', p: 26.99 }, { a: '1 Year', p: 99.99 }],
  },
  {
    id: 36, name: 'Anghami Plus', short: 'ANGH', cat: 'Streaming',
    desc: 'Largest Arabic music streaming. 70M+ songs, ad-free, offline listening.',
    colors: ['#1a1a1a', '#ff5c5c'],
    image: 'https://sudani.sd/wp-content/uploads/2024/12/ANGHAMI-1.jpg',
    pkgs: [{ a: '1 Month', p: 3.99 }, { a: '3 Months', p: 9.99 }, { a: '1 Year', p: 34.99 }],
  },
  {
    id: 37, name: 'Amazon Prime Video', short: 'PRIME', cat: 'Streaming',
    desc: 'Thousands of movies, TV shows and Amazon Originals in Full HD.',
    colors: ['#00a8e0', '#232f3e'],
    image: 'https://sm.pcmag.com/pcmag_au/photo/default/05qp7e8z6g2lm79y6epl0tl-11_6243501_2aqd.jpg',
    pkgs: [{ a: '1 Month', p: 8.99 }, { a: '3 Months', p: 24.99 }, { a: '1 Year', p: 89.99 }],
  },

  // ── Mobile ──────────────────────────────────────────────────────────────────
  {
    id: 40, name: 'STC Recharge (Saudi)', short: 'STC', cat: 'Mobile',
    desc: 'Instant STC prepaid recharge. Calls, SMS and high-speed mobile internet.',
    colors: ['#6a0dad', '#9b59b6'],
    image: 'https://blog.rasseed.com/wp-content/uploads/2022/06/logo-1.webp',
    pkgs: [{ a: '10 SAR', p: 2.7 }, { a: '25 SAR', p: 6.7 }, { a: '50 SAR', p: 13.4 }, { a: '100 SAR', p: 26.7 }],
  },
  {
    id: 41, name: 'Mobily Recharge (Saudi)', short: 'MBL', cat: 'Mobile',
    desc: 'Instant Mobily prepaid top-up. Best 5G network in Saudi Arabia.',
    colors: ['#00843d', '#005428'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHtdD2REznoHIF9pSpzJMi-GtaPhFuunvJEg&s',
    pkgs: [{ a: '10 SAR', p: 2.7 }, { a: '25 SAR', p: 6.7 }, { a: '50 SAR', p: 13.4 }, { a: '100 SAR', p: 26.7 }],
  },
  {
    id: 42, name: 'Zain Recharge (Saudi)', short: 'ZAIN', cat: 'Mobile',
    desc: 'Instant Zain KSA prepaid recharge. Fast connectivity across Saudi Arabia.',
    colors: ['#e4002b', '#8b0000'],
    image: 'https://www.arabictrader.com/cdn/atcop/imgs/caching/135622-%D8%B4%D8%B1%D9%83%D8%A9-%D8%B2%D9%8A%D9%86-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A92-384x255.jpg',
    pkgs: [{ a: '10 SAR', p: 2.7 }, { a: '25 SAR', p: 6.7 }, { a: '50 SAR', p: 13.4 }],
  },
  {
    id: 43, name: 'TikTok Coins', short: 'TKTK', cat: 'Mobile',
    desc: 'Send virtual gifts to your favorite TikTok creators during live streams.',
    colors: ['#010101', '#fe2c55'],
    image: 'https://p16-ttark.tiktokcdn-us.com/tos-useast5-i-1rzkm2vceq-tx/b951e0594d260fcf71a30f13c2af2759.png~tplv-1rzkm2vceq-default:0:0:q75.image',
    pkgs: [{ a: '65 Coins', p: 0.99 }, { a: '330 Coins', p: 4.99 }, { a: '660 Coins', p: 9.99 }, { a: '1321 Coins', p: 19.99 }, { a: '3303 Coins', p: 49.99 }],
  },
  {
    id: 44, name: 'Snapchat+ Subscription', short: 'SNAP+', cat: 'Subscriptions',
    desc: 'Exclusive Snapchat features: custom app icons, story rewatch and more.',
    colors: ['#fffc00', '#ff6600'],
    image: 'https://cdn.salla.sa/WlQEDN/a021b28f-2721-4a0f-92d7-0e237bf1a467-1000x1000-W0IWmkip7NJReABqdyg6xmOcDqwstq74bUAdX6SF.png',
    pkgs: [{ a: '1 Month', p: 3.99 }, { a: '6 Months', p: 21.99 }, { a: '1 Year', p: 39.99 }],
  },

  // ── Subscriptions ───────────────────────────────────────────────────────────
  {
    id: 50, name: 'PlayStation Plus (PS+)', short: 'PS+', cat: 'Gaming',
    desc: 'Free monthly games, online multiplayer access and exclusive member discounts.',
    colors: ['#003087', '#0070d1'],
    image: 'https://static.rapido.com/cms/sites/23/2022/06/14075848/Gift-cards-Dual-Branded.jpg',
    badge: 'Popular', badgeColor: '#f97316',
    pkgs: [{ a: 'Essential 1M', p: 9.99 }, { a: 'Extra 1M', p: 14.99 }, { a: 'Premium 1M', p: 17.99 }, { a: 'Essential 1Y', p: 59.99 }, { a: 'Extra 1Y', p: 99.99 }],
  },
  {
    id: 51, name: 'Microsoft 365 Personal', short: 'M365', cat: 'Subscriptions',
    desc: 'Word, Excel, PowerPoint, Outlook + 1TB OneDrive. Always up to date.',
    colors: ['#d83b01', '#ea6f24'],
    image: 'https://cdn.salla.sa/oRPnp/JgEjU4rhmwSR4qGnzeYF6PMMfsjAbzs7G0B6Nr1w.png',
    pkgs: [{ a: '1 Month', p: 6.99 }, { a: '1 Year', p: 69.99 }],
  },
  {
    id: 52, name: 'iCloud+ Storage', short: 'iCLD', cat: 'Subscriptions',
    desc: 'Secure cloud storage for your photos, videos and documents across all Apple devices.',
    colors: ['#1d1d1f', '#0a84ff'],
    image: 'https://cdn.mos.cms.futurecdn.net/Cdpw6TMsvTS3tPWmYuVXz6.png',
    pkgs: [{ a: '50GB / Mo', p: 0.99 }, { a: '200GB / Mo', p: 2.99 }, { a: '2TB / Mo', p: 9.99 }],
  },
  {
    id: 53, name: 'Google One', short: 'G1', cat: 'Subscriptions',
    desc: 'Extra Google storage shared across Gmail, Drive & Photos. Share with family.',
    colors: ['#4285f4', '#34a853'],
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&q=80',
    pkgs: [{ a: '100GB / Mo', p: 1.99 }, { a: '200GB / Mo', p: 2.99 }, { a: '2TB / Mo', p: 9.99 }],
  },
  {
    id: 54, name: 'Xbox Live Gold', short: 'XBXG', cat: 'Gaming',
    desc: 'Play online multiplayer on Xbox. Free games every month with Games with Gold.',
    colors: ['#107c10', '#005a00'],
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&q=80',
    pkgs: [{ a: '1 Month', p: 9.99 }, { a: '3 Months', p: 24.99 }, { a: '6 Months', p: 39.99 }, { a: '1 Year', p: 59.99 }],
  },

  // ── VPN ─────────────────────────────────────────────────────────────────────
  {
    id: 60, name: 'NordVPN', short: 'NORD', cat: 'VPN',
    desc: 'Ultra-fast VPN with 5500+ servers in 60 countries. Military-grade encryption.',
    colors: ['#4687ff', '#1d3670'],
    image: 'https://images.bfmtv.com/Q4YX8gvxuF8VifRWflGPBgr0Fyo=/0x0:1260x840/1260x0/biz_dev/1666089294586_nordvpn_offre_reseau_mesh_jpg.jpg',
    badge: 'Best VPN', badgeColor: '#7c3aed',
    pkgs: [{ a: '1 Month', p: 11.95 }, { a: '6 Months', p: 53.94 }, { a: '1 Year', p: 59.88 }],
  },
  {
    id: 61, name: 'ExpressVPN', short: 'EXVPN', cat: 'VPN',
    desc: 'Blazing-fast VPN with servers in 160 locations. Best for streaming.',
    colors: ['#da3940', '#6e0004'],
    image: 'https://sm.pcmag.com/pcmag_au/review/e/expressvpn/expressvpn_1nr7.png',
    pkgs: [{ a: '1 Month', p: 12.95 }, { a: '6 Months', p: 59.95 }, { a: '1 Year', p: 99.95 }],
  },
  {
    id: 62, name: 'Surfshark VPN', short: 'SURF', cat: 'VPN',
    desc: 'Unlimited device connections. CleanWeb blocks ads and malware automatically.',
    colors: ['#1c9cde', '#0a4d70'],
    image: 'https://www.iphon.fr/app/uploads/2020/06/surfsharkvpn.jpg',
    pkgs: [{ a: '1 Month', p: 12.95 }, { a: '6 Months', p: 38.94 }, { a: '1 Year', p: 47.88 }],
  },
  {
    id: 63, name: 'Private Internet Access', short: 'PIA', cat: 'VPN',
    desc: '35,000+ servers worldwide. Open-source VPN with strict no-logs policy.',
    colors: ['#4db6ac', '#00695c'],
    image: 'https://weneedprivacy.com/wp-content/uploads/2020/08/Private-Internet-Access-ar-1024x480.jpg',
    pkgs: [{ a: '1 Month', p: 9.95 }, { a: '6 Months', p: 39.95 }, { a: '1 Year', p: 39.95 }],
  },

  // ── Education ───────────────────────────────────────────────────────────────
  {
    id: 70, name: 'Udemy Personal Plan', short: 'UDEMY', cat: 'Education',
    desc: 'Access 12,000+ top courses in tech, business, design, marketing and more.',
    colors: ['#a435f0', '#6d28d9'],
    image: 'https://copartpro.com/wp-content/uploads/2022/10/Tai-khoan-Udemy-Personal-Plan.webp',
    pkgs: [{ a: '1 Month', p: 19.99 }, { a: '1 Year', p: 119.99 }],
  },
  {
    id: 71, name: 'Duolingo Plus', short: 'DUO', cat: 'Education',
    desc: 'Learn any language ad-free. Unlimited hearts, streak repair and offline mode.',
    colors: ['#58cc02', '#46a302'],
    image: 'https://i.insider.com/5a6ba9b8ec1ade774c7f6e9d?width=800&format=jpeg&auto=webp',
    pkgs: [{ a: '1 Month', p: 6.99 }, { a: '1 Year', p: 59.99 }],
  },
  {
    id: 72, name: 'Coursera Plus', short: 'CRS+', cat: 'Education',
    desc: 'Unlimited access to 7,000+ courses from top universities and companies.',
    colors: ['#0056d2', '#003080'],
    image: 'https://adobebazar.com.bd/wp-content/uploads/2025/05/Coursera.png',
    badge: 'New', badgeColor: '#10b981',
    pkgs: [{ a: '1 Month', p: 59.99 }, { a: '1 Year', p: 399.99 }],
  },

  // ── Software ────────────────────────────────────────────────────────────────
  {
    id: 80, name: 'Adobe Creative Cloud', short: 'ADOBE', cat: 'Software',
    desc: 'Photoshop, Illustrator, Premiere Pro and 20+ creative apps. All in one plan.',
    colors: ['#ff0000', '#8b0000'],
    image: 'https://gravitymedia.b-cdn.net/wp-content/uploads/2022/04/Adobe-Creative-Cloud.png',
    badge: 'Pro', badgeColor: '#7c3aed',
    pkgs: [{ a: '1 Month', p: 54.99 }, { a: '1 Year', p: 599.88 }],
  },
  {
    id: 81, name: 'Canva Pro', short: 'CANVA', cat: 'Software',
    desc: 'Professional design tools with 100M+ templates, images and graphics.',
    colors: ['#7d2ae8', '#00c4cc'],
    image: 'https://keysewa.com/wp-content/uploads/2023/05/canva-pro.png',
    pkgs: [{ a: '1 Month', p: 12.99 }, { a: '1 Year', p: 109.99 }],
  },
  {
    id: 82, name: 'Malwarebytes Premium', short: 'MLWB', cat: 'Software',
    desc: 'Real-time protection against malware, ransomware and cyber threats.',
    colors: ['#0085ff', '#0052cc'],
    image: 'https://cdn.salla.sa/KjDbdK/75417751-8da8-486f-b803-e2d81bfc0e6a-1000x801.28205128205-BjX5nKZ54h5PpaExlIWJ32s6dKznV8X1xqh4qq1E.jpg',
    pkgs: [{ a: '1 Device 1Y', p: 39.99 }, { a: '3 Devices 1Y', p: 59.99 }, { a: '5 Devices 1Y', p: 79.99 }],
  },

  // ── Gift Cards إضافية ──────────────────────────────────────────────────────
  {
    id: 90, name: 'Nintendo eShop', short: 'NNTD', cat: 'Gift Cards',
    desc: 'Buy Nintendo Switch games, DLC and in-game content on the eShop.',
    colors: ['#e4000f', '#8b0000'],
    image: 'https://www.cardmafia.com/uploads/gc/gallery/Nintendo-eshop-card-1.jpg',
    badge: 'Popular', badgeColor: '#f97316',
    pkgs: [{ a: '$10', p: 10 }, { a: '$20', p: 20 }, { a: '$35', p: 35 }, { a: '$50', p: 50 }],
  },
  {
    id: 91, name: 'Razer Gold', short: 'RAZR', cat: 'Gift Cards',
    desc: 'Universal gaming currency. Use on 3000+ games and platforms worldwide.',
    colors: ['#00d700', '#1a1a1a'],
    image: 'https://www.razergold.com/content/dam/razer/rg/home/razer-gold-card.jpg',
    pkgs: [{ a: '$5', p: 5 }, { a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }],
  },
  {
    id: 92, name: 'Xbox Gift Card', short: 'XBXG', cat: 'Gift Cards',
    desc: 'Buy games, movies, apps and subscriptions on Xbox and Microsoft Store.',
    colors: ['#107c10', '#0a5009'],
    image: 'https://compass-ssl.xbox.com/assets/e9/ce/e9ceefa0-4f53-4b53-9f0b-f3ca98fc38be.jpg',
    pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  {
    id: 93, name: 'Carrefour Gift Card', short: 'CRFR', cat: 'Gift Cards',
    desc: 'Shop groceries, electronics and home essentials at Carrefour stores.',
    colors: ['#004e9f', '#ee1c25'],
    image: 'https://img.carrefourksa.com/medias/3-Gift-Card.png?context=bWFzdGVyfGltYWdlc3wxMTYwMHxpbWFnZS9wbmd8aDQ0L2g5Yi8xMzIyNzQ3MDYwMjAxNC5wbmd8ZGExNzM2MWQ4YTJlMDFlYjljNTcwNTRjNWY5NmFhMjFiMzk0MDQxYzAzNzJiODEwYTZhOWM4YjBlNjFjY2Q5YQ',
    pkgs: [{ a: '50 SAR', p: 13.5 }, { a: '100 SAR', p: 27 }, { a: '250 SAR', p: 67 }, { a: '500 SAR', p: 133 }],
  },
  {
    id: 94, name: 'Jarir Gift Card', short: 'JARR', cat: 'Gift Cards',
    desc: 'Books, electronics, stationery and tech products at Jarir Bookstore.',
    colors: ['#c8102e', '#8b000b'],
    image: 'https://www.jarirrewards.com/web/image/product.template/2/image_1024',
    pkgs: [{ a: '50 SAR', p: 13.5 }, { a: '100 SAR', p: 27 }, { a: '200 SAR', p: 53 }],
  },
  {
    id: 95, name: 'H&M Gift Card', short: 'HM', cat: 'Gift Cards',
    desc: 'Fashion clothing, accessories and beauty for the whole family at H&M.',
    colors: ['#e50010', '#1a1a1a'],
    image: 'https://lp.hm.com/content/dam/global_campaigns/season_2019/ladies/gift-cards/gift-card-top.jpg',
    pkgs: [{ a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },
  {
    id: 96, name: 'Shein Gift Card', short: 'SHIN', cat: 'Gift Cards',
    desc: 'Trendy fashion at unbeatable prices. Millions of styles for every occasion.',
    colors: ['#000000', '#e91e8c'],
    image: 'https://img.ltwebstatic.com/images3_spmp/2023/04/14/16815076151678457965.webp',
    pkgs: [{ a: '$15', p: 15 }, { a: '$30', p: 30 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }],
  },

  // ── Gaming إضافية ──────────────────────────────────────────────────────────
  {
    id: 100, name: 'Fortnite V-Bucks', short: 'FNVB', cat: 'Gaming',
    desc: 'V-Bucks for Fortnite. Buy outfits, back blings, pickaxes and the Battle Pass.',
    colors: ['#1a78c2', '#9d4dbb'],
    image: 'https://cdn2.unrealengine.com/fortnite-vbucks-large-1920x1080-1920x1080-1d13b36a5cc3.jpg',
    badge: 'Hot', badgeColor: '#ef4444',
    pkgs: [{ a: '1000 V-Bucks', p: 7.99 }, { a: '2800 V-Bucks', p: 19.99 }, { a: '5000 V-Bucks', p: 31.99 }, { a: '13500 V-Bucks', p: 79.99 }],
  },
  {
    id: 101, name: 'Apex Legends Coins', short: 'APEX', cat: 'Gaming',
    desc: 'Apex Coins for Apex Legends. Buy Apex Packs, skins and the Battle Pass.',
    colors: ['#cd3333', '#1a1a1a'],
    image: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/articles/apex-coins-banner.jpg.adapt.1920w.jpg',
    pkgs: [{ a: '1000 Coins', p: 9.99 }, { a: '2150 Coins', p: 19.99 }, { a: '4350 Coins', p: 39.99 }, { a: '6700 Coins', p: 59.99 }],
  },
  {
    id: 102, name: 'FIFA Points (EA FC)', short: 'FIFA', cat: 'Gaming',
    desc: 'FIFA Points for EA FC Ultimate Team. Buy packs and boost your squad.',
    colors: ['#0067b1', '#00285e'],
    image: 'https://media.contentapi.ea.com/content/dam/ea/common/images/2024/07/ea-sports-fc-25-cover-art.jpg.adapt.768w.jpg',
    pkgs: [{ a: '500 Pts', p: 4.99 }, { a: '1050 Pts', p: 9.99 }, { a: '2200 Pts', p: 19.99 }, { a: '4600 Pts', p: 39.99 }, { a: '12000 Pts', p: 99.99 }],
  },
  {
    id: 103, name: 'Honor of Kings Tokens', short: 'HOK', cat: 'Gaming',
    desc: 'Tokens for Honor of Kings. Unlock heroes, skins and exclusive in-game items.',
    colors: ['#c8941a', '#4a1a00'],
    image: 'https://play-lh.googleusercontent.com/OGhRqZqkLCpFJVwCKwFLVJW7BRkEMKcBomJO87N5XF_VjPRFnHTGxKAIeX3W8DllvQ',
    pkgs: [{ a: '60 Tokens', p: 0.99 }, { a: '300 Tokens', p: 4.99 }, { a: '980 Tokens', p: 14.99 }, { a: '1980 Tokens', p: 29.99 }],
  },
  {
    id: 104, name: 'Clash of Clans Gems', short: 'COC', cat: 'Gaming',
    desc: 'Gems for Clash of Clans. Speed up builds, buy resources and unlock Heroes.',
    colors: ['#1a6b1a', '#0a3a0a'],
    image: 'https://www.supercell.com/games/clashofclans/media/hero_images/clash-of-clans.jpg',
    pkgs: [{ a: '80 Gems', p: 0.99 }, { a: '500 Gems', p: 4.99 }, { a: '1200 Gems', p: 9.99 }, { a: '2500 Gems', p: 19.99 }, { a: '6500 Gems', p: 49.99 }],
  },
  {
    id: 105, name: 'Brawl Stars Gems', short: 'BRAW', cat: 'Gaming',
    desc: 'Gems for Brawl Stars. Unlock new Brawlers, skins and the Brawl Pass.',
    colors: ['#2d1b69', '#9b59b6'],
    image: 'https://www.supercell.com/games/brawlstars/media/hero_images/brawl-stars.jpg',
    pkgs: [{ a: '30 Gems', p: 1.99 }, { a: '80 Gems', p: 4.99 }, { a: '170 Gems', p: 9.99 }, { a: '360 Gems', p: 19.99 }, { a: '950 Gems', p: 49.99 }],
  },

  // ── Streaming إضافية ──────────────────────────────────────────────────────
  {
    id: 110, name: 'Hulu Subscription', short: 'HULU', cat: 'Streaming',
    desc: 'Movies, TV shows, Hulu Originals and live TV. Stream on any device.',
    colors: ['#1ce783', '#1a1a1a'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/800px-Hulu_Logo.svg.png',
    pkgs: [{ a: '1 Month', p: 7.99 }, { a: '3 Months', p: 21.99 }, { a: '1 Year', p: 79.99 }],
  },
  {
    id: 111, name: 'Deezer Premium', short: 'DEZR', cat: 'Streaming',
    desc: 'Ad-free music with 90M+ tracks. Flow feature learns your music taste.',
    colors: ['#a238ff', '#611fbe'],
    image: 'https://e-cdns-images.dzcdn.net/images/misc/3e1dbc9e618e2e534459ded22e6a5e87/500x500-000000-80-0-0.jpg',
    pkgs: [{ a: '1 Month', p: 9.99 }, { a: '3 Months', p: 26.99 }, { a: '1 Year', p: 99.99 }],
  },
  {
    id: 112, name: 'Paramount+', short: 'PARA+', cat: 'Streaming',
    desc: 'Exclusive originals, live CBS, UEFA Champions League and more in 4K.',
    colors: ['#0064ff', '#003399'],
    image: 'https://wwwimage-us.pplusstatic.com/thumbnails/photos/w370-q80/cbs_article/2020/05/p-logo-1920x1080.jpg',
    pkgs: [{ a: '1 Month', p: 5.99 }, { a: '3 Months', p: 14.99 }, { a: '1 Year', p: 59.99 }],
  },
  {
    id: 113, name: 'Tidal HiFi', short: 'TIDAL', cat: 'Streaming',
    desc: 'Lossless HiFi music and exclusive artist content. Master quality audio.',
    colors: ['#000000', '#01ffdb'],
    image: 'https://tidal.com/browse/assets/images/homescreen/tidal-logo-og.png',
    pkgs: [{ a: '1 Month', p: 10.99 }, { a: '3 Months', p: 29.99 }, { a: '1 Year', p: 107.88 }],
  },

  // ── VPN إضافية ────────────────────────────────────────────────────────────
  {
    id: 120, name: 'CyberGhost VPN', short: 'CYBG', cat: 'VPN',
    desc: '9000+ servers in 91 countries. Optimized for streaming and gaming.',
    colors: ['#ffcc00', '#1a1a1a'],
    image: 'https://www.cyberghostvpn.com/en_US/cyberghost-images/metadata/social-sharing/cg-share.jpg',
    pkgs: [{ a: '1 Month', p: 12.99 }, { a: '6 Months', p: 41.94 }, { a: '1 Year', p: 47.88 }],
  },
  {
    id: 121, name: 'ProtonVPN Plus', short: 'PRVPN', cat: 'VPN',
    desc: 'Swiss-based VPN with Secure Core servers. No logs, open source audited.',
    colors: ['#6d4aff', '#3d1fa5'],
    image: 'https://protonvpn.com/images/og-image/og-protonvpn.jpg',
    pkgs: [{ a: '1 Month', p: 9.99 }, { a: '1 Year', p: 71.88 }, { a: '2 Years', p: 107.76 }],
  },

  // ── Subscriptions إضافية ──────────────────────────────────────────────────
  {
    id: 130, name: 'Telegram Premium', short: 'TGPREM', cat: 'Subscriptions',
    desc: 'Larger file uploads, faster downloads, exclusive stickers and no ads.',
    colors: ['#2ca5e0', '#1a78a0'],
    image: 'https://telegram.org/img/t_logo.png',
    badge: 'New', badgeColor: '#10b981',
    pkgs: [{ a: '1 Month', p: 4.99 }, { a: '6 Months', p: 26.99 }, { a: '1 Year', p: 47.99 }],
  },
  {
    id: 131, name: 'LinkedIn Premium', short: 'LNKD', cat: 'Subscriptions',
    desc: 'InMail credits, who viewed your profile, course access and job insights.',
    colors: ['#0077b5', '#004471'],
    image: 'https://news.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg',
    pkgs: [{ a: '1 Month Career', p: 29.99 }, { a: '1 Month Business', p: 47.99 }, { a: '1 Year Career', p: 239.99 }],
  },
  {
    id: 132, name: 'Grammarly Premium', short: 'GRAM', cat: 'Subscriptions',
    desc: 'Advanced grammar, spelling, style and tone suggestions. AI writing help.',
    colors: ['#15c39a', '#0a7a60'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Grammarly_logo.svg/1200px-Grammarly_logo.svg.png',
    pkgs: [{ a: '1 Month', p: 29.95 }, { a: '3 Months', p: 59.95 }, { a: '1 Year', p: 139.95 }],
  },

  // ── Software إضافية ──────────────────────────────────────────────────────
  {
    id: 140, name: 'WinRAR License', short: 'WNRAR', cat: 'Software',
    desc: 'Compress, encrypt and manage archives. Supports 50+ formats including RAR5.',
    colors: ['#8b0000', '#4a0000'],
    image: 'https://www.win-rar.com/fileadmin/images/winrar-logo-win.png',
    pkgs: [{ a: '1 License', p: 29.99 }, { a: '2 Licenses', p: 49.99 }, { a: '5 Licenses', p: 99.99 }],
  },
  {
    id: 141, name: 'Wondershare Filmora', short: 'FLMRA', cat: 'Software',
    desc: 'Easy video editing with 1000+ effects, transitions and AI tools.',
    colors: ['#ff6b35', '#c44200'],
    image: 'https://filmora.wondershare.com/images/filmora/filmora-og.jpg',
    pkgs: [{ a: '1 Year', p: 49.99 }, { a: 'Lifetime', p: 79.99 }],
  },
  {
    id: 142, name: 'Kaspersky Total Security', short: 'KASP', cat: 'Software',
    desc: 'Award-winning antivirus, VPN, password manager and parental controls.',
    colors: ['#006d5b', '#003d33'],
    image: 'https://www.kaspersky.com/content/en-global/images/repository/isc/2021/kaspersky-total-security-2021-box.png',
    pkgs: [{ a: '1 Device 1Y', p: 49.99 }, { a: '3 Devices 1Y', p: 69.99 }, { a: '5 Devices 1Y', p: 89.99 }],
  },
  {
    id: 143, name: 'CCleaner Professional', short: 'CCLNR', cat: 'Software',
    desc: 'PC cleaner, optimizer and privacy tool. Remove junk files and boost speed.',
    colors: ['#ff6600', '#cc4400'],
    image: 'https://www.ccleaner.com/assets/imgs/landing-pages/ccleaner-professional-banner.jpg',
    pkgs: [{ a: '1 Year', p: 24.95 }, { a: '2 Years', p: 39.95 }],
  },

  // ── Education إضافية ──────────────────────────────────────────────────────
  {
    id: 150, name: 'Skillshare Premium', short: 'SKSH', cat: 'Education',
    desc: 'Unlimited access to 40,000+ creative, business and tech classes.',
    colors: ['#00e676', '#00c864'],
    image: 'https://static.skillshare.com/uploads/project/09e87fe5285de50fba9399e38c9dfe29/10af4c4c',
    pkgs: [{ a: '1 Month', p: 14.99 }, { a: '1 Year', p: 99.00 }],
  },
  {
    id: 151, name: 'Rosetta Stone', short: 'RSTA', cat: 'Education',
    desc: 'Language immersion with TruAccent speech recognition. 25 languages.',
    colors: ['#005eb8', '#003d7a'],
    image: 'https://assets.rosettastone.com/social/rs-og-image.jpg',
    pkgs: [{ a: '3 Months', p: 35.97 }, { a: '1 Year', p: 95.88 }, { a: 'Lifetime', p: 179.00 }],
  },

  // ── Chat Apps (تصنيف جديد) ────────────────────────────────────────────────
  {
    id: 160, name: 'WhatsApp Business API', short: 'WABIZ', cat: 'Chat Apps',
    desc: 'Official WhatsApp Business API credits for sending messages at scale.',
    colors: ['#25d366', '#128c7e'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png',
    badge: 'New', badgeColor: '#10b981',
    pkgs: [{ a: '100 Credits', p: 4.99 }, { a: '500 Credits', p: 19.99 }, { a: '1000 Credits', p: 34.99 }],
  },
  {
    id: 161, name: 'Discord Nitro', short: 'DCRD', cat: 'Chat Apps',
    desc: 'Custom emoji, animated avatar, server boosts, HD video and 2x file uploads.',
    colors: ['#5865f2', '#3c44b5'],
    image: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_black_RGB.png',
    pkgs: [{ a: '1 Month Classic', p: 2.99 }, { a: '1 Month Nitro', p: 9.99 }, { a: '1 Year Nitro', p: 99.99 }],
  },
  {
    id: 162, name: 'Zoom Pro Plan', short: 'ZOOM', cat: 'Chat Apps',
    desc: 'HD video meetings with 100 participants, 30-hour limit and cloud recording.',
    colors: ['#2d8cff', '#0b5ccc'],
    image: 'https://logos-world.net/wp-content/uploads/2021/03/Zoom-Logo.jpg',
    pkgs: [{ a: '1 Month', p: 15.99 }, { a: '1 Year', p: 149.99 }],
  },
  {
    id: 163, name: 'Slack Pro', short: 'SLCK', cat: 'Chat Apps',
    desc: 'Unlimited message history, app integrations and group calls for teams.',
    colors: ['#4a154b', '#e91e8c'],
    image: 'https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png',
    pkgs: [{ a: '1 Month', p: 7.25 }, { a: '1 Year', p: 87.00 }],
  },
  {
    id: 164, name: 'Microsoft Teams Premium', short: 'TEAMS', cat: 'Chat Apps',
    desc: 'AI-powered meeting summaries, advanced webinars and custom branding.',
    colors: ['#6264a7', '#464775'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/800px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png',
    pkgs: [{ a: '1 Month', p: 7.00 }, { a: '1 Year', p: 60.00 }],
  },
  {
    id: 165, name: 'Viber Out Credits', short: 'VIBR', cat: 'Chat Apps',
    desc: 'Call any mobile or landline worldwide at low rates with Viber Out.',
    colors: ['#7360f2', '#5a4bcc'],
    image: 'https://www.viber.com/app/uploads/viber-logo-new.png',
    pkgs: [{ a: '$5 Credits', p: 5 }, { a: '$10 Credits', p: 10 }, { a: '$25 Credits', p: 25 }],
  },
];