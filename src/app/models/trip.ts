export interface TripData {
    id: string;
    name: string;
    country: string;
    startDate: string;
    endDate: string;
    price: number;
    maxSpots: number;
    description: string;
    imageLink: string;
    reservedSpots: number;
    rate: number;
    numberOfRates: number;
    firstCaruselImageLink: string;
    secondCaruselImageLink: string;
    thirdCaruselImageLink: string;
    mapLink: string;
}

export interface Trip extends TripData {
    availableSpots: number;
    selectedSpots: number;
    isChecked: boolean;
}

export const defaultTrip: Trip = {
    id: '',
    name: '',
    country: '',
    startDate: '',
    endDate: '',
    price: 0,
    maxSpots: 0,
    description: '',
    imageLink: '',
    reservedSpots: 0,
    rate: 0,
    numberOfRates: 0,
    availableSpots: 0,
    selectedSpots: 0,
    isChecked: false,
    firstCaruselImageLink: '',
    secondCaruselImageLink: '',
    thirdCaruselImageLink: '',
    mapLink: ''
}