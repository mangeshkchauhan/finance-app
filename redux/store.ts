import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import stockReducer from './stocks/stocksSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    stocks: stockReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
