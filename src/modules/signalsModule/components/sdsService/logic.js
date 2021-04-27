import { url } from '../../../../config';
import { getParams } from '../../../../utils/getParams';
import { sendRequest } from '../../../../utils/sendRequest';

export const getSignalsByPattern = async inputStatus => {
    const {
        pattern
    } = inputStatus;

    const params = getParams('GET');
    const urlPattern = `${url}${pattern}`
    return await sendRequest(urlPattern, params);
}