import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider, useApp } from './src/context/AppContext';
import SplashScreen        from './src/screens/SplashScreen';
import HomeScreen          from './src/screens/HomeScreen';
import ProductsScreen      from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen          from './src/screens/CartScreen';
import {
  OrdersScreen, WalletScreen, AccountScreen,
  TransactionsScreen, InvoiceScreen, SettingsScreen,
  WishlistScreen, PointsScreen, ReferralScreen,
  SupportScreen, PaymentMethodsScreen,
} from './src/screens/OtherScreens';

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

const TAB_CONFIG = {
  Home:     { active: 'home',            inactive: 'home-outline' },
  Products: { active: 'grid',            inactive: 'grid-outline' },
  Orders:   { active: 'receipt',         inactive: 'receipt-outline' },
  Wallet:   { active: 'wallet',          inactive: 'wallet-outline' },
  Cart:     { active: 'cart',            inactive: 'cart-outline' },
  Account:  { active: 'person-circle',   inactive: 'person-circle-outline' },
};

// ─── Logo Component (Larger & Professional) ───────────────────────────────────
function MezLogo({ size = 40 }) {
  return (
    <LinearGradient
      colors={['#a855f7', '#7c3aed', '#5b21b6']}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 12,
        elevation: 12,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text
        style={{
          fontSize: size * 0.65,
          fontWeight: '900',
          color: '#fff',
          letterSpacing: -2,
          includeFontPadding: false,
          textShadowColor: 'rgba(124, 58, 237, 0.9)',
          textShadowOffset: { width: 0, height: 3 },
          textShadowRadius: 10,
        }}
      >
        M
      </Text>
    </LinearGradient>
  );
}

// ─── Custom Header Title (Logo RIGHT, Name LEFT) ──────────────────────────────
// ─── Header Helpers ───────────────────────────────────────────────────────────
function HeaderLogoLeft() {
  return <View style={{ paddingLeft: 12 }}><MezLogo size={40} /></View>;
}

function HeaderLogoRight() {
  return <View style={{ paddingRight: 12 }}><MezLogo size={40} /></View>;
}

function HeaderTitleLeft({ title }) {
  const { colors: C } = useApp();
  return (
    <Text style={{
      fontSize: 22, fontWeight: '900', color: C.text,
      letterSpacing: -0.8, includeFontPadding: false,
      textTransform: 'uppercase', paddingLeft: 12,
    }}>
      {title}
    </Text>
  );
}

function HeaderTitleRight({ title }) {
  const { colors: C } = useApp();
  return (
    <Text style={{
      fontSize: 22, fontWeight: '900', color: C.text,
      letterSpacing: -0.8, includeFontPadding: false,
      textTransform: 'uppercase', paddingRight: 12,
    }}>
      {title}
    </Text>
  );
}

// إنشاء options الهيدر حسب اللغة
// عربي:    شعار يسار (headerLeft) + اسم يمين (headerRight)
// إنجليزي: اسم يسار (headerLeft) + شعار يمين (headerRight)
function makeHeaderOpts(title, isRTL) {
  if (isRTL) {
    return {
      headerTitle: () => null,
      headerLeft:  () => <HeaderLogoLeft />,
      headerRight: () => <HeaderTitleRight title={title} />,
    };
  }
  return {
    headerTitle: () => null,
    headerLeft:  () => <HeaderTitleLeft title={title} />,
    headerRight: () => <HeaderLogoRight />,
  };
}

// ─── انتقال سلس مخصص ─────────────────────────────────────────────────────────
const smoothTransition = {
  gestureEnabled: true,
  transitionSpec: {
    open:  { animation: 'timing', config: { duration: 220, easing: Easing.out(Easing.ease) } },
    close: { animation: 'timing', config: { duration: 180, easing: Easing.in(Easing.ease) } },
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp',
      }),
    },
  }),
};

// ─── Stack Options ────────────────────────────────────────────────────────────
function useStackOpts() {
  const { colors: C } = useApp();
  return {
    headerStyle: {
      backgroundColor: C.bg,
      borderBottomColor: C.border,
      borderBottomWidth: 1,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: C.accent,
    headerTitleStyle: { color: C.text, fontWeight: '900', fontSize: 18 },
    cardStyle: { backgroundColor: C.bg },
    ...smoothTransition,
  };
}

// ─── Stacks ───────────────────────────────────────────────────────────────────
function HomeStack() {
  const opts = useStackOpts();
  const { isRTL } = useApp();
  return (
    <Stack.Navigator screenOptions={opts}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={makeHeaderOpts('Mez-Cards', isRTL)}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.product.name })}
      />
    </Stack.Navigator>
  );
}

function ProductsStack() {
  const { t, isRTL } = useApp();
  const opts = useStackOpts();
  return (
    <Stack.Navigator screenOptions={opts}>
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={makeHeaderOpts(t('products'), isRTL)}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.product.name })}
      />
    </Stack.Navigator>
  );
}

