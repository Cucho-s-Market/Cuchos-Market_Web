// @ts-nocheck
import productController from '../../../logic/productController.js';

export async function load({ params }) {

    const product_code = params.product_code;

    // Find product by code
    const response = await productController.getProduct(product_code);
    if(!response || response?.error) return {status: 404};

    return {
        status: 200,
        product: response.data
    }
}