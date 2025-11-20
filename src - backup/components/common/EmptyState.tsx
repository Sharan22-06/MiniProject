import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, typography } from "../../constants/colors"
import Card from "./Card"

interface EmptyStateProps {
  title: string
  message: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  content: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.headingSmall,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
})

export default EmptyState
