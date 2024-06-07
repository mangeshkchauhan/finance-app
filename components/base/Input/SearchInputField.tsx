import React from 'react'
import { TextInputProps, View, TextInput } from 'react-native'
import { G, Path, Svg } from 'react-native-svg'

export interface InputFieldProps extends TextInputProps {
  disabled?: boolean
  error?: string
}

const SearchInputField: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <View className="flex-row bg-[#EBEBEB] w-full items-center rounded-xl h-14">
      <View className="mx-3">
        <Svg height={24} width={24} viewBox="0 0 24 24" fill="none" stroke="#999999">
          <G id="SVGRepo_bgCarrier" stroke-width="4"></G>
          <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
          <G id="SVGRepo_iconCarrier">
            <Path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#999999"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></Path>
          </G>
        </Svg>
      </View>
      <TextInput
        placeholder="Search for stocks"
        className="w-full h-full flex-row items-center flex-1 text-lg text-[#090909]"
        cursorColor={'black'}
        {...props}
      />
    </View>
  )
}

export default SearchInputField
