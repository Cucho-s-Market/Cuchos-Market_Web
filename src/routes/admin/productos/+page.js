<<<<<<< HEAD
import adminController from '../../../logic/adminController';
import branchController from '../../../logic/branchController';
import productController from '../../../logic/productController';
import sessionAdminController from '../../../logic/sessionAdminController';


/** @type {import('./$types').PageLoad} */
export async function load() {

    const products = await productController.getProducts();

    debugger;

    return {products};
=======
import adminController from '../../../logic/adminController';
import branchController from '../../../logic/branchController';
import productController from '../../../logic/productController';
import sessionAdminController from '../../../logic/sessionAdminController';


/** @type {import('./$types').PageLoad} */
export async function load() {
    const products = await productController.getProducts(); 

    return {products};
>>>>>>> c0aeb8a1e854b15a8d3c70a0bcf313c9045601a4
}