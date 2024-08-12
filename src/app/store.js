// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit"; // No need to import getDefaultMiddleware explicitly
import userReducer from '../features/user/userSlice'
import movieReducer from '../features/movie/movieSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer
    },
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false,
    // })
    middleware: (getDefaultMiddleware) =>   // middleware code works if written without destructuring
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})