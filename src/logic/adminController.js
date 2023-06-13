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


    //PRODUCTS

    async function getProducts(adminToken) {
        return await fetchController.execute('http://localhost:8080/products', 'GET', null, adminToken);
    }

    async function addProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

		const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'POST', product, adminToken);
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
        getProducts,
        addProduct,
        addCategory
    }
})();

export default adminController;