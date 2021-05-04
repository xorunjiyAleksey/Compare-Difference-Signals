import React from 'react'
import {
    TableColumn,
    TableColumnContent

} from './StyledComponent.js';

const Table = props => {
    const{
        title,
        signalContent,
        showDiff,
    } = props;
    console.log('sig', signalContent)
    return (
            <TableColumn data-at={'TableWrapper__TableColumn'}>
                <TableColumn.title children={title}/>
                <TableColumn.column>
                    {signalContent.chartValue.length ? Object.values(signalContent).map(el => <TableColumnContent onClick={showDiff}>{el.map((item)=> <TableColumnContent.content children={item}/>)}</TableColumnContent>) : null}
                    {/*{signalContent.fibonacciValue.length ? Object.values(signalContent).map(el => <TableColumnContent children={el} onClick={showDiff}/>) : null}*/}
                    {/*{signalContent.keyLevelsValue.length ? Object.values(signalContent).map(el => <TableColumnContent children={el} onClick={showDiff}/>) : null}*/}
                </TableColumn.column>
            </TableColumn>
    )
}

export default React.memo(Table);
