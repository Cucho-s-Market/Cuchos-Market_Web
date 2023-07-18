import orderController from '../../../logic/orderController';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const issues = await orderController.getIssues();
    
    return {issues};
}