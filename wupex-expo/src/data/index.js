export const COLORS = {
  bg: '#0d0b1e',
  bg2: '#1a1535',
  bg3: '#110d24',
  border: '#2a1f4a',
  primary: '#7c3aed',
  primary2: '#a855f7',
  pink: '#f472b6',
  purple: '#c084fc',
  text: '#f0ecff',
  textMuted: '#8b7ec8',
  textSub: '#e2d9ff',
  green: '#34d399',
  red: '#f87171',
  yellow: '#fbbf24',
  accent: '#a78bfa',
};

export const CATEGORIES = ['All', 'Gift Cards', 'Gaming', 'Streaming', 'Mobile', 'Subscriptions'];

export const PRODUCTS = [
  { id: 1,  name: 'Apple Gift Card',  cat: 'Gift Cards',    colors: ['#ff6b6b', '#ffd93d'], short: 'Gift Card',  desc: 'Apple Gift Cards work in the App Store, iTunes, Apple Books and more.',     pkgs: [{ a: '$15', p: 15 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }] },
  { id: 2,  name: 'Steam',            cat: 'Gaming',        colors: ['#1b2838', '#4a90d9'], short: 'STEAM',      desc: 'Steam Wallet cards add funds to your Steam account for games and DLC.',    pkgs: [{ a: '$10', p: 10 }, { a: '$20', p: 20 }, { a: '$50', p: 50 }, { a: '$100', p: 100 }] },
  { id: 3,  name: 'PUBG UC',          cat: 'Mobile',        colors: ['#c8a84b', '#4a3728'], short: 'PUBG',       desc: 'Unknown Cash (UC) for exclusive outfits and skins in PUBG Mobile.',       pkgs: [{ a: '60 UC', p: 1 }, { a: '300 UC', p: 5 }, { a: '600 UC', p: 10 }, { a: '3600 UC', p: 50 }] },
  { id: 4,  name: 'PlayStation Plus', cat: 'Subscriptions', colors: ['#003087', '#0070d1'], short: 'PS Plus',    desc: 'Online multiplayer, free monthly games and exclusive discounts.',         pkgs: [{ a: '1 Month', p: 9.99 }, { a: '3 Months', p: 24.99 }, { a: '12 Months', p: 59.99 }] },
  { id: 5,  name: 'Google Play',      cat: 'Gift Cards',    colors: ['#11998e', '#38ef7d'], short: 'G-Play',     desc: 'Redeem for apps, games, movies and books on Google Play.',               pkgs: [{ a: '$10', p: 10 }, { a: '$25', p: 25 }, { a: '$50', p: 50 }] },
  { id: 6,  name: 'Netflix',          cat: 'Streaming',     colors: ['#141414', '#e50914'], short: 'NETFLIX',    desc: 'Unlimited movies and TV shows on all your devices, anytime.',            pkgs: [{ a: '1 Month', p: 14.99 }, { a: '3 Months', p: 39.99 }, { a: '6 Months', p: 74.99 }] },
  { id: 7,  name: 'Xbox Game Pass',   cat: 'Subscriptions', colors: ['#0a2e0a', '#107c10'], short: 'XBOX',       desc: 'Access hundreds of high-quality games on Xbox and PC.',                  pkgs: [{ a: '1 Month', p: 14.99 }, { a: '3 Months', p: 39.99 }] },
  { id: 8,  name: 'Fortnite V-Bucks', cat: 'Gaming',        colors: ['#1d4e89', '#7b2fff'], short: 'FORTNITE',   desc: 'Buy skins, emotes and Battle Pass in Fortnite.',                         pkgs: [{ a: '1000 VB', p: 7.99 }, { a: '2800 VB', p: 19.99 }, { a: '5000 VB', p: 31.99 }] },
  { id: 9,  name: 'Minecraft',        cat: 'Gaming',        colors: ['#5d4037', '#8d6e63'], short: 'MINECRAFT',  desc: 'Minecoins for DLC, marketplace items and Bedrock content.',              pkgs: [{ a: '330 Coins', p: 2.99 }, { a: '840 Coins', p: 6.99 }, { a: 'Java Edition', p: 26.95 }] },
  { id: 10, name: 'Twitch',           cat: 'Streaming',     colors: ['#6441a5', '#2a0845'], short: 'twitch',     desc: 'Support your favorite streamers and unlock exclusive emotes.',           pkgs: [{ a: '1 Sub', p: 4.99 }, { a: '3 Subs', p: 14.97 }, { a: 'Gift 5', p: 24.95 }] },
  { id: 11, name: 'Roblox',           cat: 'Mobile',        colors: ['#cc0000', '#ff4444'], short: 'ROBLOX',     desc: 'Robux for avatar items, game passes and premium features.',              pkgs: [{ a: '400 Robux', p: 4.99 }, { a: '800 Robux', p: 9.99 }, { a: '2000 Robux', p: 24.99 }] },
  { id: 12, name: 'Valorant',         cat: 'Gaming',        colors: ['#1a1a1a', '#ff4655'], short: 'VALORANT',   desc: 'VP Points for agents, weapon skins and bundles in Valorant.',           pkgs: [{ a: '475 VP', p: 4.99 }, { a: '1000 VP', p: 9.99 }, { a: '2050 VP', p: 19.99 }] },
  { id: 13, name: 'Nintendo',         cat: 'Gaming',        colors: ['#e4000f', '#ff6b6b'], short: 'Nintendo',   desc: 'Nintendo eShop Cards for games, DLC and Nintendo Switch Online.',        pkgs: [{ a: '$10', p: 10 }, { a: '$20', p: 20 }, { a: '$50', p: 50 }] },
  { id: 14, name: 'Spotify Premium',  cat: 'Streaming',     colors: ['#191414', '#1db954'], short: 'Spotify',    desc: 'Ad-free music, offline listening and unlimited skips.',                  pkgs: [{ a: '1 Month', p: 9.99 }, { a: '3 Months', p: 26.99 }, { a: '12 Months', p: 99.99 }] },
  { id: 15, name: 'Free Fire',        cat: 'Mobile',        colors: ['#1a1a2e', '#f7971e'], short: 'FREE FIRE',  desc: 'Diamonds for skins, characters and exclusive items in Free Fire.',       pkgs: [{ a: '100 💎', p: 1.99 }, { a: '310 💎', p: 5.99 }, { a: '520 💎', p: 9.99 }] },
  { id: 16, name: 'Blizzard',         cat: 'Gaming',        colors: ['#0d2137', '#1a6fb4'], short: 'BLIZZARD',   desc: 'For WoW, Overwatch 2, Hearthstone, Diablo and more Blizzard games.',     pkgs: [{ a: '$10', p: 10 }, { a: '$20', p: 20 }, { a: '$50', p: 50 }] },
  { id: 17, name: 'FC Mobile',        cat: 'Mobile',        colors: ['#0a5c36', '#00e676'], short: 'EA FC25',    desc: 'FC Points for EA FC Mobile to build your ultimate dream team.',          pkgs: [{ a: '100 FCP', p: 1.99 }, { a: '500 FCP', p: 9.99 }, { a: '1000 FCP', p: 19.99 }] },
  { id: 18, name: 'Bigo Live',        cat: 'Mobile',        colors: ['#00c6fb', '#005bea'], short: 'BIGO LIVE',  desc: 'Send diamonds and virtual gifts to your favorite Bigo Live streamers.', pkgs: [{ a: '70 💎', p: 1 }, { a: '350 💎', p: 5 }, { a: '1400 💎', p: 20 }] },
];

