export const getParams = (method, body, sendData) => {

    return {
        method,
        headers: {
            'Content-Type': 'application/json',
            'SID':'eb7701eb-71a7-4801-9d63-9853b0115565',
            'UMID': 'fc4f681652da441ea59d5830336d49b9'
        },
        body,
    }
}