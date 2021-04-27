export const sendRequest = async (url, params) => {
    try {
        return await fetch(url, params).then(response => response.json());
    } catch (e) {
        console.error(e)
    }
}