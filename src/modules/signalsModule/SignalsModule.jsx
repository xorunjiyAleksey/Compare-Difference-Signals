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

    console.log('parsedSdsSignals', parsedSdsSignals);
    console.log('getAutochartistSignals', getAutochartistSignals);


    const diff = getAutochartistSignals.filter(item => parsedSdsSignals.every(i => item.resultUid !== i.resultUid));
    console.log({ diff });

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