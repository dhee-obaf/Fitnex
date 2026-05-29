import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { shadows3D } from "../styles/3dStyles";

export default function SplashScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 90,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Main");
    }, 1400);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={[styles.screen, { backgroundColor: "#f3ebf5", pointerEvents: "none" }]}> 
      <Animated.View style={[styles.card, { backgroundColor: colors.primary, transform: [{ scale }] }]}> 
        <Text style={[styles.title, { color: "#fff", fontFamily: "FugazOne_400Regular"}]}>Fitnex</Text>
        <Text style={[styles.subtitle, { color: "rgba(255,255,255,0.85)" }]}>Move. Track. Improve.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    alignItems: "center",
    padding: 24,
    borderRadius: 24,
    ...shadows3D.deep,
  },
  title: {
    fontSize: 46,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});