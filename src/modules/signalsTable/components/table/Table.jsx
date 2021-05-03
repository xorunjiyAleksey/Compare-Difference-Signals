import React from 'react'
import {
    TableColumn,
    TableColumnContent

} from './StyledComponent.js';

const Table = props => {
    const{
        title,
        signalContent,
    } = props;

    return (
            <TableColumn data-at={'TableWrapper__TableColumn'}>
                <TableColumn.title children={title}/>
                <TableColumn.column>
                    {Object.values(signalContent).map(el => <TableColumnContent children={el}/>)}
                </TableColumn.column>
            </TableColumn>
    )
}

export default React.memo(Table);
