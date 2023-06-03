// @ts-nocheck
const fetchController = (() => {

    async function execute(url, method = "GET", data = null) {
        let resultFetch = null;

        let headers = {
            'Content-Type': 'application/json',
        }

        let properties = { method: method, headers: headers };

        if (method !== "GET") properties.body = JSON.stringify(data);

        console.log('properties ', properties);
        console.log('url ', url);

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