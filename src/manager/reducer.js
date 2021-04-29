import constants from '../constants';

const initialState = {
    sendPattern:
        {
            chart: [],
            fibonacci:[],
            keyLevels:[],
        },
    isBtnEnable: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case constants.IS_BUTTON_ENABLE:
            return {
                ...state,
                isBtnEnable: true
            }
        case constants.SEND_PATTERN:
            return {
                ...state,
                sendPattern: {
                    ...state.sendPattern,
                    [action.payload.pattern]: [...action.payload.signals],
                },
                isBtnEnable: false
            }
        default:
            return state;
    }
}