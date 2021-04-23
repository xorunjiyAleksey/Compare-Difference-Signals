import React from 'react';
import Top from '../sendSignalsModule/SendSignalsModule.jsx';
import Bottom from '../bottom/Bottom.jsx';
import {
    Wrapper,
    GlobalStyle,
} from './StyledComponent.js';
import {themeTable} from "../../theme/theme";
import { ThemeProvider } from "styled-components";

const MainPage = () => {
    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'main-page_wrapper'}>
                <Wrapper.Top data-at={'wrapper_top'}>
                    <Top/>
                </Wrapper.Top>
                <Wrapper.Bottom data-at={'wrapper_bottom'}>
                    <Bottom/>
                </Wrapper.Bottom>
                <GlobalStyle/>
            </Wrapper>
        </ThemeProvider>
    );
}

export default React.memo(MainPage);