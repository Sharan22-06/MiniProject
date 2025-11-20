import type React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/auth/LoginScreen"
import SignupScreen from "../screens/auth/SignupScreen"
import type { AuthStackParamList } from "../types"

const Stack = createNativeStackNavigator<AuthStackParamList>()

interface AuthStackProps {
  onLoginSuccess: (role: "User" | "Admin", name?: string) => void
}

const AuthStack: React.FC<AuthStackProps> = ({ onLoginSuccess }) => {
  return (
    <Stack.Navigator
      screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: "#F4F6F8" },
      }}
    >
      <Stack.Screen
      name="Login"
      options={{
        animation: "default",
      }}
      >
      {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen
      name="Signup"
      options={{
        animation: "slide_from_right",
      }}
      >
      {(props) => <SignupScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default AuthStack
