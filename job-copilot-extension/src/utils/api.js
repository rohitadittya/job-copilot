const API_BASE_URL = "http://localhost:5000";

const constructUrl = (url, params) => {
    const apiUrl = `${API_BASE_URL}${url}`;
    if (!params) return apiUrl;

    const urlParams = new URLSearchParams(params).toString();
    return `${apiUrl}?${urlParams}`;
}

const constructHeaders = (headers) => {
    return {
        "Content-Type": "application/json",
        ...headers,
    };
}

/**
 * 
 * @param {*} apiUrl - This is the endpoint URL without base url. For example: /user/login
 * @param {*} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
 * @param {*} body - Request Body Object
 * @param {*} queryParams - Query Parameters Object, eg: { id: 1, name: "test" }
 * @param {*} headers - Headers Object, eg: { "Content-Type": "application/json" }
 * @returns 
 */
export const httpClient = async (apiUrl, method = "GET", body = null, queryParams = null, headersObj = {}) => {
    const url = constructUrl(apiUrl, queryParams);
    const options = {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: constructHeaders(headersObj),
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        const err = await response.json();
        throw err;
    }

    return await response.json();
};