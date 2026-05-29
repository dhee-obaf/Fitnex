import { useRef, useEffect } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { shadows3D } from "../styles/3dStyles";

type TabBar3DButtonProps = {
  children?: React.ReactNode;
  focused?: boolean;
  onPress?: ((e: any) => void) | null;
  onLongPress?: ((e: any) => void) | null;
  onPressIn?: ((e: any) => void) | null;
  onPressOut?: ((e: any) => void) | null;
  style?: any;
  accessibilityState?: any;
};

export default function TabBar3DButton({ children, style, onPress, onLongPress, onPressIn, onPressOut, focused, ...rest }: TabBar3DButtonProps) {
  const scale = useRef(new Animated.Value(focused ? 1 : 0.95)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.95,
      useNativeDriver: true,
      speed: 14,
      bounciness: 6,
    }).start();
    Animated.spring(lift, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      speed: 14,
      bounciness: 6,
    }).start();
  }, [focused]);

  const handlePressIn = (e: any) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 20 }),
      Animated.timing(rotation, { toValue: -2, useNativeDriver: true, duration: 80 }),
    ]).start();
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: focused ? 1 : 0.95, useNativeDriver: true, speed: 20 }),
      Animated.timing(rotation, { toValue: 0, useNativeDriver: true, duration: 80 }),
    ]).start();
    onPressOut?.(e);
  };

  const shadowElevation = lift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  const translateY = lift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.wrapper, style]}
      {...rest}
    >
      <Animated.View
        style={[
          styles.button,
          focused && styles.buttonFocused,
          {
            transform: [
              { scale },
              { translateY },
              {
                rotateZ: rotation.interpolate({
                  inputRange: [-2, 0],
                  outputRange: ["-2deg", "0deg"],
                }),
              },
            ],
            elevation: shadowElevation,
            shadowOpacity: lift.interpolate({
              inputRange: [0, 1],
              outputRange: [0.12, 0.25],
            }),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              opacity: lift,
              transform: [{ scale: lift }],
            },
          ]}
        />
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 60,
    ...shadows3D.soft,
  },
  buttonFocused: {
    shadowColor: "#5e1a96",
  },
  activeIndicator: {
    position: "absolute",
    top: -2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#5e1a96",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
