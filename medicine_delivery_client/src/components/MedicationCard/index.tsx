'use client';
import React, { useState } from 'react';
import { IMedication } from '@/interfaces/medication';
import Image from 'next/image';
import { addToCart } from '@/store/cart.slice';
import { AppDispatch } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IMedicationCardProps {
	medication: IMedication;
}
const MedicationCard = ({ medication }: IMedicationCardProps) => {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector(state => state.cart.items);
	const [isFavorite, setIsFavorite] = useState(false);

	const handleAddToCart = () => {
		const medicationWithQuantity = { ...medication, quantity: 1 };
		dispatch(addToCart(medicationWithQuantity));
	};

	const handleToggleFavorite = () => {
		setIsFavorite(!isFavorite);
		medication.favorite = !isFavorite;
	};

	return (
		<div className='group relative rounded-xl p-4 border border-blue-900 max-h-[255px]'>
			<div className='overflow-hidden rounded-md flex justify-center'>
				<div className='relative w-96 h-40'>
					<Image
						src={`${URL}/images/${medication.image}`}
						alt={medication.name}
						className='object-fill object-center'
						fill
						sizes='(max-width: 768px) 500px, (max-width: 1200px) 700px, 800px'
					/>
				</div>
			</div>
			<div className='mt-4 flex justify-between'>
				<div>
					<h3 className='font-bold text-lg text-gray-700'>{medication.name}</h3>
					<p className='text-sm font-medium text-gray-900'>
						${medication.price}
					</p>
				</div>

				<button
					disabled={cartItems.some(item => item.medicate.id === medication.id)}
					onClick={handleAddToCart}
					className='bg-white w-32 px-2 rounded-xl text-sm font-bold disabled:bg-gray-400'
				>
					{cartItems.some(item => item.medicate.id === medication.id)
						? 'In cart'
						: 'Add to cart'}
				</button>
			</div>

			<button
				onClick={handleToggleFavorite}
				className={`absolute top-[-10px] right-[-10px] bg-red-600 w-6 h-6 rounded-full p-2 focus:outline-none flex items-center justify-center ${
					isFavorite ? 'bg-green-600 text-white' : 'bg-gray-200'
				}`}
			>
				{isFavorite ? '+' : '-'}
			</button>
		</div>
	);
};

export default MedicationCard;
