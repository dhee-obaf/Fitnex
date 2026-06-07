import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import HomeScreen from "../screens/HomeScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { shadows3D } from "../styles/3dStyles";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: [
          {
            backgroundColor: "#ddc5e7",
            // borderTopColor: "transparent",
            height: 70,
            paddingBottom: 10,
            paddingTop: 8,
            borderTopWidth: 0,
            position: "relative",
            overflow: "hidden",
          },
          styles.tabBar3D,
        ],
        tabBarIcon: ({ size, focused }) => {
          let iconName = "home";
          if (route.name === "Workout") iconName = "barbell";
          if (route.name === "Profile") iconName = "person";
          return (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
              <Ionicons
                name={focused ? (iconName as any) : (`${iconName}-outline` as any)}
                size={focused ? size + 2 : size}
                color={focused ? colors.primary : colors.text}
              />
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="Workout" component={WorkoutScreen} options={{ title: "Workout" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar3D: {
    ...shadows3D.deep,
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  tabIconContainer: {
    width: 36,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIconContainerActive: {
    ...shadows3D.soft,
  },
});
