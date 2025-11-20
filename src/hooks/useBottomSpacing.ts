import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"

export default function useBottomSpacing(extra = 8) {
  const insets = useSafeAreaInsets()
  // useBottomTabBarHeight returns 0 when not inside a tab navigator
  const tabBarHeight = useBottomTabBarHeight ? useBottomTabBarHeight() : 0
  return (insets?.bottom || 0) + (tabBarHeight || 0) + extra
}
