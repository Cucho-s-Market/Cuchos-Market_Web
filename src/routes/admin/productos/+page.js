import adminController from '../../../logic/adminController';
import productController from '../../../logic/productController';


/** @type {import('./$types').PageLoad} */
export async function load() {
    const products = await productController.getProducts('ADMIN');

    return {products};
}