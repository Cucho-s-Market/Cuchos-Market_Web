import orderController from '../../../logic/orderController';
import productController from '../../../logic/productController';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const orders = await orderController.getOrders();
    return {orders};
}