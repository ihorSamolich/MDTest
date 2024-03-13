import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from '@/interfaces/cart';
import { IMedication } from '@/interfaces/medication';
import {
	clearLocalStorage,
	loadCartFromLocalStorage,
	saveCartToLocalStorage,
} from '@/utils/localStorage';

const initialState: ICart = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<IMedication & { quantity: number }>,
		) => {
			const existingItemIndex = state.items.findIndex(
				item => item.medicate.id === action.payload.id,
			);
			if (existingItemIndex !== -1) {
				state.items[existingItemIndex].count = action.payload.quantity;
			} else {
				state.items.push({ medicate: action.payload, count: 1 });
			}

			saveCartToLocalStorage(state);
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(
				item => item.medicate.id !== action.payload,
			);

			saveCartToLocalStorage(state);
		},

		clearCart: state => {
			state.items = [];

			clearLocalStorage();
		},

		setCart: (state, action: PayloadAction<ICart>) => {
			return action.payload;
		},
	},
});

export const { setCart, addToCart, removeFromCart, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
