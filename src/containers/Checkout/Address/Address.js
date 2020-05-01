import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import classes from './Address.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Button, Row, Col, Typography } from 'antd';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import { injectIntl, FormattedMessage } from 'react-intl';

const { Title } = Typography;

const Address = (props) => {
  const { setUserInformation, userId, history, checkoutInformation } = props;

  const countryRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();
  const streetRef = useRef();
  const houseNumberRef = useRef();

  useEffect(() => {
    if (!checkoutInformation) {
      history.replace('/checkout');
    } else {
      if (!checkoutInformation.userId) {
        if (userId) {
          setUserInformation(userId);
        } else {
          history.replace('/checkout');
        }
      }
    }
  }, [setUserInformation, userId, history, checkoutInformation]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const country = countryRef.current.state.value;
    const state = stateRef.current.state.value;
    const city = cityRef.current.state.value;
    const postalCode = postalCodeRef.current.state.value;
    const street = streetRef.current.state.value;
    const houseNumber = houseNumberRef.current.state.value;

    const address = {
      country: country,
      state: state,
      city: city,
      postalCode: postalCode,
      street: street,
      houseNumber: houseNumber
    };

    props.setAddressInformation(address);

    history.push('/checkout/payment');
  };

  return (
    <div className={classes.Address}>
      {checkoutInformation && (
        <React.Fragment>
          <Title level={3}>
            <FormattedMessage
              id="CheckoutSteps.Address"
              defaultMessage="Address"
            />
          </Title>
          <form onSubmit={onSubmitHandler}>
            <Input
              size="large"
              required
              placeholder={props.intl.formatMessage({
                id: 'Address.Country',
                defaultMessage: 'Country'
              })}
              prefix={<HomeOutlined />}
              ref={countryRef}
              defaultValue={checkoutInformation.address.country}
            />
            <Input
              size="large"
              required
              placeholder={props.intl.formatMessage({
                id: 'Address.State',
                defaultMessage: 'State'
              })}
              prefix={<HomeOutlined />}
              ref={stateRef}
              className={classes.InputWithMargin}
              defaultValue={checkoutInformation.address.state}
            />
            <Input
              size="large"
              required
              placeholder={props.intl.formatMessage({
                id: 'Address.City',
                defaultMessage: 'City'
              })}
              prefix={<HomeOutlined />}
              ref={cityRef}
              className={classes.InputWithMargin}
              defaultValue={checkoutInformation.address.city}
            />
            <Input
              size="large"
              required
              placeholder={props.intl.formatMessage({
                id: 'Signup.PostalCode',
                defaultMessage: 'Postal Code'
              })}
              prefix={<HomeOutlined />}
              className={classes.InputWithMargin}
              ref={postalCodeRef}
              defaultValue={checkoutInformation.address.postalCode}
            />

            <Row justify="space-between">
              <Col xs={24} md={16}>
                <Input
                  size="large"
                  required
                  placeholder={props.intl.formatMessage({
                    id: 'Signup.Street',
                    defaultMessage: 'Street'
                  })}
                  prefix={<HomeOutlined />}
                  className={classes.InputWithMargin}
                  ref={streetRef}
                  defaultValue={checkoutInformation.address.street}
                />
              </Col>

              <Col xs={24} md={7}>
                <Input
                  size="large"
                  required
                  placeholder={props.intl.formatMessage({
                    id: 'Signup.Number',
                    defaultMessage: 'Number'
                  })}
                  prefix={<HomeOutlined />}
                  className={classes.InputWithMargin}
                  ref={houseNumberRef}
                  defaultValue={checkoutInformation.address.houseNumber}
                />
              </Col>
            </Row>
            <div className={classes.ButtonContainer}>
              <Button type="primary" htmlType="submit" size="large">
                <FormattedMessage id="Address.Next" defaultMessage="Next" />
              </Button>
            </div>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

Address.propTypes = {
  checkoutInformation: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      houseNumber: PropTypes.string,
      postalCode: PropTypes.string,
      state: PropTypes.string,
      street: PropTypes.string
    }),
    userId: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }),
  setAddressInformation: PropTypes.func,
  setUserInformation: PropTypes.func,
  userId: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps)(injectIntl(withRouter(Address)));
