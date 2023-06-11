import categoryController from '../../../logic/categoryController';


/** @type {import('./$types').PageLoad} */
export async function load() {

    const categories = await categoryController.getCategories();
    
    return {categories};
}