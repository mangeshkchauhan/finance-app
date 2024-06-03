import { PressableProps, Pressable } from 'react-native'
import React from 'react'
import Texts from '../util/Texts'

type TButton = {
  title: string
} & PressableProps

const Button: React.FC<TButton> = ({ title, disabled, className, style, ...props }) => {
  return (
    <Pressable
      className={` rounded-full p-4 text-center ${disabled ? 'bg-gray-300/90' : 'bg-amber-200/70'} ${className}`}
      style={style}
      {...props}
    >
      <Texts.BodyLarge className={` ${disabled ? 'text-gray-400' : 'text-white'} font-bold text-center`}>
        {title}
      </Texts.BodyLarge>
    </Pressable>
  )
}

export default Button
