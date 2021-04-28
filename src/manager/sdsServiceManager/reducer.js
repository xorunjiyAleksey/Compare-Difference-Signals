import constants from '../../constants';

const initialState = {
    chart: [],
    fibonacci:[],
    keyLevels:[],
    isBtnEnable: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case constants.IS_BUTTON_ENABLE:
            return {
                ...state,
                isBtnEnable: true
            }
        case constants.SEND_SDS_SERVICE:
            return {
                ...state,
                chart: action.payload,
                isBtnEnable: false
            }
        default:
            return state;
    }
}