// @ts-nocheck
import { branchStore } from "./Stores/BranchStore";
import branchController from "./branchController";
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";

const productController = (() => {

    // Find item by slug
    async function getProduct(name, user = 'CUSTOMER') {
        let branch = '';

        if (user === "CUSTOMER") {
            let branch_id = await branchController.getSelectedBranch() || null;
            if (branch_id == null) return null;

            branch = `&branch_id=${branch_id?.id}`;
        }

        const response = await fetchController.execute(`http://localhost:8080/products?name=${name}${branch}`);
        if (!response || Object.entries(response).length === 0) return null;

        return response;
    }

    async function getProducts(user = 'CUSTOMER') {
        let branch = '';

        if (user === "CUSTOMER") {
            let branch_id = await branchController.getSelectedBranch() || null;
            if (branch_id == null) return null;

            branch = `?branch_id=${branch_id?.id}`;
        }


        const response = await fetchController.execute(`http://localhost:8080/products${branch}`);
        if (!response || response?.error) return null;

        return response;
    }

    async function addProduct(product) {
        product.entryDate = '2023-06-18';
        if (product === null) throw new Error('Error al intentar crear el producto.');

        let token = await sessionAdminController.getUserToken();
		const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'POST', product, token);
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