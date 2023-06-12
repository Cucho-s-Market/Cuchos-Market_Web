// @ts-nocheck
import fetchController from "./fetchController";

const productController = (() => {

    // Find item by slug
    async function getProduct(code) {
        debugger;
        const response = await fetchController.execute(`http://localhost:8080/products/${code}`);
        if(!response || Object.entries(response).length === 0) return null;

        return response;
    }

    async function getProducts() {
        const response = await fetchController.execute(`http://localhost:8080/products`);
        if(!response || Object.entries(response).length === 0) return null;

        return response;
    }
    return {
        getProduct,
        getProducts
    }
})();

export default productController;