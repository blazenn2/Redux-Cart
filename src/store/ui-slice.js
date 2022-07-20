import { createSlice } from "@reduxjs/toolkit";

const uiSliceShow = {
    cartIsVisible: false,
    notification: null
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiSliceShow,
    reducers: {
        showCart(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        },
        notShowNotification(state) {
            state.notification = null;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;