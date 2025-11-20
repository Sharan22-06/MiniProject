"use client"

import React from "react"
import useBottomSpacing from "../../hooks/useBottomSpacing"
import { useState } from "react"
import { ScrollView, View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Card from "../../components/common/Card"
import StatusBadge from "../../components/common/StatusBadge"
import { colors, spacing, typography, borderRadius, shadows } from "../../constants/colors"
import { mockBooks } from "../../mockData"

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null)
  const [books, setBooks] = React.useState<any[] | null>(null)

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

  // derive categories from data so filters match available book categories
  const categories = ["All", ...Array.from(new Set((books || mockBooks).map((b: any) => b.category))).sort()]
  const availability = ["All", "Available", "Not Available"]
  const filteredBooks = (books || mockBooks).filter((book: any) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === "All" || book.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesAvailability = !selectedAvailability || selectedAvailability === "All" || book.status === selectedAvailability
    return matchesSearch && matchesCategory && matchesAvailability
  })

  const navigation = useNavigation<any>()
  const bottomPad = useBottomSpacing()
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomPad }}>
        <View style={styles.header}>
          <Text style={styles.title}>Search Books</Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.searchContainer, shadows.small]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by title or author..."
              placeholderTextColor={colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <Text style={styles.filterTitle}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {categories.map((category) => (
              <View
                key={category}
                onTouchEnd={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                <View style={[styles.chip, selectedCategory === category && styles.chipActive]}>
                  <Text style={[styles.chipText, selectedCategory === category && styles.chipTextActive]}>
                    {category}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Availability</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {availability.map((avail) => (
              <View
                key={avail}
                onTouchEnd={() => setSelectedAvailability(selectedAvailability === avail ? null : avail)}
              >
                <View style={[styles.chip, selectedAvailability === avail && styles.chipActive]}>
                  <Text style={[styles.chipText, selectedAvailability === avail && styles.chipTextActive]}>
                    {avail}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.resultsTitle}>Results ({filteredBooks.length})</Text>

          {filteredBooks.length > 0 ? (
            <FlatList
              data={filteredBooks}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Card padding={spacing.md}>
                    <TouchableOpacity onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}>
                      <View style={styles.bookCard}>
                        <View style={styles.bookCover}>
                          {item.image ? (
                            <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%", borderRadius: borderRadius.small }} />
                          ) : (
                            <Ionicons name="book" size={40} color={colors.primary} />
                          )}
                        </View>
                        <View style={styles.bookDetails}>
                          <Text style={styles.bookTitle}>{item.title}</Text>
                          <Text style={styles.bookAuthor}>{item.author}</Text>
                          {item.ownerId && currentUid === item.ownerId ? (
                            <Text style={styles.youBadge}>You</Text>
                          ) : null}
                          <Text style={styles.bookCategory}>
                            Category: <Text style={styles.bold}>{item.category}</Text>
                          </Text>
                          <Text style={styles.bookShelf}>
                            Shelf: <Text style={styles.bold}>{item.shelf}</Text>
                          </Text>
                          <View style={styles.badgeContainer}>
                            <StatusBadge status={item.status as any} />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                </Card>
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No books found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          )}
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
  header: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.headingMedium,
    color: colors.surface,
  },
  content: {
    padding: spacing.md,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  filterTitle: {
    ...typography.headingSmall,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: spacing.lg,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.small,
    marginRight: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.surface,
    fontWeight: "600",
  },
  resultsTitle: {
    ...typography.headingSmall,
    color: colors.text,
    marginBottom: spacing.md,
  },
  bookCard: {
    flexDirection: "row",
  },
  bookCover: {
    width: 80,
    height: 100,
    backgroundColor: colors.background,
    borderRadius: borderRadius.small,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    ...typography.headingSmall,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bookAuthor: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  bookCategory: {
    ...typography.caption,
    color: colors.text,
    marginBottom: spacing.sm / 2,
  },
  bookShelf: {
    ...typography.caption,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bold: {
    fontWeight: "600",
  },
  badgeContainer: {
    marginTop: spacing.sm,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    ...typography.headingSmall,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtext: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  youBadge: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    color: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    fontWeight: "600",
    overflow: "hidden",
  },
})

export default SearchScreen
