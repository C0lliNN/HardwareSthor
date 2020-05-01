import PropTypes from 'prop-types';
import React from 'react';
import { Steps } from 'antd';
import { injectIntl } from 'react-intl';

const { Step } = Steps;

const CheckoutSteps = (props) => (
  <Steps current={props.current} size={props.size}>
    <Step
      title={props.intl.formatMessage({
        id: 'LinkList.Login',
        defaultMessage: 'Login'
      })}
    />
    <Step
      title={props.intl.formatMessage({
        id: 'CheckoutSteps.Address',
        defaultMessage: 'Address'
      })}
    />
    <Step
      title={props.intl.formatMessage({
        id: 'CheckoutSteps.Payment',
        defaultMessage: 'Payment'
      })}
    />
    <Step
      title={props.intl.formatMessage({
        id: 'CheckoutSteps.Done',
        defaultMessage: 'Done'
      })}
    />
  </Steps>
);

CheckoutSteps.propTypes = {
  current: PropTypes.number,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }).isRequired,
  size: PropTypes.string
};

export default React.memo(injectIntl(CheckoutSteps));
