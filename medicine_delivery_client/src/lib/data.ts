import { IOrder } from '@/interfaces/cart';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchPharmacies = async () => {
	const res = await fetch(`${BASE_URL}/api/pharmacies`, { cache: 'no-store' });
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const fetchOrders = async () => {
	const res = await fetch(`${BASE_URL}/api/orders`, { cache: 'no-store' });
	if (!res.ok) {
		throw new Error('Some fetch error!');
	}
	return res.json();
};

export const createOrder = async (order: IOrder) => {
	try {
		const res = await fetch(`${BASE_URL}/api/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
		});

		if (!res.ok) {
			console.error('Error creating order!');
		}

		return res.json();
	} catch (error) {
		console.error('Error creating order:', error);
	}
};
