"use client"

import type React from "react"
import { useState } from "react"
import { ScrollView, View, Text, StyleSheet, Alert, SafeAreaView, Pressable } from "react-native"
import CustomButton from "../../components/common/CustomButton"
import CustomInput from "../../components/common/CustomInput"
import { signUp } from "../../../lib/firebase"
import { colors, spacing, typography, borderRadius } from "../../constants/colors"

interface SignupScreenProps {
  navigation: any
  onLoginSuccess?: (role: "User" | "Admin", name?: string) => void
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation, onLoginSuccess }) => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  // role removed — app only supports regular users now
  const [loading, setLoading] = useState(false)

  const getPasswordStrength = () => {
    if (!password) return { text: "", color: colors.textSecondary }
    if (password.length < 6) return { text: "Weak", color: colors.error }
    if (password.length < 10) return { text: "Medium", color: colors.warning }
    return { text: "Strong", color: colors.success }
  }

  const handleSignup = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (!termsAccepted) {
      Alert.alert("Error", "Please accept the terms and conditions")
      return
    }

    setLoading(true)
    ;(async () => {
      try {
        const user = await signUp(email, password, fullName)
        if (onLoginSuccess) {
          onLoginSuccess("User", user.displayName || fullName)
        } else {
          Alert.alert("Success", "Account created! Please log in.")
          navigation.navigate("Login")
        }
      } catch (err: any) {
        Alert.alert("Signup failed", err?.message || String(err))
      } finally {
        setLoading(false)
      }
    })()
  }

  const strength = getPasswordStrength()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join SmartLibrary today</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput label="Full Name" placeholder="John Doe" value={fullName} onChangeText={setFullName} />

          <CustomInput label="Email" placeholder="your@email.com" value={email} onChangeText={setEmail} />

          <View>
            <CustomInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {password && (
              <Text style={[styles.strengthText, { color: strength.color }]}>Password strength: {strength.text}</Text>
            )}
          </View>

          <CustomInput
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={confirmPassword && password !== confirmPassword ? "Passwords do not match" : ""}
          />

          <Pressable style={styles.termsContainer} onPress={() => setTermsAccepted(!termsAccepted)}>
            <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text>
            </Text>
          </Pressable>

          <CustomButton title="Create Account" onPress={handleSignup} loading={loading} fullWidth />

          <View style={styles.loginLink}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={styles.loginLinkText} onPress={() => navigation.navigate("Login")}>
                Login
              </Text>
            </Text>
          </View>
        </View>
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
  },
  strengthText: {
    ...typography.caption,
    marginTop: spacing.sm,
    fontWeight: "500",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.small,
    marginRight: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.surface,
    fontWeight: "600",
  },
  termsText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: "600",
  },
  loginLink: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  loginText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  loginLinkText: {
    color: colors.primary,
    fontWeight: "600",
  },
  /* role selector removed (app supports User only) */
})

export default SignupScreen
