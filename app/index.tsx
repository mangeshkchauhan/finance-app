import Button from '@/components/base/Button'
import InputField from '@/components/base/InputField'
import BaseView from '@/components/util/BaseView'
import { useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/user/userSlice'
import { useCallback, useState } from 'react'
import { View, Image, Keyboard, Pressable, Text } from 'react-native'
import { router } from 'expo-router'
import { isValidEmail } from '@/utils/utils'

export default function Login() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = useCallback((email: string, password: string): void => {
    setError('')
    if (isValidEmail(email)) {
      dispatch(setUser({ email, password }))
      setEmail('')
      setPassword('')
      router.navigate('/home')
    } else {
      setError('Enter a valid email')
    }
  }, [])

  return (
    <BaseView style={{ backgroundColor: '#000' }}>
      <Pressable className="p-4 min-h-screen" onPress={() => Keyboard.dismiss()}>
        <View className="items-center">
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text className="text-white text-3xl font-semibold mb-6 ">Sign In</Text>
          <InputField
            containerProps={{ className: 'mb-4' }}
            label="Email"
            inputMode="email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          <InputField
            containerProps={{ className: 'mb-4' }}
            keyboardType="default"
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="********"
          />

          {error && <Text className="text-red-300 text-sm font-semibold text-start ml-2">{error}</Text>}

          <Button
            className="mt-4"
            disabled={!email || !password}
            title="Login"
            onPress={() => handleLogin(email, password)}
          />
        </View>
      </Pressable>
    </BaseView>
  )
}
