'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CartItem from '@/components/CartItem';
import { ICustomer, IOrder } from '@/interfaces/cart';
import { createOrder } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { clearCart, setCart } from '@/store/cart.slice';
import { loadCartFromLocalStorage } from '@/utils/localStorage';

const Cart = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const initialCart = loadCartFromLocalStorage();
		if (initialCart) {
			dispatch(setCart(initialCart));
		}
	}, [dispatch]);

	const {
		register,
		formState: { errors },
	} = useForm();

	const [formData, setFormData] = useState<ICustomer>({
		address: '',
		email: '',
		phone: '',
		name: '',
	});

	const cartItems = useAppSelector(state => state.cart.items);

	const handleCreateOrder = async () => {
		if (
			formData.name &&
			formData.address &&
			formData.email &&
			formData.phone &&
			cartItems.length
		) {
			const order: IOrder = { items: cartItems, customer: formData };

			const res = await createOrder(order);

			if (res) {
				dispatch(clearCart());
				alert('Замовлення успішно створено!');
				router.push('/');
			} else {
				alert('Помилка створення замовлення, перевірте дані!');
			}
		} else {
			alert('Заповніть всі поля!');
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const calculateTotalPrice = () => {
		let totalPrice = 0;

		for (const item of cartItems) {
			totalPrice += item.medicate.price * item.count;
		}

		return totalPrice;
	};

	return (
		<>
			<div className='col-span-4 border-2 border-black rounded-xl py-4'>
				<h1 className='font-extrabold text-2xl text-center'>Customer info:</h1>
				<form className='px-4'>
					<div className='mb-4'>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700'
						>
							Name:
						</label>
						<input
							type='text'
							id='name'
							{...register('name', { required: true })}
							onChange={handleInputChange}
							className='mt-1 p-2 w-full border border-gray-300 rounded-md'
						/>
						{errors.name && (
							<span className='text-sm text-red-500'>Name is required</span>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700'
						>
							Email:
						</label>
						<input
							type='email'
							id='email'
							{...register('email', { required: true })}
							onChange={handleInputChange}
							className='mt-1 p-2 w-full border border-gray-300 rounded-md'
						/>
						{errors.email && (
							<span className='text-sm text-red-500'>Email is required</span>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='phone'
							className='block text-sm font-medium text-gray-700'
						>
							Phone:
						</label>
						<input
							type='tel'
							id='phone'
							{...register('phone')}
							onChange={handleInputChange}
							className='mt-1 p-2 w-full border border-gray-300 rounded-md'
						/>
					</div>

					<div className='mb-4'>
						<label
							htmlFor='address'
							className='block text-sm font-medium text-gray-700'
						>
							Address:
						</label>
						<input
							id='address'
							{...register('address', { required: true })}
							onChange={handleInputChange}
							className='mt-1 p-2 w-full border border-gray-300 rounded-md'
						/>
						{errors.address && (
							<span className='text-sm text-red-500'>Address is required</span>
						)}
					</div>
				</form>
			</div>

			<div className='overflow-hidden col-span-2 border-2 border-black rounded-xl'>
				<div className='h-[500px] overflow-y-auto'>
					<h1 className='font-extrabold text-2xl text-center'>Cart:</h1>
					{cartItems?.map((item, index) => (
						<CartItem key={item.medicate.id} item={item} />
					))}
				</div>
			</div>

			<div className=' col-span-6 flex justify-end items-center gap-10'>
				<p>Total Price: ${calculateTotalPrice()}</p>
				<button
					onClick={handleCreateOrder}
					className='bg-green-500 text-white px-4 py-2 rounded-md'
				>
					Submit
				</button>
			</div>
		</>
	);
};

export default Cart;