function AccountStack() {
  const { t, isRTL } = useApp();
  const opts = useStackOpts();
  return (
    <Stack.Navigator screenOptions={opts}>
      <Stack.Screen
        name="AccountMain"
        component={AccountScreen}
        options={makeHeaderOpts(t('myAccount'), isRTL)}
      />
      <Stack.Screen name="Transactions"    component={TransactionsScreen}    options={{ title: t('transactions')    }} />
      <Stack.Screen name="Invoice"         component={InvoiceScreen}         options={{ title: t('invoice')         }} />
      <Stack.Screen name="Settings"        component={SettingsScreen}        options={{ title: t('settings')        }} />
      <Stack.Screen name="Wishlist"        component={WishlistScreen}        options={{ title: t('myWishlist')      }} />
      <Stack.Screen name="Points"          component={PointsScreen}          options={{ title: t('loyaltyPoints')   }} />
      <Stack.Screen name="Referral"        component={ReferralScreen}        options={{ title: t('referral')        }} />
      <Stack.Screen name="Support"         component={SupportScreen}         options={{ title: t('support')         }} />
      <Stack.Screen name="PaymentMethods"  component={PaymentMethodsScreen}  options={{ title: t('paymentMethods')  }} />
    </Stack.Navigator>
  );
}

function CartStack() {
  const { t, isRTL } = useApp();
  const opts = useStackOpts();
  return (
    <Stack.Navigator screenOptions={opts}>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={makeHeaderOpts(t('myCart'), isRTL)}
      />
    </Stack.Navigator>
  );
}

// ─── Animated Tab Icon ────────────────────────────────────────────────────────
function AnimatedTabIcon({ routeName, focused, cartCount, color }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1.2, useNativeDriver: true, tension: 150, friction: 7 }),
        Animated.spring(translateY, { toValue: -2, useNativeDriver: true, tension: 150, friction: 7 }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 150, friction: 7 }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 150, friction: 7 }),
      ]).start();
    }
  }, [focused]);

  const iconName = focused
    ? TAB_CONFIG[routeName]?.active
    : TAB_CONFIG[routeName]?.inactive;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
        <Ionicons name={iconName || 'ellipse-outline'} size={24} color={color} />
      </Animated.View>
      {routeName === 'Cart' && cartCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
        </View>
      )}
    </View>
  );
}

// ─── Main Tabs ────────────────────────────────────────────────────────────────
function MainTabs() {
  const { cartCount, t, isRTL, colors: C } = useApp();
  const insets = useSafeAreaInsets();

  const tabLabels = {
    Home:     t('home'),
    Products: t('products'),
    Orders:   t('orders'),
    Wallet:   t('wallet'),
    Cart:     t('cart'),
    Account:  t('account'),
  };

  const tabBarStyle = {
    backgroundColor: C.bg2,
    borderTopColor: C.border,
    borderTopWidth: 1,
    height: 62 + insets.bottom,
    paddingBottom: insets.bottom + 6,
    paddingTop: 6,
    elevation: 0,
    shadowOpacity: 0,
  };

  const commonScreenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle,
    tabBarActiveTintColor: '#fbbf24',
    tabBarInactiveTintColor: C.textMuted,
    tabBarLabelStyle: styles.tabLabel,
    tabBarLabel: tabLabels[route.name] || route.name,
    tabBarIcon: ({ focused, color }) => (
      <AnimatedTabIcon
        routeName={route.name}
        focused={focused}
        cartCount={cartCount}
        color={color}
      />
    ),
    lazy: true,
    animationEnabled: true,
    tabBarHideOnKeyboard: true,
  });

  const makeHeaderOpts = (titleKey) => ({
    headerShown: true,
    headerStyle: {
      backgroundColor: C.bg,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: C.border,
      borderBottomWidth: 1,
    },
    headerTintColor: C.text,
    headerTitleStyle: { fontWeight: '900' },
    ...( isRTL
      ? {
          headerTitle:  () => null,
          headerLeft:   () => <HeaderLogoLeft />,
          headerRight:  () => <HeaderTitleRight title={t(titleKey)} />,
        }
      : {
          headerTitle:  () => null,
          headerLeft:   () => <HeaderTitleLeft title={t(titleKey)} />,
          headerRight:  () => <HeaderLogoRight />,
        }
    ),
  });

  if (isRTL) {
    return (
      <Tab.Navigator initialRouteName="Home" screenOptions={commonScreenOptions}>
        <Tab.Screen name="Account"  component={AccountStack} />
        <Tab.Screen name="Cart"     component={CartStack} />
        <Tab.Screen name="Wallet"   component={WalletScreen}  options={makeHeaderOpts('wallet')} />
        <Tab.Screen name="Orders"   component={OrdersScreen}  options={makeHeaderOpts('orders')} />
        <Tab.Screen name="Products" component={ProductsStack} />
        <Tab.Screen name="Home"     component={HomeStack} />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={commonScreenOptions}>
      <Tab.Screen name="Home"     component={HomeStack} />
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen name="Orders"   component={OrdersScreen}  options={makeHeaderOpts('orders')} />
      <Tab.Screen name="Wallet"   component={WalletScreen}  options={makeHeaderOpts('wallet')} />
      <Tab.Screen name="Cart"     component={CartStack} />
      <Tab.Screen name="Account"  component={AccountStack} />
    </Tab.Navigator>
  );
}

// ─── App Content ──────────────────────────────────────────────────────────────
function AppContent() {
  const [splashDone, setSplashDone] = useState(false);
  const { isDark, colors: C } = useApp();
  const handleSplashFinish = useCallback(() => setSplashDone(true), []);

  if (!splashDone) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        <SplashScreen onFinish={handleSplashFinish} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={C.bg} />
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabLabel: { fontSize: 9.5, fontWeight: '700', marginTop: 1 },
  tabActiveGlow: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    top: -10,
    left: -10,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#ef4444',
    borderRadius: 9,
    minWidth: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#0e0c22',
    paddingHorizontal: 2,
  },
  cartBadgeText: { fontSize: 9, fontWeight: '900', color: '#fff' },
});