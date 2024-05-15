import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    function: undefined,
}

export const viewSlice = createSlice({
    name: 'viewFunction',
    initialState,
    reducers: {
        setViewFunction: (state, action) => {
            console.log("Setting view function:", action.payload);
            state.function = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setViewFunction } = viewSlice.actions

export const selectViewFunction = (state) => state.viewFunction.function;

export default viewSlice.reducer