import { combineReducers } from 'redux';
import sdsSignals from '../../manager/sdsServiceManager/reducer';
import autoChartistService from '../../manager/autoChartistServiceManager/reducer';
import differnces from '../../manager/differncesManager/reducer';

export default combineReducers({
    sdsSignals,
    differnces,
    autoChartistService
});
