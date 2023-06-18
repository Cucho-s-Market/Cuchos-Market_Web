// @ts-nocheck
import { branchStore } from "./Stores/BranchStore";
import branchController from "./branchController";
import fetchController from "./fetchController";

const productController = (() => {

    // Find item by slug
    async function getProduct(name) {
        debugger;

        let branch_id = await branchController.getSelectedBranch() || null; 
        if(branch_id == null) return null;

        const response = await fetchController.execute(`http://localhost:8080/products?name=${name}&branch_id=${branch_id?.id}`);
        if(!response || Object.entries(response).length === 0) return null;

        return response;
    }

    async function getProducts() {
        debugger;
        let branch_id = await branchController.getSelectedBranch() || null; 
        if(branch_id == null) return null;

        const response = await fetchController.execute(`http://localhost:8080/products?branch_id=${branch_id?.id}`);
        if(!response || response?.error) return null;

        return response;
    }
    return {
        getProduct,
        getProducts
    }
})();

export default productController;