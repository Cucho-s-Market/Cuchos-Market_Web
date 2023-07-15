// @ts-nocheck
import ProductImages from "$lib/components/product-detail-page/ProductImages.svelte";
import { branchStore } from "./Stores/BranchStore";
import branchController from "./branchController";
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";
import sessionController from "./sessionController";
import firebaseController from "./third-party/firebaseController";

const productController = (() => {

    // Find item by slug
    async function getProduct(name) {
        let branch = '';
        let response = null;
        let petition = ``;

        let adminSession = await sessionAdminController.getUser();

        if (adminSession && adminSession.role === "ADMIN") {
            petition = `https://cuchos-market-2023-34241c211eef.herokuapp.com/products?name=${name}`;
        } else {
            let branch_id = await branchController.getSelectedBranch() || null;
            if (branch_id == null) return null;
            branch = `&branch_id=${branch_id?.id}`;

            petition = `https://cuchos-market-2023-34241c211eef.herokuapp.com/products?name=${name}${branch}`;
        }

        response = await fetchController.execute(petition);
        if (!response || Object.entries(response).length === 0) return null;

        response.data.content.forEach(element => {
            element.images = element.images?.map((elem) => {return JSON.parse(elem)}) ?? null;
        });

        return response;
    }

    async function getProducts(category_id = "") {
        let branch = '';
        let response = null;
        let category = category_id !== "" ? `&category_id=${category_id}` : '';
        let petition = '';

        

        let adminSession = await sessionAdminController.getUser();

        if (adminSession && adminSession.role === "ADMIN") {
            petition = `https://cuchos-market-2023-34241c211eef.herokuapp.com/products`;
        } else {
            let branch_id = await branchController.getSelectedBranch() || null;
            if (branch_id == null) return null;
            branch = `?branch_id=${branch_id?.id}`;

            petition = `https://cuchos-market-2023-34241c211eef.herokuapp.com/products${branch}${category}`;
        }


        response = await fetchController.execute(petition);
        if (!response || response?.error) return null;

        response.data.content.forEach(element => {
            element.images = element.images?.map((elem) => {return JSON.parse(elem)}) ?? null;
        });

        return response;
    }

    async function addProduct(product) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

        //convert images
        product.images = product.images?.map(elem => {JSON.stringify(elem)}) ?? null;

        let token = await sessionAdminController.getUserToken();
        const res = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/products`, 'POST', product, token);
        return res;
    }

    async function editProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar actualizar el producto.');


        const res = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/products`, 'PUT', product, adminToken);
        return res;
    }

    async function deleteProduct(product, adminToken) {
        if (product === null) throw new Error('Error al intentar crear el producto.');

        let productsImages = product.images;

        product.images = product.images?.map(elem => {JSON.stringify(elem)}) ?? null;

        const res = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/products`, 'DELETE', product, adminToken);
        if(res) {
            productsImages.forEach(element => {
                firebaseController.remove(element.name);
            });
        }

        return res;
    }

    async function updateStock(productId, stock) {
        if (!productId) null;

        const branch = await branchController.getSelectedBranch();

        if (!branch) return null;

        let token = await sessionAdminController.getUserToken();

        const sendStock = {
            product_id: productId.replace('_', ' '),
            branch_id: branch.id,
            quantity: parseInt(stock)
        };
        
        const res = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/products/employee/stock`, 'PUT', sendStock, token);
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