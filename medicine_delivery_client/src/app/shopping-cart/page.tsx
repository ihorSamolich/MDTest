import React from 'react';
import Cart from '@/components/Cart';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cart | Medicine Delivery app',
	description: 'Web application where users can order medicines delivery',
};

const CartPage = () => {
	return (
		<div className='block md:grid grid-cols-6 gap-4'>
			<Cart />
		</div>
	);
};

export default CartPage;