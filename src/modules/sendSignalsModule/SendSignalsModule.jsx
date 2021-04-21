import React from 'react';
import {
    MainWrapper
} from './styledComponent.js';
import SdsService from './sdsService/SdsService';
import AutoChartistService from './autoChartistService/AutoChartistService';

const SendSignalsModule = () => {
    return (
        <MainWrapper>
            <AutoChartistService/>
            <SdsService/>
        </MainWrapper>
    );
}

export default React.memo(SendSignalsModule);