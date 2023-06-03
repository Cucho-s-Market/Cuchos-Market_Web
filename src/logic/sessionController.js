//@ts-nocheck
import fetchController from "./fetchController";
import { Customer } from "./dtos/Customer";

const sessionController = (() => {

    let user = {};
    let items = [];
    let paymentMethods = {};
    let address = {};

    // ------------------ CUSTOMER REGISTER ------------------
    async function register(customerDetails) {
      const customer = new Customer(
        customerDetails.firstName,
        customerDetails.lastName,
        customerDetails.email,
        customerDetails.password,
        customerDetails.role,
        customerDetails.birthdate,
        customerDetails.phone,
        customerDetails.ci
      );

      if(customer === null) throw new Error('Error creating customer');
      
      const res =  await fetchController.execute('http://127.0.0.1:8080/users/customer', 'POST', customer);
      return res;
    }


    return {
      register,
    }   
})();

export default sessionController;