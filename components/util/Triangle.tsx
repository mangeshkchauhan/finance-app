import { View } from 'react-native'

const Triangle = ({
  direction = 'up',
  color = 'black',
}: {
  direction: 'up' | 'down' | 'left' | 'right'
  color?: string
}) => {
  if (direction === 'up') {
    return (
      <View
        className={`h-0 w-0 border-solid border-l-transparent border-r-transparent border-t-transparent bg-transparent`}
        style={[
          {
            borderBottomColor: '#34C759',
            borderTopWidth: 0,
            borderRightWidth: 8,
            borderBottomWidth: 11,
            borderLeftWidth: 8,
          },
        ]}
      />
    )
  } else if (direction === 'down') {
    return (
      <View
        className={`h-0 w-0 border-solid border-b-transparent border-l-transparent border-r-transparent bg-transparent`}
        style={[
          {
            borderTopWidth: 11,
            borderTopColor: '#FF3B30',
            borderRightWidth: 8,
            borderBottomWidth: 0,
            borderLeftWidth: 8,
          },
        ]}
      />
    )
  } else if (direction === 'left') {
    return (
      <View
        className={`h-0 w-0 border-solid border-b-transparent border-l-transparent border-t-transparent bg-transparent`}
        style={[
          {
            borderRightColor: color,
            borderTopWidth: 16 / 2,
            borderRightWidth: 16,
            borderBottomWidth: 16 / 2,
            borderLeftWidth: 0,
          },
        ]}
      />
    )
  } else {
    return (
      <View
        className={`h-0 w-0 border-solid border-b-transparent border-r-transparent border-t-transparent bg-transparent`}
        style={[
          {
            borderLeftColor: color,
            borderTopWidth: 16 / 2,
            borderRightWidth: 0,
            borderBottomWidth: 16 / 2,
            borderLeftWidth: 16,
          },
        ]}
      />
    )
  }
}

export default Triangle
