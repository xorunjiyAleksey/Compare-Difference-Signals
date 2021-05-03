import React from 'react';
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