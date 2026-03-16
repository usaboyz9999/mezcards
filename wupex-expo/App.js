import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AppProvider, useApp } from './src/context/AppContext';
import { COLORS } from './src/data';

import SplashScreen        from './src/screens/SplashScreen';
import HomeScreen          from './src/screens/HomeScreen';
import ProductsScreen      from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen          from './src/screens/CartScreen';
import {
  OrdersScreen, WalletScreen, AccountScreen,
  TransactionsScreen, InvoiceScreen, SettingsScreen,
} from './src/screens/OtherScreens';

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

const TAB_ICONS = {
  Home: '🏠', Products: '📺', Orders: '📋',
  Wallet: '💳', Cart: '🛒', Account: '👤',
};

// ─── Logo Component ───────────────────────────────────────────────────────────
function MezLogo({ size = 32 }) {
  return (
    <LinearGradient
      colors={['#a855f7', '#7c3aed', '#6d28d9']}
      style={{
        width: size, height: size, borderRadius: size * 0.28,
        alignItems: 'center', justifyContent: 'center',
        shadowColor: '#7c3aed', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6, shadowRadius: 6, elevation: 6,
      }}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
    >
      <Text style={{
        fontSize: size * 0.55, fontWeight: '900', color: '#fff',
        letterSpacing: -1, includeFontPadding: false,
      }}>M</Text>
    </LinearGradient>
  );
}

// ─── Custom Header Title ───────────────────────────────────────────────────────
function HeaderTitle({ title }) {
  const { isRTL, colors: C } = useApp();
  return (
    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 9 }}>
      {!isRTL && <Text style={{ fontSize: 17, fontWeight: '800', color: C.text, letterSpacing: -0.3 }}>{title}</Text>}
      <MezLogo/>
      {isRTL && <Text style={{ fontSize: 17, fontWeight: '800', color: C.text, letterSpacing: -0.3 }}>{title}</Text>}
    </View>
  );
}

function useStackOpts(title) {
  const { isRTL, colors: C } = useApp();
  return {
    headerStyle: {
      backgroundColor: C.bg,
      borderBottomColor: C.border,
      borderBottomWidth: 1, elevation: 0, shadowOpacity: 0,
    },
    headerTintColor: C.accent,
    headerTitleStyle: { color: C.text, fontWeight: '800', fontSize: 16 },
    headerTitleAlign: 'center',
    cardStyle: { backgroundColor: C.bg },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
}

function HomeStack() {
  const { t, isRTL } = useApp();
  const opts = useStackOpts();
  return (
    <Stack.Navigator screenOptions={opts}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Mez-Cards" />,
        }}
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
  const { t } = useApp();
  const opts = useStackOpts();
  return (
    <Stack.Navigator screenOptions={opts}>
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerTitle: () => <HeaderTitle title={t('products')} /> }}
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
  const { t } = useApp();
  const opts = useStackOpts();
  return (
    <Stack.Navigator screenOptions={opts}>
      <Stack.Screen name="AccountMain" component={AccountScreen} options={{ headerTitle: () => <HeaderTitle title={t('myAccount')} /> }} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ title: t('transactions') }} />
      <Stack.Screen name="Invoice"      component={InvoiceScreen}      options={{ title: t('invoice') }} />
      <Stack.Screen name="Settings"     component={SettingsScreen}     options={{ title: t('settings') }} />
    </Stack.Navigator>
  );
}

function CartStack() {
  const { t } = useApp();
  const opts = useStackOpts();
  return (
    <Stack.Navigator screenOptions={opts}>
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerTitle: () => <HeaderTitle title={t('myCart')} /> }} />
    </Stack.Navigator>
  );
}

// ─── Animated Tab Icon ────────────────────────────────────────────────────────
function AnimatedTabIcon({ routeName, focused, cartCount }) {
  const scale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.spring(scale, {
        toValue: 1.25,
        useNativeDriver: true,
        tension: 120,
        friction: 6,
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 120,
        friction: 6,
      }).start();
    }
  }, [focused]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Text style={[styles.tabIcon, { transform: [{ scale }], opacity: focused ? 1 : 0.6 }]}>
        {TAB_ICONS[routeName] || '●'}
      </Animated.Text>
      {routeName === 'Cart' && cartCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartCount}</Text>
        </View>
      )}
    </View>
  );
}

function MainTabs() {
  const { cartCount, t, isRTL, colors: C } = useApp();

  const tabLabels = {
    Home: t('home'), Products: t('products'), Orders: t('orders'),
    Wallet: t('wallet'), Cart: t('cart'), Account: t('account'),
  };

  const commonScreenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle: [styles.tabBar, { backgroundColor: C.bg2, borderTopColor: C.border }],
    tabBarActiveTintColor: '#fbbf24',
    tabBarInactiveTintColor: C.textMuted,
    tabBarLabelStyle: styles.tabLabel,
    tabBarLabel: tabLabels[route.name] || route.name,
    tabBarIcon: ({ focused }) => (
      <AnimatedTabIcon routeName={route.name} focused={focused} cartCount={cartCount} />
    ),
  });

  const ordersOpts = {
    headerShown: true,
    headerStyle: { backgroundColor: C.bg, elevation: 0, shadowOpacity: 0, borderBottomColor: C.border, borderBottomWidth: 1 },
    headerTintColor: C.text,
    headerTitleStyle: { fontWeight: '800' },
    headerTitleAlign: 'center',
    title: t('orders'),
    headerTitle: () => <HeaderTitle title={t('orders')} />,
  };

  const walletOpts = {
    headerShown: true,
    headerStyle: { backgroundColor: C.bg, elevation: 0, shadowOpacity: 0, borderBottomColor: C.border, borderBottomWidth: 1 },
    headerTintColor: C.text,
    headerTitleStyle: { fontWeight: '800' },
    headerTitleAlign: 'center',
    title: t('wallet'),
    headerTitle: () => <HeaderTitle title={t('wallet')} />,
  };

  if (isRTL) {
    return (
      <Tab.Navigator initialRouteName="Home" screenOptions={commonScreenOptions}>
        <Tab.Screen name="Account" component={AccountStack} />
        <Tab.Screen name="Cart"    component={CartStack} />
        <Tab.Screen name="Wallet"  component={WalletScreen} options={walletOpts} />
        <Tab.Screen name="Orders"  component={OrdersScreen} options={ordersOpts} />
        <Tab.Screen name="Products" component={ProductsStack} />
        <Tab.Screen name="Home"    component={HomeStack} />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={commonScreenOptions}>
      <Tab.Screen name="Home"     component={HomeStack} />
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen name="Orders"   component={OrdersScreen} options={ordersOpts} />
      <Tab.Screen name="Wallet"   component={WalletScreen} options={walletOpts} />
      <Tab.Screen name="Cart"     component={CartStack} />
      <Tab.Screen name="Account"  component={AccountStack} />
    </Tab.Navigator>
  );
}

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
  tabBar: {
    borderTopWidth: 1, height: 62,
    paddingBottom: 7, paddingTop: 5, elevation: 0,
  },
  tabLabel: { fontSize: 9, fontWeight: '700' },
  tabIcon: { fontSize: 22 },
  cartBadge: {
    position: 'absolute', top: -5, right: -10,
    backgroundColor: '#ef4444', borderRadius: 9,
    width: 17, height: 17, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#0e0c22',
  },
  cartBadgeText: { fontSize: 9, fontWeight: '900', color: '#fff' },
});