import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

const Logout = (props) => {
  const { logout } = props;

  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
