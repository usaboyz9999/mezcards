import React, { createContext, useContext, useState } from 'react';
import { DEMO_USERS, INITIAL_ORDERS, INITIAL_TRANSACTIONS, DARK_COLORS, LIGHT_COLORS, CURRENCIES } from '../data';

const AppContext = createContext();

const TRANSLATIONS = {
  ar: {
    home: 'الرئيسية', products: 'المنتجات', orders: 'الطلبات',
    wallet: 'المحفظة', cart: 'السلة', account: 'حسابي',
    categories: '🗂️ التصنيفات', seeAll: 'عرض الكل ›',
    createOrder: '🛒  إنشاء طلب جديد',
    searchPlaceholder: 'ابحث عن المنتجات...',
    noProducts: 'لا توجد منتجات', noProductsSub: 'جرب بحثاً أو تصنيفاً مختلفاً',
    clearFilter: 'مسح الفلتر ✕', buyNow: 'اشترِ الآن', from: 'من',
    selectPackage: 'اختر الباقة', addToCart: '🛒  أضف للسلة',
    addedToCart: '✓ أُضيف للسلة', continueShopping: 'مواصلة التسوق', viewCart: 'عرض السلة',
    myCart: '🛒 سلتي', cartEmpty: 'السلة فارغة',
    cartEmptySub: 'تصفح المنتجات وأضف عناصر لسلتك.',
    browseProducts: 'تصفح المنتجات', subtotal: 'المجموع',
    vat: 'ضريبة (10%)', total: 'الإجمالي',
    checkout: '✅  الدفع', insufficientBalance: '💰 رصيد غير كافٍ',
    walletBalance: 'رصيد المحفظة', addFunds: '+ إضافة رصيد',
    orderPlaced: '✅ تم تقديم الطلب!',
    orderConfirmed: 'تم تأكيد طلبك.\nسيتم تسليم الأكواد قريباً.',
    backToHome: 'العودة للرئيسية',
    signInRequired: 'يجب تسجيل الدخول', signInToPurchase: 'يرجى تسجيل الدخول لإتمام الشراء.',
    cancel: 'إلغاء', signIn: 'تسجيل الدخول', insufficientMsg: 'رصيدك غير كافٍ',
    totalOrders: 'إجمالي الطلبات', revenue: 'الإيرادات',
    completed: 'مكتمل', pending: 'معلق', failed: 'فاشل',
    recentOrders: '📋 الطلبات الأخيرة', noOrdersYet: 'لا توجد طلبات بعد',
    noOrdersSub: 'ستظهر طلباتك هنا بعد أول عملية شراء',
    availableBalance: 'الرصيد المتاح', accountLabel: 'الحساب',
    withdraw: 'سحب', transfer: 'تحويل',
    transferFunds: 'تحويل الرصيد', transferTo: 'تحويل إلى',
    transferPlaceholder: 'اسم المستخدم أو البريد أو الرقم',
    transferAmount: 'المبلغ', transferConfirm: 'تأكيد التحويل',
    transferSuccess: '✓ تم التحويل', userNotFound: 'المستخدم غير موجود',
    cannotTransferSelf: 'لا يمكن التحويل لنفسك',
    addFundsTitle: '💰 إضافة رصيد للمحفظة',
    amountUSD: 'المبلغ (دولار)', confirmTopup: 'تأكيد الإضافة',
    totalSpent: 'إجمالي الإنفاق', cashback: 'كاشباك',
    recentTransactions: '⚡ المعاملات الأخيرة',
    noTransactionsYet: 'لا توجد معاملات بعد', noTransactionsSub: 'ستظهر معاملاتك هنا',
    invalidAmount: 'مبلغ غير صالح', enterValidAmount: 'أدخل مبلغاً صالحاً.',
    successTopup: '✓ تمت الإضافة بنجاح!',
    guestUser: 'زائر', notSignedIn: 'غير مسجل الدخول',
    signOut: 'تسجيل الخروج', loggedOut: 'تم تسجيل الخروج',
    transactions: 'المعاملات', viewPayments: 'عرض سجل المدفوعات',
    invoice: 'الفاتورة', viewInvoices: 'عرض وتحميل الفواتير',
    settings: 'الإعدادات', appPreferences: 'تفضيلات التطبيق',
    signInToApp: 'تسجيل الدخول إلى Mez-Cards', createAccount: 'إنشاء حساب جديد',
    forgotPassword: 'نسيت كلمة المرور؟', resetPassword: 'إعادة تعيين كلمة المرور',
    forgotPasswordSub: 'أدخل بريدك أو اسم المستخدم', sendResetLink: 'إرسال كود التحقق',
    resetSent: '✓ تم الإرسال', resetSentSub: 'تحقق من بريدك الإلكتروني',
    backToLogin: 'العودة لتسجيل الدخول',
    demoText: 'تجريبي: admin / admin123 ($500)\nأو: user@test.com / user123',
    fullName: 'الاسم الكامل', username: 'اسم المستخدم',
    emailOrUsername: 'البريد أو اسم المستخدم', email: 'البريد الإلكتروني',
    password: 'كلمة المرور', confirmPassword: 'تأكيد كلمة المرور',
    fillAllFields: 'املأ جميع الحقول. كلمة المرور 6 أحرف على الأقل.',
    passwordsNotMatch: 'كلمات المرور غير متطابقة.',
    accountCreated: '✓ تم إنشاء الحساب', canSignIn: 'يمكنك تسجيل الدخول الآن!',
    haveAccount: 'لديك حساب؟ ', noAccount: 'ليس لديك حساب؟ ',
    signInLink: 'سجّل دخولك', signUpLink: 'أنشئ حساباً',
    welcomeBack: 'مرحباً بعودتك 👋', welcomeBackSub: 'سجّل دخولك للمتابعة',
    myAccount: 'حسابي',
    invoice: 'الفاتورة', viewInvoices: 'عرض وتحميل الفواتير',
    noInvoicesYet: 'لا توجد فواتير بعد', noInvoicesSub: 'ستظهر فواتيرك هنا بعد أول طلب',
    accountSection: 'الحساب', profile: 'الملف الشخصي', balance: 'الرصيد',
    appearance: 'المظهر', darkMode: 'الوضع الليلي', lightMode: 'الوضع النهاري',
    language: 'اللغة', currency: 'العملة', selectCurrency: 'اختر العملة',
    notifications: 'الإشعارات', pushNotifications: 'إشعارات الجوال',
    emailAlerts: 'تنبيهات البريد', smsAlerts: 'تنبيهات SMS',
    security: 'الأمان', twoFactorAuth: 'المصادقة الثنائية',
    changePassword: 'تغيير كلمة المرور', oldPassword: 'كلمة المرور القديمة',
    newPassword: 'كلمة المرور الجديدة', confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
    passwordChanged: '✓ تم تغيير كلمة المرور', wrongOldPassword: 'كلمة المرور القديمة غير صحيحة',
    save: 'حفظ', logout: 'تسجيل الخروج',
    switchLanguage: 'Switch to English 🇺🇸',
    signInToView: 'سجّل الدخول لعرض هذه الصفحة',
    signInToViewSub: 'يجب تسجيل الدخول لعرض طلباتك ومعاملاتك',
    loginNow: 'تسجيل الدخول الآن',
    noInvoicesYet: 'لا توجد فواتير بعد',
    noInvoicesSub: 'ستظهر فواتيرك هنا بعد أول طلب',
  },
  en: {
    home: 'Home', products: 'Products', orders: 'Orders',
    wallet: 'Wallet', cart: 'Cart', account: 'Account',
    categories: '🗂️ Categories', seeAll: 'See all ›',
    createOrder: '🛒  Create New Order',
    searchPlaceholder: 'Search products...',
    noProducts: 'No products found', noProductsSub: 'Try a different search or category',
    clearFilter: 'Clear filter ✕', buyNow: 'Buy Now', from: 'from',
    selectPackage: 'SELECT PACKAGE', addToCart: '🛒  Add to Cart',
    addedToCart: '✓ Added to Cart', continueShopping: 'Continue Shopping', viewCart: 'View Cart',
    myCart: '🛒 My Cart', cartEmpty: 'Cart is Empty',
    cartEmptySub: 'Browse products and add items to your cart.',
    browseProducts: 'Browse Products', subtotal: 'Subtotal',
    vat: 'VAT (10%)', total: 'Total',
    checkout: '✅  Checkout', insufficientBalance: '💰 Insufficient Balance',
    walletBalance: 'Wallet Balance', addFunds: '+ Add Funds',
    orderPlaced: '✅ Order Placed!',
    orderConfirmed: 'Your order has been confirmed.\nCodes will be delivered shortly.',
    backToHome: 'Back to Home',
    signInRequired: 'Sign In Required', signInToPurchase: 'Please sign in to complete your purchase.',
    cancel: 'Cancel', signIn: 'Sign In', insufficientMsg: 'Insufficient Balance',
    totalOrders: 'Total Orders', revenue: 'Revenue',
    completed: 'Completed', pending: 'Pending', failed: 'Failed',
    recentOrders: '📋 Recent Orders', noOrdersYet: 'No orders yet',
    noOrdersSub: 'Your orders will appear here after your first purchase',
    availableBalance: 'Available Balance', accountLabel: 'Account',
    withdraw: 'Withdraw', transfer: 'Transfer',
    transferFunds: 'Transfer Funds', transferTo: 'Transfer to',
    transferPlaceholder: 'Username, email or user ID',
    transferAmount: 'Amount', transferConfirm: 'Confirm Transfer',
    transferSuccess: '✓ Transfer Successful', userNotFound: 'User not found',
    cannotTransferSelf: 'Cannot transfer to yourself',
    addFundsTitle: '💰 Add Funds to Wallet',
    amountUSD: 'Amount (USD)', confirmTopup: 'Confirm Top-up',
    totalSpent: 'Total Spent', cashback: 'Cashback',
    recentTransactions: '⚡ Recent Transactions',
    noTransactionsYet: 'No transactions yet', noTransactionsSub: 'Your transactions will appear here',
    invalidAmount: 'Invalid Amount', enterValidAmount: 'Please enter a valid amount.',
    successTopup: '✓ Funds added successfully!',
    guestUser: 'Guest User', notSignedIn: 'Not signed in',
    signOut: 'Sign Out', loggedOut: 'Logged out successfully',
    transactions: 'Transactions', viewPayments: 'View payment history',
    invoice: 'Invoice', viewInvoices: 'View and download invoices',
    settings: 'Settings', appPreferences: 'App preferences & account',
    signInToApp: 'Sign In to Mez-Cards', createAccount: 'Create New Account',
    forgotPassword: 'Forgot Password?', resetPassword: 'Reset Password',
    forgotPasswordSub: 'Enter your email or username', sendResetLink: 'Send Verification Code',
    resetSent: '✓ Sent!', resetSentSub: 'Check your email inbox',
    backToLogin: 'Back to Login',
    demoText: 'Demo: admin / admin123 ($500)\nOr: user@test.com / user123',
    fullName: 'Full Name', username: 'Username',
    emailOrUsername: 'Email or Username', email: 'Email Address',
    password: 'Password', confirmPassword: 'Confirm Password',
    fillAllFields: 'Fill all fields. Password min 6 chars.',
    passwordsNotMatch: 'Passwords do not match.',
    accountCreated: '✓ Account Created', canSignIn: 'You can now sign in!',
    haveAccount: 'Already have an account? ', noAccount: "Don't have an account? ",
    signInLink: 'Sign In', signUpLink: 'Sign Up',
    welcomeBack: 'Welcome Back 👋', welcomeBackSub: 'Sign in to continue',
    myAccount: 'My Account',
    noInvoicesYet: 'No invoices yet', noInvoicesSub: 'Your invoices will appear here after your first order',
    accountSection: 'ACCOUNT', profile: 'Profile', balance: 'Balance',
    appearance: 'APPEARANCE', darkMode: 'Dark Mode', lightMode: 'Light Mode',
    language: 'Language', currency: 'Currency', selectCurrency: 'Select Currency',
    notifications: 'NOTIFICATIONS', pushNotifications: 'Push Notifications',
    emailAlerts: 'Email Alerts', smsAlerts: 'SMS Alerts',
    security: 'SECURITY', twoFactorAuth: 'Two-Factor Auth',
    changePassword: 'Change Password', oldPassword: 'Current Password',
    newPassword: 'New Password', confirmNewPassword: 'Confirm New Password',
    passwordChanged: '✓ Password changed successfully', wrongOldPassword: 'Current password is incorrect',
    save: 'Save', logout: 'Logout',
    switchLanguage: 'التبديل للعربية 🇸🇦',
    signInToView: 'Sign In to View This Page',
    signInToViewSub: 'You must be signed in to view your orders and transactions',
    loginNow: 'Login Now',
  },
};

