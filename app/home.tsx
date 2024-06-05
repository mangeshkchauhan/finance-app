import React, { useCallback, useMemo, useRef } from 'react'
import BaseView from '@/components/util/BaseView'
import Texts from '@/components/util/Texts'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useQuery } from '@tanstack/react-query'
import Api from '@/api/Api'
import ListLoader from '@/components/loader/List'
import If from '@/components/util/If'
import { GainersTrends } from '@/utils/constants'
import { FlatList } from 'react-native-gesture-handler'

const Home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [showNotch, setShowNotch] = React.useState(true)
  const index = useSharedValue(0)
  // const { isLoading, data } = useQuery({
  //   queryKey: ['todo'],
  //   queryFn: Api.fetchGainerTrends,
  //   refetchOnMount: true,
  // })
  const { bottom } = useSafeAreaInsets()

  const handleSheetChanges = useCallback((sheetIndex: number) => {
    index.value = sheetIndex
    setShowNotch(sheetIndex === 0)
  }, [])

  const data = GainersTrends

  const handleIndicatorStyle = useMemo(
    () => ({
      backgroundColor: showNotch ? '#D9D9D9' : 'white',
      width: showNotch ? 50 : 0,
      height: showNotch ? 7 : 0,
      borderRadius: showNotch ? 8 : 0,
    }),
    [showNotch],
  )

  const snapPoints = ['70%', '100%']

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        pressBehavior="none"
        opacity={0}
        style={[
          props.style,
          {
            backgroundColor: showNotch ? '#D9D9D9' : 'white',
            marginBottom: bottom, // Set the desired background color
          },
        ]}
      />
    ),
    [],
  )

  return (
    <BaseView
      style={{
        backgroundColor: showNotch ? '#D9D9D9' : 'white',
        flex: 1,
      }}
    >
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ borderRadius: showNotch ? 24 : 0 }}
        handleIndicatorStyle={handleIndicatorStyle}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        enablePanDownToClose={false}
        enableOverDrag={false}
      >
        <Animated.View
          className={'border items-center justify-center'}
          style={useAnimatedStyle(() => {
            return {
              marginTop: Platform.OS === 'ios' ? 20 : 0,
              height: withTiming(index.value === 0 ? 0 : 108),
              opacity: withTiming(index.value === 0 ? 0 : 1),
              paddingHorizontal: withTiming(index.value === 0 ? 0 : 16),
              paddingVertical: withTiming(index.value === 0 ? 0 : 16),
            }
          })}
        >
          <Texts.Body className="border w-full text-center">Awesome 🎉</Texts.Body>
        </Animated.View>
        <FlatList
          contentContainerStyle={{ flex: 1, alignItems: 'center', padding: 16 }}
          data={data.data.trends.slice(0, 5)}
          scrollEnabled={true}
          renderItem={({ item }) => {
            return (
              <View className="h-6">
                <Texts.Body>{item.name} 🎉</Texts.Body>
              </View>
            )
          }}
          ListEmptyComponent={
            <If condition={false} orElse={<></>}>
              <ListLoader />
            </If>
          }
        />
      </BottomSheet>
    </BaseView>
  )
}

export default Home
