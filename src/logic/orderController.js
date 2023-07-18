// @ts-nocheck
import branchController from "./branchController";
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";
import sessionController from "./sessionController";

const orderController = (() => {

    async function getOrder(orderId, isCustomer = false){
        
        let token = (isCustomer) ? await sessionController.getUserToken() : await sessionAdminController.getUserToken();
        
        const order = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/orders/${orderId}`, "GET", null, token);
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

        const orders = await fetchController.execute("https://cuchos-market-2023-34241c211eef.herokuapp.com/orders" + branch, "GET", null, token);
        if (orders == null || orders.error) return null;

        return orders.data;
    }

    async function createOrder(order) {
        const userToken = await sessionController.getUserToken();
        if (userToken == null) return null;

        const response = await fetchController.execute("https://cuchos-market-2023-34241c211eef.herokuapp.com/orders", "POST", order, userToken);
        return response;
    }

    async function updateOrder(order) {
        const userToken = await sessionAdminController.getUserToken();
        if (userToken == null) return null;

        let branch_id = await branchController.getSelectedBranch() || null;

        if (branch_id == null) return null;

        order.branchId = branch_id.id;

        const response = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/orders/employee`, "PUT", order, userToken);
        return response;
    }

    async function getUserOrders(){
        
        const token = await sessionController.getUserToken();

        const orders = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/orders/customer`, "GET", null, token);
        if (orders == null || orders.error) return null;

        return orders?.data?.content;
    }

    async function cancelCustomerOrder(order_id){
        const token = await sessionController.getUserToken();

        const response = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/orders/${order_id}`, "PUT", null, token);
        return response;
    }

    async function addIssue(issue){
        const userToken = await sessionController.getUserToken();
        const response = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/orders/issues`, "POST", issue, userToken);
        return response;
    }

    async function getIssues(){
        const userToken = await sessionAdminController.getUserToken();

        const branch = await branchController.getSelectedBranch();
        const branchId = branch?.id;

        

        const response = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/branches/${branchId}/issues`, "GET", null, userToken);
        return response;
    }

    return {
        getOrder,
        getOrders,
        createOrder,
        updateOrder,
        getUserOrders,
        cancelCustomerOrder,
        addIssue,
        getIssues
    }
})();

export default orderController;