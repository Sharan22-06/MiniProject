"use client"

import React from "react"
import { ActivityIndicator } from "react-native"
import useBottomSpacing from "../../hooks/useBottomSpacing"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRoute, useNavigation } from "@react-navigation/native"
import { colors, spacing, typography, borderRadius } from "../../constants/colors"
import { mockBooks } from "../../mockData"

const BookDetailScreen: React.FC = () => {
  const route: any = useRoute()
  const { bookId } = route.params || {}
  const navigation = useNavigation<any>()
  const [book, setBook] = React.useState<any>(null)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { getBookById } = await import("../../../lib/firebase")
        const fbBook = await getBookById(bookId)
        if (mounted && fbBook) {
          setBook(fbBook)
          return
        }
      } catch (e) {}

      // fallback to mock data
      const mb = mockBooks.find((b) => b.id === bookId) || mockBooks[0]
      if (mounted) setBook(mb)
    })()
    return () => {
      mounted = false
    }
  }, [bookId])

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

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: spacing.md }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    )
  }

  const description = (book as any).description || `"${(book as any).title}" is a ${(book as any).category} book located on shelf ${(book as any).shelf}.`

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: spacing.xl + 88 }]}> 
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              try {
                navigation.goBack()
              } catch (e) {
                navigation.navigate("Search")
              }
            }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          {book.image ? (
            <Image source={{ uri: book.image }} style={{ width: 96, height: 140, borderRadius: borderRadius.small }} />
          ) : (
            <Ionicons name="book" size={48} color={colors.primary} />
          )}
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Category</Text>
          <Text style={styles.sectionText}>{book.category}</Text>

          <Text style={styles.sectionTitle}>Shelf</Text>
          <Text style={styles.sectionText}>{book.shelf}</Text>

          <Text style={styles.sectionTitle}>Status</Text>
          <Text style={styles.sectionText}>{book.status}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{description}</Text>
          {book.ownerId ? (
            <Text style={{ marginTop: spacing.md, color: currentUid === book.ownerId ? colors.primary : colors.textSecondary }}>
              {currentUid === book.ownerId ? "Published by you" : `Published by ${book.ownerId}`}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  headerRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm },
  backButton: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  header: { alignItems: "center", marginBottom: spacing.lg },
  title: { ...typography.headingSmall, color: colors.text, marginTop: spacing.sm },
  author: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.sm },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
  },
  sectionTitle: { ...typography.headingSmall, color: colors.text, marginTop: spacing.md },
  sectionText: { ...typography.body, color: colors.text, marginTop: spacing.sm },
})

export default BookDetailScreen
