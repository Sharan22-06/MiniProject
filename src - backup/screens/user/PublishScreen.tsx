import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native"
import useBottomSpacing from "../../hooks/useBottomSpacing"
import CustomInput from "../../components/common/CustomInput"
import CustomButton from "../../components/common/CustomButton"
import { colors, spacing, typography, borderRadius } from "../../constants/colors"
import { useNavigation } from "@react-navigation/native"
import { mockBooks } from "../../mockData"
import { publishBook } from "../../../lib/firebase"

const PublishScreen: React.FC = () => {
  const navigation = useNavigation<any>()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePublish = () => {
    if (!title || !author) {
      Alert.alert("Error", "Please provide the book title and author")
      return
    }

    setLoading(true)
    ;(async () => {
      try {
        const id = await publishBook({
          title,
          author,
          category: category || "User Submitted",
          image: image || undefined,
          description: description || undefined,
          shelf: "User",
          status: "Available",
        })

        // Also add to in-memory list for immediate UI feedback
        try {
          mockBooks.unshift({ id, title, author, category: category || "User Submitted", shelf: "User", status: "Available", image, description } as any)
        } catch (e) {}

        Alert.alert("Published", "Your book has been published to the library.")
        navigation.navigate("BookDetail", { bookId: id })
      } catch (err: any) {
        Alert.alert("Publish failed", err?.message || String(err))
      } finally {
        setLoading(false)
      }
    })()
  }

  const bottomPad = useBottomSpacing()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomPad }] }>
        <Text style={styles.title}>Publish Your Book</Text>

        <View style={styles.form}>
          <CustomInput label="Book Title" placeholder="Enter book title" value={title} onChangeText={setTitle} />
          <CustomInput label="Author" placeholder="Author name" value={author} onChangeText={setAuthor} />
          <CustomInput label="Category" placeholder="e.g. Fiction, Romance, Self-Help" value={category} onChangeText={setCategory} />
          <CustomInput label="Cover Image URL" placeholder="https://..." value={image} onChangeText={setImage} />
          <CustomInput label="Description" placeholder="Short description" value={description} onChangeText={setDescription} multiline />

          <CustomButton title="Publish" onPress={handlePublish} loading={loading} fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { ...typography.headingSmall, color: colors.text, marginBottom: spacing.md, textAlign: "center" },
  form: { backgroundColor: colors.surface, borderRadius: borderRadius.medium, padding: spacing.lg },
})

export default PublishScreen
