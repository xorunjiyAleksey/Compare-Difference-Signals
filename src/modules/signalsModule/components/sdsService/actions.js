import constants from '../../../../constants';

export const onSendSignal = payload => ({
    type: constants.SEND_PATTERN,
    payload,
})