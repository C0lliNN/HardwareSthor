import PropTypes from 'prop-types';
import React from 'react';
import classes from './ErrorMessage.module.css';
import { FormattedMessage } from 'react-intl';
import { Typography } from 'antd';

const { Title } = Typography;

const ErrorMessage = (props) => (
  <div className={classes.ErrorMessage}>
    <Title level={4}>
      <FormattedMessage
        id="Signup.AccountFailure"
        defaultMessage="Something unexpected happened"
      />
    </Title>
    <Title level={4} className={classes.Message}>
      {props.message}
    </Title>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default React.memo(ErrorMessage);
