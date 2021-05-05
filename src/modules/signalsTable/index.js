import { connect } from 'react-redux';
import * as selectors from './selectors.js';
import Component from './SignalsTable.jsx';
import * as actions from './actions';

const mapStateToProps = state => ({
    btnStatus: selectors.getBtnStatus(state),
    getSdsSignals: selectors.getSdsSignal(state),
    getDifferCharts: selectors.getDifferChart(state),
    getAutochartistSignals: selectors.getsignal(state),
});

const mapDispatchToProps = dispatch => ({
    sendDiffersSignal: differData => dispatch(actions.onSendDifferSignals(differData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);