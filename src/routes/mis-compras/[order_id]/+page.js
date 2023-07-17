// @ts-nocheck

import { Order } from "../../../logic/dtos/Order";
import orderController from "../../../logic/orderController";

export async function load({ params }) {    
    
    let item_id = params.order_id;
    let dataResponse = new Order();

    // Find product by code
    let response = await orderController.getOrder(item_id, true);
    if (!response || response?.error) return null;

    return {
        order: response
    }
}