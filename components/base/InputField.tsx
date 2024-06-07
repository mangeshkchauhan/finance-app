import React from 'react'
import { Text, TextInput, TextInputProps, TextProps, View, ViewProps } from 'react-native'
import If from '../util/If'

export interface InputFieldProps extends TextInputProps {
  label?: string
  containerProps?: ViewProps
  labelProps?: TextProps
  isBottomSheetInput?: boolean
  disabled?: boolean
  error?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  containerProps,
  labelProps,
  disabled,
  className,
  style,
  ...props
}) => {
  const { className: containerClassName, ...containerRest } = {
    ...containerProps,
  }
  const { className: labelClassName, ...labelRest } = { ...labelProps }
  return (
    <>
      <If condition={!!label}>
        <Text className={`mb-2 text-xs font-semibold text-white ${labelClassName}`} {...labelRest}>
          {label}
        </Text>
      </If>

      <View
        className={`flex h-[48] max-h-[48] min-h-[48] min-w-[171] flex-row items-center justify-between rounded-lg border focus:border-white border-white px-4  ${containerClassName}`}
        {...containerRest}
      >
        <TextInput
          className={`flex-grow self-center text-left font-medium text-white max-h-[48] ${className}`}
          underlineColorAndroid="transparent"
          editable={!disabled}
          placeholderTextColor="gray"
          returnKeyType="next"
          {...props}
        />
      </View>
    </>
  )
}

export default InputField
