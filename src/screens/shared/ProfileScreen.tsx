import type React from "react"
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Alert } from "react-native"
import { useNavigation, CommonActions } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import Card from "../../components/common/Card"
import CustomButton from "../../components/common/CustomButton"
import { colors, spacing, typography } from "../../constants/colors"

interface ProfileScreenProps {
  userName?: string
  userEmail?: string
  userRole?: string
  onLogout?: () => void
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userRole = "User",
  onLogout = () => {},
}) => {
  const navigation = useNavigation<any>()

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
          {
            text: "Logout",
            style: "destructive",
            onPress: () => {
              // First call parent logout handler to clear auth state
              try {
                onLogout()
              } catch (e) {
                // ignore
              }

              // Reset to the Auth stack and ensure the Login screen is the active child.
              try {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Auth",
                        // nested state ensures the Login screen is active inside Auth
                        state: { routes: [{ name: "Login" }] },
                      },
                    ],
                  }),
                )
              } catch (e) {
                // fallbacks
                try {
                  // try to navigate to the Auth stack then Login explicitly
                  navigation.navigate("Auth")
                  navigation.navigate("Login")
                } catch (e) {
                  // nothing else we can do here
                }
              }
            },
          },
    ])
  }

  const profileItems = [
    { label: "Name", value: userName, icon: "person" },
    { label: "Email", value: userEmail, icon: "mail" },
    { label: "Role", value: userRole, icon: "shield-checkmark" },
  ]

  return (
    <SafeAreaView style={styles.container}>
      {/* use safe area inset so content isn't obscured by tab bar on phones */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: require("../../hooks/useBottomSpacing").default() }}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
            </View>
            <Text style={styles.avatarName}>{userName}</Text>
            <Text style={styles.avatarRole}>{userRole}</Text>
          </View>

          <Card padding={spacing.lg}>
            <View style={styles.infoContainer}>
              {profileItems.map((item, index) => (
                <View key={item.label}>
                  <View style={styles.infoItem}>
                    <View style={styles.infoLabelContainer}>
                      <Ionicons name={item.icon as any} size={20} color={colors.primary} />
                      <Text style={styles.infoLabel}>{item.label}</Text>
                    </View>
                    <Text style={styles.infoValue}>{item.value}</Text>
                  </View>
                  {index < profileItems.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </Card>

          <View style={styles.settingsSection}>
            <Text style={styles.settingsTitle}>Account Settings</Text>
            <Card padding={spacing.md}>
              <Text style={styles.settingItem}>Change Password</Text>
              <View style={styles.divider} />
              <Text style={styles.settingItem}>Privacy Settings</Text>
              <View style={styles.divider} />
              <Text style={styles.settingItem}>Notifications</Text>
            </Card>
          </View>

          <CustomButton title="Logout" onPress={handleLogout} variant="secondary" fullWidth />
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
  avatarContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    ...typography.headingLarge,
    color: colors.surface,
    fontWeight: "700",
  },
  avatarName: {
    ...typography.headingSmall,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  avatarRole: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  infoContainer: {
    gap: 0,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  infoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.md,
    fontWeight: "500",
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  settingsSection: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  settingsTitle: {
    ...typography.headingSmall,
    color: colors.text,
    marginBottom: spacing.md,
  },
  settingItem: {
    ...typography.body,
    color: colors.text,
    paddingVertical: spacing.md,
  },
})

export default ProfileScreen
