// @ts-nocheck
import fetchController from "./fetchController";

// @ts-nocheck
const adminController = (() => {

    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY4NjE5Njk5MSwiZXhwIjoxNjg2MjgzMzkxfQ.5RNaOseiAXDtC1l5G-fJ4DnH9ZF5TjTa0pLUQR9lo28";

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

    return {
        getUsers,
        registerEmployee,
        getProducts,
        addProduct,
    }
})();

export default adminController;