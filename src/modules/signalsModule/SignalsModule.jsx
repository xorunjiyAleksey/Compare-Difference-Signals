import React from 'react';
import _ from 'lodash';
import { MainWrapper } from './styledComponent.js';
import SdsService from './components/sdsService/SdsService.jsx';
import AutoChartistService from './components/autoChartistService/AutoChartistService.jsx';

const SignalsModule = props => {
    const {
        btnStatus,
        getSdsSignals,
        getAutochartistSignals,
        sendAutoSignal,
        sendSdsSignal
    } = props;
    const parsedSdsSignals = getSdsSignals.map(el => JSON.parse(el));
    console.log('parsedSdsSignals', parsedSdsSignals)
    console.log('getAutochartistSignals', getAutochartistSignals)
    // const parsedSdsSignals.map(el => el.id)
    function isEqual(parsedSdsSignals, getAutochartistSignals) {
        return parsedSdsSignals.map(function (one) {
            return getAutochartistSignals.some(function (two) {
                return two.val === one.val;
            });
        }).indexOf(false) > -1 ? false : true;
    }


    isEqual(parsedSdsSignals, getAutochartistSignals)


    return (
        <MainWrapper>
            <AutoChartistService
                btnStatus={btnStatus}
                sendAutoSignal={sendAutoSignal}
                getAutochartistSignals={getAutochartistSignals}
            />
            <SdsService
                getSdsSignals={getSdsSignals}
                sendSdsSignal={sendSdsSignal}
            />
        </MainWrapper>
    );
}

export default React.memo(SignalsModule);