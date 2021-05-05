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
import {sendSignalsByPattern} from './logic';
import {element} from "prop-types";

const SignalsTable = props => {
    const {
        getSdsSignals,
        getDifferCharts,
        sendDiffersSignal,
        getAutochartistSignals,
    } = props

    const [signalContent, setSignalContent] = useState({
        chartId: '',
        chartKeysDiffer: '',
        fibonacciId: '',
        fibonacciKeysDiffer: '',
        keyLevelsId: '',
        keyLevelsKeysDiffer: '',
        sdsResult: '',
    })

    const compareButtons = [
        {
            buttonLabel: 'compare chart patterns',
            name: 'chart'
        },
        {
            buttonLabel: 'compare fibonacci patterns',
            name: 'fibonacci'
        },
        {
            buttonLabel: "compare key levels patterns",
            name: 'key levels'
        },
        {
            buttonLabel: "compare all",
            name: 'compare all'
        }
    ];

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

    const readyForCompareSdsFibonacciSignal = getAutochartistSignals.fibonacci.map(el => {
        delete el.brokerSymbolCode;
        return el
    });
    const readyForCompareAutoFibonacciSignal = parsedFibonacciSdsSignal.map(el => {
        delete el.dataFeed;
        delete el.clickThroughUrl;
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
    let chartPatternResultObj;
    let fibonacciPatternResultObj;
    let keyLevelPatternResultObj;


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
                            differKeys: Object.keys(diffResultChartPattern),
                            differValues: Object.values(diffResultChartPattern),
                            autoChart,
                            sDsChart,
                        }
                        chartPatternResult.push(differChart)
                        chartPatternResultObj = {
                            ...chartPatternResultObj,
                            [id]: {
                                microservice: diffResultChartPattern,
                                sds: Object.keys(diffResultChartPattern)
                                    .reduce((acc, item) => {
                                        if (!sDsChart[item]) {
                                            return acc;
                                        }
                                        return {
                                            ...acc,
                                            [item]: sDsChart[item],
                                        }
                                    }, {})
                            }
                        }
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
                            diffChart: diffResultFibonacciPattern,
                            differKeys: Object.keys(diffResultFibonacciPattern),
                            differValues: Object.values(diffResultFibonacciPattern),
                            autoFibonacci,
                            sDsFibonacci
                        }
                        fibonacciPatternResult.push(differFibonacci)
                        fibonacciPatternResultObj = {
                            ...fibonacciPatternResultObj,
                            [id]: {
                                microservice: diffResultFibonacciPattern,
                                sds: Object.keys(diffResultFibonacciPattern)
                                    .reduce((acc, item) => {
                                        if (!sDsFibonacci[item]) {
                                            return acc;
                                        }
                                        return {
                                            ...acc,
                                            [item]: sDsFibonacci[item],
                                        }
                                    }, {})
                            }
                        }
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
                            diffChart: diffResultKeyLevelsPattern,
                            differKeys: Object.keys(diffResultKeyLevelsPattern),
                            differValues: Object.values(diffResultKeyLevelsPattern),
                            autoKeyLevels,
                            sDsKeyLevels,
                        }
                        keyLevelsPatternResult.push(differKeyLevels)
                        keyLevelPatternResultObj = {
                            ...keyLevelPatternResultObj,
                            [id]: {
                                microservice: diffResultKeyLevelsPattern,
                                sds: Object.keys(diffResultKeyLevelsPattern)
                                    .reduce((acc,item) => {
                                        if(!sDsKeyLevels[item]){
                                            return acc;
                                        }
                                        return {...acc,
                                        [item]: sDsKeyLevels[item],
                                    }},{})
                            }
                        }
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

        console.log('chartRes', chartPatternResultObj);
        console.log('fiboRes', fibonacciPatternResultObj);
        console.log('sdsRes', keyLevelPatternResultObj);

        setSignalContent(preValue => ({
            ...preValue,
            chartId: chartPatternResult.map(el => el.id),
            chartKeysDiffer: chartPatternResult.map(el => el.differKeys),
            fibonacciId: fibonacciPatternResult.map(el => el.id),
            fibonacciKeysDiffer: fibonacciPatternResult.map(el => el.differKeys),
            keyLevelsId: keyLevelsPatternResult.map(el => el.id),
            keyLevelsKeysDiffer: keyLevelsPatternResult.map(el => el.differKeys),
            sdsResult: chartPatternResult.map(el => el.sDsChart.resultUid),
        }));

        if(!chartPatternResult.length && !fibonacciPatternResult.length && !keyLevelsPatternResult.length) {
            return;
        }

        sendDiffersSignal(chartPatternResultObj);

        sendSignalsByPattern(chartPatternResult, fibonacciPatternResult, keyLevelsPatternResult)
            .then(()=> {
                console.log('successful');
            });
    }
    const signalsId = Object.keys(getDifferCharts).map(element => element)
    // const differencePattern = Object.keys(getDifferCharts).map(element => Object.keys(element.microservice));

    const signalTitle = [
        {label: "signals id", id:  signalsId},
        // {label: "name field", chartKeys:  differencePattern},
        // {label: "signals id", id: {chartValue: signalContent.chartId, fibonacciValue: signalContent.fibonacciId, keyLevelsValue: signalContent.keyLevelsId}},
        // {label: "name field", keysField: {chartKeys: signalContent.chartKeysDiffer, fibonacciKeys: signalContent.fibonacciKeysDiffer, keyLevelsKeys: signalContent.keyLevelsKeysDiffer}},
        // {label: "autochartist", value: {chartValue: signalContent.diffChart, fibonacciValue: signalContent.diffChart, keyLevelsValue: signalContent.diffChart}},
        // {label: "sds", value: {chartValue: 'differ', fibonacciValue: 'differ', keyLevelsValue: 'differ'}}
    ];

    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'Table-Container'}>
                <TableModule data-at={'Table-Container__tableModule'}>
                    <TableWrapper data-at={'TableModule__tableWrapper'}>
                        {signalTitle.map((title, index) =>
                            <Table key={index} title={title.label}
                                   // signalContentId={title.id} signalContentKeys={title.keysField} signalContent={signalContent}
                                   getDifferChartsId={title.id}
                                   // getDifferChartKeys={title.chartKeys}

                            />)}
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

