// @ts-nocheck
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";

// @ts-nocheck
const adminController = (() => {
    //USERS
    async function getUsers() {
        let token = await sessionAdminController.getUserToken();
        return await fetchController.execute('http://localhost:8080/users', 'GET', null, token);
    }

    async function registerEmployee(employee, branch) {
        let token = await sessionAdminController.getUserToken();

		if (employee === null) throw new Error('Error creating customer');

		const res = await fetchController.execute(`http://127.0.0.1:8080/users/${branch}/employee`, 'POST', employee, token);
		return res;
	}

    //PRODUCTS

    async function getProducts(product) {
        return await fetchController.execute('http://localhost:8080/products', 'GET', null, token);
    }

    return {
        getUsers,
        registerEmployee,
        getProducts
    }
})();

export default adminController;