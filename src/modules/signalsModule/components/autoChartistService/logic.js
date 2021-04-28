import { getParams } from '../../../../utils/getParams';
import { sendRequest } from '../../../../utils/sendRequest';

export const getSignalsByPattern = async signalData => {
    const {
        parth,
        pattern,
        sid,
        umid,
    } = signalData;

    const urlPattern = `${parth}${pattern}`
    const params = getParams('GET', sid, umid);
    return await sendRequest(urlPattern, params);
}

