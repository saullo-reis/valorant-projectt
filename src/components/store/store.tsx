import { createSlice } from '@reduxjs/toolkit'

const stock = createSlice({
    name: 'mode',
    initialState: {
        mode: 'easy'
    },
    reducers: {
        addMode(state, action){
            state.mode = action.payload
        }
    }
})

export const {addMode} = stock.actions
export default stock.reducer