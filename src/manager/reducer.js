import constants from '../constants';

const initialState = {
    getSignalButtonIsEnable: true,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case constants.SEND_PATTERNS_ACTIVE:
            return {
                ...state,
                getSignalButtonIsEnable: false
            }
        default:
            return state;
    }
}