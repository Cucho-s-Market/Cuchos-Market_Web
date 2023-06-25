// // @ts-nocheck
// import orderController from '../../../logic/orderController.js';
// import productController from '../../../logic/productController.js';

// export async function load({ params }) {
//     
//     let orderId = params.orderId;

//     // Find product by code
//     const response = await orderController.getOrder(orderId);
//     if (response == null || response.error) return {
//         status: 404,
//         error: response.error
//     }

//     return {
//         status: 200,
//         product: response.data.content[0]
//     }
// }