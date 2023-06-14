// @ts-nocheck
import fetchController from "./fetchController";

const productController = (() => {

    // Find item by slug
    async function getProduct(code) {
        const response = await fetchController.execute(`http://localhost:8080/products/${code}`);
        if(!response || Object.entries(response).length === 0) return null;

        return response;
    }

    async function getProducts() {
        const response = await fetchController.execute(`http://localhost:8080/products`);
        if(!response || Object.entries(response).length === 0) return null;

        return response;
    }

    async function addProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

		const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'POST', product, adminToken);
		return res;
    }

    async function editProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

		const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'PUT', product, adminToken);
		return res;
    }

    async function deleteProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

		const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'DELETE', product, adminToken);
		return res;
    }

    return {
        getProduct,
        getProducts,
        addProduct,
        editProduct,
        deleteProduct
    }
})();

export default productController;