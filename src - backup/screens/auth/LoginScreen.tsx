"use client"

import type React from "react"
import { useState } from "react"
import { ScrollView, View, Text, StyleSheet, Alert, SafeAreaView } from "react-native"
import CustomButton from "../../components/common/CustomButton"
import CustomInput from "../../components/common/CustomInput"
import { signIn } from "../../../lib/firebase"
import { colors, spacing, typography, borderRadius } from "../../constants/colors"

interface LoginScreenProps {
  navigation: any
  onLoginSuccess: (role: "User" | "Admin", name?: string) => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    ;(async () => {
      try {
        const user = await signIn(email, password)
        // determine role by email until you have proper role claims
        const role = (user.email && user.email.includes("admin")) ? "Admin" : "User"
        const name = user.displayName || (user.email ? user.email.split("@")[0].replace(/\.|_|-/g, " ") : undefined)
        const niceName = name ? name.split(" ").map((s) => s[0]?.toUpperCase() + s.slice(1)).join(" ") : undefined
        Alert.alert("Success", `Logged in as ${role}`)
        onLoginSuccess(role, niceName)
      } catch (err: any) {
        const message = err?.message || String(err)
        Alert.alert("Login failed", message)
      } finally {
        setLoading(false)
      }
    })()
  }

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password", "Feature coming soon!")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your SmartLibrary account</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput label="Email" placeholder="your@email.com" value={email} onChangeText={setEmail} />

          <CustomInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.rememberForgot}>
            <Text onPress={() => setRememberMe(!rememberMe)} style={styles.rememberText}>
              {rememberMe ? "✓ " : ""}Remember me
            </Text>
            <Text onPress={handleForgotPassword} style={styles.forgotText}>
              Forgot Password?
            </Text>
          </View>

          <CustomButton title="Login" onPress={handleLogin} loading={loading} fullWidth />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Don't have an account?</Text>
            <View style={styles.dividerLine} />
          </View>

          <CustomButton
            title="Go to Signup"
            onPress={() => navigation.navigate("Signup")}
            variant="secondary"
            fullWidth
          />
        </View>

        {/* demo credentials hint removed */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
    justifyContent: "center",
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: "center",
  },
  title: {
    ...typography.headingLarge,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  rememberForgot: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  rememberText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  forgotText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: "500",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginHorizontal: spacing.md,
  },
  demoHint: {
    /* demo hint removed */
  },
  demoText: {
    /* demo hint removed */
  },
})

export default LoginScreen
