export const getChartPatterns = async () => {
    const url = 'https://private-anon-560e749e9c-tradingservicesv2.apiary-mock.com/srvgtw/autochartist/v1/chartpatterns' //TODO REAL API
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    }).then(response => response.json());
}