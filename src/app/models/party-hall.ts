import { Address } from "./user";

export interface PartyHall {
    id: string;
    name: string;
    address: Address;
    capacity: number;
    amenities: string[];
    pricing: Pricing;
    availability: Availability;
    images: string[];
    ownerId: string;
}

export interface Availability {
    startDateTime: Date;
    endDateTime: Date;
    range: string;
}

export interface Pricing {
    perHour: number;
    perDay: number;
    perWeek: number;
}