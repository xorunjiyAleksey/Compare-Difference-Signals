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

export const watchPattern = (pattern, inputData, dispatchAction) => {
    switch (pattern) {
        case 'chart': {
            getSignalsChartPattern(inputData, dispatchAction);
            return;
        }
        case 'fibonacci': {
            getSignalsFibonacciPattern(inputData, dispatchAction);
            return;
        }
        case 'keyLevels': {
            getSignalsKeyLevelsPattern(inputData, dispatchAction);
            return;
        }
        default: return;
    }
}

export const getSignalsChartPattern = async (inputData, dispatchAction) => {
    const signals = await getSignalsByPattern(inputData);

    dispatchAction({ type: 'set_signals_chart_pattern', payload: signals })
}
export const getSignalsFibonacciPattern = async (inputData, dispatchAction) => {
    const signals = await getSignalsByPattern(inputData);

    dispatchAction({ type: 'set_signals_fibonacci_pattern', payload: signals })
}
export const getSignalsKeyLevelsPattern = async (inputData, dispatchAction) => {
    const signals = await getSignalsByPattern(inputData);

    dispatchAction({ type: 'set_signals_keyLevels_pattern', payload: signals })
}