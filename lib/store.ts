'use client'

import { configureStore } from '@reduxjs/toolkit'
import auth from './reducers/auth'

export const store = configureStore({
    reducer: {
        auth
    }
})

export type RootState = ReturnType<typeof store.getState>