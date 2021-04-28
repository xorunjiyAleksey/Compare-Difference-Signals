import { connect } from 'react-redux';
import * as actions from './actions.js';
import * as selectors from './selectors.js';
import Component from './SignalsModule.jsx';

const mapStateToProps = state => ({
    btnStatus: selectors.getBtnStatus(state),
    getAutochartistSignals: selectors.getsignal(state),
    getSdsSignals: selectors.getSdsSignal(state),
});

const mapDispatchToProps = dispatch => ({
    sendSdsSignal: signalData => dispatch(actions.onSendSdsSignal(signalData)),
    sendAutoSignal: signalData => dispatch(actions.onSendAutoSignal(signalData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);