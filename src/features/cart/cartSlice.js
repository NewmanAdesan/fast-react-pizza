
import {createSlice} from '@reduxjs/toolkit'

// cart: [
//   {
//       pizzaId: 12,
//       name: 'Mediterranean',
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32
//   }
// ]


// 1. CREATE THE INITIAL STATE OBJECT FOR USER DATA
const initialState = {
    cart: [
    ]
}


// 2. CREATE THE USER DATA SLICE REDUCER & ACTION CREATORS
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem(state, action) {
        // payload = newItem
        state.cart.push(action.payload)
      },

      deleteItem(state, action) {
        // payload = pizzaId
        state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
      },

      increaseItemQuantity(state, action) {
        // payload = pizzaId
        const item = state.cart.find(item => item.pizzaId === action.payload);
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice
      },

      decreaseItemQuantity(state, action) {
        // payload = pizzaId
        const item = state.cart.find(item => item.pizzaId === action.payload);
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity <= 0) cartSlice.caseReducers.deleteItem(state, action);
      },

      clearCart(state) {
        state.cart = []
      }

    }
})


// 3. EXPORT THE REDUCER & THE AUTOMATICALLY CREATED ACTIONS
export const { 
    addItem, 
    deleteItem, 
    increaseItemQuantity, 
    decreaseItemQuantity,
    clearCart } = cartSlice.actions
export default cartSlice.reducer


// 4. CREATE SELECTOR FUNCTIONS USED TO CONSUME STORE DATA 
export const getCart = (state) => state.cart.cart

export const getTotalCartQuantity = (state) => state.cart.cart.reduce(
    (acc, item) => acc += item.quantity
, 0)

export const getTotalCartPrice = (state) => state.cart.cart.reduce(
    (acc, item) => acc += item.totalPrice
, 0)

export const getCurrentQuantityById = (id) => {
    return (state) => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
}


// --------@@ BY THE WAY, HAVING SELECTORS LIKE THIS MIGHT CAUSE PERFORMANCE ISSUES IN LARGER APPLICATION - IF YOU ARE SERIOUS ABOUT REDUX, LOOK INTO THE RESELECT LIBRARY THAT WOULD ALLOW US OPTIMIZE THIS SELECTORS  @@--------



