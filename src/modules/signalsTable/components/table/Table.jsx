import React from 'react'
import {
    TableColumn,
    TableColumnContent

} from './StyledComponent.js';

const Table = props => {
    const{
        title,
        signalContent,
        signalContentId,
        signalContentKeys,
        signalContentValues,
    } = props;
    console.log('val', signalContentValues)

    const showDiff = () => {

    }

    return (
            <TableColumn data-at={'TableWrapper__TableColumn'}>
                <TableColumn.title children={title}/>
                <TableColumn.column>
                    {typeof signalContentId === 'object' && signalContentId.chartValue.length
                        ? Object.values(signalContentId).map(el => <TableColumnContent onClick={showDiff}>{el.map((item)=> <TableColumnContent.content children={item}/>)}</TableColumnContent>)
                        : null}
                    {typeof signalContentKeys === 'object' && signalContentKeys.chartKeys.length
                        ? Object.values(signalContentKeys).map(el => <TableColumnContent>{el.map((item)=>  Array.isArray(item)
                            ? item.map((iKeys) => <TableColumnContent.content children={iKeys}/>)
                            : <TableColumnContent.content children={item}/>)}</TableColumnContent>)
                        : null}
                    {typeof signalContentValues === 'object' && signalContentValues.chartValue.length
                        ? Object.values(signalContentValues).map(el => <TableColumnContent>{el.map((item) => Array.isArray(item)
                            ? item.map((iValues) => <TableColumnContent.content children={iValues}/>)
                            : <TableColumnContent.content children={item}/>)}</TableColumnContent>)
                        : null}
                </TableColumn.column>
            </TableColumn>
    )
}

export default React.memo(Table);
