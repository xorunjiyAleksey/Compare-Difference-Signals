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
        getDifferChartsId,
        getDifferChartKeys
    } = props;

    const showDiff = () => {
    }

    return (
        <TableColumn data-at={'TableWrapper__TableColumn'}>
            <TableColumn.title children={title}/>
            <TableColumn.column>
                {Array.isArray(getDifferChartsId) && getDifferChartsId.length ? getDifferChartsId.map(el => <TableColumnContent><TableColumnContent.content children={el} onClick={showDiff}/></TableColumnContent>) : null}
                {Array.isArray(getDifferChartKeys) && getDifferChartKeys.length ? getDifferChartKeys.map(el => <TableColumnContent><TableColumnContent.content children={el} onClick={showDiff}/></TableColumnContent>) : null}
                {/*    ? Object.values(signalContentId).map(el => <TableColumnContent onClick={showDiff}>{el.map((item)=> <TableColumnContent.content children={item}/>)}</TableColumnContent>)*/}
                {/*    : null}*/}
                {/*{typeof signalContentKeys === 'object' && signalContentKeys.chartKeys.length*/}
                {/*    ? Object.values(signalContentKeys).map(el => <TableColumnContent>{el.map((item)=>  Array.isArray(item)*/}
                {/*        ? item.map((iKeys) => <TableColumnContent.content children={iKeys}/>)*/}
                {/*        : <TableColumnContent.content children={item}/>)}</TableColumnContent>)*/}
                {/*    : null}*/}
                {/*{signalContentId.chartValuesignalContentId.chartValue.length ? Object.values(signalContentId).map(el => <TableColumnContent onClick={showDiff}>{el.map((item)=> <TableColumnContent.content children={item}/>)}</TableColumnContent>) : null}*/}
                {/*{signalContent.fibonacciValue.length ? Object.values(signalContent).map(el => <TableColumnContent children={el} onClick={showDiff}/>) : null}*/}
                {/*{signalContent.keyLevelsValue.length ? Object.values(signalContent).map(el => <TableColumnContent children={el} onClick={showDiff}/>) : null}*/}
            </TableColumn.column>
        </TableColumn>
    )
}

export default React.memo(Table);