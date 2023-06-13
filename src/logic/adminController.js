// @ts-nocheck
import fetchController from "./fetchController";

// @ts-nocheck
const adminController = (() => {

    //USERS
    async function getUsers(adminToken) {
        return await fetchController.execute('http://localhost:8080/users', 'GET', null, adminToken);
    }

    async function registerEmployee(employee, branch, adminToken) {

		if (employee === null) throw new Error('Error creating customer');

		const res = await fetchController.execute(`http://127.0.0.1:8080/users/${branch}/employee`, 'POST', employee, adminToken);
		return res;
	}

    //Categories
    async function addCategory(category, adminToken) {
        if (category === null) throw new Error('Error al intentar crear la categoria.');

		const res = await fetchController.execute(`http://127.0.0.1:8080/categories`, 'POST', category, adminToken);
		return res;
    }

    return {
        getUsers,
        registerEmployee,
        addCategory
    }
})();

export default adminController;