const ADMIN_ID = 1;

export function AppProvider({ children }) {
  const [users, setUsers] = useState(DEMO_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [language, setLanguage] = useState('ar');
  const [isDark, setIsDark] = useState(true);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [pendingOTP, setPendingOTP] = useState(null);

  // Per-user data — only admin has initial data, others start empty
  const [userOrders, setUserOrders] = useState({ [ADMIN_ID]: INITIAL_ORDERS });
  const [userTransactions, setUserTransactions] = useState({ [ADMIN_ID]: INITIAL_TRANSACTIONS });
  const [userInvoices, setUserInvoices] = useState({ [ADMIN_ID]: [
    { id: '#INV-2024-0042', date: '14 Mar 2024', amount: '$149.97', status: 'paid' }
  ]});

  const t = (key) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  const isRTL = language === 'ar';
  const toggleLanguage = () => setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  const toggleDarkMode = () => setIsDark(prev => !prev);
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  const orders = currentUser ? (userOrders[currentUser.id] || []) : [];
  const transactions = currentUser ? (userTransactions[currentUser.id] || []) : [];
  const invoices = currentUser ? (userInvoices[currentUser.id] || []) : [];

  const login = (emailOrUser, password) => {
    const user = users.find(u => (u.email === emailOrUser || u.username === emailOrUser) && u.password === password);
    if (user) { setCurrentUser({ ...user }); return { success: true }; }
    return { success: false, error: isRTL ? 'بيانات الدخول غير صحيحة.' : 'Invalid credentials.' };
  };

  const register = (name, username, email, password) => {
    const exists = users.find(u => u.email === email || u.username === username);
    if (exists) return { success: false, error: isRTL ? 'البريد أو اسم المستخدم موجود مسبقاً.' : 'Email or username already exists.' };
    const newUser = { id: users.length + 100, name, username, email, password, wallet: 0, avatar: name.substring(0, 2).toUpperCase(), spent: 0 };
    setUsers(prev => [...prev, newUser]);
    setUserOrders(prev => ({ ...prev, [newUser.id]: [] }));
    setUserTransactions(prev => ({ ...prev, [newUser.id]: [] }));
    setUserInvoices(prev => ({ ...prev, [newUser.id]: [] }));
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  const changePassword = (oldPass, newPass) => {
    if (!currentUser) return { success: false };
    if (currentUser.password !== oldPass) return { success: false, error: t('wrongOldPassword') };
    const updated = { ...currentUser, password: newPass };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, password: newPass } : u));
    return { success: true };
  };

  const requestPasswordReset = (emailOrUsername) => {
    const user = users.find(u => u.email === emailOrUsername || u.username === emailOrUsername);
    if (!user) return { success: false, error: isRTL ? 'البريد أو اسم المستخدم غير موجود.' : 'Email or username not found.' };
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 10 * 60 * 1000;
    setPendingOTP({ email: user.email, userId: user.id, code, expiresAt });
    return { success: true, email: user.email, code };
  };

  const verifyOTPAndReset = (inputCode, newPassword) => {
    if (!pendingOTP) return { success: false, error: isRTL ? 'انتهت الجلسة.' : 'Session expired.' };
    if (Date.now() > pendingOTP.expiresAt) { setPendingOTP(null); return { success: false, error: isRTL ? 'انتهت صلاحية الكود.' : 'Code expired.' }; }
    if (inputCode.trim() !== pendingOTP.code) return { success: false, error: isRTL ? 'الكود غير صحيح.' : 'Incorrect code.' };
    if (newPassword) {
      setUsers(prev => prev.map(u => u.id === pendingOTP.userId ? { ...u, password: newPassword } : u));
      setPendingOTP(null);
      return { success: true };
    }
    return { success: true }; // code verified, ready for new password
  };

  // ─── Transfer Funds ─────────────────────────────────────────────────────────
  const transferFunds = (targetIdentifier, amount) => {
    if (!currentUser) return { success: false, error: t('signInRequired') };
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return { success: false, error: t('enterValidAmount') };
    if (currentUser.wallet < amt) return { success: false, error: t('insufficientMsg') };

    // Find target user by id, username, or email
    const target = users.find(u =>
      String(u.id) === String(targetIdentifier) ||
      u.username === targetIdentifier ||
      u.email === targetIdentifier
    );
    if (!target) return { success: false, error: t('userNotFound') };
    if (target.id === currentUser.id) return { success: false, error: t('cannotTransferSelf') };

    const monthsAr = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const dateStr = language === 'ar' ? `${now.getDate()} ${monthsAr[now.getMonth()]}` : `${monthsEn[now.getMonth()]} ${now.getDate()}`;

    // Debit sender
    setCurrentUser(prev => ({ ...prev, wallet: prev.wallet - amt }));
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) return { ...u, wallet: u.wallet - amt };
      if (u.id === target.id) return { ...u, wallet: u.wallet + amt };
      return u;
    }));

    // Sender transaction
    setUserTransactions(prev => ({
      ...prev,
      [currentUser.id]: [{
        icon: '↗️',
        name: language === 'ar' ? `تحويل إلى ${target.name}` : `Transfer to ${target.name}`,
        date: dateStr, amount: `-$${amt.toFixed(2)}`,
        type: 'debit', color: '#f87171', bg: 'rgba(248,113,113,0.15)',
      }, ...(prev[currentUser.id] || [])],
      [target.id]: [{
        icon: '↙️',
        name: language === 'ar' ? `تحويل من ${currentUser.name}` : `Transfer from ${currentUser.name}`,
        date: dateStr, amount: `+$${amt.toFixed(2)}`,
        type: 'credit', color: '#34d399', bg: 'rgba(52,211,153,0.15)',
      }, ...(prev[target.id] || [])],
    }));

    return { success: true, targetName: target.name, amount: amt };
  };

  const addToCart = (product, pkgIndex) => {
    const pkg = product.pkgs[pkgIndex];
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id && i.pkgIndex === pkgIndex);
      if (existing) return prev.map(i => i.productId === product.id && i.pkgIndex === pkgIndex ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { productId: product.id, pkgIndex, qty: 1, name: product.name, pkg: pkg.a, price: pkg.p, colors: product.colors, short: product.short }];
    });
  };

  const removeFromCart = (productId, pkgIndex) => setCart(prev => prev.filter(i => !(i.productId === productId && i.pkgIndex === pkgIndex)));
  const clearCart = () => setCart([]);

  const checkout = () => {
    if (!currentUser) return { success: false, error: t('signInRequired') };
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const total = subtotal * 1.1;
    if (currentUser.wallet < total) return { success: false, error: t('insufficientMsg') };

    const monthsAr = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const dateStr = language === 'ar' ? `${now.getDate()} ${monthsAr[now.getMonth()]}` : `${monthsEn[now.getMonth()]} ${now.getDate()}`;
    const invId = `#INV-${now.getFullYear()}-${String(Math.floor(Math.random() * 9000 + 1000))}`;
    const uid = currentUser.id;

    const newOrders = cart.map(item => ({
      id: `#ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: `${item.name} (${item.pkg})`, customer: currentUser.name,
      date: dateStr, amount: `$${(item.price * item.qty).toFixed(2)}`, status: 'completed',
    }));

    const newTrans = cart.map(item => ({
      icon: '🎮', name: `${item.name} ${item.pkg}`, date: dateStr,
      amount: `-$${(item.price * item.qty).toFixed(2)}`, type: 'debit', color: '#f87171', bg: 'rgba(248,113,113,0.15)',
    }));

    const newInvoice = { id: invId, date: dateStr, amount: `$${total.toFixed(2)}`, status: 'paid', items: cart.map(i => ({ name: `${i.name} ${i.pkg} ×${i.qty}`, amount: `$${(i.price * i.qty).toFixed(2)}` })) };

    setUserOrders(prev => ({ ...prev, [uid]: [...newOrders, ...(prev[uid] || [])] }));
    setUserTransactions(prev => ({ ...prev, [uid]: [...newTrans, ...(prev[uid] || [])] }));
    setUserInvoices(prev => ({ ...prev, [uid]: [newInvoice, ...(prev[uid] || [])] }));
    setCurrentUser(prev => ({ ...prev, wallet: prev.wallet - total, spent: prev.spent + total }));
    setUsers(prev => prev.map(u => u.id === uid ? { ...u, wallet: u.wallet - total, spent: u.spent + total } : u));
    setCart([]);
    return { success: true, total };
  };

  const addFunds = (amount) => {
    if (!currentUser) return;
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    const uid = currentUser.id;
    const monthsAr = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const dateStr = language === 'ar' ? `${now.getDate()} ${monthsAr[now.getMonth()]}` : `${monthsEn[now.getMonth()]} ${now.getDate()}`;
    setCurrentUser(prev => ({ ...prev, wallet: prev.wallet + amt }));
    setUsers(prev => prev.map(u => u.id === uid ? { ...u, wallet: u.wallet + amt } : u));
    setUserTransactions(prev => ({
      ...prev,
      [uid]: [{ icon: '💳', name: language === 'ar' ? 'شحن المحفظة' : 'Wallet Top-up', date: dateStr, amount: `+$${amt.toFixed(2)}`, type: 'credit', color: '#34d399', bg: 'rgba(52,211,153,0.15)' }, ...(prev[uid] || [])],
    }));
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0) * 1.1;

  return (
    <AppContext.Provider value={{
      currentUser, cart, orders, transactions, invoices, cartCount, cartTotal,
      language, isRTL, t, toggleLanguage,
      isDark, toggleDarkMode, colors,
      currency, setCurrency, currencies: CURRENCIES,
      login, register, logout, changePassword,
      requestPasswordReset, verifyOTPAndReset,
      transferFunds,
      addToCart, removeFromCart, clearCart, checkout, addFunds,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);