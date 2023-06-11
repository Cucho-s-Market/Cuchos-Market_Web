import adminController from '../../../logic/adminController';


/** @type {import('./$types').PageLoad} */
export async function load() {

    const products = await adminController.getProducts();

    return {products};
}