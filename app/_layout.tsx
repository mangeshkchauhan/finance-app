import { useFonts } from 'expo-font'
import { Link, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Pressable, Text, View } from 'react-native'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                animation: 'slide_from_right',
                headerShown: true,
                headerTitleAlign: 'center',
                headerBackButtonMenuEnabled: false,
                headerBackVisible: false,
                headerRight: () => (
                  <Link href={'/cart'} className="bg-[#ECD996] active:bg-[#ecd996be] px-2 py-1 rounded-lg">
                    <Text>Go To Cart</Text>
                  </Link>
                ),
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="home"
                options={{
                  title: 'Home',
                }}
              />
              <Stack.Screen
                name="stock"
                options={{
                  title: 'Stock',
                  headerBackButtonMenuEnabled: true,
                  headerBackVisible: true,
                }}
              />
              <Stack.Screen
                name="cart"
                options={{
                  headerShown: true,
                  title: 'Cart',
                  headerTitleAlign: 'center',
                  headerBackButtonMenuEnabled: true,
                  headerBackVisible: true,
                  headerRight: () => <></>,
                }}
              />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  )
}
