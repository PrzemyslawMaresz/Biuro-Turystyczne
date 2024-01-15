export interface Reservation{
    id?: string;
    tripId: string;
    tripName: string;
    numberOfTickets: number;
    dateOfReservation: string;
    totalPrice: number;
    startDate: string;
    endDate: string;
    country: string;
    status?: string;
    isTripUpcoming?: boolean;
}

