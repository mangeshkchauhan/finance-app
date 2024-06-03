import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import BaseView from '@/components/util/BaseView'
import Texts from '@/components/util/Texts'

const Home = () => {
  const { email, password } = useAppSelector((state) => state.user)
  return (
    <BaseView>
      <Texts.H1 className="text-black">Home</Texts.H1>
      <Texts.BodyLarge className="text-black">Email: {email}</Texts.BodyLarge>
      <Texts.BodyLarge className="text-black">Password: {password}</Texts.BodyLarge>
    </BaseView>
  )
}

export default Home
