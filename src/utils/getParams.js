export const getParams = (method, body) => {
    return {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body,
    }
}