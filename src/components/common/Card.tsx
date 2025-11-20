import type React from "react"
import { View, StyleSheet } from "react-native"
import { colors, spacing, borderRadius, shadows } from "../../constants/colors"

interface CardProps {
  children: React.ReactNode
  padding?: number
  onPress?: () => void
}

const Card: React.FC<CardProps> = ({ children, padding = spacing.md }) => {
  return <View style={[styles.card, { padding }]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.medium,
    ...shadows.small,
  },
})

export default Card
