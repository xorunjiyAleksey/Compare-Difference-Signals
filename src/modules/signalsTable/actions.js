import constants from '../../constants';

export const onSendDifferSignalsChart = payload => ({
    type: constants.SEND_DIFFERNCE_CHART,
    payload,
})

export const onSendDifferSignalsFibonacci = payload => ({
    type: constants.SEND_DIFFERNCE_FIBONACCI,
    payload,
})

export const onSendDifferSignalsKeyLevels = payload => ({
    type: constants.SEND_DIFFERNCE_KEYLEVELS,
    payload,
})

