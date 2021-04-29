import { getParams } from '../../../../utils/getParams';
import { sendRequest } from '../../../../utils/sendRequest';

export const getSignalsByPattern = async signalData => {
    const {
        parth,
        pattern,
        sid,
        umid,
    } = signalData;

    const params = getParams('GET', umid, sid);
    const urlPattern = `${parth}${pattern}`
    return await sendRequest(urlPattern, params);
}
