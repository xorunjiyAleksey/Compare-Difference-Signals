export const getParams = (method, umid, sid, body) => {
    return {
        method,
        headers: {
            'Content-Type': 'application/json',
            'SID':sid,
            'UMID': umid
        },
        body,
    }
}