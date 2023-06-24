// @ts-nocheck
import productController from '../../../logic/productController.js';

export async function load({ params }) {
    let product_name = params.product_code;
    
    // Convert slug into proper name
    product_name = product_name.replace(/_/g, " ");

    // Find product by code
    const response = await productController.getProduct(product_name);
    if(!response?.data?.content?.length || !response || response?.error) return {status: 404};

    return {
        status: 200,
        product: response.data.content[0]
    }
}