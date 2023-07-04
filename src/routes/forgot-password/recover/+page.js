// @ts-nocheck
import productController from '../../../logic/productController.js';
import sessionController from '../../../logic/sessionController.js';

export async function load({ url }) {
    // Check if token is valid);
    
    const token = new URLSearchParams(url.search).get('token');
    if (token == null) return {
        status: 400,
        error: true
    }

    const response = await sessionController.checkForgotPasswordToken(token);
    if (response == null || response.error) return {
        status: 400,
        error: true
    }

    return {
        status: 200,
        token: token,
        error: false
    }
}