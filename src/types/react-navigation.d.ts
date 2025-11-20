declare module '@react-navigation/native' {
  export function useNavigation<T = any>(): T
  export function useRoute<T = any>(): T
  export const NavigationContainer: any
  export const CommonActions: {
    navigate: (...args: any[]) => any
    reset: (...args: any[]) => any
    goBack: () => any
  }
  export type ParamListBase = Record<string, object | undefined>
  export function createNavigationContainerRef<T = any>(): any
}

declare module '@react-navigation/native-stack' {
  export function createNativeStackNavigator<ParamList = any>(): any
  export type NativeStackScreenProps<T extends Record<string, any>, K extends keyof T> = any
}

declare module '@react-navigation/bottom-tabs' {
  export function createBottomTabNavigator<ParamList = any>(): any
  export function useBottomTabBarHeight(): number
  export type BottomTabBarHeightCallbackProps = any
}

declare module 'clsx' {
  export function clsx(...args: any[]): string
  export type ClassValue = any
}

declare module 'tailwind-merge' {
  export function twMerge(...inputs: any[]): string
}

declare module 'lucide-react' {
  export const ChevronDownIcon: any
  export const X: any
  export const MoreHorizontal: any
  export const CheckIcon: any
  export const ArrowLeft: any
  export const ArrowRight: any
  export const Loader2Icon: any
  export const MinusIcon: any
  export const PanelLeftIcon: any
  export const CircleIcon: any
  export const GripVerticalIcon: any
  export const SearchIcon: any
  export const ChevronRight: any
  export const ArrowRightIcon: any
  export const ArrowLeftIcon: any
}

declare module 'class-variance-authority' {
  export function cva(...args: any[]): any
  export type VariantProps<T> = any
}

declare module '@radix-ui/react-toast' {
  export const Provider: any
  export const Root: any
  export const Title: any
  export const Description: any
  export const Action: any
  export const Viewport: any
  export const Close: any
}
