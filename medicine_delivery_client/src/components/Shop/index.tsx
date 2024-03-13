'use client';

import React, { useState } from 'react';
import PharmacyList from '@/components/PharmacyList';
import MedicationList from '@/components/MedicationList';
import { IPharmacy } from '@/interfaces/pharmacy';

interface IShopProps {
	pharmacies: IPharmacy[];
}

const Shop = ({ pharmacies }: IShopProps) => {
	const [selectedPharmacy, setSelectedPharmacy] = useState<IPharmacy | null>(
		pharmacies[0] || null,
	);

	const handleChangeSelectedPharmacy = (idPharmacy: number) => {
		const newSelectedPharmacy = pharmacies.find(
			pharmacy => pharmacy.id === idPharmacy,
		);

		if (newSelectedPharmacy) {
			setSelectedPharmacy(newSelectedPharmacy);
		} else {
			setSelectedPharmacy(null);
		}
	};

	return (
		<>
			<div className='col-span-2 border-2 border-black rounded-xl py-4'>
				<h1 className='font-extrabold text-center'>Shops:</h1>
				<PharmacyList
					pharmacies={pharmacies}
					selectedPharmacyId={selectedPharmacy?.id || 0}
					changeSelectedPharmacy={handleChangeSelectedPharmacy}
				/>
			</div>
			<div className='overflow-hidden col-span-4 border-2 border-black rounded-xl '>
				<MedicationList medications={selectedPharmacy?.Medications} />
			</div>
		</>
	);
};

export default Shop;
