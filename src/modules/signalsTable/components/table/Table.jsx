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
        signalContent,
        getDifferCharts,
        signalContentId,
        differenceArray,
        signalContentKeys,
        getDifferChartsId,
        getDifferChartKeys,
        differenceSdsValue,
        signalsFibonacciId,
        signalsKeyLevelsId,
        differenceKeyFibonacci,
        differenceKeyKeyLevels,
        differenceSdsValueFibonacci,
        differenceMicroserviceValue,
        differenceSdsValueKeyLevels,
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

    const signals = {
        'chart': chart,
        'fibonacci': fibonacci,
        'key levels': keyLevels,
        'compare all': [chart, fibonacci, keyLevels]
    }

    console.log('signalName', signalName);
    console.log('signals', signals);
    console.log('signals[signalName]', signals[signalName]);

    const selectedSignal = signals[signalName];


    return (
        <TableColumn data-at={'TableWrapper__TableColumn'}>
            <TableColumn.title children={title}/>
            <TableColumn.column>
                {signalName === 'compare all' ?
                    selectedSignal.map(signal =>
                        <TableSignals
                            signals={signal}
                            showDiff={showDiff}
                            signalName={signalName}
                        />
                    ) :
                    <TableSignals
                        signals={selectedSignal}
                        showDiff={showDiff}
                        signalName={signalName}
                    />
                }
                 </TableColumn.column>
        </TableColumn>
    )
}

export default React.memo(Table);