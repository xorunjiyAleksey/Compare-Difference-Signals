import React from 'react';
import {
    Wrapper,
    TableModul,
    Table,
    CompareButtons,
    Button,
    TableHeaders,
    TableHeader,
    TableDisplays,
    TableDisplay,
} from './StyledComponent.js';

const Bottom = () => {
    return (
        <Wrapper data-at={'Table-Container'}>
            <TableModul data-at={'Table-Container__tableModul'}>
                <Table data-at={'TableModul__table'}>
                    <TableHeaders data-at={'Table__tableHeaders'}>
                        <TableHeader data-at={'TableHeaders__tableHeader'}>
                            <TableHeader.text>signals id</TableHeader.text>
                            <TableHeader.text>name field</TableHeader.text>
                            <TableHeader.text>autochartist</TableHeader.text>
                            <TableHeader.text>sds</TableHeader.text>
                        </TableHeader>
                    </TableHeaders>
                    <TableDisplays data-at={'Table__tableDisplays'}>
                        <TableDisplay data-at={'tableDisplays__TableDisplay'}>FirstTable</TableDisplay>
                    </TableDisplays>
                </Table>
                <CompareButtons data-at={'TableModul__compareButtons'}>
                    <Button data-at={'CompareButtons__button'}>
                        <Button.text>1</Button.text>
                    </Button>
                </CompareButtons>
            </TableModul>
        </Wrapper>
    );
}

export default React.memo(Bottom);