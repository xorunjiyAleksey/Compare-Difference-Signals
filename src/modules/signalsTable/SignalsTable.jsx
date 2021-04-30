import React from 'react';
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
import {element} from "prop-types";

const SignalsTable = props => {
    const {
        getSdsSignals,
        getAutochartistSignals,
    } = props

    const signalTitle = ["signals id", "name field", "autochartist", "sds"];
    const compareButtons = [{ buttonLabel: 'compare chart patterns', name: 'chart' }, { buttonLabel: 'compare fibonacci patterns', name: 'fibonacci' }, { buttonLabel: "compare key levels patterns", name: 'key levels' }, { buttonLabel: "compare all", name: 'key levels' }];

    const parsedChartSdsSignal = getSdsSignals.chart.map(el => JSON.parse(el));
    const parsedFibonacciSdsSignal = getSdsSignals.fibonacci.map(el => JSON.parse(el));
    const parsedKeyLevelsSdsSignal = getSdsSignals.keyLevels.map(el => JSON.parse(el));

    // console.log({'parsedAutoChart': getAutochartistSignals.chart}, {'parsedAutoFibo': getAutochartistSignals.fibonacci}, {'parsedAutoKey': getAutochartistSignals.keyLevels})
    // console.log({'parsedSdsChart': parsedChartSdsSignal}, {'parsedFib': parsedFibonacciSdsSignal}, {'parsedKey':parsedKeyLevelsSdsSignal})


    const handleClick = () => {
        // const diffChartPattern = getAutochartistSignals.chart.filter(item => parsedChartSdsSignal.every(i => item.resultUid !== i.resultUid))
        // const diffFibonacciPattern = getAutochartistSignals.fibonacci.filter(item => parsedFibonacciSdsSignal.every(i => item.resultUid !== i.resultUid));
        // const diffKeyLevelsPattern = getAutochartistSignals.keyLevels.filter(item => parsedKeyLevelsSdsSignal.every(i => item.resultUid !== i.resultUid));

        const autoChartSignal = getAutochartistSignals.chart.map(el => {
            delete el.dataFeed;
            delete el.clickThroughUrl;
            return el
        });
        const sDsChartSignal = parsedChartSdsSignal.map(el => {
            delete el.dataFeed;
            delete el.clickThroughUrl;
            return el
        })

        const diffAuthoChart = _.differenceWith(autoChartSignal, sDsChartSignal, _.isEqual)
        const diffAuthoChartIds = diffAuthoChart.map(element => element.resultUid)

        const result = [];

        diffAuthoChartIds.map(id => {
            const autoChart = autoChartSignal.find(element => element.resultUid === id)
            const sDsChart = sDsChartSignal.find(element => element.resultUid === id)

            if (autoChart && sDsChart) {
                const diffResult = difference(autoChart, sDsChart);
                const differ = {
                    id: id,
                    ...diffResult,
                    autoChart,
                    sDsChart
                }
                result.push(differ)
                supResult.push(diffResult)
            }
        })

        function difference(autoChart, sDsChart) {
            function changes(autoChart, sDsChart) {
                return _.transform(autoChart, function (result, value, key) {
                    if (!_.isEqual(value, sDsChart[key])) {
                        result[key] = (_.isObject(value) && _.isObject(sDsChart[key])) ? changes(value, sDsChart[key]) : value
                    }
                });
            }
            return changes(autoChart, sDsChart);
        }
        console.log(result, 'dif')
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