// @ts-nocheck
import { Product } from '../../../../logic/dtos/Product.js';
import productController from '../../../../logic/productController.js';

export async function load({ params }) {    
    let product_name = params.product_id;
    let productResponse = new Product();

    if (product_name !== 'nuevo') {
        // Convert slug into proper name
        product_name = product_name.replace('_', " ");
 
        // Find product by code
        const response = await productController.getProduct(product_name, 'ADMIN');
        if (!response || response?.error) return { status: 404 };

        productResponse = response.data.content[0];
    }

    return {
        product: productResponse
    }
}