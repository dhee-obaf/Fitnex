import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";
import TabBar3DButton from "../components/TabBar3DButton";
import { shadows3D } from "../styles/3dStyles";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutScreen}
        options={({ route }) => ({
          title: (route.params as any)?.workout?.name || "Workout",
        })}
      />
    </Stack.Navigator>
  );
}

function WorkoutStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="WorkoutTab"
        component={WorkoutScreen}
        options={{ title: "Workout" }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: [
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            height: 76,
            paddingBottom: 12,
            paddingTop: 8,
            borderTopWidth: 0,
            position: "relative",
          },
          styles.tabBar3D,
        ],
        tabBarButton: (props) => (
          <TabBar3DButton
            {...props}
            focused={props.accessibilityState?.selected}
          />
        ),
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "home";
          if (route.name === "Workout") {
            iconName = "barbell";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
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
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "Home" }} />
      <Tab.Screen name="Workout" component={WorkoutStack} options={{ title: "Workout" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar3D: {
    ...shadows3D.deep,
    borderRadius: 24,
    marginBottom: 12,
    marginHorizontal: 12,
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
