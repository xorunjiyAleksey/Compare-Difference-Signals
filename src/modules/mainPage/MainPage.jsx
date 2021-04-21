import React from 'react';
import Top from '../top/Top.jsx';
import Bottom from '../bottom/Bottom.jsx';
import {
    Wrapper,
    GlobalStyle,
} from './StyledComponent.js';

const MainPage = () => {
    return (
        <Wrapper data-at={'main-page_wrapper'}>
            <Wrapper.Top data-at={'wrapper_top'}>
                <Top/>
            </Wrapper.Top>
            <Wrapper.Bottom data-at={'wrapper_bottom'}>
                <Bottom/>
            </Wrapper.Bottom>
            <GlobalStyle/>
        </Wrapper>
    );
}

export default React.memo(MainPage);