// @ts-nocheck
const fetchController = (() => {

    async function execute(url, method = "GET", data = null, token = null) {
        let resultFetch = null;

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY4NjAwMzIyMywiZXhwIjoxNjg2MDg5NjIzfQ.UpPgLqiCPlgWpNb9blT53bzPTnMPgREBZyQ-KiKshuM`
        };

        if (token != null) headers.Authorization = `Bearer ${token}`;

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