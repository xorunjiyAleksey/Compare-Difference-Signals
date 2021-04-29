import React from 'react';
import Table from './components/table/Table.jsx';
import Button from '../components/button/Button.jsx';
import {
    Wrapper,
    TableModule,
    TableWrapper,
    CompareButtonWrapper,
} from './StyledComponent.js';
import { ThemeProvider } from 'styled-components';
import { themeTable } from '../../theme/theme.js';

const SignalsTable = props => {
    const {
        getSdsSignals,
        getAutochartistSignals,
    } = props

    const defaulKeys = [
    'age',
    'breakout',
    'clarity',
    'clickThroughUrl',
    'completed',
    'dataFeed',
    'demoCandleDelay',
    'demoMinuteDelay',
    'direction',
    'exchange',
    'initialTrend',
    'interval',
    'length',
    'pattern',
    'patternEndTime',
    'patternImageUrlpe',
    'predictionPriceFrom',
    'predictionPriceTo',
    'predictionTimeFrom',
    'predictionTimeTo',
    'quality',
    'relevant',
    'resistanceX0',
    'resistanceX1',
    'resistanceY0',
    'resistanceY1',
    'resultUid',
    'stopLoss',
    'supportX0',
    'supportX1',
    'supportY0',
    'supportY1',
    'symbol',
    'symbolCode',
    'timezoneOffset',
    'trend',
    'uniformity',
    'volumeIncrease',
    ]

    const signalTitle = ["signals id", "name field", "autochartist", "sds"];
    const compareButtons = [{ buttonLabel: 'compare chart patterns', name: 'chart' }, { buttonLabel: 'compare fibonacci patterns', name: 'fibonacci' }, { buttonLabel: "compare key levels patterns", name: 'key levels' }, { buttonLabel: "compare all", name: 'key levels' }];

    const parsedChartSdsSignal = getSdsSignals.chart.map(el => JSON.parse(el));
    const parsedFibonacciSdsSignal = getSdsSignals.fibonacci.map(el => JSON.parse(el));
    const parsedKeyLevelsSdsSignal = getSdsSignals.keyLevels.map(el => JSON.parse(el));

    console.log({'parsedAutoChart': getAutochartistSignals.chart}, {'parsedAutoFibo': getAutochartistSignals.fibonacci}, {'parsedAutoKey': getAutochartistSignals.keyLevels})
    console.log({'parsedSdsChart': parsedChartSdsSignal}, {'parsedFib': parsedFibonacciSdsSignal}, {'parsedKey':parsedKeyLevelsSdsSignal})


    const handleClick = () => {
        const diffChartPattern = getAutochartistSignals.chart.filter(item => parsedChartSdsSignal.every(i => item.resultUid !== i.resultUid))
        // const diffFibonacciPattern = getAutochartistSignals.fibonacci.filter(item => parsedFibonacciSdsSignal.every(i => item.resultUid !== i.resultUid));
        // const diffKeyLevelsPattern = getAutochartistSignals.keyLevels.filter(item => parsedKeyLevelsSdsSignal.every(i => item.resultUid !== i.resultUid));
        console.log({diffChartPattern})
    }


    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'Table-Container'}>
                <TableModule data-at={'Table-Container__tableModule'}>
                    <TableWrapper data-at={'TableModule__tableWrapper'}>
                        {signalTitle.map((title, index) => <Table key={index} title={title}/>)}
                    </TableWrapper>
                    <CompareButtonWrapper data-at={'TableModule__compareButtonWrapper'}> 
                        {compareButtons.map((button, id) =>
                            <Button
                                    key={id}
                                    name={button.name}
                                    handleClick={() => handleClick(button.name)}
                                    buttonLabel={button.buttonLabel}
                            />
                        )}
                    </CompareButtonWrapper>
                </TableModule>
            </Wrapper>
        </ThemeProvider>
    );
}

export default React.memo(SignalsTable);