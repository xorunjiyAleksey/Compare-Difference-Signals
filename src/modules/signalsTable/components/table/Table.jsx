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
        'key levels': keyLevels
    }

    console.log('signalName', signalName);
    console.log('signals', signals);
    console.log('signals[signalName]', signals[signalName]);

    const selectedSignal = signals[signalName];


    return (
        <TableColumn data-at={'TableWrapper__TableColumn'}>
            <TableColumn.title children={title}/>
            <TableColumn.column>
                {
                    <TableSignals
                        signals={selectedSignal}
                        showDiff={showDiff}
                    />
                }
                {/*{signalName === 'chart' ? ( Array.isArray(getDifferChartsId) && getDifferChartsId.length ? getDifferChartsId.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} onClick={showDiff}/></TableColumnContent>) : null) :null}*/}
                {/*{signalName === 'chart' ? ( Array.isArray(differenceArray) && differenceArray.length ? differenceArray.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null) :null}*/}
                {/*{signalName === 'chart' ? ( Array.isArray(differenceSdsValue) && differenceSdsValue.length ? differenceSdsValue.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null) :null}*/}
                {/*{signalName === 'chart' ? ( Array.isArray(differenceMicroserviceValue) && differenceMicroserviceValue.length ? differenceMicroserviceValue.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el}/></TableColumnContent>) : null) :null}*/}

                {/*{signalName === 'fibonacci' ? ( Array.isArray(signalsKeyLevelsId) && signalsKeyLevelsId.length ? signalsKeyLevelsId.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} onClick={showDiff}/></TableColumnContent>) : null ): null}*/}
                {/*{signalName === 'fibonacci' ? ( Array.isArray(differenceKeyKeyLevels) && differenceKeyKeyLevels.length ? differenceKeyKeyLevels.map(el => <TableColumnContent><TableColumnContent.content children={el} /></TableColumnContent>) : null) : null}*/}
                {/*{signalName === 'fibonacci' ? ( Array.isArray(differenceMicroserviceValueKeyLevels) && differenceMicroserviceValueKeyLevels.length ? differenceMicroserviceValueKeyLevels.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null) :null}*/}
                {/*{signalName === 'fibonacci' ? ( Array.isArray(differenceSdsValueKeyLevels) && differenceSdsValueKeyLevels.length ? differenceSdsValueKeyLevels.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null) :null}*/}

                {/*{signalName === 'key levels' ? ( Array.isArray(signalsFibonacciId) && signalsFibonacciId.length ? signalsFibonacciId.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} onClick={showDiff}/></TableColumnContent>) : null) :null}*/}
                {/*{signalName === 'key levels' ? ( Array.isArray(differenceKeyFibonacci) && differenceKeyFibonacci.length ? differenceKeyFibonacci.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null) :null}*/}
                {/*{signalName === 'key levels' ? ( Array.isArray(differenceSdsValueFibonacci) && differenceSdsValueFibonacci.length ? differenceSdsValueFibonacci.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null) :null}*/}
                {/*{signalName === 'key levels' ? ( Array.isArray(differenceMicroserviceValueFibonacci) && differenceMicroserviceValueFibonacci.length ? differenceMicroserviceValueFibonacci.map(el => <TableColumnContent><TableColumnContent.content children={el} key={el} /></TableColumnContent>) : null) :null}*/}
            </TableColumn.column>
        </TableColumn>
    )
}

export default React.memo(Table);