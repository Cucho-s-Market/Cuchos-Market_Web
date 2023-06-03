// @ts-nocheck
import { User } from "./User";
    
export class Customer extends User {
    constructor(firstName, lastName, email, password, role, birthdate, telephone, dni) {
        super(firstName, lastName, email, password, role);
        this.dni = dni;
        this.birthdate = birthdate;
        this.telephone = telephone;
        this.role = "CUSTOMER";
        this.disabled = true;
    }
}