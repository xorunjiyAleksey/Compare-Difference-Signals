import constants from '../../constants';

const initialState = {
    chartDiffers: {},
    fibonacciDiffers: {},
    keyLevelsDiffers: {},
}

export default (state = initialState, action) => {
    switch(action.type) {
        case constants.SEND_DIFFERNCE_FIBONACCI:
            return {
                ...state,
                fibonacciDiffers: {...action.payload},
            }
        case constants.SEND_DIFFERNCE_CHART:
            return {
                ...state,
                chartDiffers: {...action.payload},
            }
        case constants.SEND_DIFFERNCE_KEYLEVELS:
            return {
                ...state,
                keyLevelsDiffers: {...action.payload},
            }
        default:
            return state;
    }
}