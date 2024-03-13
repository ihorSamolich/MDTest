import { IMedication } from '@/interfaces/medication';

export interface ICart {
	items: ICartItem[];
}

export interface ICartItem {
	medicate: IMedication;
	count: number;
}

export interface ICustomer {
	name: string;
	email: string;
	phone: string;
	address: string;
}

export interface IOrder {
	customer: ICustomer;
	items: ICartItem[];
}
