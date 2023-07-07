
//@ts-nocheck

import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";

const chartController = (() => {

    async function getProducts(branchId, startDate, endDate) {
        const token = sessionAdminController.getToken();

        const response = await fetchController.execute(`http://localhost:3000/api/v1/chart/products?branch_id=${branchId}&startDate=${startDate}&endDate=${endDate}`, "GET", null, token, 1);

    }


	return {
		getProducts
	}
})();

export default sessionController;