import React, { useState } from 'react'
import {
    TableColumn,
    TableColumnContent

} from './StyledComponent.js';
import TableSignals from './components/tabaleSigmals/TableSignals.jsx';

const Table = props => {
    const{
        title,
        showDiff,
        signalName,
        differenceArray,
        differenceAllId,
        differenceAllKey,
        getDifferChartsId,
        differenceSdsValue,
        signalsFibonacciId,
        signalsKeyLevelsId,
        differenceAllSdsValue,
        differenceKeyFibonacci,
        differenceKeyKeyLevels,
        differenceSdsValueFibonacci,
        differenceMicroserviceValue,
        differenceSdsValueKeyLevels,
        differenceAllMicroserviceValue,
        differenceMicroserviceValueKeyLevels,
        differenceMicroserviceValueFibonacci,
    } = props;

    const chart = {
        diffId: getDifferChartsId,
        diffKeys: differenceArray,
        diffSdsValues: differenceSdsValue,
        diffMicroserviceValue: differenceMicroserviceValue
    }

    const fibonacci = {
        diffId: signalsFibonacciId,
        diffKeys: differenceKeyFibonacci,
        diffSdsValues: differenceSdsValueFibonacci,
        diffMicroserviceValue: differenceMicroserviceValueFibonacci
    }

    const keyLevels = {
        diffId: signalsKeyLevelsId,
        diffKeys: differenceKeyKeyLevels,
        diffSdsValues: differenceSdsValueKeyLevels,
        diffMicroserviceValue: differenceMicroserviceValueKeyLevels
    }

    const allSignals = {
        diffId: differenceAllId,
        diffKeys: differenceAllKey,
        diffSdsValues: differenceAllSdsValue,
        diffMicroserviceValue: differenceAllMicroserviceValue
    }

    const signals = {
        'chart': chart,
        'fibonacci': fibonacci,
        'key levels': keyLevels,
        'compare all': allSignals
    }

    let selectedSignal = signals[signalName];

    return (
        <TableColumn data-at={'TableWrapper__TableColumn'}>
            <TableColumn.title children={title}/>
            <TableColumn.column>
                <TableSignals
                    signals={selectedSignal}
                    showDiff={showDiff}
                    signalName={signalName}
                />
            </TableColumn.column>
        </TableColumn>
    )
}

export default React.memo(Table);
