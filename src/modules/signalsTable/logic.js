import { sendParams } from '../../utils/getParams';
import { sendRequest } from '../../utils/sendRequest';

export const sendSignalsByPattern = async (chartPatternResult, fibonacciPatternResult, keyLevelsPatternResult) => {

    const body = {
        chartPatternResult,
        fibonacciPatternResult,
        keyLevelsPatternResult
    };

    const params = sendParams('POST', body);
    const urlPattern = `http://localhost:3002/userInfo`;
    return await sendRequest(urlPattern, params);
}
