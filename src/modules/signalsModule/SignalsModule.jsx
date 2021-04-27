import React from 'react';
import { MainWrapper } from './styledComponent.js';
import SdsService from './components/sdsService/SdsService.jsx';
import AutoChartistService from './components/autoChartistService';

const SignalsModule = () => {
    return (
        <MainWrapper>
            <AutoChartistService/>
            <SdsService/>
        </MainWrapper>
    );
}

export default React.memo(SignalsModule);