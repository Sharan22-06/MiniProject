export const colors = {
  // Professional purple-centric palette (keeps your chosen light purple background)
  primary: "#5B21B6", // deep violet for primary actions (buttons, icons)
  primaryLight: "#8E63FF", // lighter accent for hover/active states
  primaryDark: "#3A0F9A", // darker shade for pressed states
  onPrimary: "#FFFFFF", // text/icons on primary
  accent: "#F6C85F", // warm gold accent for highlights
  background: "#EBD6FB", // app background (user requested)
  surface: "#FFFFFF", // surfaces and cards remain white for clean contrast
  surfaceVariant: "#F6EEFB", // subtle tinted surface for cards/sections
  text: "#1F0F2A", // high-contrast text (dark plum)
  textSecondary: "#6D4BA3", // muted purple for secondary text
  disabled: "#CFC7DF", // disabled/placeholder color
  success: "#2FAF6A", // green for success states
  warning: "#F6A623", // amber for warnings
  error: "#E03E3E", // red for errors
  border: "#E6D8FB", // very subtle purple-tinted border
  shadowColor: "#0A0512",
}

export const typography = {
  headingLarge: {
    fontSize: 28,
    fontWeight: "600" as const,
  },
  headingMedium: {
    fontSize: 22,
    fontWeight: "600" as const,
  },
  headingSmall: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
}

export const shadows = {
  small: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
}
