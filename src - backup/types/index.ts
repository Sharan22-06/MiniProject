export interface User {
  id: string
  name: string
  email: string
  role: "User"
}

export interface Book {
  id: string
  title: string
  author: string
  category: string
  shelf: string
  status: "Available" | "Not Available"
  image?: string
  ownerId?: string
}

export type RootStackParamList = {
  Auth: undefined
  MainUser: undefined
}

export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
}

export type UserTabsParamList = {
  Home: undefined
  Search: undefined
  Profile: undefined
}

export type AdminTabsParamList = {
  Home: undefined
  Dashboard: undefined
  Search: undefined
  Profile: undefined
}

