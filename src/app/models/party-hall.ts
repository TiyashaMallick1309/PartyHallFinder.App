export class PartyHall {
    id?: string;
    name: string = "";
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalcode: string;
    } = {
            street: "",
            city: "",
            state: "",
            country: "",
            postalcode: "",
        };
    capacity: number = 0;
    amenities: string[] = [];
    pricing: {
        perHour: number;
        perDay: number;
        perWeek: number;
    } = {
            perHour: 0,
            perDay: 0,
            perWeek: 0
        };
    availability: {
        startDateTime: Date;
        endDateTime: Date;
        range: string;
    } = {
            startDateTime: new Date(),
            endDateTime: new Date(),
            range: ''
        };
    images: string[] = [];
}