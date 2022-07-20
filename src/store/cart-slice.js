import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialCartState = {
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        previousItemOfCart(state, action) {
            const item = action.payload;
            state.items.push(item);
        },
        addItemToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(val => val.id === item.id);
            if (!existingItem) {
                state.items.push({
                    id: item.id,
                    price: item.price,
                    quantity: 1,
                    totalPrice: item.price,
                    name: item.name
                })
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice += item.price;
            }
        },
        removeItemFromCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(val => val.id === item.id);
            if (existingItem.quantity === 1) state.items = state.items.filter(val => val.id !== item.id);
            if (existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;

            }
        }
    }
});

export const cartAction = cartSlice.actions;
export default cartSlice;

let timeout;

export const getCardData = () => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending',
            message: 'Sending cart data',
        }));

        const sendRequest = async () => {
            const res = await fetch(`http://localhost/react/Redux-cart/react-19/cartAPI.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json-get-items"
                }
            });
            if (!res.ok) {
                throw new Error("Failed to connect to cart");
            }

            return res;
        }

        try {
            const res = await sendRequest();
            const data = await res.json();
            data.forEach(val => {
                const myObject = {
                    id: val.product_id,
                    price: parseInt(val.price),
                    quantity: parseInt(val.quantity),
                    totalPrice: (parseInt(val.quantity) * parseInt(val.price)),
                    name: val.title
                };
                dispatch(cartAction.previousItemOfCart(myObject));
            })
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Data is successfully sent!',
            }));
        }
        catch (err) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: "Error!",
                message: 'Sending cart data failed',
            }));
        }

        if (!timeout) {
            timeout = setTimeout(() => {
                dispatch(uiActions.notShowNotification());
            }, 5000);
        }
        else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                dispatch(uiActions.notShowNotification());
            }, 5000);
        }
    }
}

export const sendCartData = (value, headerValue) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending',
            message: 'Sending cart data',
        }));

        const sendRequest = async () => {
            const res = await fetch(`http://localhost/react/Redux-cart/react-19/cartAPI.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': headerValue
                },
                body: JSON.stringify({ value })
            });
            if (!res.ok) {
                throw new Error("Failed to connect to cart");
            }
        }

        try {
            sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Data is successfully sent!',
            }));
        }
        catch (err) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: "Error!",
                message: 'Sending cart data failed',
            }));
        }

        if (!timeout) {
            timeout = setTimeout(() => {
                dispatch(uiActions.notShowNotification());
            }, 5000);
        }
        else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                dispatch(uiActions.notShowNotification());
            }, 5000);
        }
    }
}