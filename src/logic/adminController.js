// @ts-nocheck
import fetchController from "./fetchController";

// @ts-nocheck
const adminController = (() => {

    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY4NjUxMzExMywiZXhwIjoxNjg2NTk5NTEzfQ.ttmkgXIZPKvSeZlBwcdfxXu6bvx6os6yQ7ppgc2Di_I";

    //USERS
    async function getUsers() {
        return await fetchController.execute('http://localhost:8080/users', 'GET', null, token);
    }

    async function registerEmployee(employee, branch) {

		if (employee === null) throw new Error('Error creating customer');

		const res = await fetchController.execute(`http://127.0.0.1:8080/users/${branch}/employee`, 'POST', employee, token);
		return res;
	}


    //PRODUCTS

    async function getProducts(product) {
        return await fetchController.execute('http://localhost:8080/products', 'GET', null, token);
    }

    async function addProduct(product) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

		const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'POST', product, token);
		return res;
    }

    //Categories
    async function addCategory(category) {
        if (category === null) throw new Error('Error al intentar crear la categoria.');

		const res = await fetchController.execute(`http://127.0.0.1:8080/categories`, 'POST', category, token);
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