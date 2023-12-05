export interface Booking{
    id:string;
    userId:string;
    partyHallId:string;
    startDate:Date;
    endDate:Date;
    isConfirmed:boolean;
    bookingDate: Date;
}