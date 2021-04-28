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

// export const watchPattern = (pattern, inputData, dispatchAction) => {
//     switch (pattern) {
//         case 'chart': {
//             getSignalsChartPatterns(inputData, dispatchAction);
//             return;
//         }
//         case 'fibonacci': {
//             getSignalsFibonacciPatterns(inputData, dispatchAction);
//             return;
//         }
//         case 'keyLevels': {
//             getSignalsKeyLevelsPatterns(inputData, dispatchAction);
//             return;
//         }
//         default: return;
//     }
// }
//
// export const getSignalsChartPatterns = async (inputData, dispatchAction) => {
//     const signals = await getSignalsByPattern(inputData);
//
//     dispatchAction({ type: 'set_signals_chart_pattern', payload: signals })
// }
// export const getSignalsFibonacciPatterns = async (inputData, dispatchAction) => {
//     const signals = await getSignalsByPattern(inputData);
//
//     dispatchAction({ type: 'set_signals_fibonacci_pattern', payload: signals })
// }
// export const getSignalsKeyLevelsPatterns = async (inputData, dispatchAction) => {
//     const signals = await getSignalsByPattern(inputData);
//
//     dispatchAction({ type: 'set_signals_keyLevels_pattern', payload: signals })
// }