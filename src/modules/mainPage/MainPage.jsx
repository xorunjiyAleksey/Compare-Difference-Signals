import React from 'react';
import Top from '../top/Top.jsx';
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