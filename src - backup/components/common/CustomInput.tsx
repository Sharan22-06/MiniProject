"use client"

import type React from "react"
import { useState } from "react"
import { View, TextInput, Text, StyleSheet } from "react-native"
import { colors, spacing, typography, borderRadius } from "../../constants/colors"

interface CustomInputProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  error?: string
  multiline?: boolean
  numberOfLines?: number
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  multiline = false,
  numberOfLines = 1,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodySmall,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.body.fontSize,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.sm,
  },
})

export default CustomInput
