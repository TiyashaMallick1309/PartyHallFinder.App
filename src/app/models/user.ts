export interface User {
    _id: string;
    userName: string;
    firstname: string;
    lastname: string;
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
