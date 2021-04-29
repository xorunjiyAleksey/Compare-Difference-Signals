import React from 'react';
import _ from 'lodash';
import { MainWrapper } from './styledComponent.js';
import SdsService from './components/sdsService/SdsService.jsx';
import AutoChartistService from './components/autoChartistService/AutoChartistService.jsx';

const SignalsModule = props => {
    const {
        btnStatus,
        getSdsSignals,
        getAutochartistSignals,
        sendAutoSignal,
        sendSdsSignal
    } = props;

    const parsedSdsSignals = getSdsSignals.map(el => JSON.parse(el));

    console.log('parsedSdsSignals', parsedSdsSignals);
    console.log('getAutochartistSignals', getAutochartistSignals);

    const sortedSdsSignals = [];
    const toSortSds = (parsedSdsSignals) => {
        const toSdsIdArray = [];
        parsedSdsSignals.map(el => toSdsIdArray.push(el.resultUid));
        sortedSdsSignals.push(toSdsIdArray.sort());
    }
    toSortSds(parsedSdsSignals);
    console.log(sortedSdsSignals)

    const sortedAutoSignals = [];
    const toSortAuto = (getAutochartistSignals) => {
        const toAutoIdArray = [];
        getAutochartistSignals.map(el => toAutoIdArray.push(el.resultUid));
        getAutochartistSignals.push(toAutoIdArray.sort());
    }
    toSortAuto(sortedAutoSignals);
    console.log(sortedAutoSignals);

    // let compareResultAuto = [];
    // let compareResultSds = [];
    // const isPatternsEqual = (parsedSdsSignals, getAutochartistSignals) => {
    //     for(let i = 0; i < parsedSdsSignals?.length; i++) {
    //         for(let j = 0; j < getAutochartistSignals?.length; j++) {
    //             if(parsedSdsSignals[i].resultUid !== getAutochartistSignals[j].resultUid) {
    //                 compareResultSds.push(getAutochartistSignals[j])
    //                 compareResultAuto.push(parsedSdsSignals[i])
    //             }
    //         }
    //     }
    // }
    // isPatternsEqual(parsedSdsSignals, getAutochartistSignals);
    // console.log([...new Set(compareResultAuto)]);
    // console.log([...new Set(compareResultSds)]);

    // let result = _.differenceBy(parsedSdsSignals, getAutochartistSignals, 'resultUid');
    // console.log(result)

    // const defaulKeysAuto = {
    //     age: getAutochartistSignals.age,
    //     breakout: getAutochartistSignals.breakout,
    //     clarity: getAutochartistSignals.clarity,
    //     clickThroughUrl: getAutochartistSignals.clickThroughUrl,
    //     completed: getAutochartistSignals.completed,
    //     dataFeed: getAutochartistSignals.dataFeed,
    //     demoCandleDelay: getAutochartistSignals.demoCandleDelay,
    //     demoMinuteDelay: getAutochartistSignals.demoCandleDelay,
    //     direction: getAutochartistSignals.direction,
    //     exchange: getAutochartistSignals.exchange,
    //     initialTrend: getAutochartistSignals.initialTrend,
    //     interval: getAutochartistSignals.interval,
    //     length: getAutochartistSignals.length,
    //     pattern: getAutochartistSignals.pattern,
    //     patternEndTime: getAutochartistSignals.patternEndTime,
    //     patternImageUrl: getAutochartistSignals.patternImageUrl,
    //     predictionPriceFrom: getAutochartistSignals.predictionPriceFrom,
    //     predictionPriceTo: getAutochartistSignals.predictionPriceFrom,
    //     predictionTimeFrom: getAutochartistSignals.predictionPriceFrom,
    //     predictionTimeTo: getAutochartistSignals.predictionPriceFrom,
    //     quality: getAutochartistSignals.quality,
    //     relevant: getAutochartistSignals.relevant,
    //     resistanceX0: getAutochartistSignals.resistanceX0,
    //     resistanceX1: getAutochartistSignals.resistanceX0,
    //     resistanceY0: getAutochartistSignals.resistanceX0,
    //     resistanceY1: getAutochartistSignals.resistanceY1,
    //     resultUid: getAutochartistSignals.resultUid
    //     stopLoss: getAutochartistSignals.stopLoss,
    //     supportX0: getAutochartistSignals.resistanceX0,
    //     supportX1: getAutochartistSignals.supportX1,
    //     supportY0: getAutochartistSignals.supportY0,
    //     supportY1: getAutochartistSignals.supportX1,
    //     symbol: getAutochartistSignals.symbol,
    //     symbolCode: getAutochartistSignals.symbolCode,
    //     timezoneOffset: getAutochartistSignals.timezoneOffset,
    //     trend: getAutochartistSignals.trend,
    //     uniformity: getAutochartistSignals.uniformity,
    //     volumeIncrease: getAutochartistSignals.volumeIncrease
    // }

    //  const isEqual = (parsedSdsSignals, getAutochartistSignals) => {
    //         return parsedSdsSignals.map(el => {
    //             return getAutochartistSignals.map(item => {
    //                 if (item.resultUid !== el.resultUid) {
    //                     console.log('auth', item.resultUid, 'sds', el.resultUid)
    //                     return item.resultUid
    //                 }
    //             });
    //         })
    //     }
    // console.log(isEqual(parsedSdsSignals, getAutochartistSignals));

    // const arr1IDs = new Set(getAutochartistSignals.map(({ id }) => id));
    // const combined = [...getAutochartistSignals, ...getAutochartistSignals.filter(({ id }) => !arr1IDs.has(id))];
    //
    // console.log(combined)

    return (
        <MainWrapper>
            <AutoChartistService
                btnStatus={btnStatus}
                sendAutoSignal={sendAutoSignal}
                getAutochartistSignals={getAutochartistSignals}
            />
            <SdsService
                getSdsSignals={getSdsSignals}
                sendSdsSignal={sendSdsSignal}
            />
        </MainWrapper>
    );
}

export default React.memo(SignalsModule);