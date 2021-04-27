import { getParams } from '../../../../utils/getParams';
import { sendRequest } from '../../../../utils/sendRequest';

export const getSignalsByPattern = async signalData => {
    const {
        parth,
        pattern,
    } = signalData;

    const urlPattern = `${parth}${pattern}`
    const params = getParams('GET');
    return await sendRequest(urlPattern, params);
}

