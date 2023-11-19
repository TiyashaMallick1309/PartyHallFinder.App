import { Address } from "./user";

export interface PartyHall {
    id: string;
    name: string;
    address: Address;
    capacity: number;
    amenities: string[];
    pricing: Pricing;
    images: string[];
    ownerId: string;
    geolocation: Geolocation;
}

export interface Pricing {
    perHour: number;
    perDay: number;
    perWeek: number;
}

export interface Geolocation{
    longitude:number;
    latitude:number;
  }