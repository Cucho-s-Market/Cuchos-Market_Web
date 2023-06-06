// @ts-nocheck
import fetchController from "./fetchController";

// @ts-nocheck
const adminController = (() => {

    //USERS
    async function getUsers() {
        return await fetchController.execute('http://localhost:8080/users');
    }

    async function registerEmployee(employee, branch) {

		if (employee === null) throw new Error('Error creating customer');

		const res = await fetchController.execute(`http://127.0.0.1:8080/users/${branch}/employee`, 'POST', employee);
		return res;
	}


    //PRODUCTS

    return {
        getUsers,
        registerEmployee
    }
})();

export default adminController;