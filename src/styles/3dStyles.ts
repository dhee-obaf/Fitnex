import { StyleSheet, Platform } from "react-native";

/**
 * 3D UI Styling System for Fitnex
 * Provides depth effects, shadows, and perspective transforms
 */

export const shadows3D = {
  // Soft shadows for depth
  soft: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Medium shadows for cards
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Deep shadows for prominent elements
  deep: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  
  // Inset shadow effect (using borders)
  inset: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
};

export const perspective3D = {
  // Card tilt effect (apply via transform)
  tiltX: (degrees: number) => ({
    transform: [
      { perspective: 1000 },
      { rotateX: `${degrees}deg` },
    ],
  }),
  
  tiltY: (degrees: number) => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${degrees}deg` },
    ],
  }),
  
  tiltBoth: (x: number, y: number) => ({
    transform: [
      { perspective: 1000 },
      { rotateX: `${x}deg` },
      { rotateY: `${y}deg` },
    ],
  }),
};

export const depth3D = {
  // Layered effect for cards
  card: {
    ...shadows3D.medium,
    borderRadius: 20,
    overflow: "hidden" as const,
  },
  
  // Elevated button style
  button: {
    ...shadows3D.soft,
    borderRadius: 14,
  },
  
  // Icon container with depth
  iconContainer: {
    ...shadows3D.soft,
    borderRadius: 16,
  },
};

export const gradients3D = {
  // Purple gradient with depth
  purpleDeep: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    colors: ["#6b21a8", "#5e1a96", "#3f0f5c"],
  },
  
  // Orange accent gradient
  orangeAccent: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    colors: ["#ff8c42", "#ff6b35", "#f7931e"],
  },
  
  // Blue gradient for secondary elements
  blueDeep: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    colors: ["#0ea5e9", "#06b6d4", "#0891b2"],
  },
};

export const styles3D = StyleSheet.create({
  container3D: {
    flex: 1,
  },
  
  heroCard3D: {
    ...depth3D.card,
    padding: 24,
    marginBottom: 20,
    marginHorizontal: -16,
    marginTop: -16,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  
  workoutCard3D: {
    ...depth3D.card,
    marginBottom: 14,
    padding: 16,
    borderWidth: 0,
  },
  
  metricCard3D: {
    ...depth3D.card,
    padding: 16,
    alignItems: "center",
    borderWidth: 0,
  },
  
  button3D: {
    ...depth3D.button,
    borderWidth: 0,
  },
  
  iconContainer3D: {
    ...depth3D.iconContainer,
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  
  workoutImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    ...shadows3D.medium,
    overflow: "hidden",
  },
});

export default {
  shadows3D,
  perspective3D,
  depth3D,
  gradients3D,
  styles3D,
};
