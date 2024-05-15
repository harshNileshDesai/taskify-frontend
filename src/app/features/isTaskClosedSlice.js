import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    flag: false,
}

export const isTaskClosedSlice = createSlice({
    name: 'isTaskClosed',
    initialState,
    reducers: {
        setIsTaskClosed: (state, action) => {
            console.log("Setting isTaskClosed:", action.payload);
            state.flag = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsTaskClosed } = isTaskClosedSlice.actions

export const selectIsTaskClosed = (state) => state.isTaskClosed.flag;

export default isTaskClosedSlice.reducer