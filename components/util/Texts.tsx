import React from 'react'
import { Text, TextProps } from 'react-native'
import typography from '@/assets/typography'

const H1: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[typography.header1, style]} {...props}>
      {children}
    </Text>
  )
}

const H5: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[typography.header5, style]} {...props}>
      {children}
    </Text>
  )
}

const BodyLarge: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[typography.bodyLarge, style]} {...props}>
      {children}
    </Text>
  )
}

const Body: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[typography.body, style]} {...props}>
      {children}
    </Text>
  )
}

const Label: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[typography.label, style]} {...props}>
      {children}
    </Text>
  )
}

const Assistive: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[typography.assistive, style]} {...props}>
      {children}
    </Text>
  )
}

export default {
  H1,
  H5,
  BodyLarge,
  Body,
  Label,
  Assistive,
}
