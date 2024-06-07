import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BaseView from '@/components/util/BaseView'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet'
import { Platform, Pressable, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useQuery } from '@tanstack/react-query'
import Api from '@/api/Api'
import ListLoader from '@/components/loader/List'
import If from '@/components/util/If'
import { FlatList } from 'react-native-gesture-handler'
import Triangle from '@/components/util/Triangle'
import StockCard from '@/components/base/StockCard'
import SearchInputField from '@/components/base/Input/SearchInputField'
import { debounce } from 'lodash'
import { AppleSearchData, GainersTrends } from '@/utils/constants'

const Home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [showNotch, setShowNotch] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [items, setItems] = useState<any[]>([])
  const [hasSearchData, setHasSearchData] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 5
  const index = useSharedValue(0)
  // const { isLoading, data } = useQuery({
  //   queryKey: ['todo'],
  //   queryFn: Api.fetchGainerTrends,
  //   refetchOnMount: true,
  // })
  // const {
  //   data: searchData,
  //   refetch,
  //   isFetching: isSearchFetching,
  //   isLoading: isSearchLoading,
  // } = useQuery({
  //   queryKey: ['search'],
  //   queryFn: () => Api.searchStocks(searchTerm),
  //   refetchOnMount: true,
  //   initialData: [],
  //   enabled: searchTerm.length > 1,
  // })
  const isSearchLoading = false
  const isSearchFetching = false
  const isLoading = false
  const data = GainersTrends
  const searchData = AppleSearchData
  const { bottom } = useSafeAreaInsets()

  const handleSheetChanges = useCallback((sheetIndex: number) => {
    index.value = sheetIndex
    setShowNotch(sheetIndex === 0)
    sheetIndex === 1 && setCurrentPage(0)
  }, [])

  useEffect(() => {
    if (hasSearchData) {
      handleSearchData(searchData.data.stock)
    } else {
      handleGainersTrends(currentPage)
    }
  }, [currentPage])

  async function handleGainersTrends(currentPage = 0) {
    setTotalPages(data.data.trends.length / 5)
    try {
      const items = data.data.trends.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      setItems(items)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSearchData(data: any[], currentPage = 0) {
    setTotalPages(data.length / 5)
    try {
      const items = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      setItems(items)
    } catch (error) {
      console.log(error)
    }
  }

  const debouncedTriggerSearch = useCallback(
    debounce((text) => {
      if (text.length > 0) {
        setHasSearchData(true)
        // refetch()
        //   .then((result) => {
        //     handleSearchData(result.data.data.stock)
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
        handleSearchData(searchData.data.stock)
      } else {
        setHasSearchData(false)
      }
    }, 1000),
    [],
  )

  const handleSearch = (text: string) => {
    setSearchTerm(text)
    debouncedTriggerSearch(text)
    if (text.length > 0) {
      setHasSearchData(true)
    } else {
      handleGainersTrends(0)
      setHasSearchData(false)
    }
  }
  const renderPaginationButtons = () => {
    const maxButtonsToShow = 5
    let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow)

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(0, endPage - maxButtonsToShow + 1)
    }

    const buttons = []

    const handlePageClick = (p: number) => setCurrentPage(p)

    buttons.push(
      <Pressable
        key={'left'}
        disabled={currentPage === 0}
        onPress={() => handlePageClick(currentPage - 1)}
        className="items-center mr-2 justify-center"
      >
        <Triangle direction="left" color={currentPage !== 0 ? 'black' : '#999999'} />
      </Pressable>,
    )

    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <Pressable key={i} onPress={() => handlePageClick(i)} className="items-center justify-center">
          <Text
            className="font-bold w-6 h-6 text-center text-base mx-1"
            style={{ color: i === currentPage ? 'black' : '#999999' }}
          >
            {i + 1}
          </Text>
        </Pressable>,
      )
    }

    buttons.push(
      <Pressable
        key={'right'}
        disabled={currentPage === totalPages - 1}
        onPress={() => handlePageClick(currentPage + 1)}
        className="items-center justify-center ml-2"
      >
        <Triangle direction="right" color={currentPage !== totalPages - 1 ? 'black' : '#999999'} />
      </Pressable>,
    )

    return buttons
  }

  const handleIndicatorStyle = useMemo(
    () => ({
      backgroundColor: showNotch ? '#D9D9D9' : 'white',
      width: showNotch ? 50 : 0,
      height: showNotch ? 7 : 0,
      borderRadius: showNotch ? 8 : 0,
    }),
    [showNotch],
  )

  const snapPoints = useMemo(() => ['70%', '100%'], [])

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
            marginBottom: bottom,
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
        <BottomSheetView style={{}}>
          <Animated.View
            className={'items-center justify-center'}
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
            <SearchInputField value={searchTerm} onChangeText={(text) => handleSearch(text)} />
          </Animated.View>

          <FlatList
            contentContainerStyle={{ alignItems: 'center', padding: 16 }}
            data={items}
            scrollEnabled={true}
            windowSize={5}
            refreshing={isSearchLoading || isLoading}
            keyExtractor={(item) => item.symbol}
            renderItem={({ item }) => {
              return (
                <If
                  condition={!(!isSearchLoading && !isLoading && !isSearchFetching)}
                  orElse={<StockCard item={item} />}
                >
                  <ListLoader />
                </If>
              )
            }}
            ListEmptyComponent={
              <If
                condition={!(!isSearchLoading && !isLoading && !isSearchFetching)}
                orElse={<Text>There was some error in fetching data</Text>}
              >
                <ListLoader />
              </If>
            }
          />
          <Animated.View
            className={'items-center justify-center flex-row'}
            style={useAnimatedStyle(() => {
              return {
                height: withTiming(index.value === 0 ? 0 : 50),
                opacity: withTiming(index.value === 0 ? 0 : 1),
                paddingVertical: withTiming(index.value === 0 ? 0 : 8),
              }
            })}
          >
            {renderPaginationButtons()}
          </Animated.View>
        </BottomSheetView>
      </BottomSheet>
    </BaseView>
  )
}

export default Home
