// @ts-nocheck
import ProductImages from "$lib/components/product-detail-page/ProductImages.svelte";
import { branchStore } from "./Stores/BranchStore";
import branchController from "./branchController";
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";
import firebaseController from "./third-party/firebaseController";

const productController = (() => {

    // Find item by slug
    async function getProduct(name) {
        let branch = '';
        let response = null;

        // let user = await sessionAdminController.getUser();
        // if (user) {
        //     if (user.role === "CUSTOMER" || user.role === "EMPLOYEE") {
                let branch_id = await branchController.getSelectedBranch() || null;
                if (branch_id == null) return null;

                branch = `&branch_id=${branch_id?.id}`;
            // }

            response = await fetchController.execute(`http://localhost:8080/products?name=${name}${branch}`);
            if (!response || Object.entries(response).length === 0) return null;
        // }

        response.data.content.forEach(element => {
            if(element.images) element.images = element.images.map((elem) => {return JSON.parse(elem)});
        });

        return response;
    }

    async function getProducts(category_id = "") {
        let branch = '';
        let response = null;

        // let user = await sessionAdminController.getUser();

        // if(user) {
        //     if (user.role === "CUSTOMER" || user.role === "EMPLOYEE") {
                let branch_id = await branchController.getSelectedBranch() || null;
                if (branch_id == null) return null;
                branch = `?branch_id=${branch_id?.id}`;
            // }
    
    
            response = await fetchController.execute(`http://localhost:8080/products${branch}&category_id=${category_id}`);
            if (!response || response?.error) return null;
        // }

        response.data.content.forEach(element => {
            if(element.images) element.images = element.images.map((elem) => {return JSON.parse(elem)});
        });

        return response;
    }

    async function addProduct(product) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

        //convert images
        //product.images = product.images.map(elem => {JSON.stringify(elem)});

        let token = await sessionAdminController.getUserToken();
        const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'POST', product, token);
        return res;
    }

    async function editProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar actualizar el producto.');


        const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'PUT', product, adminToken);
        return res;
    }

    async function deleteProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

        let productsImages = JSON.parse(product.images);

        if(productsImages.name) {
            productsImages = [productsImages];
        }

        const res = await fetchController.execute(`http://127.0.0.1:8080/products`, 'DELETE', product, adminToken);
        if(res) {
            productsImages.forEach(element => {
                firebaseController.remove(element.name);
            });
        }

        return res;
    }

    async function updateStock(productId, stock) {
        if (!productId) throw new Error('Error al intentar crear el producto.');

        const branch = await branchController.getSelectedBranch();

        if (!branch) return null;

        let token = await sessionAdminController.getUserToken();

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