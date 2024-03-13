import PharmacyList from '@/components/PharmacyList';
import { IPharmacy } from '@/interfaces/pharmacy';
import { fetchPharmacies } from '@/lib/data';
import Shop from '@/components/Shop';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Shop | Medicine Delivery app',
	description: 'Web application where users can order medicines delivery',
};

export default async function Main() {
	const pharmacies: IPharmacy[] = await fetchPharmacies();

	return (
		<div className='block md:grid grid-cols-6 gap-4'>
			<Shop pharmacies={pharmacies} />
		</div>
	);
}
