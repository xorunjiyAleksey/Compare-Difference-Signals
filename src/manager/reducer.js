import constants from '../constants';

const initialState = {
    sendPattern: [],
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
                sendPattern: action.payload,
                isBtnEnable: false
            }
        default:
            return state;
    }
}