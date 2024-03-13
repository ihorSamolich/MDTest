import { IMedication } from '@/interfaces/medication';

export interface IOrder {
	id: number;
	address: string;
	email: string;
	phone: string;
	name: string;
	createdAt: string;
	OrderItems: IOrderItem[];
}

export interface IOrderItem {
	id: number;
	count: number;
	Medication: IMedication;
}
