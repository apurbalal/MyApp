import {connect} from 'react-redux';
import {authenticated} from '../redux/actions';
import Auth from '../pages/Auth';

const mapStateToProps = (state: any) => ({
  authenticated: state.authentication.authenticated,
});

const mapDispatchToProps = (dispatch: any) => ({
  setAuthenticated: (value: boolean) => {
    dispatch(authenticated(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
