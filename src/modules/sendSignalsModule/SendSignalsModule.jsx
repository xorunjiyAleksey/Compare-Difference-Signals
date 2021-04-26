import React from 'react';
import { MainWrapper } from './styledComponent.js';
import SdsService from './components/sdsService/SdsService.jsx';
import AutoChartistService from './components/autoChartistService';

const SendSignalsModule = () => {
    return (
        <MainWrapper>
            <AutoChartistService/>
            <SdsService/>
        </MainWrapper>
    );
}

export default React.memo(SendSignalsModule);