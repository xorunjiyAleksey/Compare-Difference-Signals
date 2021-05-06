import React, { useState } from 'react'
import {
    TableColumn,
    TableColumnContent

} from './StyledComponent.js';
import {element, object} from "prop-types";

const Table = props => {
    const{
        title,
        showDiff,
        signalContent,
        signalContentId,
        signalContentKeys,
        getDifferChartsId,
        getDifferChartKeys,
        getDifferCharts,
        differenceArray,
        differenceSdsValue,
        differenceMicroserviceValue,
        differenceSdsValueFibonacci,
        differenceMicroserviceValueFibonacci,
        differenceKeyFibonacci,
        signalsFibonacciId,
        signalsKeyLevelsId,
        differenceKeyKeyLevels,
        differenceMicroserviceValueKeyLevels,
        differenceSdsValueKeyLevels,
    } = props;


    return (
        <TableColumn data-at={'TableWrapper__TableColumn'}>
            <TableColumn.title children={title}/>
            <TableColumn.column>
                {Array.isArray(getDifferChartsId) && getDifferChartsId.length ? getDifferChartsId.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} onClick={showDiff}/></TableColumnContent>) : null}
                {Array.isArray(differenceArray) && differenceArray.length ? differenceArray.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null}
                {Array.isArray(differenceSdsValue) && differenceSdsValue.length ? differenceSdsValue.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null}
                {Array.isArray(differenceMicroserviceValue) && differenceMicroserviceValue.length ? differenceMicroserviceValue.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el}/></TableColumnContent>) : null}

                {Array.isArray(signalsKeyLevelsId) && signalsKeyLevelsId.length ? signalsKeyLevelsId.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} onClick={showDiff}/></TableColumnContent>) : null}
                {Array.isArray(differenceKeyKeyLevels) && differenceKeyKeyLevels.length ? differenceKeyKeyLevels.map(el => <TableColumnContent><TableColumnContent.content children={el} /></TableColumnContent>) : null}
                {Array.isArray(differenceMicroserviceValueKeyLevels) && differenceMicroserviceValueKeyLevels.length ? differenceMicroserviceValueKeyLevels.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null}
                {Array.isArray(differenceSdsValueKeyLevels) && differenceSdsValueKeyLevels.length ? differenceSdsValueKeyLevels.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null}

                {Array.isArray(signalsFibonacciId) && signalsFibonacciId.length ? signalsFibonacciId.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} onClick={showDiff}/></TableColumnContent>) : null}
                {Array.isArray(differenceKeyFibonacci) && differenceKeyFibonacci.length ? differenceKeyFibonacci.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null}
                {Array.isArray(differenceSdsValueFibonacci) && differenceSdsValueFibonacci.length ? differenceSdsValueFibonacci.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null}
                {Array.isArray(differenceMicroserviceValueFibonacci) && differenceMicroserviceValueFibonacci.length ? differenceMicroserviceValueFibonacci.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null}

            </TableColumn.column>
        </TableColumn>
    )
}

export default React.memo(Table);