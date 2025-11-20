"use client"

import type React from "react"
import { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthStack from "./AuthStack"
import UserTabs from "./UserTabs"
import type { RootStackParamList } from "../types"

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("John Doe")

  const handleLoginSuccess = (role: "User" | "Admin", name?: string) => {
    // Role is no longer used; always enter the user flow.
    if (name) setUserName(name)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    // clear stored display name on logout so next login starts fresh
    setUserName("John Doe")
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen name="Auth">{() => <AuthStack onLoginSuccess={handleLoginSuccess} />}</Stack.Screen>
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="MainUser">
              {() => <UserTabs userName={userName} onLogout={handleLogout} />}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
