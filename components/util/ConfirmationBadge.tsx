import { FC, useEffect } from 'react'
import { Text, View, ViewProps } from 'react-native'
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { Path, Svg } from 'react-native-svg'

interface ConfirmationBadgeProps extends ViewProps {}

const ConfirmationBadge: FC<ConfirmationBadgeProps> = ({ className, ...props }) => {
  const middleValue = useSharedValue(0)
  const outerValue = useSharedValue(0)

  useEffect(() => {
    middleValue.value = 0
    outerValue.value = 0
    middleValue.value = withDelay(0, withTiming(144, { duration: 800 }))
    outerValue.value = withDelay(0, withTiming(178, { duration: 1200 }))
  }, [])

  return (
    <View className={`h-[178] items-center justify-center ${className}`}>
      <Animated.View
        className="aspect-square items-center justify-center self-center rounded-full bg-green-400/20"
        style={{
          width: outerValue,
          height: outerValue,
        }}
        {...props}
      >
        <Animated.View
          className="items-center justify-center rounded-full bg-green-400/20"
          style={{
            width: middleValue,
            height: middleValue,
          }}
        >
          <View className="absolute h-[100] w-[100] items-center justify-center rounded-full bg-green-400">
            <Text className={`text-4xl font-semibold`}>{'✔️'}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default ConfirmationBadge
