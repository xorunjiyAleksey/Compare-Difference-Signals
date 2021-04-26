import { connect } from 'react-redux';
import * as actions from './actions';
import Component from './AutoChartistService.jsx';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    isEnable: payload => dispatch(actions.onIsEnable(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);