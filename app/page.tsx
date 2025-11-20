"use client"
/// <reference types="react" />
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

const screens = [
  {
    name: "Login",
    description: "User authentication screen with email/password login and signup navigation",
    icon: "🔐",
  },
  {
    name: "Signup",
    description: "Account creation with password strength indicator and terms acceptance",
    icon: "📝",
  },
  {
    name: "User Home",
    description: "User dashboard with quick actions and featured books",
    icon: "🏠",
  },
  {
    name: "Book Search",
    description: "Advanced search with category and availability filtering",
    icon: "🔍",
  },
  {
    name: "Admin Dashboard",
    description: "2x2 grid of admin actions with quick stats overview",
    icon: "📊",
  },
  {
    name: "User Requests",
    description: "Manage pending user requests with approve/reject actions",
    icon: "📋",
  },
  {
    name: "Register Book",
    description: "Form to register new books with category and shelf number",
    icon: "📚",
  },
  {
    name: "Manage Books",
    description: "Search and edit existing books in the library",
    icon: "📖",
  },
  {
    name: "User Profile",
    description: "User information display and logout functionality",
    icon: "👤",
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4">
            <span className="text-3xl">📱</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">SmartLibrary Expo App</h1>
          <p className="text-xl text-gray-600 mb-6">A complete React Native mobile app for library management</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://docs.expo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Expo Documentation
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Download Code
            </a>
          </div>
        </div>

        {/* Getting Started */}
        <Card className="mb-12 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Installation:</h3>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                {`npm install expo
npx create-expo-app smartlibrary
cd smartlibrary
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @expo/vector-icons`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Running the App:</h3>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">{`expo start`}</pre>
              <p className="text-sm mt-2">Then press 'i' for iOS or 'a' for Android simulator</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Demo Credentials:</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  • <strong>Admin:</strong> admin@test.com / password
                </li>
                <li>
                  • <strong>User:</strong> user@test.com / password
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Role-Based Navigation",
                description: "Different UIs for users and admins",
              },
              {
                title: "Book Search & Filter",
                description: "Filter by category, availability, and author",
              },
              {
                title: "Admin Dashboard",
                description: "Manage books and user requests",
              },
              {
                title: "User Authentication",
                description: "Login and signup with password validation",
              },
              {
                title: "Responsive Design",
                description: "Works on all screen sizes",
              },
              {
                title: "Professional UI",
                description: "Consistent design system throughout",
              },
            ].map((feature, i) => (
              <Card key={i} className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Screens Overview */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">9 Fully Functional Screens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.map((screen, i) => (
              <Card key={i} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{screen.icon}</span>
                    <CardTitle className="text-lg">{screen.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{screen.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Structure */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Structure</h2>
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <pre className="text-sm overflow-x-auto">
                {`src/
├── components/
│   └── common/
│       ├── CustomButton.tsx
│       ├── CustomInput.tsx
│       ├── Card.tsx
│       ├── StatusBadge.tsx
│       ├── LoadingSpinner.tsx
│       └── EmptyState.tsx
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   └── SignupScreen.tsx
│   ├── user/
│   │   ├── HomeScreen.tsx
│   │   └── SearchScreen.tsx
│   ├── admin/
│   │   ├── AdminHomeScreen.tsx
│   │   ├── AdminDashboardScreen.tsx
│   │   ├── RegisterBookScreen.tsx
│   │   └── ManageBooksScreen.tsx
│   └── shared/
│       └── ProfileScreen.tsx
├── navigation/
│   ├── AuthStack.tsx
│   ├── UserTabs.tsx
│   ├── AdminTabs.tsx
│   └── RootNavigator.tsx
├── constants/
│   └── colors.ts
├── types/
│   └── index.ts
├── mockData/
│   └── index.ts
└── App.tsx`}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-4">Built with:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["React Native", "Expo SDK 49+", "TypeScript", "React Navigation v6", "@expo/vector-icons"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
