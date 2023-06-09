// @ts-nocheck
const fetchController = (() => {

    async function execute(url, method = "GET", data = null, token = null, authType = 1) {
        let resultFetch = null;

        let headers = {
            'Content-Type': 'application/json'
        };

        if (token != null && authType == 1) {
            headers.Authorization = `Bearer ${token}`;
        }
        else if (token != null && authType == 2) {
            headers.Authorization = `Basic ${token}`;
        }
        

        let properties = { method: method, headers: headers };

        if (method !== "GET") properties.body = JSON.stringify(data);

        const result = await fetch(url, properties);
        if (!result.ok) return null;

        resultFetch = await result.json();

        return resultFetch;
    }

    return {
        execute: execute
    }
})();

export default fetchController;