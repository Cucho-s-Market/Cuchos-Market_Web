// @ts-nocheck

import fetchController from "./fetchController";

const branchController = (() => {

    async function getBranches() {
        const branches = await fetchController.execute("http://localhost:8080/branches");
        if (branches == null || branches.error) return null;

        return branches.data;
    }

    return {
        getBranches
    }

})();

export default branchController;