export const INITIAL_ORDERS = [
  { id: '#ORD-4821', name: 'Steam Gift Card',    customer: 'Ahmed K.',   date: 'Mar 14', amount: '$25.00',  status: 'completed' },
  { id: '#ORD-4820', name: 'PUBG UC 3600',       customer: 'Sara M.',    date: 'Mar 14', amount: '$49.99',  status: 'completed' },
  { id: '#ORD-4819', name: 'PS Plus 1 Month',    customer: 'Khalid R.',  date: 'Mar 13', amount: '$9.99',   status: 'pending' },
  { id: '#ORD-4818', name: 'Netflix 1 Month',    customer: 'Nora A.',    date: 'Mar 12', amount: '$14.99',  status: 'completed' },
  { id: '#ORD-4817', name: 'Fortnite V-Bucks',   customer: 'Omar F.',    date: 'Mar 11', amount: '$19.99',  status: 'failed' },
  { id: '#ORD-4816', name: 'Apple Gift Card $50',customer: 'Lina S.',    date: 'Mar 10', amount: '$50.00',  status: 'completed' },
  { id: '#ORD-4815', name: 'Xbox Game Pass 3M',  customer: 'Faisal H.',  date: 'Mar 9',  amount: '$44.99',  status: 'pending' },
  { id: '#ORD-4814', name: 'Minecraft Java',     customer: 'Yasmine T.', date: 'Mar 8',  amount: '$26.95',  status: 'completed' },
];

export const INITIAL_TRANSACTIONS = [
  { icon: '💳', name: 'Wallet Top-up',       date: 'Mar 14 · 10:32 AM', amount: '+$500.00', type: 'credit', color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
  { icon: '🎮', name: 'Steam Gift Card x2',  date: 'Mar 13 · 4:15 PM',  amount: '-$50.00',  type: 'debit',  color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
  { icon: '🎯', name: 'PUBG UC 3600',        date: 'Mar 12 · 2:00 PM',  amount: '-$49.99',  type: 'debit',  color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
  { icon: '💵', name: 'Wallet Top-up',       date: 'Mar 10 · 9:00 AM',  amount: '+$200.00', type: 'credit', color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
  { icon: '📺', name: 'Netflix Subscription',date: 'Mar 9 · 6:45 PM',   amount: '-$14.99',  type: 'debit',  color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
  { icon: '🎮', name: 'Xbox Game Pass 3M',   date: 'Mar 8 · 11:20 AM',  amount: '-$44.99',  type: 'debit',  color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
  { icon: '🎁', name: 'Cashback Reward',     date: 'Mar 7 · 12:00 AM',  amount: '+$8.40',   type: 'credit', color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
  { icon: '🍎', name: 'Apple Gift Card $50', date: 'Mar 5 · 3:10 PM',   amount: '-$50.00',  type: 'debit',  color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
];

export const DEMO_USERS = [
  { id: 1, name: 'Admin User',  username: 'admin',        email: 'admin',          password: 'admin123', wallet: 500.00, avatar: 'AD', spent: 0 },
  { id: 2, name: 'Test User',   username: 'user',         email: 'user@test.com',  password: 'user123',  wallet: 0.00,   avatar: 'TU', spent: 0 },
];
