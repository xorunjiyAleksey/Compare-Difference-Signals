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
import { sendSignalsByPattern } from './logic';

const SignalsTable = props => {
    const {
        getSdsSignals,
        getDifferCharts,
        getDifferFibonacci,
        getDifferKeyLevels,
        sendDiffersSignalChart,
        getAutochartistSignals,
        sendDiffersSignalKeyLevels,
        sendDiffersSignalFibonacci,
    } = props;

    const [signalContent, setSignalContent] = useState({
        chartId: '',
        sdsResult: '',
        signalName: '',
        fibonacciId: '',
        keyLevelsId: '',
        differenceKey: [],
        differenceAllKey: [],
        chartKeysDiffer: '',
        differenceSdsValue: [],
        fibonacciKeysDiffer: '',
        keyLevelsKeysDiffer: '',
        differenceAllSdsValue: [],
        differenceKeyFibonacci: [],
        differenceKeyKeyLevels: [],
        differenceMicroserviceValue: [],
        differenceSdsValueFibonacci: [],
        differenceSdsValueKeyLevels: [],
        differenceAllMicroserviceValue: [],
        differenceMicroserviceValueKeyLevels: [],
        differenceMicroserviceValueFibonacci: [],
    })

    const compareButtons = [
        {
            name: 'chart',
            buttonLabel: 'compare chart patterns',
        },
        {
            name: 'fibonacci',
            buttonLabel: 'compare fibonacci patterns',
        },
        {
            name: 'key levels',
            buttonLabel: "compare key levels patterns",
        },
        {
            name: 'compare all',
            buttonLabel: "compare all",
        }
    ];

    const parsedChartSdsSignal = getSdsSignals.chart.map(el => JSON.parse(el));
    const parsedFibonacciSdsSignal = getSdsSignals.fibonacci.map(el => JSON.parse(el));
    const parsedKeyLevelsSdsSignal = getSdsSignals.keyLevels.map(el => JSON.parse(el));

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
    let procentChartPattern = [];
    let procentFibonacciPattern = [];
    let procentKeyLevelsPattern = [];

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
                                    }, {}),
                            }
                        }
                    }
                }
            }) : null;



        function differenceChart(autoChart, sDsChart) {
            function changes(autoChart, sDsChart) {
                return _.transform(autoChart, (result, value, key) => {
                    if (!_.isEqual(value, sDsChart[key]) && value % sDsChart[key] > 0.0001) {
                        if (value > sDsChart[key]) {
                            procentChartPattern.push(100 - (sDsChart[key] / value) * 100)
                        } else {
                            procentChartPattern.push(100 - (value / sDsChart[key]) * 100)
                        }
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
                                    .reduce((acc, item) => {
                                        if (!sDsKeyLevels[item]) {
                                            return acc;
                                        }
                                        return {
                                            ...acc,
                                            [item]: sDsKeyLevels[item],
                                        }
                                    }, {})
                            }
                        }
                    }
                }
            }) : null;

        function differenceFibonacci(autoFibonacci, sDsFibonacci) {
            function changes(autoFibonacci, sDsFibonacci) {
                return _.transform(autoFibonacci, (result, value, key) => {
                    if (!_.isEqual(value, sDsFibonacci[key]) && value % sDsFibonacci[key] > 0.0001) {
                        if (value > sDsFibonacci[key]) {
                            procentFibonacciPattern.push(100 - (sDsFibonacci[key] / value) * 100)
                        } else {
                            procentFibonacciPattern.push(100 - (value / sDsFibonacci[key]) * 100)
                        }
                        result[key] = (_.isObject(value) && _.isObject(sDsFibonacci[key])) ? changes(value, sDsFibonacci[key]) : value
                    }
                });
            }

            return changes(autoFibonacci, sDsFibonacci);
        }

        function differenceKeyLevels(autoKeyLevels, sDsKeyLevels) {
            function changes(autoKeyLevels, sDsKeyLevels) {
                return _.transform(autoKeyLevels, (result, value, key) => {
                    if (!_.isEqual(value, sDsKeyLevels[key]) && value % sDsKeyLevels[key] > 0.0001) {
                        if (value > sDsKeyLevels[key]) {
                            procentKeyLevelsPattern.push(100 - (sDsKeyLevels[key] / value) * 100)
                        } else {
                            procentKeyLevelsPattern.push(100 - (value / sDsKeyLevels[key]) * 100)
                        }
                        result[key] = (_.isObject(value) && _.isObject(sDsKeyLevels[key])) ? changes(value, sDsKeyLevels[key]) : value
                    }
                });
            }

            return changes(autoKeyLevels, sDsKeyLevels);
        }

        console.log(procentChartPattern,procentFibonacciPattern,
        procentKeyLevelsPattern)

        setSignalContent(preValue => ({
            ...preValue,
            chartId: chartPatternResult.map(el => el.id),
            chartKeysDiffer: chartPatternResult.map(el => el.differKeys),
            fibonacciId: fibonacciPatternResult.map(el => el.id),
            fibonacciKeysDiffer: fibonacciPatternResult.map(el => el.differKeys),
            keyLevelsId: keyLevelsPatternResult.map(el => el.id),
            keyLevelsKeysDiffer: keyLevelsPatternResult.map(el => el.differKeys),
            sdsResult: chartPatternResult.map(el => el.sDsChart.resultUid),
            signalName: name,
        }));

        if (!chartPatternResult.length && !fibonacciPatternResult.length && !keyLevelsPatternResult.length) {
            return;
        }
        (isCompareAll || isChart) && sendDiffersSignalChart(chartPatternResultObj);
        (isCompareAll || isFibonacci) && sendDiffersSignalFibonacci(fibonacciPatternResultObj);
        (isCompareAll || isKeyLevels) && sendDiffersSignalKeyLevels(keyLevelPatternResultObj);


            sendSignalsByPattern(chartPatternResultObj, fibonacciPatternResultObj, keyLevelPatternResultObj)
                .then(() => {
                    console.log('successful');
                });
    }

    const signalsChartId = Object.keys(getDifferCharts)
    const signalsFibonacciId = Object.keys(getDifferFibonacci)
    const signalsKeyLevelsId = Object.keys(getDifferKeyLevels)
    const allSignalsId = [...signalsChartId, ...signalsFibonacciId, ...signalsKeyLevelsId];
    const getDifferenceAll =  {...getDifferCharts, ...getDifferFibonacci, ...getDifferKeyLevels};

    const showDiff = (event) => {
        let differenceKey;
        let differenceAllKey;
        let differenceSdsValue;
        let differenceAllSdsValue;
        let differenceKeyKeyLevels;
        let differenceKeyFibonacci;
        let differenceSdsValueFibonacci;
        let differenceMicroserviceValue;
        let differenceSdsValueKeyLevels;
        let differenceAllMicroserviceValue;
        let differenceMicroserviceValueFibonacci;
        let differenceMicroserviceValueKeyLevels;

        if (signalContent.signalName === 'chart') {
            differenceKey = Object.keys(getDifferCharts).length && Object.keys(getDifferCharts?.[event.target.innerText]?.microservice);
            differenceSdsValue = Object.keys(getDifferCharts).length && Object.values(getDifferCharts?.[event.target.innerText]?.sds);
            differenceMicroserviceValue = Object.keys(getDifferCharts).length && Object.values(getDifferCharts?.[event.target.innerText]?.microservice);
        } else if (signalContent.signalName === 'fibonacci') {
            differenceKeyFibonacci = Object.keys(getDifferFibonacci).length && Object.keys(getDifferFibonacci?.[event.target.innerText]?.microservice);
            differenceSdsValueFibonacci = Object.keys(getDifferFibonacci).length && Object.values(getDifferFibonacci?.[event.target.innerText]?.sds);
            differenceMicroserviceValueFibonacci = Object.keys(getDifferFibonacci).length && Object.values(getDifferFibonacci?.[event.target.innerText]?.microservice);
        } else if (signalContent.signalName === 'key levels') {
            differenceKeyKeyLevels = Object.keys(getDifferKeyLevels).length && Object.keys(getDifferKeyLevels?.[event.target.innerText]?.microservice);
            differenceSdsValueKeyLevels = Object.keys(getDifferKeyLevels).length && Object.values(getDifferKeyLevels?.[event.target.innerText]?.sds);
            differenceMicroserviceValueKeyLevels = Object.keys(getDifferKeyLevels).length && Object.values(getDifferKeyLevels?.[event.target.innerText]?.microservice);
        } else if(signalContent.signalName === 'compare all') {
            differenceAllKey = Object.keys(getDifferenceAll).length && Object.keys(getDifferenceAll?.[event.target.innerText]?.microservice);
            differenceAllSdsValue = Object.keys(getDifferenceAll).length && Object.values(getDifferenceAll?.[event.target.innerText]?.sds);
            differenceAllMicroserviceValue = Object.keys(getDifferenceAll).length && Object.values(getDifferenceAll?.[event.target.innerText]?.microservice);
        }

        setSignalContent(prevState => ({
            ...prevState,
            differenceKey,
            differenceAllKey,
            differenceSdsValue,
            differenceAllSdsValue,
            differenceKeyKeyLevels,
            differenceKeyFibonacci,
            differenceSdsValueKeyLevels,
            differenceSdsValueFibonacci,
            differenceMicroserviceValue,
            differenceAllMicroserviceValue,
            differenceMicroserviceValueFibonacci,
            differenceMicroserviceValueKeyLevels,
        }))
    }

    const signalTitle = [
        {label: "signals id", id:  signalsChartId, getDifferCharts, showDiff,
            signalsFibonacciId, signalsKeyLevelsId, allSignalsId,
        },
        {label: "name field", differenceArray: signalContent.differenceKey,
            differenceKeyFibonacci: signalContent.differenceKeyFibonacci,
            differenceKeyKeyLevels: signalContent.differenceKeyKeyLevels,
            differenceAllSignals: signalContent.differenceAllKey,

        },
        {label: "autochartist", differenceMicroserviceValue: signalContent.differenceMicroserviceValue,
            differenceMicroserviceValueFibonacci: signalContent.differenceMicroserviceValueFibonacci,
            differenceMicroserviceValueKeyLevels:signalContent.differenceMicroserviceValueKeyLevels,
            differenceAllMicroserviceValue: signalContent.differenceAllMicroserviceValue,
        },
        {label: "sds", differenceSdsValue: signalContent.differenceSdsValue,
            differenceSdsValueFibonacci: signalContent.differenceSdsValueFibonacci,
            differenceSdsValueKeyLevels: signalContent.differenceSdsValueKeyLevels,
            differenceAllSdsValue: signalContent.differenceAllSdsValue,
        },
    ];

    return (
        <ThemeProvider theme={themeTable}>
            <Wrapper data-at={'Table-Container'}>
                <TableModule data-at={'Table-Container__tableModule'}>
                    <TableWrapper data-at={'TableModule__tableWrapper'}>
                        {signalTitle.map((title, index) =>
                            <Table key={`${title.label}-${new Date().getTime().toString()}`}
                                   title={title.label}
                                   showDiff={title.showDiff}
                                   signalName={signalContent.signalName}
                                   getDifferCharts={title.getDifferCharts}
                                   differenceAllId={title.allSignalsId}
                                   differenceArray={title.differenceArray}
                                   differenceAllKey={title.differenceAllSignals}
                                   getDifferChartsId={title.id}
                                   differenceSdsValue={title.differenceSdsValue}
                                   signalsFibonacciId={title.signalsFibonacciId}
                                   signalsKeyLevelsId={title.signalsKeyLevelsId}
                                   differenceAllSdsValue={title.differenceAllSdsValue}
                                   differenceKeyFibonacci={title.differenceKeyFibonacci}
                                   differenceKeyKeyLevels={title.differenceKeyKeyLevels}
                                   differenceSdsValueKeyLevels={title.differenceSdsValueKeyLevels}
                                   differenceSdsValueFibonacci={title.differenceSdsValueFibonacci}
                                   differenceMicroserviceValue={title.differenceMicroserviceValue}
                                   differenceAllMicroserviceValue={title.differenceAllMicroserviceValue}
                                   differenceMicroserviceValueKeyLevels={title.differenceMicroserviceValueKeyLevels}
                                   differenceMicroserviceValueFibonacci={title.differenceMicroserviceValueFibonacci}

                            />)}
                    </TableWrapper>
                    <CompareButtonWrapper data-at={'TableModule__compareButtonWrapper'}>
                        {compareButtons.map((button, id) =>
                            <CompareButtonWrapper.button key={`${button.name}-${new Date().getTime().toString()}`}>
                                <Button
                                    key={`${button}_${id}`}
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

