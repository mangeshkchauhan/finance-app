import { Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '@/components/util/BaseView'
import { ScrollView } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import StockCard from '@/components/base/StockCard'
import { emptyStock, removeStock } from '@/redux/stocks/stocksSlice'
import Button from '@/components/base/Button'
import { router } from 'expo-router'
import Swiper from '@/components/util/Swiper'
import ConfirmationBadge from '@/components/util/ConfirmationBadge'
import If from '@/components/util/If'

const Cart = () => {
  const stocks = useAppSelector((state) => state.stocks)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)
  const dispatch = useAppDispatch()
  const time = useRef<any>()
  useEffect(() => {
    time.current = setTimeout(() => {
      setShowSuccessBanner(false)
    }, 2000)
    return () => {
      clearTimeout(time.current)
    }
  }, [showSuccessBanner])

  const handleOrder = () => {
    if (orderPlaced) return
    setOrderPlaced(true)
    setShowSuccessBanner(true)
    dispatch(emptyStock())
  }

  return (
    <BaseView className="relative flex-1">
      <ScrollView>
        <View className="pb-24 relative">
          <Text className="text-black text-[28px] px-6 font-semibold my-4">Open Orders</Text>
          {stocks.length ? (
            stocks.map((item) => {
              return (
                <View key={item.symbol} className="flex-1 flex-row items-center">
                  <StockCard
                    item={item}
                    onDelete={(item) => {
                      dispatch(
                        removeStock({
                          symbol: item.symbol,
                        }),
                      )
                    }}
                  />
                </View>
              )
            })
          ) : (
            <View className="mx-6 flex-1 items-center">
              <Text className="text-xl font-semibold">No open orders to show</Text>
              <Button onPress={() => router.navigate('home')} title="Add a Stock here" className="w-full my-4" />
            </View>
          )}
        </View>
      </ScrollView>
      {showSuccessBanner && (
        <View className="top-0 right-0 left-0 bottom-0 h-full w-screen items-center justify-center">
          <ConfirmationBadge />
          <Text className="text-black text-[28px] px-6 font-semibold my-4">
            Your order has been placed successfully
          </Text>
        </View>
      )}
      <If condition={!!stocks.length || orderPlaced}>
        <View className="w-screen h-[110] items-center px-6 py-4">
          <Swiper orderPlaced={orderPlaced} setOrderPlaced={handleOrder} />
        </View>
      </If>
    </BaseView>
  )
}

export default Cart
