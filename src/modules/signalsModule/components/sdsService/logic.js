import { getParams } from '../../../../utils/getParams';
import { sendRequest } from '../../../../utils/sendRequest';

export const getSignalsByPattern = async inputStatus => {
    const {
        parth,
        pattern,
    } = inputStatus;

    const params = getParams('GET');
    const urlPattern = `${parth}${pattern}/forex`
    return await sendRequest(urlPattern, params);
}