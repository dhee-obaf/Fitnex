import React, { useRef } from "react";
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

type Props = Omit<PressableProps, "children"> & {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function AnimatedPressable({ children, style, onPress, onPressIn, onPressOut, ...rest }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const handlePressIn: PressableProps['onPressIn'] = (e) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.94, useNativeDriver: false, speed: 20 }),
      Animated.timing(rotation, { toValue: -2, useNativeDriver: false, duration: 100 }),
    ]).start();
    onPressIn && onPressIn(e as any);
  };

  const handlePressOut: PressableProps['onPressOut'] = (e) => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: false, speed: 20 }),
      Animated.timing(rotation, { toValue: 0, useNativeDriver: false, duration: 100 }),
    ]).start();
    onPressOut && onPressOut(e as any);
  };

  return (
    <Pressable {...rest} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[
        { 
          transform: [
            { scale },
            { 
              rotateZ: rotation.interpolate({
                inputRange: [-2, 0],
                outputRange: ['-2deg', '0deg']
              })
            }
          ]
        }, 
        style
      ]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
