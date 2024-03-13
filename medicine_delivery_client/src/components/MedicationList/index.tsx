'use client';

import React, { useState } from 'react';
import { IMedication } from '@/interfaces/medication';
import MedicationCard from '@/components/MedicationCard';
import Sort from '@/components/Sort';

interface IMedicationListProps {
	medications: IMedication[] | undefined;
}

const MedicationList = ({ medications }: IMedicationListProps) => {
	const [sortBy, setSortBy] = useState<string>('Price: Low to High');

	const sortedMedications = medications?.slice().sort((a, b) => {
		if (sortBy === 'Price: Low to High') {
			return a.price - b.price;
		} else if (sortBy === 'Price: High to Low') {
			return b.price - a.price;
		} else {
			return 0;
		}
	});

	const favoriteMedications = sortedMedications?.filter(
		medication => medication.favorite,
	);
	const nonFavoriteMedications = sortedMedications?.filter(
		medication => !medication.favorite,
	);

	// @ts-ignore
	const allMedications = [...favoriteMedications, ...nonFavoriteMedications];

	return (
		<>
			<Sort setSortBy={setSortBy} />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6  py-4 px-4 h-[500px] overflow-y-auto'>
				{allMedications?.map(medication => (
					<MedicationCard key={medication.id} medication={medication} />
				))}
			</div>
		</>
	);
};

export default MedicationList;
