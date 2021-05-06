import constants from '../../constants';

const initialState = {
    chartDiffers: {},
    fibonacciDiffers: {},
    keyLevelsDiffers: {},
}

export default (state = initialState, action) => {
    switch(action.type) {

        case constants.SEND_DIFFERNCE:
            return {
                ...state,
                chartDiffers: {...action.payload},
                fibonacciDiffers: {...action.payload},
                keyLevelsDiffers: {...action.payload},
            }
        default:
            return state;
    }
}