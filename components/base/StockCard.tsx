import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import If from '../util/If'
import Triangle from '../util/Triangle'
import { router } from 'expo-router'
import { Stock } from '@/redux/stocks/stocksSlice'
import { G, Path, Svg } from 'react-native-svg'

export type StockCardProps = {
  item: Stock
  onDelete?: (item: Stock) => void
  onCardPress?: (item: Stock) => void
}

const StockCard = ({ item,onCardPress, onDelete }: StockCardProps) => {
  return (
    <View>
      <View className="flex-row">
        <Pressable
          onPress={()=> onCardPress && onCardPress(item)}
          className="h-24 flex-row flex-1 items-center p-4 focus:bg-[#D9D9D9"
        >
          <Image className="mr-3" style={{ height: 50, width: 50 }} source={require('../../assets/images/trend.png')} />
          <View className="flex-1">
            <Text className="font-semibold text-2xl">{item.symbol.split(':')[0]}</Text>
            <Text className="font-medium text-sm text-[#999999]">{item.name}</Text>
            <View className="flex-row items-center">
              <Text className="font-semibold text-2xl mr-3">${item.price}</Text>
              <If
                condition={item.change_percent >= 0}
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
        </Pressable>
        {!!onDelete && (
          <Pressable onPress={() => onDelete(item)} className="items-center justify-center mr-4">
            <Svg width="50px" height="50px" viewBox="0 0 24 24" fill="none">
              <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
              <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
              <G id="SVGRepo_iconCarrier">
                <Path
                  d="M10 12V17"
                  stroke="#000000"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></Path>
                <Path
                  d="M14 12V17"
                  stroke="#000000"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></Path>
                <Path
                  d="M4 7H20"
                  stroke="#000000"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></Path>
                <Path
                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                  stroke="#000000"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></Path>
                <Path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#000000"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></Path>
              </G>
            </Svg>
          </Pressable>
        )}
      </View>
      <View className="h-[2px] bg-[#EBEBEB] my-3 min-w-full" />
    </View>
  )
}

export default StockCard
