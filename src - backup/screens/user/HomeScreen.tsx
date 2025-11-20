import React from "react"
import useBottomSpacing from "../../hooks/useBottomSpacing"
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Card from "../../components/common/Card"
import { colors, spacing, typography, borderRadius, shadows } from "../../constants/colors"
import { useNavigation } from "@react-navigation/native"
import { mockBooks } from "../../mockData"

interface HomeScreenProps {
  userName?: string
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userName }) => {
  const navigation = useNavigation<any>()
  const [displayName, setDisplayName] = React.useState<string | null>(null)
  const [currentUid, setCurrentUid] = React.useState<string | null>(null)
  const bottomPad = useBottomSpacing()

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { getCurrentUser } = await import("../../../lib/firebase")
        const u = getCurrentUser()
        if (!mounted) return
        if (u) {
          setCurrentUid(u.uid ?? null)
          // prefer displayName from auth, fallback to passed prop
          setDisplayName(u.displayName ?? userName ?? null)
        } else {
          setDisplayName(userName ?? null)
        }
      } catch (e) {
        setDisplayName(userName ?? null)
      }
    })()
    return () => {
      mounted = false
    }
  }, [userName])

  const quickActions = [
    { id: "1", title: "Search", icon: "search", color: colors.primary, action: "Search" },
    { id: "2", title: "Profile", icon: "person", color: colors.success, action: "Profile" },
    { id: "3", title: "Publish", icon: "cloud-upload", color: colors.warning, action: "Publish" },
  ]

  const books = mockBooks

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomPad }}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello{displayName ? ", " + displayName : ""}!</Text>
          <Text style={styles.subtitle}>Welcome to SmartLibrary</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={quickActions}
            keyExtractor={(i) => i.id}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={styles.cardRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.actionCard, { borderColor: item.color + "33" }]}
                onPress={() => navigation.navigate(item.action)}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}> 
                  <Ionicons name={item.icon as any} size={20} color={colors.surface} />
                </View>
                <Text style={styles.actionTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.sectionTitle}>All Books</Text>
          <FlatList
            data={books.slice(0, 12)}
            keyExtractor={(b) => b.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}>
                <Card padding={spacing.sm}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={[styles.bookCover, { width: 56, height: 84, marginRight: spacing.md }]}> 
                      {item.image ? (
                        <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%", borderRadius: borderRadius.small }} />
                      ) : (
                        <Ionicons name="book" size={28} color={colors.primary} />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.bookTitle}>{item.title}</Text>
                      <Text style={styles.bookAuthor}>{item.author}</Text>
                    </View>
                    {'ownerId' in item && (item as any).ownerId ? (
                      <Text style={styles.youBadge}>{(item as any).ownerId === currentUid ? "You" : ""}</Text>
                    ) : null}
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    paddingTop: spacing.xl + spacing.md,
    paddingBottom: spacing.xl + spacing.sm,
  },
  greeting: { ...typography.headingLarge, color: colors.surface, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.surface, opacity: 0.9 },
  content: { padding: spacing.md },
  sectionTitle: { ...typography.headingSmall, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.md },
  cardRow: { justifyContent: "space-between", marginBottom: spacing.md },
  actionCard: { flex: 1, marginHorizontal: spacing.sm, borderRadius: borderRadius.medium, padding: spacing.md, alignItems: "center", borderWidth: 1, backgroundColor: colors.surface, ...shadows.small },
  iconContainer: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", marginBottom: spacing.sm },
  actionTitle: { ...typography.bodySmall, color: colors.text, textAlign: "center", fontWeight: "500" },
  bookCover: { width: 56, height: 84, backgroundColor: colors.background, borderRadius: borderRadius.small, justifyContent: "center", alignItems: "center" },
  bookTitle: { ...typography.headingSmall, color: colors.text, marginBottom: spacing.xs },
  bookAuthor: { ...typography.bodySmall, color: colors.textSecondary },
  youBadge: { marginTop: spacing.sm, backgroundColor: colors.primary, color: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 6, alignSelf: "flex-start", fontWeight: "600" },
})

export default HomeScreen
