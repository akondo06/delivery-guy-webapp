export interface Property {
	id: string;
	userId: string;
	name: string;

	type: 'full' | 'partial';

	addressStreet: string;
	addressCity: string;
	addressPostalCode: string;
	addressCountry: string;

	reference?: string;

	unitCount?: number;
	occupiedUnitCount?: number;
	occupancyRate?: number;

	deactivatedAt?: string;
}

export interface CreateProperty {
	name: string;
	type: 'full' | 'partial';

	addressStreet: string;
	addressCity: string;
	addressPostalCode: string;
	addressCountry: string;

	reference?: string;
}

export interface UpdateProperty {
	name?: string;
	type?: 'full' | 'partial';

	addressStreet?: string;
	addressCity?: string;
	addressPostalCode?: string;
	addressCountry?: string;

	reference?: string;

	deactivatedAt?: string | null;
}

export interface PropertySummary {
	id: string;
	name: string;
	type: 'full' | 'partial';
	deactivatedAt?: string;
}
