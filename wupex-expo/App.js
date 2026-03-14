import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { COLORS } from './src/data';

import SplashScreen     from './src/screens/SplashScreen';
import HomeScreen       from './src/screens/HomeScreen';
import ProductsScreen   from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen       from './src/screens/CartScreen';
import { OrdersScreen, WalletScreen, MoreScreen, TransactionsScreen, CheckCodesScreen, InvoiceScreen, SettingsScreen } from './src/screens/OtherScreens';

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

const ICONS = {
  Home: '🏠', Products: '📺', Orders: '📋', Wallet: '💳', More: '☰',
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackOpts}>
      <Stack.Screen name="Home"          component={HomeScreen}          options={{ title: 'Wupex' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={({ route }) => ({ title: route.params.product.name })} />
    </Stack.Navigator>
  );
}

function ProductsStack() {
  return (
    <Stack.Navigator screenOptions={stackOpts}>
      <Stack.Screen name="Products"      component={ProductsScreen}      options={{ title: 'Products' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={({ route }) => ({ title: route.params.product.name })} />
    </Stack.Navigator>
  );
}

function MoreStack() {
  return (
    <Stack.Navigator screenOptions={stackOpts}>
      <Stack.Screen name="More"          component={MoreScreen}          options={{ title: 'More' }} />
      <Stack.Screen name="Transactions"  component={TransactionsScreen}  options={{ title: '⚡ Transactions' }} />
      <Stack.Screen name="CheckCodes"    component={CheckCodesScreen}    options={{ title: '🔍 Check Codes' }} />
      <Stack.Screen name="Invoice"       component={InvoiceScreen}       options={{ title: '📄 Invoice' }} />
      <Stack.Screen name="Settings"      component={SettingsScreen}      options={{ title: '⚙️ Settings' }} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={stackOpts}>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: '🛒 My Cart' }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const { cartCount } = useApp();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: '#5a4f8a',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, focused }) => (
          <View style={styles.tabIconWrap}>
            <Text style={[styles.tabIcon, { opacity: focused ? 1 : 0.7 }]}>{ICONS[route.name] || '●'}</Text>
            {route.name === 'Cart' && cartCount > 0 && (
              <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount}</Text></View>
            )}
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home"     component={HomeStack}     />
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen name="Orders"   component={OrdersScreen}  options={{ headerShown: true, headerStyle: { backgroundColor: COLORS.bg, borderBottomColor: COLORS.border }, headerTintColor: COLORS.text, headerTitleStyle: { fontWeight: '800' }, title: '📋 Orders' }} />
      <Tab.Screen name="Wallet"   component={WalletScreen}  options={{ headerShown: true, headerStyle: { backgroundColor: COLORS.bg, borderBottomColor: COLORS.border }, headerTintColor: COLORS.text, headerTitleStyle: { fontWeight: '800' }, title: '💳 Wallet' }} />
      <Tab.Screen name="More"     component={MoreStack}     />
      <Tab.Screen name="Cart"     component={CartStack}     />
    </Tab.Navigator>
  );
}

const stackOpts = {
  headerStyle: { backgroundColor: COLORS.bg, borderBottomColor: COLORS.border, borderBottomWidth: 1, elevation: 0, shadowOpacity: 0 },
  headerTintColor: COLORS.accent,
  headerTitleStyle: { color: COLORS.text, fontWeight: '800', fontSize: 16 },
  cardStyle: { backgroundColor: COLORS.bg },
};

function AppContent() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinish = useCallback(() => setSplashDone(true), []);

  if (!splashDone) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <SplashScreen onFinish={handleSplashFinish} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" backgroundColor={COLORS.bg} />
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0e0c22',
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
    paddingTop: 4,
    elevation: 0,
  },
  tabLabel: { fontSize: 9, fontWeight: '700' },
  tabIconWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  tabIcon: { fontSize: 20 },
  cartBadge: { position: 'absolute', top: -4, right: -8, backgroundColor: '#ef4444', borderRadius: 9, width: 16, height: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#0e0c22' },
  cartBadgeText: { fontSize: 9, fontWeight: '900', color: '#fff' },
});
