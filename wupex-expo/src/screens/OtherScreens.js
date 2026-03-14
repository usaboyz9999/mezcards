import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../data';
import { useApp } from '../context/AppContext';

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export function OrdersScreen() {
  const { orders } = useApp();
  const completed = orders.filter(o => o.status === 'completed').length;

  const statusStyle = (s) => ({
    backgroundColor: s === 'completed' ? 'rgba(52,211,153,0.15)' : s === 'pending' ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)',
    color: s === 'completed' ? '#34d399' : s === 'pending' ? '#fbbf24' : '#f87171',
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.statsGrid}>
        {[
          { label: 'Total Orders', value: orders.length, change: '▲ 12%', up: true },
          { label: 'Revenue',      value: '$48.2K',       change: '▲ 22%', up: true },
          { label: 'Completed',    value: completed,      change: '▲ 8%',  up: true },
          { label: 'Pending',      value: '134',          change: '▼ 3%',  up: false },
        ].map((s, i) => (
          <View key={i} style={styles.statCard}>
            <Text style={styles.statLabel}>{s.label}</Text>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={[styles.statChange, { color: s.up ? COLORS.green : COLORS.red }]}>{s.change}</Text>
          </View>
        ))}
      </View>
      <View style={styles.sectionRow}><Text style={styles.sectionTitle}>📋 Recent Orders</Text></View>
      {orders.map((o, i) => {
        const st = statusStyle(o.status);
        return (
          <View key={i} style={styles.orderItem}>
            <View style={styles.orderTop}>
              <Text style={styles.orderId}>{o.id}</Text>
              <View style={[styles.badge, { backgroundColor: st.backgroundColor }]}>
                <Text style={[styles.badgeText, { color: st.color }]}>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</Text>
              </View>
            </View>
            <Text style={styles.orderName}>{o.name}</Text>
            <View style={styles.orderBottom}>
              <Text style={styles.orderCustomer}>{o.customer} · {o.date}</Text>
              <Text style={styles.orderAmount}>{o.amount}</Text>
            </View>
          </View>
        );
      })}
      <View style={{ height: 16 }} />
    </ScrollView>
  );
}

