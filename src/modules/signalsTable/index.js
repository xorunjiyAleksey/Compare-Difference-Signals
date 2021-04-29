import { connect } from 'react-redux';
import * as selectors from './selectors.js';
import Component from './SignalsTable.jsx';

const mapStateToProps = state => ({
    btnStatus: selectors.getBtnStatus(state),
    getAutochartistSignals: selectors.getsignal(state),
    getSdsSignals: selectors.getSdsSignal(state),
});


export default connect(mapStateToProps, null)(Component);