import React from 'react';
import { IPharmacy } from '@/interfaces/pharmacy';

interface IPharmacyListProps {
	pharmacies: IPharmacy[];
	selectedPharmacyId: number;
	changeSelectedPharmacy: (idPharmacy: number) => void;
}

const PharmacyList = ({
	pharmacies,
	changeSelectedPharmacy,
	selectedPharmacyId,
}: IPharmacyListProps) => {
	return (
		<div className='space-y-4 pt-4 px-4 block '>
			{pharmacies.map(pharmacy => (
				<button
					key={pharmacy.id}
					onClick={() => changeSelectedPharmacy(pharmacy.id)}
					className={`${selectedPharmacyId === pharmacy.id ? `bg-blue-800` : ``} p-2 w-full text-center text-sm font-bold border border-gray-900 rounded-xl shadow-xl cursor-pointer `}
				>
					{pharmacy.name}
				</button>
			))}
		</div>
	);
};

export default PharmacyList;
