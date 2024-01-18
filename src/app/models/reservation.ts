export interface Reservation{
    id?: string;
    tripId: string;
    userId: string;
    userRate: number;
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

