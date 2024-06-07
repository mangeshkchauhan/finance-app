import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type Stock = {
  symbol: string
  name: string
  price: number
  change_percent: number
}

const initialState: Stock[] = []

export const stocks = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    addStock: (state, action: PayloadAction<Stock>) => [...state, action.payload],
    removeStock: (state, action: PayloadAction<{ symbol: string }>) => {
      const newState = state.filter((item) => item.symbol !== action.payload.symbol)
      return newState;
    },
    emptyStock: (state) => [],
  },
})

export const { addStock, removeStock, emptyStock } = stocks.actions

export default stocks.reducer
