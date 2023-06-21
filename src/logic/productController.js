// @ts-nocheck
import { branchStore } from "./Stores/BranchStore";
import branchController from "./branchController";
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";

const productController = (() => {

    // Find item by slug
    async function getProduct(name) {
        let branch = '';

        let user = await sessionAdminController.getUser();

        if (user === "CUSTOMER" || user === "EMPLOYEE") {
            let branch_id = await branchController.getSelectedBranch() || null;
            if (branch_id == null) return null;

            branch = `&branch_id=${branch_id?.id}`;
        }

        const response = await fetchController.execute(`http://localhost:8080/products?name=${name}${branch}`);
        if (!response || Object.entries(response).length === 0) return null;

        return response;
    }

    async function getProducts() {
        let branch = '';

        let user = await sessionAdminController.getUser();

        if (user === "CUSTOMER" || user === "EMPLOYEE") {
            let branch_id = await branchController.getSelectedBranch() || null;
            if (branch_id == null) return null;

            branch = `?branch_id=${branch_id?.id}`;
        }


        const response = await fetchController.execute(`http://localhost:8080/products${branch}`);
        if (!response || response?.error) return null;

        return response;
    }

    async function addProduct(product) {
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

    async function updateStock(productId, stock) {
        if (!productId) throw new Error('Error al intentar crear el producto.');

        const branch = await branchController.getSelectedBranch();

        if(!branch) return null;

        let token = await sessionAdminController.getUserToken();

        debugger;

        const sendStock = {
            product_id: productId,
            branch_id: branch.id,
            quantity: parseInt(stock)
        };

		const res = await fetchController.execute(`http://127.0.0.1:8080/products/employee/stock`, 'PUT', sendStock, token);
		return res;
    }

    return {
        getProduct,
        getProducts,
        addProduct,
        editProduct,
        deleteProduct,
        updateStock
    }
})();

export default productController;