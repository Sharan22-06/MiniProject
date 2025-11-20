import type React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HomeScreen from "../screens/user/HomeScreen"
import SearchScreen from "../screens/user/SearchScreen"
import BookDetailScreen from "../screens/user/BookDetailScreen"
import CategoryListScreen from "../screens/user/CategoryListScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../screens/shared/ProfileScreen"
import PublishScreen from "../screens/user/PublishScreen"
import { colors } from "../constants/colors"
import type { UserTabsParamList } from "../types"

const Tab = createBottomTabNavigator<UserTabsParamList>()

interface UserTabsProps {
  userName: string
  onLogout: () => void
}

const UserTabs: React.FC<UserTabsProps> = ({ userName, onLogout }) => {
  const insets = useSafeAreaInsets()
  const SearchStack = () => {
    const Stack = createNativeStackNavigator()
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchMain" component={SearchScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      </Stack.Navigator>
    )
  }

  const HomeStack = () => {
    const Stack = createNativeStackNavigator()
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain">{() => <HomeScreen userName={userName} />}</Stack.Screen>
        <Stack.Screen name="CategoryList" component={CategoryListScreen} />
        <Stack.Screen name="Publish" component={PublishScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      </Stack.Navigator>
    )
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home"
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          // ensure the tab bar accounts for device safe area so it doesn't overlap content
          paddingBottom: (insets.bottom || 0) + 2,
          paddingTop: 8,
          height: 60 + (insets.bottom || 0),
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      >
        {() => <HomeStack />}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarLabel: "Search",
        }}
        component={SearchStack}
      />
      <Tab.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
        }}
      >
        {() => <ProfileScreen userName={userName} userEmail="user@example.com" userRole="User" onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default UserTabs