// ─── WALLET ──────────────────────────────────────────────────────────────────
export function WalletScreen({ navigation }) {
  const { currentUser, addFunds, transactions } = useApp();
  const [showTopup, setShowTopup] = useState(false);
  const [amount, setAmount] = useState('');

  const handleTopup = () => {
    if (!currentUser) { Alert.alert('Sign In Required', 'Please sign in first.'); return; }
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { Alert.alert('Invalid Amount', 'Please enter a valid amount.'); return; }
    addFunds(amount);
    setAmount('');
    setShowTopup(false);
    Alert.alert('✓ Success', `$${amt.toFixed(2)} added to your wallet!`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#4c1d95', '#7c3aed', '#9333ea']} style={styles.walletCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.walLabel}>Available Balance</Text>
        <Text style={styles.walBalance}>${currentUser ? currentUser.wallet.toFixed(2) : '0.00'}</Text>
        <Text style={styles.walUser}>Account: {currentUser ? currentUser.name : 'Guest'}</Text>
        <View style={styles.walBtns}>
          <TouchableOpacity style={styles.walBtnP} onPress={() => { if (!currentUser) { Alert.alert('Sign In Required', 'Please sign in first.'); return; } setShowTopup(!showTopup); }}>
            <Text style={styles.walBtnPText}>+ Add Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.walBtnS}><Text style={styles.walBtnSText}>Withdraw</Text></TouchableOpacity>
          <TouchableOpacity style={styles.walBtnS}><Text style={styles.walBtnSText}>Transfer</Text></TouchableOpacity>
        </View>
        <View style={[styles.walBubble, { width: 120, height: 120, top: -30, right: -30 }]} />
        <View style={[styles.walBubble, { width: 80, height: 80, bottom: -20, right: 90 }]} />
      </LinearGradient>

      {showTopup && (
        <View style={styles.topupBox}>
          <Text style={styles.topupTitle}>💰 Add Funds to Wallet</Text>
          <Text style={styles.inputLabel}>Amount (USD)</Text>
          <TextInput style={styles.textInput} placeholder="e.g. 50" placeholderTextColor={COLORS.textMuted} value={amount} onChangeText={setAmount} keyboardType="numeric" />
          <TouchableOpacity onPress={handleTopup}>
            <LinearGradient colors={[COLORS.primary, COLORS.primary2]} style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>Confirm Top-up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.statsGrid}>
        {[
          { label: 'Total Spent',  value: `$${currentUser ? currentUser.spent.toFixed(0) : '0'}`, change: '▲ Month', up: true },
          { label: 'Cashback',     value: '$84.20', change: '▲ 5%', up: true },
        ].map((s, i) => (
          <View key={i} style={styles.statCard}><Text style={styles.statLabel}>{s.label}</Text><Text style={styles.statValue}>{s.value}</Text><Text style={[styles.statChange, { color: COLORS.green }]}>{s.change}</Text></View>
        ))}
      </View>

      <View style={styles.sectionRow}><Text style={styles.sectionTitle}>⚡ Recent Transactions</Text></View>
      {transactions.slice(0, 5).map((t, i) => (
        <View key={i} style={styles.transItem}>
          <View style={[styles.transIcon, { backgroundColor: t.bg }]}><Text style={{ fontSize: 17 }}>{t.icon}</Text></View>
          <View style={styles.transInfo}><Text style={styles.transName}>{t.name}</Text><Text style={styles.transDate}>{t.date}</Text></View>
          <Text style={[styles.transAmount, { color: t.color }]}>{t.amount}</Text>
        </View>
      ))}
      <View style={{ height: 16 }} />
    </ScrollView>
  );
}

// ─── MORE ─────────────────────────────────────────────────────────────────────
export function MoreScreen({ navigation }) {
  const { currentUser, transactions, logout } = useApp();
  const [loginModal, setLoginModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useApp();

  const handleLogin = () => {
    setError('');
    const result = login(email.trim(), password.trim());
    if (result.success) { setLoginModal(false); setEmail(''); setPassword(''); }
    else setError(result.error);
  };

  const handleRegister = () => {
    setError('');
    if (!name || !username || !email || password.length < 6) { setError('Fill all fields. Password min 6 chars.'); return; }
    if (password !== confirmPass) { setError('Passwords do not match.'); return; }
    const result = register(name.trim(), username.trim(), email.trim(), password.trim());
    if (result.success) { setIsRegister(false); setError(''); Alert.alert('✓ Account Created', 'You can now sign in!'); }
    else setError(result.error);
  };

  const menuItems = [
    { icon: '⚡', title: 'Transactions',  sub: 'View payment history',      onPress: () => navigation.navigate('Transactions'), bg: 'rgba(124,58,237,0.2)' },
    { icon: '🔍', title: 'Check Codes',   sub: 'Verify gift card codes',    onPress: () => navigation.navigate('CheckCodes'),   bg: 'rgba(52,211,153,0.15)' },
    { icon: '📄', title: 'Invoice',       sub: 'View and download invoices',onPress: () => navigation.navigate('Invoice'),       bg: 'rgba(251,191,36,0.15)' },
    { icon: '⚙️', title: 'Settings',      sub: 'App preferences & account', onPress: () => navigation.navigate('Settings'),      bg: 'rgba(248,113,113,0.15)' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <LinearGradient colors={currentUser ? [COLORS.primary, COLORS.primary2] : ['#2a1f4a', '#1a1535']} style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{currentUser ? currentUser.avatar : '👤'}</Text>
        </LinearGradient>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{currentUser ? currentUser.name : 'Guest User'}</Text>
          <Text style={styles.profileEmail}>{currentUser ? currentUser.email : 'Not signed in'}</Text>
        </View>
        {!currentUser
          ? <TouchableOpacity style={styles.signInBtn} onPress={() => setLoginModal(true)}><Text style={styles.signInBtnText}>Sign In</Text></TouchableOpacity>
          : <TouchableOpacity style={styles.signOutBtn} onPress={() => { logout(); Alert.alert('Logged out successfully'); }}><Text style={styles.signOutBtnText}>Sign Out</Text></TouchableOpacity>
        }
      </View>

      {menuItems.map((m, i) => (
        <TouchableOpacity key={i} style={styles.menuItem} onPress={m.onPress}>
          <View style={[styles.menuIcon, { backgroundColor: m.bg }]}><Text style={{ fontSize: 18 }}>{m.icon}</Text></View>
          <View style={styles.menuText}><Text style={styles.menuTitle}>{m.title}</Text><Text style={styles.menuSub}>{m.sub}</Text></View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      ))}
      <View style={{ height: 16 }} />

      {/* Login Modal */}
      <Modal visible={loginModal} transparent animationType="slide" onRequestClose={() => setLoginModal(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setLoginModal(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalBox} onPress={() => {}}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{isRegister ? 'Create Account' : 'Sign In to Wupex'}</Text>

            {!isRegister && (
              <View style={styles.demoBox}>
                <Text style={styles.demoText}><Text style={{ color: COLORS.text, fontWeight: '700' }}>Demo: </Text>admin / admin123 ($500 wallet){'\n'}<Text style={{ color: COLORS.text, fontWeight: '700' }}>Or: </Text>user@test.com / user123</Text>
              </View>
            )}

            {error ? <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View> : null}

            {isRegister && <>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput style={styles.textInput} placeholder="Full name" placeholderTextColor={COLORS.textMuted} value={name} onChangeText={setName} />
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput style={styles.textInput} placeholder="Choose username" placeholderTextColor={COLORS.textMuted} value={username} onChangeText={setUsername} autoCapitalize="none" />
            </>}

            <Text style={styles.inputLabel}>Email or Username</Text>
            <TextInput style={styles.textInput} placeholder="Enter email or username" placeholderTextColor={COLORS.textMuted} value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput style={styles.textInput} placeholder={isRegister ? 'Min 6 characters' : 'Enter password'} placeholderTextColor={COLORS.textMuted} value={password} onChangeText={setPassword} secureTextEntry />

            {isRegister && <>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput style={styles.textInput} placeholder="Repeat password" placeholderTextColor={COLORS.textMuted} value={confirmPass} onChangeText={setConfirmPass} secureTextEntry />
            </>}

            <TouchableOpacity onPress={isRegister ? handleRegister : handleLogin}>
              <LinearGradient colors={[COLORS.primary, COLORS.primary2]} style={styles.modalBtn}>
                <Text style={styles.modalBtnText}>{isRegister ? 'Create Account' : 'Sign In'}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setIsRegister(!isRegister); setError(''); }} style={styles.switchLink}>
              <Text style={styles.switchText}>{isRegister ? 'Already have an account? ' : "Don't have an account? "}<Text style={{ color: COLORS.accent }}>{isRegister ? 'Sign In' : 'Sign Up'}</Text></Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

// ─── TRANSACTIONS ──────────────────────────────────────────────────────────
export function TransactionsScreen() {
  const { transactions } = useApp();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 14 }}>
      {transactions.map((t, i) => (
        <View key={i} style={styles.transItem}>
          <View style={[styles.transIcon, { backgroundColor: t.bg }]}><Text style={{ fontSize: 17 }}>{t.icon}</Text></View>
          <View style={styles.transInfo}><Text style={styles.transName}>{t.name}</Text><Text style={styles.transDate}>{t.date}</Text></View>
          <Text style={[styles.transAmount, { color: t.color }]}>{t.amount}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── CHECK CODES ──────────────────────────────────────────────────────────
export function CheckCodesScreen() {
  const [result, setResult] = useState(false);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 14 }}>
      <Text style={styles.inputLabel}>Product Type</Text>
      <View style={styles.pickerWrap}><Text style={styles.pickerText}>Steam Gift Card</Text></View>
      <Text style={styles.inputLabel}>Code / Serial Number</Text>
      <TextInput style={styles.textInput} placeholder="XXXXX-XXXXX-XXXXX" placeholderTextColor={COLORS.textMuted} />
      <Text style={styles.inputLabel}>Region</Text>
      <View style={styles.pickerWrap}><Text style={styles.pickerText}>Saudi Arabia</Text></View>
      <TouchableOpacity onPress={() => setResult(true)}>
        <LinearGradient colors={[COLORS.primary, COLORS.primary2]} style={styles.confirmBtn}>
          <Text style={styles.confirmBtnText}>✓ Check Code Validity</Text>
        </LinearGradient>
      </TouchableOpacity>
      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultOk}>✓ Valid Code</Text>
          <Text style={styles.resultInfo}>Balance: $25.00{'\n'}Region: Saudi Arabia{'\n'}Expires: December 2026{'\n'}Status: Unused</Text>
        </View>
      )}
    </ScrollView>
  );
}

// ─── INVOICE ──────────────────────────────────────────────────────────────
export function InvoiceScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 14 }}>
      <View style={styles.invCard}>
        <View style={styles.invTop}>
          <View><Text style={styles.invTitle}>Invoice #INV-2024-0042</Text><Text style={styles.invSub}>Issued: March 14, 2024 · Due: March 28</Text></View>
          <View style={[styles.badge, { backgroundColor: 'rgba(52,211,153,0.15)' }]}><Text style={[styles.badgeText, { color: COLORS.green }]}>PAID</Text></View>
        </View>
        <Text style={styles.invBillLabel}>Bill To:</Text>
        <Text style={styles.invBillTo}>Ahmed Al-Rashidi</Text>
        <Text style={styles.invAmount}>$149.97</Text>
        {[['Steam Gift Card × 2', '$50.00'], ['PUBG UC 3600', '$49.99'], ['PlayStation Plus 3M', '$29.99'], ['Twitch Subscription', '$9.99'], ['VAT (10%)', '$13.99'], ['Discount', '-$4.00']].map(([k, v], i) => (
          <View key={i} style={styles.invRow}><Text style={styles.invK}>{k}</Text><Text style={[styles.invV, k === 'Discount' && { color: COLORS.green }]}>{v}</Text></View>
        ))}
        <View style={styles.invTotalRow}><Text style={styles.invTotalLabel}>Total</Text><Text style={styles.invTotalValue}>$149.97</Text></View>
        <TouchableOpacity>
          <LinearGradient colors={[COLORS.primary, COLORS.primary2]} style={styles.confirmBtn}><Text style={styles.confirmBtnText}>📥 Download PDF</Text></LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ─── SETTINGS ──────────────────────────────────────────────────────────────
