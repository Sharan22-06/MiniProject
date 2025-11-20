import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native"
import { colors, spacing, typography, borderRadius, shadows } from "../../constants/colors"

interface CustomButtonProps {
  onPress: () => void
  title: string
  variant?: "primary" | "secondary" | "text"
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        styles[variant],
        isDisabled && styles.disabled,
        fullWidth && { width: "100%" },
        variant === "primary" && shadows.small,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "text" ? colors.primary : colors.surface} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.small,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.5,
  },
  primaryText: {
    ...typography.headingSmall,
    color: colors.surface,
  },
  secondaryText: {
    ...typography.headingSmall,
    color: colors.primary,
  },
  textText: {
    ...typography.headingSmall,
    color: colors.primary,
  },
})

export default CustomButton
