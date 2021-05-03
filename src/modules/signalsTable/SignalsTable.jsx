import React, {useState} from 'react';
import Table from './components/table/Table.jsx';
import Button from '../components/button/Button.jsx';
import _ from 'lodash';
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

    const[signalContent, setSignalContent] = useState({
        id: '',
        sds: '',
        pattern: '',
        autoChart: '',
    })

    const compareButtons = [{ buttonLabel: 'compare chart patterns', name: 'chart' }, { buttonLabel: 'compare fibonacci patterns', name: 'fibonacci' }, { buttonLabel: "compare key levels patterns", name: 'key levels' }, { buttonLabel: "compare all", name: 'key levels' }];

    const parsedChartSdsSignal = getSdsSignals.chart.map(el => JSON.parse(el));
    const parsedFibonacciSdsSignal = getSdsSignals.fibonacci.map(el => JSON.parse(el));
    const parsedKeyLevelsSdsSignal = getSdsSignals.keyLevels.map(el => JSON.parse(el));

    console.log({'AutoChart': getAutochartistSignals.chart}, {'AutoFibo': getAutochartistSignals.fibonacci}, {'AutoKey': getAutochartistSignals.keyLevels})
    console.log({'parsedSdsChart': parsedChartSdsSignal}, {'parsedFib': parsedFibonacciSdsSignal}, {'parsedKey':parsedKeyLevelsSdsSignal})

    
    const readyForCompareAutoChartSignal = getAutochartistSignals.chart.map(el => { //нужный массив авточарта
        delete el.dataFeed;
        delete el.clickThroughUrl;
        return el
    });
    const readyForCompareSdsChartSignal = parsedChartSdsSignal.map(el => { //нужный массив sds chart
        delete el.brokerSymbolCode;
        return el
    });

    const readyForCompareAutoFibonacciSignal = getAutochartistSignals.fibonacci.map(el => {
        delete el.dataFeed;
        delete el.clickThroughUrl;
        return el
    });
    const readyForCompareSdsFibonacciSignal = getAutochartistSignals.fibonacci.map(el => {
        delete el.brokerSymbolCode;
        return el
    });

    const readyForCompareAutoKeyLevelsSignal = getAutochartistSignals.keyLevels.map(el => {
        delete el.dataFeed;
        delete el.clickThroughUrl;
        return el
    });
    const readyForCompareSdsKeyLevelsSignal = parsedKeyLevelsSdsSignal.map(el => {
        delete el.brokerSymbolCode;
        return el
    });

    const diffAuthoChartIds = readyForCompareAutoChartSignal.map(element => element.resultUid);
    const diffAutoFibonacciIds = readyForCompareAutoFibonacciSignal.map(element => element.resultUid);
    const diffAutoKeyLevelsIds = readyForCompareAutoKeyLevelsSignal.map(element => element.resultUid);

    const handleClick = () => {
        const chartPatternResult = [];
        const fibonacciPatternResult = [];
        const keyLevelsPatternResult = [];

        diffAuthoChartIds.map(id => {
            const autoChart = readyForCompareAutoChartSignal.find(element => element.resultUid === id);
            const sDsChart = readyForCompareSdsChartSignal.find(element => element.resultUid === id);

            if (autoChart && sDsChart) {
                const diffResultChartPattern = differenceChart(autoChart, sDsChart);

                if (Object.keys(diffResultChartPattern).length) {
                    const differChart = {
                        id: id,
                        ...diffResultChartPattern,
                        pattern: 'Chart Pattern',
                        autoChart,
                        sDsChart,
                        // sdsDiff: sDsChart[diffResultChartPattern]
                    }
                    chartPatternResult.push(differChart)
                }
            }
        })

        diffAutoFibonacciIds.map(id => {
            const autoFibonacci = readyForCompareAutoFibonacciSignal.find(element => element.resultUid === id)
            const sDsFibonacci = readyForCompareSdsFibonacciSignal.find(element => element.resultUid === id)

            if (autoFibonacci && sDsFibonacci) {
                const diffResultFibonacciPattern = differenceFibonacci(autoFibonacci, sDsFibonacci);
                if (Object.keys(diffResultFibonacciPattern).length) {
                    const differFibonacci = {
                        id: id,
                        ...diffResultFibonacciPattern,
                        pattern: 'Fibonacci Pattern',
                        autoFibonacci,
                        sDsFibonacci
                    }
                    fibonacciPatternResult.push(differFibonacci)
                }
            }
        })

        diffAutoKeyLevelsIds.map(id => {
            const autoKeyLevels = readyForCompareAutoKeyLevelsSignal.find(element => element.resultUid === id)
            const sDsKeyLevels = readyForCompareSdsKeyLevelsSignal.find(element => element.resultUid === id)

            if (autoKeyLevels && sDsKeyLevels) {
                const diffResultKeyLevelsPattern = differenceKeyLevels(autoKeyLevels, sDsKeyLevels);
                if (Object.keys(diffResultKeyLevelsPattern).length) {
                    const differKeyLevels = {
                        id: id,
                        ...diffResultKeyLevelsPattern,
                        pattern: 'KeyLevel Pattern',
                        autoKeyLevels,
                        sDsKeyLevels
                    }
                    keyLevelsPatternResult.push(differKeyLevels)
                }
            }
        })

        function differenceChart(autoChart, sDsChart) {
            function changes(autoChart, sDsChart) {
                return _.transform(autoChart, (result, value, key) => {
                    if (!_.isEqual(value, sDsChart[key])) {
                        result[key] = (_.isObject(value) && _.isObject(sDsChart[key])) ? changes(value, sDsChart[key]) : value
                    }
                });
            }
            return changes(autoChart, sDsChart);
        }

        function differenceFibonacci(autoFibonacci, sDsFibonacci) {
            function changes(autoFibonacci, sDsFibonacci) {
                return _.transform(autoFibonacci, (result, value, key) => {
                    if (!_.isEqual(value, sDsFibonacci[key])) {
                        result[key] = (_.isObject(value) && _.isObject(sDsFibonacci[key])) ? changes(value, sDsFibonacci[key]) : value
                    }
                });
            }
            return changes(autoFibonacci, sDsFibonacci);
        }

        function differenceKeyLevels(autoKeyLevels, sDsKeyLevels) {
            function changes(autoKeyLevels, sDsKeyLevels) {
                return _.transform(autoKeyLevels, (result, value, key) => {
                    if (!_.isEqual(value, sDsKeyLevels[key])) {
                        result[key] = (_.isObject(value) && _.isObject(sDsKeyLevels[key])) ? changes(value, sDsKeyLevels[key]) : value
                    }
                });
            }
            return changes(autoKeyLevels, sDsKeyLevels);
        }
        console.log(chartPatternResult);
        console.log(fibonacciPatternResult);
        console.log(keyLevelsPatternResult);

        setSignalContent(preValue => ({
            ...preValue,
            id: chartPatternResult.map(el => el.id),
            pattern: chartPatternResult.map(el => el.pattern),
        }))
    }
    console.log(signalContent)
    const signalTitle = [{label: "signals id", value: signalContent}, {label: "name field", value: 'name'}, {label: "autochartist", value: 'nameauto'}, {label: "sds", value: 'namesds'}];

    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'Table-Container'}>
                <TableModule data-at={'Table-Container__tableModule'}>
                    <TableWrapper data-at={'TableModule__tableWrapper'}>
                        {signalTitle.map((title, index) =>
                            <Table key={index} title={title.label} signalContent={title.value}/>)}
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

        // const diffChartPattern = getAutochartistSignals.chart.filter(item => parsedChartSdsSignal.every(i => item.resultUid !== i.resultUid))
        // const diffFibonacciPattern = getAutochartistSignals.fibonacci.filter(item => parsedFibonacciSdsSignal.every(i => item.resultUid !== i.resultUid));
        // const diffKeyLevelsPattern = getAutochartistSignals.keyLevels.filter(item => parsedKeyLevelsSdsSignal.every(i => item.resultUid !== i.resultUid));

