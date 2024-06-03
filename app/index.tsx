import Button from '@/components/base/Button'
import InputField from '@/components/base/InputField'
import BaseView from '@/components/util/BaseView'
import Texts from '@/components/util/Texts'
import { useAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/user/userSlice'
import { useCallback, useState } from 'react'
import { View, Image, Keyboard, Pressable } from 'react-native'
import { router } from 'expo-router'

export default function Login() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = useCallback((email: string, password: string): void => {
    console.log('email', email)
    console.log('password', password)
    setError('')
    if (isValidEmail(email)) {
      dispatch(setUser({ email, password }))
      router.push('/home')
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
          <Texts.H1 className="text-white mb-6">Sign In</Texts.H1>
          <InputField
            containerProps={{ className: 'mb-4' }}
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          <InputField
            containerProps={{ className: 'mb-4' }}
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="********"
          />

          {error && <Texts.Body className="text-red-300 text-start ml-2">{error}</Texts.Body>}

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

const isValidEmail = (email: string) => {
  email = email.trim()
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRe.test(email)
}
