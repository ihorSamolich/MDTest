import React from 'react';
import { fetchOrders } from '@/lib/data';
import OrderCard from '@/components/OrderCard';
import { IOrder } from '@/interfaces/order';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'History | Medicine Delivery app',
	description: 'Web application where users can order medicines delivery',
};

const HistoryPage = async () => {
	const orders: IOrder[] = await fetchOrders();
	return (
		<div>
			<h1 className='font-extrabold text-2xl text-center'>History orders</h1>

			{orders.map(order => (
				<OrderCard key={order.id} order={order} />
			))}
		</div>
	);
};

export default HistoryPage;
