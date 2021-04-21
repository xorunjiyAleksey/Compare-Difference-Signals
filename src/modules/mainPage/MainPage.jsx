import React from 'react';
import Top from '../sendSignalsModule/SendSignalsModule.jsx';
import Bottom from '../bottom/Bottom.jsx';
import {
    Wrapper,
} from './StyledComponent.js';

const MainPage = () => {
    return (
            <Wrapper>
                <Top/>
                <Bottom/>
            </Wrapper>
    );
}

export default React.memo(MainPage);