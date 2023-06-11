// @ts-nocheck

import fetchController from "./fetchController";

const categoryController = (() => {

    async function getCategories() {
        const branches = await fetchController.execute("http://localhost:8080/categories");
        if (branches == null || branches.error) return null;

        return branches.data;
    }

    return {
        getCategories
    }

})();

export default categoryController;