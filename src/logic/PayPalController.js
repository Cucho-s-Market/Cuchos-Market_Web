<<<<<<< HEAD
// @ts-nocheck
import { loadScript } from "@paypal/paypal-js";
import fetchController from "./fetchController";

const PayPalController = (() => {
    // use the orders api to create an order
    async function createOrder(paymentObj) {
        debugger;
        const accessToken = await generateAccessToken();
        const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders`;
        const response = await fetchController.execute(url, "POST", paymentObj, accessToken);
        return response?.id;
    }

    // use the orders api to capture payment for an order
    async function capturePayment(orderId) {
        debugger;
        const accessToken = await generateAccessToken();
        const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;
        const response = await fetchController.execute(url, "POST", null, accessToken);
        return response;
    }

    // generate an access token using client id and app secret
    async function generateAccessToken() {
        const auth = btoa("AStj36A7uIpA8TJSs7ksWyfZbWS1i_hJHyXuTCWPe660YhEQdCU4rMjwOOY4BS2TbRAOyLned3vrx_ev" + ":" + "EFIdIgPeMWSiDaU0DZ3PY8TNAhi1XiDS1fNZ-YT0m4NBSxCjk9UdMLlfewhp500NWFERhKYqx_EL50-s");

        // Create post fetch
        let response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization" : `Basic ${auth}`
            },
            body: "grant_type=client_credentials"
        });
        response = await response.json();
        return response.access_token;
    }

    async function convertUSDtoUYU(uyu_value){
        debugger;
        const response = await fetchController.execute("https://cotizaciones-brou-v2-e449.fly.dev/currency/latest");
        if(!response || Object.entries(response).length === 0) return null;

        const usd_value = Number(uyu_value) / Number(response.rates.USD.buy);
        if(!usd_value) return null;

        return usd_value;
    }

    return {
        createOrder,
        capturePayment,
        generateAccessToken,
        convertUSDtoUYU
    }
})();

=======
// @ts-nocheck
import { loadScript } from "@paypal/paypal-js";
import fetchController from "./fetchController";

const PayPalController = (() => {
    // use the orders api to create an order
    async function createOrder(paymentObj) {
        
        const accessToken = await generateAccessToken();
        const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders`;
        const response = await fetchController.execute(url, "POST", paymentObj, accessToken);
        return response?.id;
    }

    // use the orders api to capture payment for an order
    async function capturePayment(orderId) {
        
        const accessToken = await generateAccessToken();
        const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;
        const response = await fetchController.execute(url, "POST", null, accessToken);
        return response;
    }

    // generate an access token using client id and app secret
    async function generateAccessToken() {
        const auth = btoa("AStj36A7uIpA8TJSs7ksWyfZbWS1i_hJHyXuTCWPe660YhEQdCU4rMjwOOY4BS2TbRAOyLned3vrx_ev" + ":" + "EFIdIgPeMWSiDaU0DZ3PY8TNAhi1XiDS1fNZ-YT0m4NBSxCjk9UdMLlfewhp500NWFERhKYqx_EL50-s");

        // Create post fetch
        let response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization" : `Basic ${auth}`
            },
            body: "grant_type=client_credentials"
        });
        response = await response.json();
        return response.access_token;
    }

    async function convertUSDtoUYU(uyu_value){
        
        const response = await fetchController.execute("https://cotizaciones-brou-v2-e449.fly.dev/currency/latest");
        if(!response || Object.entries(response).length === 0) return null;

        const usd_value = Number(uyu_value) / Number(response.rates.USD.buy);
        if(!usd_value) return null;

        return usd_value;
    }

    return {
        createOrder,
        capturePayment,
        generateAccessToken,
        convertUSDtoUYU
    }
})();

>>>>>>> c0aeb8a1e854b15a8d3c70a0bcf313c9045601a4
export default PayPalController;