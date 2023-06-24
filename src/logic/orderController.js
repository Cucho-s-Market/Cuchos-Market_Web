// @ts-nocheck
import fetchController from "./fetchController";
import sessionController from "./sessionController";

const orderController = (() => {

    async function getOrder(orderId){
        debugger;
        const order = await fetchController.execute(`http://localhost:8080/orders/${orderId}`);
        if (order == null || order.error) return null;

        return order.data;
    }

    async function getOrders() {
        const orders = await fetchController.execute("http://localhost:8080/orders");
        if (orders == null || orders.error) return null;

        return orders.data;
    }

    async function createOrder(order) {
        debugger;
        const userToken = await sessionController.getUserToken();
        if (userToken == null) return null;

        const response = await fetchController.execute("http://localhost:8080/orders", "POST", order, userToken);
        return response;
    }

    return {
        getOrder,
        getOrders,
        createOrder
    }
})();

export default orderController;