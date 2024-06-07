import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView, Swipeable } from 'react-native-gesture-handler'
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

type SwiperProps = {
  orderPlaced: boolean
  setOrderPlaced: () => void
}

const Swiper: React.FC<SwiperProps> = ({ orderPlaced, setOrderPlaced }) => {
  const translateX = useSharedValue(0)

  const [boxDimensions, setBoxDimensions] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [circleDimensions, setCircleDimensions] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const pan = Gesture.Pan()
    .onChange((event) => {
      const maxOffset = boxDimensions.width - circleDimensions.width - 20
      if (event.translationX >= 0 && event.translationX <= maxOffset && event.translationX > 0 && !orderPlaced) {
        translateX.value = event.translationX
      }
    })
    .onFinalize((event) => {
      const middleOffset = boxDimensions.width / 2 - circleDimensions.width / 2
      const end = boxDimensions.width - circleDimensions.width - 20

      if (event.translationX < middleOffset && event.translationX > 0 && !orderPlaced) {
        translateX.value = withTiming(0)
      } else {
        translateX.value = withTiming(end, {}, () => {
          runOnJS(setOrderPlaced)()
        })
      }
    })

  const swipeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const text1AnimatedStyle = useAnimatedStyle(() => {
    const end = boxDimensions.width / 2 - 20
    const opacity = withTiming(translateX.value < end ? 1 : 0)
    return {
      opacity,
    }
  })

  const boxAnimatedStyle = useAnimatedStyle(() => {
    const end = boxDimensions.width - circleDimensions.width + 10
    const backgroundColor = interpolateColor(translateX.value, [0, end], ['#FFF5D1', '#92ED80'])
    return {
      backgroundColor,
    }
  })
  const text2AnimatedStyle = useAnimatedStyle(() => {
    const start = boxDimensions.width / 2
    const opacity = withTiming(translateX.value > start ? 1 : 0)
    return {
      opacity,
    }
  })

  const getBoxLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout
    setBoxDimensions({ x, y, width, height })
  }

  const getCircleLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout
    setCircleDimensions({ x, y, width, height })
  }
  return (
    <GestureHandlerRootView className="flex-1 w-full">
      <Animated.View
        className="flex-row items-center h-[62px] rounded-full w-full"
        onLayout={getBoxLayout}
        style={boxAnimatedStyle}
      >
        <GestureDetector gesture={pan}>
          <Animated.View
            className={'w-[50px] h-[50px] ml-[10px] z-10 rounded-full bg-white items-center justify-center'}
            onLayout={getCircleLayout}
            style={[swipeAnimatedStyle]}
          >
            <Text className={`${orderPlaced ? 'text-xl' : 'text-4xl'} font-semibold`}>{orderPlaced ? '✔️' : '<'}</Text>
          </Animated.View>
        </GestureDetector>

        <View style={{ width: SCREEN_WIDTH - 168 }} className="mx-[60px] h-full absolute items-center justify-center">
          <Animated.Text className="text-xl absolute mx-auto text-center font-semibold" style={[text1AnimatedStyle]}>
            Swipe to order
          </Animated.Text>
          <Animated.Text className="text-xl absolute mx-auto text-center font-semibold" style={[text2AnimatedStyle]}>
            {orderPlaced ? 'Confirmed!' : 'Release'}
          </Animated.Text>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  )
}

export default Swiper
