import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ComponentCounter from '../components/ComponentCounter';
import * as CounterActions from '../actions/ActionCounter';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentCounter);
