export interface Planet {
    name: string;
    code: string;
}

export interface Destination {
    data: string;
    origin: Planet['code'];
    destination: Planet['code'];
    price: number;
    availability: number;
}

export interface TripPostRequest {
    origin: Planet['code'];
    destinations: Planet['code'][];
    durationOfStay: number;
    departureDate: string; // YYYY-M-DD
}
