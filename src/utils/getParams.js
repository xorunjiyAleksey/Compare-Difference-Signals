export const getParams = (method, body, sendData) => {

    return {
        method,
        headers: {
            'Content-Type': 'application/json',
            'SID':'80acff39-4d10-475f-9b40-8cb2a7ac149e',
            'UMID': 'fc4f681652da441ea59d5830336d49b9'
        },
        body,
    }
}