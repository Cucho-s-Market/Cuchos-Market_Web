import adminController from "../../../../logic/adminController";
import { User } from "../../../../logic/dtos/User";

export async function load({ params }) {    
    let user_id = params.user_id;
    let userResponse = new User();

    if (user_id !== 'nuevo') {
        // Convert slug into proper name
        user_id = user_id.replace('_', " ");
 
        // Find product by code
        let response = await adminController.getUser(user_id);
        if (!response || response?.error) return null;

        userResponse = response.data;
    }

    return {
        user: userResponse
    }
}