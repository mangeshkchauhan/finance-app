import { PressableProps, Pressable, Text } from 'react-native'
import React from 'react'

type TButton = {
  title: string
} & PressableProps

const Button: React.FC<TButton> = ({ title, disabled, className, style, ...props }) => {
  return (
    <Pressable
      className={` rounded-full p-4 text-center ${
        disabled ? 'bg-gray-300/90' : 'bg-[#ECD996] active:bg-[#ecd996be]'
      } ${className}`}
      style={style}
      {...props}
    >
      <Text className={` ${disabled ? 'text-gray-400' : 'text-black'} font-bold text-center text-base`}>{title}</Text>
    </Pressable>
  )
}

export default Button
