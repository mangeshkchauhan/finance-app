import { View, Text, Image } from 'react-native'
import React from 'react'
import If from '../util/If'
import Triangle from '../util/Triangle'

type Props = {
  item: {
    symbol: string
    name: string
    price: number
    change_percent: number
  }
}

const StockCard = ({ item }: Props) => {
  return (
    <>
      <View className="h-24 flex-row items-center p-4 min-w-full">
        <Image className="mr-3" style={{ height: 50, width: 50 }} source={require('../../assets/images/trend.png')} />
        <View className="flex-1">
          <Text className="font-semibold text-2xl">{item.symbol.split(':')[0]}</Text>
          <Text className="font-medium text-sm text-[#999999]">{item.name}</Text>
          <View className="flex-row items-center">
            <Text className="font-semibold text-2xl mr-3">${item.price}</Text>
            <If
              condition={item.change_percent > 0}
              orElse={
                <>
                  <Triangle direction="down" />
                  <Text className="text-[#FF3B30] text-sm ml-2">{item.change_percent}%</Text>
                </>
              }
            >
              <Triangle direction="up" />
              <Text className="text-[#34C759] text-sm ml-2">{item.change_percent}%</Text>
            </If>
          </View>
        </View>
      </View>
      <View className="h-[2px] bg-[#EBEBEB] my-3 min-w-full" />
    </>
  )
}

export default StockCard
