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
import {ThemeProvider} from 'styled-components';
import {themeTable} from '../../theme/theme.js';

const SignalsTable = props => {
    const {
        getSdsSignals,
        getAutochartistSignals,
    } = props

    const [signalContent, setSignalContent] = useState({
        chartId: '',
        chartPattern: '',
        fibonacciId: '',
        fibonacciPattern: '',
        keyLevelsId: '',
        keyLevelsPattern: '',
        sds: '',
        diffChart: '',
    })

    const compareButtons = [{
        buttonLabel: 'compare chart patterns',
        name: 'chart'
    }, {buttonLabel: 'compare fibonacci patterns', name: 'fibonacci'}, {
        buttonLabel: "compare key levels patterns",
        name: 'key levels'
    }, {buttonLabel: "compare all", name: 'compare all'}];

    const parsedChartSdsSignal = getSdsSignals.chart.map(el => JSON.parse(el));
    const parsedFibonacciSdsSignal = getSdsSignals.fibonacci.map(el => JSON.parse(el));
    const parsedKeyLevelsSdsSignal = getSdsSignals.keyLevels.map(el => JSON.parse(el));

    console.log({'AutoChart': getAutochartistSignals.chart}, {'AutoFibo': getAutochartistSignals.fibonacci}, {'AutoKey': getAutochartistSignals.keyLevels})
    console.log({'parsedSdsChart': parsedChartSdsSignal}, {'parsedFib': parsedFibonacciSdsSignal}, {'parsedKey': parsedKeyLevelsSdsSignal})


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

    const chartPatternResult = [];
    const fibonacciPatternResult = [];
    const keyLevelsPatternResult = [];


    const handleClick = (name, event) => {
        event.preventDefault();
        const isChart = name === 'chart';
        const isFibonacci = name === 'fibonacii';
        const isKeyLevels = name === 'key levels';
        const isCompareAll = name === 'compare all';

        (isChart || isCompareAll) ?
            diffAuthoChartIds.map(id => {
                const autoChart = readyForCompareAutoChartSignal.find(element => element.resultUid === id);
                const sDsChart = readyForCompareSdsChartSignal.find(element => element.resultUid === id);

                if (autoChart && sDsChart) {
                    const diffResultChartPattern = differenceChart(autoChart, sDsChart);

                    if (Object.keys(diffResultChartPattern).length) {
                        const differChart = {
                            id: id,
                            ...diffResultChartPattern,
                            diffChart: diffResultChartPattern,
                            pattern: Object.keys(diffResultChartPattern),
                            autoChart,
                            sDsChart,
                        }
                        chartPatternResult.push(differChart)
                    }
                }
            }) : null;

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

        (isFibonacci || isCompareAll) ?
            diffAutoFibonacciIds.map(id => {
                const autoFibonacci = readyForCompareAutoFibonacciSignal.find(element => element.resultUid === id)
                const sDsFibonacci = readyForCompareSdsFibonacciSignal.find(element => element.resultUid === id)

                if (autoFibonacci && sDsFibonacci) {
                    const diffResultFibonacciPattern = differenceFibonacci(autoFibonacci, sDsFibonacci);
                    if (Object.keys(diffResultFibonacciPattern).length) {
                        const differFibonacci = {
                            id: id,
                            ...diffResultFibonacciPattern,
                            pattern: Object.keys(diffResultFibonacciPattern),
                            autoFibonacci,
                            sDsFibonacci
                        }
                        fibonacciPatternResult.push(differFibonacci)
                    }
                }
            }) : null;

        (isKeyLevels || isCompareAll) ?
            diffAutoKeyLevelsIds.map(id => {
                const autoKeyLevels = readyForCompareAutoKeyLevelsSignal.find(element => element.resultUid === id)
                const sDsKeyLevels = readyForCompareSdsKeyLevelsSignal.find(element => element.resultUid === id)

                if (autoKeyLevels && sDsKeyLevels) {
                    const diffResultKeyLevelsPattern = differenceKeyLevels(autoKeyLevels, sDsKeyLevels);
                    if (Object.keys(diffResultKeyLevelsPattern).length) {
                        const differKeyLevels = {
                            id: id,
                            ...diffResultKeyLevelsPattern,
                            pattern: Object.keys(diffResultKeyLevelsPattern),
                            autoKeyLevels,
                            sDsKeyLevels,
                        }
                        keyLevelsPatternResult.push(differKeyLevels)
                    }
                }
            }) : null;

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
            chartId: chartPatternResult.map(el => el.id),
            chartPattern: chartPatternResult.map(el => el.pattern),
            fibonacciId: fibonacciPatternResult.map(el => el.id),
            fibonacciPattern: fibonacciPatternResult.map(el => el.pattern),
            keyLevelsId: keyLevelsPatternResult.map(el => el.id),
            keyLevelsPattern: keyLevelsPatternResult.map(el => el.pattern),
        }))
    }


    const signalTitle = [
        {label: "signals id", value: {chartValue: signalContent.chartId, fibonacciValue: signalContent.fibonacciId, keyLevelsValue: signalContent.keyLevelsId}},
        {label: "name field", value: {chartValue: signalContent.chartPattern, fibonacciValue: signalContent.fibonacciPattern, keyLevelsValue: signalContent.keyLevelsPattern}},
        // {label: "autochartist", value: {chartValue: signalContent.diffChart, fibonacciValue: signalContent.diffChart, keyLevelsValue: signalContent.diffChart}},
        // {label: "sds", value: {chartValue: 'differ', fibonacciValue: 'differ', keyLevelsValue: 'differ'}}
    ];

    const showDiff = () => {
        console.log('sdas')
    }

    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'Table-Container'}>
                <TableModule data-at={'Table-Container__tableModule'}>
                    <TableWrapper data-at={'TableModule__tableWrapper'}>
                        {signalTitle.map((title, index) =>
                            <Table key={index} title={title.label} signalContent={title.value} showDiff={showDiff}/>)}
                    </TableWrapper>
                    <CompareButtonWrapper data-at={'TableModule__compareButtonWrapper'}>
                        {compareButtons.map((button, id) =>
                            <Button
                                key={id}
                                name={button.name}
                                handleClick={event => handleClick(button.name, event)}
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

