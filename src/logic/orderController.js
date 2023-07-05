// @ts-nocheck
import branchController from "./branchController";
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";
import sessionController from "./sessionController";

const orderController = (() => {

    async function getOrder(orderId){
        const token = await sessionAdminController.getUserToken();
        const order = await fetchController.execute(`http://localhost:8080/orders/${orderId}`, "GET", null, token);
        if (order == null || order.error) return null;

        return order.data;
    }

    async function getOrders() {
        let branch = '';
        let token = null;

        let user = await sessionAdminController.getUser();

        if(user && user.role === 'EMPLOYEE') {
            let branch_id = await branchController.getSelectedBranch() || null;
            if (branch_id == null) return null;
            branch = `/branch/${branch_id?.id}`;

            token = await sessionAdminController.getUserToken();
        }

        const orders = await fetchController.execute("http://localhost:8080/orders" + branch, "GET", null, token);
        if (orders == null || orders.error) return null;

        return orders.data;
    }

    async function createOrder(order) {
        const userToken = await sessionController.getUserToken();
        if (userToken == null) return null;

        const response = await fetchController.execute("http://localhost:8080/orders", "POST", order, userToken);
        return response;
    }

    async function updateOrder(order) {
        const userToken = await sessionAdminController.getUserToken();
        if (userToken == null) return null;

        let branch_id = await branchController.getSelectedBranch() || null;

        if (branch_id == null) return null;

        order.branchId = branch_id.id;

        const response = await fetchController.execute(`http://localhost:8080/orders/employee`, "PUT", order, userToken);
        return response;
    }

    return {
        getOrder,
        getOrders,
        createOrder,
        updateOrder
    }
})();

export default orderController;