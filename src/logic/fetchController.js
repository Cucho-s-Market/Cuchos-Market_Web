// @ts-nocheck
const fetchController = (() => {

    async function execute(url, method = "GET", data = null) {
        let resultFetch = null;
    
        let properties = { method: method, headers: { 'Content-Type': 'application/json' } };
    
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