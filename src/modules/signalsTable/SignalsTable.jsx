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
    const compareButtons = [{ buttonLabel: 'compare chart patterns', name: 'chart' }, { buttonLabel: 'compare fibonacci patterns', name: 'fibonacci' }, { buttonLabel: "compare key levels patterns", name: 'key levels' }, { buttonLabel: "compare all", name: 'key levels' }];
    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'Table-Container'}>
                <TableModule data-at={'Table-Container__tableModule'}>
                    <TableWrapper data-at={'TableModule__tableWrapper'}>
                        {signalTitle.map((title, index) => <Table key={index} title={title}/>)}
                    </TableWrapper>
                    <CompareButtonWrapper data-at={'TableModule__compareButtonWrapper'}> 
                        {compareButtons.map((name, id) => <Button key={id} name={name}/>)}
                    </CompareButtonWrapper>
                </TableModule>
            </Wrapper>
        </ThemeProvider>
    );
}

export default React.memo(SignalsTable);