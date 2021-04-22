import React from 'react';
import {
    Wrapper,
    TableModule,
    Table,
    CompareButtons,
    Button,
    TableDisplay, TableColumn,
} from './StyledComponent.js';

const Bottom = () => {
    return (
        <Wrapper data-at={'Table-Container'}>
            <TableModule data-at={'Table-Container__tableModule'}>
                <Table data-at={'TableModule__table'}>
                        <TableColumn data-at={'tableDisplays__TableDisplay'}>
                            <TableColumn.title/>
                            <TableColumn.column/>
                        </TableColumn>
                </Table>
                <CompareButtons data-at={'TableModule__compareButtons'}>
                    <Button data-at={'CompareButtons__button'}>
                        <Button.text>1</Button.text>
                    </Button>
                </CompareButtons>
            </TableModule>
        </Wrapper>
    );
}

export default React.memo(Bottom);