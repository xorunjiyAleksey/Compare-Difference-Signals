import constants from '../../constants';

export const onSendSdsSignal = payload => ({
    type: constants.SEND_SDS_SERVICE,
    payload,
})

export const onSendAutoSignal = payload => ({
    type: constants.SEND_PATTERN,
    payload,
})
