import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

export const LOCAL_STORAGE_KEYS = {
  user: 'user',
}

export interface UserState {
  email: string
  password: string
}

const initialState: UserState = {
  password: '',
  email: '',
}

export const loadUserSession = createAsyncThunk('user/loadUserSession', async () => {
  const value = await SecureStore.getItemAsync(LOCAL_STORAGE_KEYS.user)
  const res = value ? JSON.parse(value)?.user : initialState
  return res
})

export const removeUserSession = createAsyncThunk('user/removeUserSession', async () => {
  const value = await SecureStore.deleteItemAsync(LOCAL_STORAGE_KEYS.user)
  console.log('User is removed', value)
  return initialState
})

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email
      state.password = action.payload.password
      SecureStore.setItemAsync(LOCAL_STORAGE_KEYS.user, JSON.stringify({ user: state }))
    },
  },
})

export const { setUser } = user.actions

export default user.reducer
