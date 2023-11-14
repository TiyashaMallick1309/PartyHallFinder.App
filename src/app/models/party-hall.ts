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

// _id
// 617dd2cd66b7973d40263d4a
// name
// "The Glasshouse"

// address
// Object
// street
// "2 Greenside Place"
// city
// "Edinburgh"
// state
// "Scotland"
// country
// "United Kingdom"
// postalcode
// "EH1 3AA"
// capacity
// 520

// amenities
// Array (5)
// 0
// "Wifi"
// 1
// "State-of-the-art audiovisual equipment"
// 2
// "Dedicated events team"
// 3
// "Onsite catering"
// 4
// "Accessible facilities"

// pricing
// Object
// perHour
// 300
// perDay
// 2000
// perWeek
// 8000

// availability
// Object
// startDateTime
// 2022-01-02T12:00:00.000+00:00
// endDateTime
// 2022-01-02T22:00:00.000+00:00

// images
// Array (2)
// 0
// "https://yourscottishwedding.co.uk/wp-content/uploads/2022/09/Brasserie…"
// 1
// "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/35/5f/aa/ex…"