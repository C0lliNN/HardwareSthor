import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import classes from './Done.module.css';
import { withRouter } from 'react-router-dom';
import { Result, Button } from 'antd';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as actionsCreators from '../../../store/actions/index';
import { connect } from 'react-redux';

const Done = (props) => {
  const { checkoutInformation, history, clearCheckout, clearCart } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !checkoutInformation ||
      !checkoutInformation.userId ||
      !checkoutInformation.address ||
      !checkoutInformation.paid
    ) {
      history.replace('/checkout');
    } else {
      setIsLoading(false);

      return () => {
        clearCheckout(null);
        clearCart();
      };
    }
  }, [checkoutInformation, history, clearCheckout, clearCart]);

  return (
    <div className={classes.Done}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Result
          status="success"
          title={props.intl.formatMessage({
            id: 'Done.ResultTitle',
            defaultMessage: 'Purchase performed successfully!'
          })}
          subTitle={props.intl.formatMessage({
            id: 'Done.ResultSubTitle',
            defaultMessage: 'Your product(s) will be in your hands soon.'
          })}
          extra={[
            <Button
              key="buy"
              type="primary"
              onClick={() => props.history.replace('/')}
            >
              <FormattedMessage id="Done.BuyAgain" defaultMessage="Buy Again" />
            </Button>
          ]}
        />
      )}
    </div>
  );
};

Done.propTypes = {
  checkoutInformation: PropTypes.shape({
    address: PropTypes.object,
    paid: PropTypes.bool,
    userId: PropTypes.string
  }),
  clearCart: PropTypes.func,
  clearCheckout: PropTypes.func,
  history: PropTypes.shape({
    replace: PropTypes.func
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }).isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actionsCreators.clearCart())
  };
};

export default connect(null, mapDispatchToProps)(injectIntl(withRouter(Done)));
