import React from "react"
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import useBottomSpacing from "../../hooks/useBottomSpacing"
import { Ionicons } from "@expo/vector-icons"
import { useRoute, useNavigation } from "@react-navigation/native"
import { colors, spacing, typography, borderRadius } from "../../constants/colors"
import { mockBooks } from "../../mockData"

const CategoryListScreen: React.FC = () => {
  const route: any = useRoute()
  const { category } = route.params || { category: "" }
  const navigation = useNavigation<any>()

  const [books, setBooks] = React.useState<any[] | null>(null)
  const [currentUid, setCurrentUid] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { getCurrentUser } = await import("../../../lib/firebase")
        const u = getCurrentUser()
        if (mounted) setCurrentUid(u ? u.uid : null)
      } catch (e) {}
    })()
    return () => {
      mounted = false
    }
  }, [])

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { listenBooks } = await import("../../../lib/firebase")
        const unsub = listenBooks((fb: any[]) => {
          if (!mounted) return
          if (fb && fb.length) setBooks(fb)
        }, { limit: 200 })
        setTimeout(() => {
          if (mounted && !books) setBooks(mockBooks as any)
        }, 300)
        return () => unsub()
      } catch (e) {
        if (mounted) setBooks(mockBooks as any)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const bottomPad = useBottomSpacing()

  let display = (books || mockBooks) as any[]
  if (category === "Popular") {
    display = display.slice(0, 10)
  } else if (category === "Recommended") {
    display = display.filter((b) => b.status === "Available").slice(0, 20)
  } else if (category) {
    display = display.filter((b) => b.category.toLowerCase() === category.toLowerCase())
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{category}</Text>
      </View>

          <FlatList
            data={display}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: spacing.md, paddingBottom: bottomPad }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
          >
            <View style={styles.iconWrap}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={{ width: 44, height: 64, borderRadius: 6 }} />
              ) : (
                <Ionicons name="book" size={28} color={colors.primary} />
              )}
            </View>
            <View style={styles.info}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.subtitleText}>{item.author}</Text>
            {item.ownerId && currentUid === item.ownerId ? <Text style={styles.youBadge}>You</Text> : null}
            </View>
            <Text style={styles.status}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={{ padding: spacing.md }}>
            <Text style={styles.emptyText}>No books found for this category.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  backButton: { marginRight: spacing.md },
  title: { ...typography.headingSmall, color: colors.text },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    marginBottom: spacing.sm,
  },
  iconWrap: { width: 44, height: 44, justifyContent: "center", alignItems: "center", marginRight: spacing.md },
  info: { flex: 1 },
  titleText: { ...typography.body, color: colors.text, fontWeight: "600" },
  subtitleText: { ...typography.caption, color: colors.textSecondary },
  status: { ...typography.caption, color: colors.textSecondary },
  emptyText: { ...typography.body, color: colors.textSecondary },
  youBadge: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    color: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
})

export default CategoryListScreen
