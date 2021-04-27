import { url } from '../../../../config';
import { getParams } from '../../../../utils/getParams';
import { sendRequest } from '../../../../utils/sendRequest';

export const getSignalsByPattern = async signalData => {
    const {
        sid,
        umid,
        pattern
    } = signalData;

    const urlPattern = `${url}${pattern}`
    const params = getParams('GET');
    return await sendRequest(urlPattern, params);
}

