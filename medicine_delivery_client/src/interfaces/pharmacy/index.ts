import { IMedication } from '@/interfaces/medication';

export interface IPharmacy {
	id: number;
	name: string;
	location: string;
	Medications: IMedication[];
}
