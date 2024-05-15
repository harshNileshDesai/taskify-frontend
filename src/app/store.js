import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import viewFunctionReducer from './features/viewFunctionSlice'
import functionArrReducer from './features/functionArrSlice'
import userReducer from './features/userSlice'
import isForwardedReducer from './features/isForwarderSlice'
import isTaskClosedReducer from './features/isTaskClosedSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        viewFunction: viewFunctionReducer,
        functionArr: functionArrReducer,
        user: userReducer,
        isForwarded: isForwardedReducer,
        isForwarisTaskClosed: isTaskClosedReducer,
    },
})