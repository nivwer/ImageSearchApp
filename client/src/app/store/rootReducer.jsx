import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import imageSearchReducer from '../../features/searchResults/imageSearchSlice'
import { apiSlice } from '../../api/apiSlice'

export const store = configureStore({
     reducer: {
        api: apiSlice.reducer,
        images: imageSearchReducer,
     },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)