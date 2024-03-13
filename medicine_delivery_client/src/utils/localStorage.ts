import { ICart } from '@/interfaces/cart';

export const saveCartToLocalStorage = (cart: ICart) => {
	localStorage.setItem('cart', JSON.stringify(cart));
};

export const loadCartFromLocalStorage = (): ICart | null => {
	const cartJSON = localStorage.getItem('cart');
	if (cartJSON) {
		return JSON.parse(cartJSON);
	}
	return null;
};

export const clearLocalStorage = () => {
	localStorage.removeItem('cart');
};
