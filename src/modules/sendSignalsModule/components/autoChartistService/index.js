import { connect } from 'react-redux';
import * as actions from './actions';
import * as selectors from './selectors.js';
import Component from './AutoChartistService.jsx';

const mapStateToProps = state => ({
    btnStatus: selectors.getBtnStatus(state),
});

const mapDispatchToProps = dispatch => ({
    sendSignal: signalData => dispatch(actions.onSendSignal(signalData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);