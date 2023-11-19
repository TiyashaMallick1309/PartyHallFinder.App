export interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    address: Address;
    email: string;
    password: string;
    role: string;
    phonenumber : string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
};
