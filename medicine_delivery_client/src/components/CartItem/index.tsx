'use client';

import React from 'react';
import { ICartItem } from '@/interfaces/cart';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, removeFromCart } from '@/store/cart.slice';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ICartItemProps {
	item: ICartItem;
}
const CartItem = ({ item }: ICartItemProps) => {
	const dispatch = useAppDispatch();

	const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(event.target.value, 10);
		dispatch(addToCart({ ...item.medicate, quantity: newQuantity }));
	};

	const handleRemoveFromCart = () => {
		dispatch(removeFromCart(item.medicate.id));
	};

	return (
		<div className='m-4 group relative rounded-xl p-4 border border-blue-900 max-h-[150px] gap-4 flex items-center justify-between'>
			<div className='flex justify-center'>
				<div className='overflow-hidden rounded-md relative w-40 h-20'>
					<Image
						src={`${URL}/images/${item.medicate.image}`}
						alt={item.medicate.name}
						className='object-fill object-center'
						fill
						sizes='(max-width: 768px) 500px, (max-width: 1200px) 700px, 800px'
					/>
				</div>
			</div>
			<div className='w-1/2 flex-col'>
				<h3 className='text-center font-bold text-lg text-gray-700'>
					{item.medicate.name}
				</h3>
				<p className=' text-center text-sm font-medium text-gray-900'>
					Price: ${item.medicate.price}
				</p>

				<input
					type='number'
					onChange={handleQuantityChange}
					value={item.count}
					className='text-sm rounded-lg text-center block w-full p-1'
					required
					min='1'
				/>

				<button
					onClick={handleRemoveFromCart}
					className='bg-red-500 w-full text-white px-2 rounded-xl text-sm font-bold mt-2'
				>
					Remove
				</button>
			</div>
		</div>
	);
};

export default CartItem;
