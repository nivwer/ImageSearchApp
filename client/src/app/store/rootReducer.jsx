import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import imagesDataReducer from '../../features/imagesData/imagesDataSlice'
import popularSearchesReducer from '../../features/popularSearches/popularSearchesSlice'
import { apiSlice } from '../../api/apiSlice'

export const store = configureStore({
     reducer: {
        api: apiSlice.reducer,
        imagesData: imagesDataReducer,
        popularSearchesData: popularSearchesReducer
     },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)