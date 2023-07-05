// @ts-nocheck

import { branchStore } from "./Stores/BranchStore";
import cartController from "./cartController";
import fetchController from "./fetchController";
import { get } from "svelte/store";

const branchController = (() => {

    async function getBranches() {
        debugger; 
        
        let branchesSession = get(branchStore);

        // If branches session are empty is the first time that the user is using the app
        if (branchesSession == null || Object.entries(branchesSession).length === 0) {

            let branchesServer = await fetchController.execute("http://localhost:8080/branches");
            if (branchesServer?.data == null || branchesServer?.error) return null;

            // Set selected branch to the first branch
            const branchesObj = {selected: branchesServer?.data[0], branches: branchesServer?.data};

            branchStore.set(branchesObj);

            return branchesObj;
        }

        // If branches session are not empty return the branches
        return branchesSession;
    }

    async function selectBranch(branchId) {
        debugger;
        let branches = get(branchStore);
        if (branches == null) return;

        // Set selected branch
        branches.selected = branches?.branches?.find(branch => branch?.id === branchId);

        cartController.clearCart();

        branchStore.set(branches);
    }

    async function getSelectedBranch() {
        let branches = get(branchStore);
        if (branches == null) return null;

        return branches.selected;
    }

    return {
        getBranches,
        selectBranch,
        getSelectedBranch
    }

})();

export default branchController;