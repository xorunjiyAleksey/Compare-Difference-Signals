export const getBtnStatus = state => state.autoChartistService.isBtnEnable;
export const getsignal = state => state.autoChartistService.sendPattern;
export const getSdsSignal = state => state.sdsSignals.sendPattern;
export const getDifferChart = state => state.differnces.chartDiffers;
export const getDiffersFibonacci = state => state.differnces.fibonacciDiffers;
export const getDiffersKeyLevels = state => state.differnces.keyLevelsDiffers;