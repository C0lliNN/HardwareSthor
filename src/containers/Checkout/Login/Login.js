import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import classes from './Login.module.css';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import * as actionsCreators from '../../../store/actions/index';

const { Title } = Typography;

const Login = (props) => {
  const loginHandler = () => {
    props.checkout();
    props.history.push('/login');
  };

  const { isAuth, history } = props;

  useEffect(() => {
    if (isAuth) {
      history.replace('/checkout/address');
    }
  }, [history, isAuth]);

  return (
    <div className={classes.Login}>
      <Title level={3}>
        <FormattedMessage
          id="Login.Verification"
          defaultMessage="Login to continue buying"
        />
      </Title>
      <div>
        <Button
          type="primary"
          className={classes.Button}
          size="large"
          onClick={loginHandler}
        >
          <FormattedMessage id="LinkList.Login" defaultMessage="Login" />
        </Button>
      </div>
    </div>
  );
};

Login.propTypes = {
  checkout: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func
  }),
  isAuth: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token != null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: () => dispatch(actionsCreators.checkout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
