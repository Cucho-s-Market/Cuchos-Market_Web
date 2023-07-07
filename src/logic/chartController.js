
//@ts-nocheck

import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";

const chartController = (() => {

    async function getProducts(branchId, startDate, endDate) {
           
        const token = await sessionAdminController.getUserToken();

        const response = await fetchController.execute(`http://localhost:8080/statistics/products?branch_id=${branchId}&startDate=${startDate}&endDate=${endDate}`, "GET", null, token, 1);

        if(response.error) {
            return null;
        }
        
        return response.data;
    }
	return {
		getProducts
	}
})();

export default chartController;