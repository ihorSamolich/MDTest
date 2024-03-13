import React from 'react';
import { IOrder } from '@/interfaces/order';

interface IOrderProps {
	order: IOrder;
}

const OrderCard = ({ order }: { order: IOrder }) => {
	const totalPrice = order.OrderItems.reduce((acc, item) => {
		return acc + item.count * item.Medication.price;
	}, 0);

	return (
		<div className='group relative rounded-xl p-4 px-12 border border-blue-900 mb-4'>
			<div className='flex justify-between'>
				<div>
					<h3 className='font-bold text-lg text-gray-700'>
						Order № {order.id}
					</h3>
					<p className='text-sm font-medium text-gray-900'>{order.address}</p>
					<p className='text-sm font-medium text-gray-900'>{order.email}</p>
					<p className='text-sm font-medium text-gray-900'>{order.phone}</p>
					<p className='text-sm font-medium text-gray-900'>{order.name}</p>
				</div>
				<div>
					<h4 className='font-bold text-lg text-gray-700'>Items:</h4>
					<ul>
						{order.OrderItems.map(item => (
							<li key={item.id}>
								{item.Medication.name} - {item.count}
							</li>
						))}
					</ul>
					<p className='font-extrabold text-lg text-black'>
						Total Price: ${totalPrice}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
