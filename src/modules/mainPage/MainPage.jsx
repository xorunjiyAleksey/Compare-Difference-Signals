import React from 'react';
import SignalsModule from '../signalsModule';
import SignalsTable from '../signalsTable';
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
                    <SignalsModule/>
                </Wrapper.Top>
                <Wrapper.Bottom data-at={'wrapper_bottom'}>
                    <SignalsTable/>
                </Wrapper.Bottom>
                <GlobalStyle/>
            </Wrapper>
        </ThemeProvider>
    );
}

export default React.memo(MainPage);