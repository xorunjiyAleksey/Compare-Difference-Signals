import { connect } from 'react-redux';
import * as actions from './actions';
import Component from './SdsService.jsx';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    sendSignal: payload => dispatch(actions.onSendSignal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);