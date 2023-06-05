import fetchController from "./fetchController";

// @ts-nocheck
const adminController = (() => {

    //USERS
    async function getUsers() {
        return await fetchController.execute('http://localhost:8080/users');
    }


    //PRODUCTS

    return {
        getUsers
    }
})();

export default adminController;