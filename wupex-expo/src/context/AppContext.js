import React, { createContext, useContext, useState } from 'react';
import { DEMO_USERS, INITIAL_ORDERS, INITIAL_TRANSACTIONS } from '../data';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState(DEMO_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const login = (emailOrUser, password) => {
    const user = users.find(
      u => (u.email === emailOrUser || u.username === emailOrUser) && u.password === password
    );
    if (user) { setCurrentUser({ ...user }); return { success: true }; }
    return { success: false, error: 'Invalid email or password.' };
  };

  const register = (name, username, email, password) => {
    const exists = users.find(u => u.email === email || u.username === username);
    if (exists) return { success: false, error: 'Email or username already exists.' };
    const newUser = { id: users.length + 1, name, username, email, password, wallet: 0, avatar: name.substring(0, 2).toUpperCase(), spent: 0 };
    setUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  const addToCart = (product, pkgIndex) => {
    const pkg = product.pkgs[pkgIndex];
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id && i.pkgIndex === pkgIndex);
      if (existing) return prev.map(i => i.productId === product.id && i.pkgIndex === pkgIndex ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { productId: product.id, pkgIndex, qty: 1, name: product.name, pkg: pkg.a, price: pkg.p, colors: product.colors, short: product.short }];
    });
  };

  const removeFromCart = (productId, pkgIndex) => {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.pkgIndex === pkgIndex)));
  };

  const clearCart = () => setCart([]);

  const checkout = () => {
    if (!currentUser) return { success: false, error: 'Please sign in.' };
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const total = subtotal * 1.1;
    if (currentUser.wallet < total) return { success: false, error: 'Insufficient balance.' };

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}`;

    const newOrders = cart.map(item => ({
      id: `#ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: `${item.name} (${item.pkg})`,
      customer: currentUser.name,
      date: dateStr,
      amount: `$${(item.price * item.qty).toFixed(2)}`,
      status: 'completed',
    }));

    const newTrans = cart.map(item => ({
      icon: '🎮', name: `${item.name} ${item.pkg}`, date: dateStr,
      amount: `-$${(item.price * item.qty).toFixed(2)}`, type: 'debit',
      color: '#f87171', bg: 'rgba(248,113,113,0.15)',
    }));

    setOrders(prev => [...newOrders, ...prev]);
    setTransactions(prev => [...newTrans, ...prev]);
    setCurrentUser(prev => ({ ...prev, wallet: prev.wallet - total, spent: prev.spent + total }));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, wallet: u.wallet - total, spent: u.spent + total } : u));
    setCart([]);
    return { success: true, total };
  };

  const addFunds = (amount) => {
    if (!currentUser) return;
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    setCurrentUser(prev => ({ ...prev, wallet: prev.wallet + amt }));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, wallet: u.wallet + amt } : u));
    setTransactions(prev => [{ icon: '💳', name: 'Wallet Top-up', date: 'Today', amount: `+$${amt.toFixed(2)}`, type: 'credit', color: '#34d399', bg: 'rgba(52,211,153,0.15)' }, ...prev]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0) * 1.1;

  return (
    <AppContext.Provider value={{ currentUser, cart, orders, transactions, cartCount, cartTotal, login, register, logout, addToCart, removeFromCart, clearCart, checkout, addFunds }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
