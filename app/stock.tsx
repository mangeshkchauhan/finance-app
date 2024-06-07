import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useLocalSearchParams } from 'expo-router'
import BaseView from '@/components/util/BaseView'
import If from '@/components/util/If'
import Triangle from '@/components/util/Triangle'
import Button from '@/components/base/Button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addStock } from '@/redux/stocks/stocksSlice'

const Stock = () => {
  const { symbol, name, price, change_percent } = useLocalSearchParams<any>()
  const [showToast, setShowToast] = React.useState('')
  const dispatch = useAppDispatch()
  const stocks = useAppSelector((state) => state.stocks)
  const time = useRef<any>()
  useEffect(() => {
    time.current = setTimeout(() => {
      setShowToast('')
    }, 2000)
    return () => {
      clearTimeout(time.current)
    }
  }, [showToast])
  return (
    <BaseView className="flex-1 flex-col px-6 items-center">
      <If condition={!!showToast}>
        <View className="absolute z-20 top-4 bg-white border px-4 mx-auto py-2 items-center justify-center border-gray-200 rounded-2xl">
          <Text
            className={`${
              showToast.includes('already') ? 'text-red-500' : 'text-green-700 '
            } text-center text-sm font-semibold`}
          >
            {showToast}
          </Text>
        </View>
      </If>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false} className="flex-col">
        <View className="">
          <View className="flex mb-2 min-w-full focus:bg-[#D9D9D9">
            <Image
              className="mr-3 my-4"
              style={{ height: 72, width: 72 }}
              source={require('../assets/images/trend.png')}
            />
            <View>
              <Text className="font-semibold text-[28px]">{symbol?.split(':')[0]}</Text>
              <Text className="font-medium text-base text-[#999999]">{name}</Text>
              <Text className="font-semibold text-[32px] mr-3">${price}</Text>
              <View className="flex-row items-center">
                <If
                  condition={change_percent >= 0}
                  orElse={
                    <>
                      <Triangle direction="down" />
                      <Text className="text-[#FF3B30] text-xl ml-2">{change_percent}%</Text>
                    </>
                  }
                >
                  <Triangle direction="up" />
                  <Text className="text-[#34C759] text-xl ml-2">{change_percent}%</Text>
                </If>
              </View>
            </View>
          </View>

          <Text className="text-black text-2xl font-semibold mt-4">Lorem ipsum dolor sit amet.</Text>
          <Text className="text-black text-base font-semibold mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium asperiores voluptatem vel tempore ullam
            reprehenderit neque fugit aspernatur perferendis eius!
          </Text>
          <Text className="text-black text-2xl font-semibold mt-2">Lorem ipsum dolor sit amet.</Text>
          <Text className="text-black text-base font-semibold mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium asperiores voluptatem vel tempore ullam
            reprehenderit neque fugit aspernatur perferendis eius!
          </Text>
        </View>
        <Button
          className="my-16"
          title="Add To Cart"
          onPress={() => {
            if (stocks.find((item) => item.symbol === symbol)) {
              setShowToast('Stock already added to cart')
              return
            }
            setShowToast('Stock added to cart successfully')
            dispatch(addStock({ symbol, name, price, change_percent }))
          }}
        />
      </ScrollView>
    </BaseView>
  )
}

export default Stock
