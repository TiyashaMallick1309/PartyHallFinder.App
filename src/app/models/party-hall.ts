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
    geoLocation: GeoLocation;
}

export interface Availability {
    startDateTime: Date;
    endDateTime: Date;
    range:string;
}

export interface Pricing {
    perHour: number;
    perDay: number;
    perWeek: number;
}

export interface GeoLocation{
    longitude:number;
    latitude:number;
  }