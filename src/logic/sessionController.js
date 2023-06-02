//@ts-nocheck
import fetchController from "./fetchController";
import { Customer } from "./dtos/Customer";

const sessionController = (() => {

    let user = {};
    let items = [];
    let paymentMethods = {};
    let address = {};

    async function register() {
      const customer = new Customer(
        "123",
        "John",
        "Doe",
        "john@example.com",
        "ROLE",
        "1990-01-01",
        "123456789",
        "123456789"
      );

      console.log(customer);
      const res =  await fetchController.execute('http://127.0.0.1:8080/users/customer', 'POST', customer);

      console.log('res ', res);
    }

    
    // this.login = () => {
        
    // }

    // this.logout = () => {
        
    //}

    return {
      register,
    }   
})();

export default sessionController;