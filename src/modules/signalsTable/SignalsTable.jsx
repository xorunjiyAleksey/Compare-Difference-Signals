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
        getDifferFibonacci,
        getDifferKeyLevels,
        sendDiffersSignalChart,
        sendDiffersSignalFibonacci,
        sendDiffersSignalKeyLevels,
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
        differenceKey: [],
        differenceMicroserviceValue: [],
        differenceSdsValue: [],
        differenceKeyFibonacci: [],
        differenceMicroserviceValueFibonacci: [],
        differenceSdsValueFibonacci: [],
        differenceKeyKeyLevels:[],
        differenceMicroserviceValueKeyLevels:[],
        differenceSdsValueKeyLevels:[],
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
        delete el.brokerSymbolCode;
        return el
    });
    const readyForCompareSdsChartSignal = parsedChartSdsSignal.map(el => { //нужный массив sds chart
        return el
    });

    const readyForCompareSdsFibonacciSignal = getAutochartistSignals.fibonacci.map(el => {
        return el
    });
    const readyForCompareAutoFibonacciSignal = parsedFibonacciSdsSignal.map(el => {
        delete el.dataFeed;
        delete el.clickThroughUrl;
        delete el.brokerSymbolCode;
        return el
    });

    const readyForCompareAutoKeyLevelsSignal = getAutochartistSignals.keyLevels.map(el => {
        delete el.dataFeed;
        delete el.clickThroughUrl;
        delete el.brokerSymbolCode;
        return el
    });
    const readyForCompareSdsKeyLevelsSignal = parsedKeyLevelsSdsSignal.map(el => {
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
        const isFibonacci = name === 'fibonacci';
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
        (isCompareAll || isChart) && sendDiffersSignalChart(chartPatternResultObj);
        (isCompareAll || isFibonacci) && sendDiffersSignalFibonacci(fibonacciPatternResultObj);
        (isCompareAll || isKeyLevels) && sendDiffersSignalKeyLevels(keyLevelPatternResultObj);

        sendSignalsByPattern(chartPatternResult, fibonacciPatternResult, keyLevelsPatternResult)
            .then(()=> {
                console.log('successful');
            });
    }
    const signalsChartId = Object.keys(getDifferCharts)
    const signalsFibonacciId = Object.keys(getDifferFibonacci)
    const signalsKeyLevelsId = Object.keys(getDifferKeyLevels)
    console.log('dsadsadsasadsad', getDifferFibonacci)

    const showDiff = event => {
        let differenceKey;
        let differenceSdsValue;
        let differenceMicroserviceValue;
        let differenceKeyFibonacci;
        let differenceSdsValueFibonacci;
        let differenceMicroserviceValueFibonacci;
        let differenceKeyKeyLevels;
        let differenceSdsValueKeyLevels;
        let differenceMicroserviceValueKeyLevels;

        if(signalsChartId.length) {
             differenceKey = Object.keys(getDifferCharts).length && Object.keys(getDifferCharts?.[event.target.innerText]?.microservice);
             differenceSdsValue = Object.keys(getDifferCharts).length && Object.values(getDifferCharts?.[event.target.innerText]?.sds);
             differenceMicroserviceValue = Object.keys(getDifferCharts).length && Object.values(getDifferCharts?.[event.target.innerText]?.microservice);
        } else if(signalsFibonacciId.length) {
             differenceKeyFibonacci = Object.keys(getDifferFibonacci).length && Object.keys(getDifferFibonacci?.[event.target.innerText]?.microservice);
             differenceSdsValueFibonacci = Object.keys(getDifferFibonacci).length && Object.values(getDifferFibonacci?.[event.target.innerText]?.sds);
             differenceMicroserviceValueFibonacci = Object.keys(getDifferFibonacci).length && Object.values(getDifferFibonacci?.[event.target.innerText]?.microservice);
        }else if(signalsKeyLevelsId.length) {
             differenceKeyKeyLevels = Object.keys(getDifferKeyLevels).length && Object.keys(getDifferKeyLevels?.[event.target.innerText]?.microservice);
             differenceSdsValueKeyLevels = Object.keys(getDifferKeyLevels).length && Object.values(getDifferKeyLevels?.[event.target.innerText]?.sds);
             differenceMicroserviceValueKeyLevels = Object.keys(getDifferKeyLevels).length && Object.values(getDifferKeyLevels?.[event.target.innerText]?.microservice);
        }
        setSignalContent(prevState => ({
            ...prevState,
            differenceKey,
            differenceSdsValue,
            differenceMicroserviceValue,
            differenceKeyFibonacci,
            differenceMicroserviceValueFibonacci,
            differenceSdsValueFibonacci,
            differenceKeyKeyLevels,
            differenceMicroserviceValueKeyLevels,
            differenceSdsValueKeyLevels,

        }))
    }

    const signalTitle = [
        {label: "signals id", id:  signalsChartId, getDifferCharts, showDiff,
            signalsFibonacciId, signalsKeyLevelsId
        },
        {label: "name field", differenceArray: signalContent.differenceKey,
            differenceKeyFibonacci: signalContent.differenceKeyFibonacci,
            differenceKeyKeyLevels: signalContent.differenceKeyKeyLevels
        },
        {label: "autochartist", differenceMicroserviceValue: signalContent.differenceMicroserviceValue,
            differenceMicroserviceValueFibonacci: signalContent.differenceMicroserviceValueFibonacci,differenceMicroserviceValueKeyLevels:signalContent.differenceMicroserviceValueKeyLevels
        },
        {label: "sds", differenceSdsValue: signalContent.differenceSdsValue,
            differenceSdsValueFibonacci: signalContent.differenceSdsValueFibonacci, differenceSdsValueKeyLevels: signalContent.differenceSdsValueKeyLevels
        },
    ];



    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'Table-Container'}>
                <TableModule data-at={'Table-Container__tableModule'}>
                    <TableWrapper data-at={'TableModule__tableWrapper'}>
                        {signalTitle.map((title, index) =>
                            <Table key={index} title={title.label}
                                   getDifferChartsId={title.id}
                                   getDifferCharts={title.getDifferCharts}
                                   showDiff={title.showDiff}
                                   differenceArray={title.differenceArray}
                                   differenceSdsValue={title.differenceSdsValue}
                                   differenceMicroserviceValue={title.differenceMicroserviceValue}
                                   differenceSdsValueFibonacci={title.differenceSdsValueFibonacci}
                                   differenceMicroserviceValueFibonacci={title.differenceMicroserviceValueFibonacci}
                                   differenceKeyFibonacci={title.differenceKeyFibonacci}
                                   signalsFibonacciId={title.signalsFibonacciId}
                                   signalsKeyLevelsId={title.signalsKeyLevelsId}
                                   differenceKeyKeyLevels={title.differenceKeyKeyLevels}
                                   differenceMicroserviceValueKeyLevels= {title.differenceMicroserviceValueKeyLevels}
                                   differenceSdsValueKeyLevels={title.differenceSdsValueKeyLevels}
                            />)}
                    </TableWrapper>
                    <CompareButtonWrapper data-at={'TableModule__compareButtonWrapper'}>
                        {compareButtons.map((button, id) =>
                            <CompareButtonWrapper.button>
                                <Button
                                    key={id}
                                    name={button.name}
                                    handleClick={event => handleClick(button.name, event)}
                                    buttonLabel={button.buttonLabel}
                                />
                            </CompareButtonWrapper.button>
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

