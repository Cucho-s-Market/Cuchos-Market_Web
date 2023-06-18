// @ts-nocheck
export class User {
    constructor(firstName = '', lastName = '', email = '', password = '', role = 'EMPLOYEE') {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}