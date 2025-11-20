import type React from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import { colors } from "../../constants/colors"

const LoadingSpinner: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default LoadingSpinner
