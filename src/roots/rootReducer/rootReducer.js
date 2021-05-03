import { combineReducers } from 'redux';
import sdsSignals from '../../manager/sdsServiceManager/reducer';
import autoChartistService from '../../manager/autoChartistServiceManager/reducer';

export default combineReducers({
    sdsSignals,
    autoChartistService
});
