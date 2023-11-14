export class User {
    id?: string;
    firstname: string = "";
    lastname: string = "";
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
        email: string = "";
        password: string = "";
        role: string = "";
        phonenumber: string = "";
}