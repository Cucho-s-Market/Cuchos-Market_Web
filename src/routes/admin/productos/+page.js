import adminController from '../../../logic/adminController';
import branchController from '../../../logic/branchController';
import productController from '../../../logic/productController';
import sessionAdminController from '../../../logic/sessionAdminController';


/** @type {import('./$types').PageLoad} */
export async function load() {

    const products = await productController.getProducts(); 

    return {products};
}