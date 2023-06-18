// @ts-nocheck
import fetchController from "./fetchController";

// @ts-nocheck
const adminController = (() => {

    //USERS
    async function getUsers(adminToken) {
        debugger;
        return await fetchController.execute('http://localhost:8080/users', 'GET', null, adminToken);
    }

    async function registerEmployee(employee, branch, adminToken) {
<<<<<<< HEAD

=======
        debugger
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
		if (employee === null) throw new Error('Error creating customer');

		const res = await fetchController.execute(`http://127.0.0.1:8080/users/${branch}/employee`, 'POST', employee, adminToken);
		return res;
	}

<<<<<<< HEAD

    //PRODUCTS

    async function getProducts(adminToken) {
        return await fetchController.execute('http://localhost:8080/products', 'GET', null, adminToken);
    }

    async function addProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

		const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'POST', product, adminToken);
		return res;
    }

=======
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
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