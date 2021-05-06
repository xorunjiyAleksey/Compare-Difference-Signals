import { connect } from 'react-redux';
import * as selectors from './selectors.js';
import Component from './SignalsTable.jsx';
import * as actions from './actions';

const mapStateToProps = state => ({
    btnStatus: selectors.getBtnStatus(state),
    getSdsSignals: selectors.getSdsSignal(state),
    getDifferCharts: selectors.getDifferChart(state),
    getDifferFibonacci: selectors.getDiffersFibonacci(state),
    getDifferKeyLevels: selectors.getDiffersKeyLevels(state),
    getAutochartistSignals: selectors.getsignal(state),
});

const mapDispatchToProps = dispatch => ({
    sendDiffersSignalChart: differData => dispatch(actions.onSendDifferSignalsChart(differData)),
    sendDiffersSignalFibonacci: differData => dispatch(actions.onSendDifferSignalsFibonacci(differData)),
    sendDiffersSignalKeyLevels: differData => dispatch(actions.onSendDifferSignalsKeyLevels(differData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);