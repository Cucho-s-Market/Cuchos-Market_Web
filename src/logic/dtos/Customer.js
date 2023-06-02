// @ts-nocheck
import { User } from "./User";
    
export class Customer extends User {
    constructor(id, firstName, lastName, email, role, birthdate, telephone, dni) {
        super(id, firstName, lastName, email, role);
        this.dni = dni;
        this.birthdate = birthdate;
        this.telephone = telephone;
        this.role = "CUSTOMER";
        this.disabled = true;
    }
}