import productController from '../../../logic/productController';


/** @type {import('./$types').PageLoad} */
export async function load() {

    productController
    const products = await productController.getProducts();

    return {products};
}