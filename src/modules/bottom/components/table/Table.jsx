import React from 'react'
import {
    TableColumn,
} from './StyledComponent.js';

const Table = props => {
    const{
        title
    } = props
    return (
            <TableColumn data-at={'TableWrapper__TableColumn'}>
                <TableColumn.title children={title}/>
                <TableColumn.column/>
            </TableColumn>
    )
}

export default React.memo(Table);
