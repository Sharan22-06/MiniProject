import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, typography, borderRadius } from "../../constants/colors"

interface StatusBadgeProps {
  status: "Available" | "Not Available" | "Pending" | "Approved"
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case "Available":
      case "Approved":
        return colors.success
      case "Not Available":
        return colors.error
      case "Pending":
        return colors.warning
      default:
        return colors.textSecondary
    }
  }

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.sm / 2,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.small,
    alignSelf: "flex-start",
  },
  text: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: "600",
  },
})

export default StatusBadge
