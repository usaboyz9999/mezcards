import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
  const logoScale    = useRef(new Animated.Value(0)).current;
  const logoOpacity  = useRef(new Animated.Value(0)).current;
  const glowOpacity  = useRef(new Animated.Value(0)).current;
  const textOpacity  = useRef(new Animated.Value(0)).current;
  const textY        = useRef(new Animated.Value(24)).current;
  const tagOpacity   = useRef(new Animated.Value(0)).current;
  const tagY         = useRef(new Animated.Value(14)).current;
  const loaderOpacity= useRef(new Animated.Value(0)).current;
  const ring1Scale   = useRef(new Animated.Value(0.85)).current;
  const ring2Scale   = useRef(new Animated.Value(0.92)).current;
  const dot1         = useRef(new Animated.Value(1)).current;
  const dot2         = useRef(new Animated.Value(1)).current;
  const dot3         = useRef(new Animated.Value(1)).current;
  const screenOpacity= useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // حلقات نابضة
    const ringAnim = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(ring1Scale, { toValue: 1.08, duration: 1600, easing: Easing.inOut(Easing.sine), useNativeDriver: true }),
          Animated.timing(ring1Scale, { toValue: 0.85, duration: 1600, easing: Easing.inOut(Easing.sine), useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(ring2Scale, { toValue: 1.05, duration: 2000, easing: Easing.inOut(Easing.sine), useNativeDriver: true }),
          Animated.timing(ring2Scale, { toValue: 0.92, duration: 2000, easing: Easing.inOut(Easing.sine), useNativeDriver: true }),
        ]),
      ])
    );
    ringAnim.start();

    // نقاط التحميل
    const dotBounce = (dot, delay) => Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dot, { toValue: 1.6, duration: 280, easing: Easing.ease, useNativeDriver: true }),
        Animated.timing(dot, { toValue: 1,   duration: 280, easing: Easing.ease, useNativeDriver: true }),
        Animated.delay(660),
      ])
    );
    dotBounce(dot1, 0).start();
    dotBounce(dot2, 160).start();
    dotBounce(dot3, 320).start();

    // تسلسل الظهور
    Animated.sequence([
      // 1. الشعار
      Animated.parallel([
        Animated.spring(logoScale,   { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
      // 2. الاسم
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 380, useNativeDriver: true }),
        Animated.timing(textY,       { toValue: 0, duration: 380, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      ]),
      // 3. الوصف
      Animated.parallel([
        Animated.timing(tagOpacity, { toValue: 1, duration: 320, useNativeDriver: true }),
        Animated.timing(tagY,       { toValue: 0, duration: 320, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      ]),
      // 4. نقاط التحميل
      Animated.timing(loaderOpacity, { toValue: 1, duration: 280, useNativeDriver: true }),
      Animated.delay(1400),
      // 5. اختفاء
      Animated.timing(screenOpacity, { toValue: 0, duration: 480, easing: Easing.in(Easing.ease), useNativeDriver: true }),
    ]).start(() => onFinish());

    return () => ringAnim.stop();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      {/* خلفية متدرجة */}
      <LinearGradient
        colors={['#0d0a1e', '#160730', '#1e0a45', '#0d0a1e']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
      />

      {/* حلقات خلفية */}
      <Animated.View style={[styles.ring, styles.ring1, { transform: [{ scale: ring1Scale }] }]} />
      <Animated.View style={[styles.ring, styles.ring2, { transform: [{ scale: ring2Scale }] }]} />

      {/* وهج الشعار */}
      <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />

      {/* الشعار */}
      <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }], alignItems: 'center' }}>
        <LinearGradient
          colors={['#a855f7', '#7c3aed', '#5b21b6']}
          style={styles.logoBox}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <Text style={styles.logoLetter}>M</Text>
        </LinearGradient>
      </Animated.View>

      {/* الاسم */}
      <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textY }], alignItems: 'center', marginTop: 22 }}>
        <Text style={styles.appName}>
          <Text style={styles.appNameMez}>Mez</Text>
          <Text style={styles.appNameCards}>Cards</Text>
        </Text>
      </Animated.View>

      {/* الوصف */}
      <Animated.View style={{ opacity: tagOpacity, transform: [{ translateY: tagY }], alignItems: 'center', marginTop: 8 }}>
        <View style={styles.taglinePill}>
          <Text style={styles.taglineAr}>منتجات رقمية · بطاقات هدايا</Text>
        </View>
      </Animated.View>

      {/* نقاط التحميل */}
      <Animated.View style={[styles.loader, { opacity: loaderOpacity }]}>
        {[
          { dot: dot1, color: '#7c3aed' },
          { dot: dot2, color: '#a855f7' },
          { dot: dot3, color: '#c084fc' },
        ].map(({ dot, color }, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, { backgroundColor: color, transform: [{ scale: dot }] }]}
          />
        ))}
      </Animated.View>

      {/* زر تخطي */}
      <TouchableOpacity style={styles.skipBtn} onPress={onFinish} activeOpacity={0.7}>
        <Text style={styles.skipText}>تخطي ›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
  },
  ring1: {
    width: width * 1.3,
    height: width * 1.3,
    top: -width * 0.35,
    left: -width * 0.15,
    borderColor: 'rgba(124,58,237,0.18)',
  },
  ring2: {
    width: width * 1.1,
    height: width * 1.1,
    bottom: -width * 0.35,
    right: -width * 0.15,
    borderColor: 'rgba(168,85,247,0.14)',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(124,58,237,0.18)',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 0,
  },
  logoBox: {
    width: 110,
    height: 110,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 28,
    elevation: 20,
  },
  logoLetter: {
    fontSize: 68,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -3,
    includeFontPadding: false,
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
  },
  appNameMez: {
    color: '#c084fc',
  },
  appNameCards: {
    color: '#ffffff',
  },
  taglinePill: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.35)',
    backgroundColor: 'rgba(124,58,237,0.12)',
  },
  taglineAr: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  loader: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 52,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  skipBtn: {
    position: 'absolute',
    bottom: 44,
    right: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  skipText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    fontWeight: '600',
  },
});