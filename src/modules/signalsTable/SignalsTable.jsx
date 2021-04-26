import React from 'react';
import Table from './components/table/Table.jsx';
import Button from '../components/button/Button.jsx';
import {
    Wrapper,
    TableModule,
    TableWrapper,
    CompareButtonWrapper,
} from './StyledComponent.js';
import { ThemeProvider } from 'styled-components';
import { themeTable } from '../../theme/theme.js';

const SignalsTable = () => {
    const signalTitle = ["signals id", "name field", "autochartist", "sds"];
    const compareButtons = ["compare chart patterns", "compare fibonacci patterns", "compare key levels patterns", "compare all"];
    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'Table-Container'}>
                <TableModule data-at={'Table-Container__tableModule'}>
                    <TableWrapper data-at={'TableModule__tableWrapper'}>
                        {signalTitle.map((title, index) => <Table key={index} title={title}/>)}
                    </TableWrapper>
                    <CompareButtonWrapper data-at={'TableModule__compareButtonWrapper'}> 
                        {compareButtons.map((name, id) => <Button key={id} name={name}/>)} //TODO ID
                    </CompareButtonWrapper>
                </TableModule>
            </Wrapper>
        </ThemeProvider>
    );
}

export default React.memo(SignalsTable);