export function SettingsScreen() {
  const { currentUser, logout } = useApp();
  const [toggles, setToggles] = useState({ dark: true, push: true, email: true, sms: false, twofa: false });
  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const ToggleRow = ({ icon, label, tKey }) => (
    <View style={styles.settingRow}>
      <Text style={styles.settingIcon}>{icon}</Text>
      <Text style={styles.settingLabel}>{label}</Text>
      <TouchableOpacity style={[styles.toggle, toggles[tKey] && styles.toggleOn]} onPress={() => toggle(tKey)}>
        <View style={[styles.toggleThumb, toggles[tKey] && styles.toggleThumbOn]} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 14 }}>
      {currentUser && (
        <>
          <Text style={styles.groupLabel}>ACCOUNT</Text>
          <View style={styles.settingGroup}>
            <View style={styles.settingRow}><Text style={styles.settingIcon}>👤</Text><Text style={styles.settingLabel}>Profile: <Text style={{ color: COLORS.accent }}>{currentUser.username}</Text></Text></View>
            <View style={[styles.settingRow, { borderBottomWidth: 0 }]}><Text style={styles.settingIcon}>💰</Text><Text style={styles.settingLabel}>Balance</Text><Text style={styles.settingRight}>${currentUser.wallet.toFixed(2)}</Text></View>
          </View>
        </>
      )}
      <Text style={styles.groupLabel}>APPEARANCE</Text>
      <View style={styles.settingGroup}>
        <ToggleRow icon="🌙" label="Dark Mode" tKey="dark" />
        <View style={styles.settingRow}><Text style={styles.settingIcon}>🌐</Text><Text style={styles.settingLabel}>Language</Text><Text style={styles.settingRight}>English</Text></View>
        <View style={[styles.settingRow, { borderBottomWidth: 0 }]}><Text style={styles.settingIcon}>💱</Text><Text style={styles.settingLabel}>Currency</Text><Text style={styles.settingRight}>USD $</Text></View>
      </View>
      <Text style={styles.groupLabel}>NOTIFICATIONS</Text>
      <View style={styles.settingGroup}>
        <ToggleRow icon="🔔" label="Push Notifications" tKey="push" />
        <ToggleRow icon="📧" label="Email Alerts" tKey="email" />
        <ToggleRow icon="📱" label="SMS Alerts" tKey="sms" />
      </View>
      <Text style={styles.groupLabel}>SECURITY</Text>
      <View style={styles.settingGroup}>
        <ToggleRow icon="🔒" label="Two-Factor Auth" tKey="twofa" />
        <View style={[styles.settingRow, { borderBottomWidth: 0 }]}><Text style={styles.settingIcon}>🔑</Text><Text style={styles.settingLabel}>Change Password</Text><Text style={styles.settingRight}>›</Text></View>
      </View>
      {currentUser && (
        <TouchableOpacity onPress={() => { logout(); Alert.alert('Logged out successfully'); }}>
          <View style={[styles.settingGroup, { marginTop: 8 }]}>
            <View style={[styles.settingRow, { borderBottomWidth: 0 }]}><Text style={styles.settingIcon}>🚪</Text><Text style={[styles.settingLabel, { color: COLORS.red }]}>Logout</Text></View>
          </View>
        </TouchableOpacity>
      )}
      <View style={{ height: 16 }} />
    </ScrollView>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, gap: 8 },
  statCard: { backgroundColor: COLORS.bg2, borderRadius: 12, padding: 13, borderWidth: 1, borderColor: COLORS.border, flex: 1, minWidth: '45%' },
  statLabel: { fontSize: 9, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '900', color: COLORS.text },
  statChange: { fontSize: 9, marginTop: 2 },
  orderItem: { backgroundColor: COLORS.bg2, borderRadius: 12, padding: 12, marginHorizontal: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  orderId: { fontSize: 11, color: COLORS.accent, fontWeight: '700' },
  orderName: { fontSize: 13, color: COLORS.textSub, fontWeight: '700', marginBottom: 4 },
  orderBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  orderCustomer: { fontSize: 10.5, color: COLORS.textMuted },
  orderAmount: { fontSize: 13, fontWeight: '900', color: COLORS.text },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  badgeText: { fontSize: 9.5, fontWeight: '700' },
  walletCard: { margin: 14, borderRadius: 18, padding: 22, overflow: 'hidden' },
  walLabel: { fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  walBalance: { fontSize: 34, fontWeight: '900', color: '#fff' },
  walUser: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, marginBottom: 14 },
  walBtns: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  walBtnP: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 9 },
  walBtnPText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  walBtnS: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 9, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  walBtnSText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  walBubble: { position: 'absolute', borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.06)' },
  topupBox: { margin: 14, marginTop: 0, backgroundColor: COLORS.bg2, borderRadius: 12, padding: 15, borderWidth: 1, borderColor: COLORS.border },
  topupTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 13 },
  transItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg2, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border, gap: 10 },
  transIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  transInfo: { flex: 1 },
  transName: { fontSize: 13, fontWeight: '600', color: COLORS.textSub },
  transDate: { fontSize: 10, color: COLORS.textMuted, marginTop: 1 },
  transAmount: { fontSize: 13.5, fontWeight: '800' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  profileAvatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { fontSize: 16, fontWeight: '800', color: '#fff' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  profileEmail: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  signInBtn: { backgroundColor: 'rgba(124,58,237,0.2)', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(124,58,237,0.3)' },
  signInBtnText: { fontSize: 12, fontWeight: '700', color: COLORS.accent },
  signOutBtn: { backgroundColor: 'rgba(248,113,113,0.1)', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(248,113,113,0.2)' },
  signOutBtnText: { fontSize: 12, fontWeight: '700', color: COLORS.red },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg2, borderRadius: 12, padding: 14, marginHorizontal: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border, gap: 12 },
  menuIcon: { width: 42, height: 42, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1 },
  menuTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textSub },
  menuSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },
  menuArrow: { fontSize: 22, color: '#4a3f7a' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: '#110d24', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 34 },
  modalHandle: { width: 40, height: 4, backgroundColor: '#2a1f4a', borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 14 },
  demoBox: { backgroundColor: 'rgba(124,58,237,0.12)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.25)', borderRadius: 10, padding: 11, marginBottom: 14 },
  demoText: { fontSize: 11, color: COLORS.accent, lineHeight: 18 },
  errorBox: { backgroundColor: 'rgba(248,113,113,0.15)', borderWidth: 1, borderColor: 'rgba(248,113,113,0.3)', borderRadius: 8, padding: 9, marginBottom: 12 },
  errorText: { fontSize: 11, color: COLORS.red },
  inputLabel: { fontSize: 10, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 },
  textInput: { backgroundColor: COLORS.bg2, borderWidth: 1, borderColor: '#3a2f5a', borderRadius: 10, padding: 12, color: COLORS.text, fontSize: 14, marginBottom: 12 },
  modalBtn: { borderRadius: 11, padding: 13, alignItems: 'center', marginBottom: 12 },
  modalBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  switchLink: { alignItems: 'center', paddingTop: 4 },
  switchText: { fontSize: 12, color: COLORS.textMuted },
  confirmBtn: { borderRadius: 12, padding: 13, alignItems: 'center', marginTop: 4 },
  confirmBtnText: { fontSize: 14, fontWeight: '800', color: '#fff' },
  pickerWrap: { backgroundColor: COLORS.bg2, borderWidth: 1, borderColor: '#3a2f5a', borderRadius: 10, padding: 13, marginBottom: 12 },
  pickerText: { color: COLORS.text, fontSize: 14 },
  resultBox: { marginTop: 14, padding: 14, backgroundColor: 'rgba(52,211,153,0.1)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(52,211,153,0.25)' },
  resultOk: { color: COLORS.green, fontWeight: '800', fontSize: 14, marginBottom: 5 },
  resultInfo: { fontSize: 11, color: COLORS.textMuted, lineHeight: 20 },
  invCard: { backgroundColor: COLORS.bg2, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  invTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  invTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  invSub: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  invBillLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 10 },
  invBillTo: { fontSize: 13, color: COLORS.textSub, fontWeight: '700', marginBottom: 10 },
  invAmount: { fontSize: 24, fontWeight: '900', color: COLORS.accent, marginBottom: 10 },
  invRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  invK: { fontSize: 12, color: COLORS.textMuted },
  invV: { fontSize: 12, color: COLORS.textSub, fontWeight: '700' },
  invTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginBottom: 12 },
  invTotalLabel: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  invTotalValue: { fontSize: 16, fontWeight: '900', color: COLORS.accent },
  groupLabel: { fontSize: 9, color: '#6b5ea8', textTransform: 'uppercase', letterSpacing: 0.8, paddingLeft: 4, paddingTop: 10, paddingBottom: 6 },
  settingGroup: { backgroundColor: COLORS.bg2, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, marginBottom: 4 },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  settingIcon: { fontSize: 16, width: 26 },
  settingLabel: { flex: 1, fontSize: 13, color: COLORS.textSub, marginLeft: 8 },
  settingRight: { fontSize: 12, color: COLORS.textMuted },
  toggle: { width: 40, height: 22, borderRadius: 11, backgroundColor: '#2a1f4a' },
  toggleOn: { backgroundColor: COLORS.primary },
  toggleThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff', position: 'absolute', top: 3, left: 3 },
  toggleThumbOn: { transform: [{ translateX: 18 }] },
});
