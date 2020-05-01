import PropTypes from 'prop-types';
import React, { useRef, useCallback, useState } from 'react';
import classes from './Signup.module.css';
import { Card, Input, Button, Row, Col, message, Modal } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import Spinner from '../../components/UI/Spinner/Spinner';
import MailOutlined from '@ant-design/icons/MailOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';

const Signup = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const postalCodeRef = useRef();
  const streetRef = useRef();
  const houseNumberRef = useRef();

  const showInvalidInput = useCallback((errorInfo) => {
    const content = errorInfo.content ? errorInfo.content : '';
    message.error(errorInfo.title + '! ' + content);
  }, []);

  const { intl } = props;

  const showSuccessModal = useCallback(() => {
    Modal.success({
      content: intl.formatMessage({
        id: 'Signup.AccountCreated',
        defaultMessage: 'The Account was created successfully!'
      })
    });
  }, [intl]);

  const showFailureModal = useCallback(
    (error) => {
      const errorMessage = error.message ? error.message : error;

      Modal.error({
        content:
          intl.formatMessage({
            id: 'Signup.AccountFailure',
            defaultMessage: 'Something unexpected happened'
          }) +
          ': ' +
          errorMessage
      });
    },
    [intl]
  );

  const signupHandler = useCallback(
    (event) => {
      event.preventDefault();

      const name = nameRef.current.state.value;
      const lastName = lastNameRef.current.state.value;
      const email = emailRef.current.state.value;
      const password = passwordRef.current.input.value;
      const confirmPassword = confirmPasswordRef.current.input.value;
      const postalCode = postalCodeRef.current.state.value;
      const street = streetRef.current.state.value;
      const houseNumber = houseNumberRef.current.state.value;

      let errorFounded = false;
      let errorInfo = null;

      if (!name.match(/(^[A-Z]+$)/gi)) {
        errorFounded = true;
        errorInfo = {
          title: intl.formatMessage({
            id: 'Signup.InvalidName',
            defaultMessage: 'Invalid Name'
          }),
          content: intl.formatMessage({
            id: 'Signup.NameRules',
            defaultMessage: 'Only simple words are allowed'
          })
        };
      }

      if (!errorFounded && !lastName.match(/(^[A-Z]+$)/gi)) {
        errorFounded = true;
        errorInfo = {
          title: intl.formatMessage({
            id: 'Signup.InvalidLastName',
            defaultMessage: 'Invalid Last Name'
          }),
          content: intl.formatMessage({
            id: 'Signup.LastNameRules',
            defaultMessage: 'Only simple words are allowed'
          })
        };
      }

      /*eslint-disable */
      if (
        !errorFounded &&
        !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        errorFounded = true;
        errorInfo = {
          title: intl.formatMessage({
            id: 'Signup.InvalidEmail',
            defaultMessage: 'Invalid Email'
          }),
          content: intl.formatMessage({
            id: 'Signup.EmailRules',
            defaultMessage: 'Provide a valid Email Address'
          })
        };
      }

      /*eslint-enable */

      if (!errorFounded && password.length < 6) {
        errorFounded = true;
        errorInfo = {
          title: intl.formatMessage({
            id: 'Signup.InvalidPassword',
            defaultMessage: 'Invalid Password'
          }),
          content: intl.formatMessage({
            id: 'Signup.PasswordRules',
            defaultMessage: 'The password needs to have at least 6 characters'
          })
        };
      }

      if (!errorFounded && confirmPassword !== password) {
        errorFounded = true;
        errorInfo = {
          title: intl.formatMessage({
            id: 'Signup.PasswordMatch',
            defaultMessage: "The Passwords don't match"
          })
        };
      }

      if (
        !errorFounded &&
        (!postalCode.trim() || !street.trim() || !houseNumber.trim())
      ) {
        errorFounded = true;
        errorInfo = {
          title: intl.formatMessage({
            id: 'Signup.EmptyFields',
            defaultMessage: 'Empty Fields'
          }),
          content: intl.formatMessage({
            id: 'Signup.EmptyFieldsRules',
            defaultMessage: 'All fields must be fulfilled'
          })
        };
      }

      if (errorFounded) {
        showInvalidInput(errorInfo);
      } else {
        setIsLoading(true);

        const userData = {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          postalCode: postalCode,
          street: street,
          houseNumber: houseNumber
        };

        const url =
          'https://us-central1-hardwaresthor.cloudfunctions.net/createUser';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setIsLoading(false);

            if (response.message !== 'SUCCESS') {
              throw new Error(response.message);
            }

            showSuccessModal();
          })
          .catch((error) => {
            setIsLoading(false);
            showFailureModal(error);
          });
      }
    },
    [intl, showFailureModal, showSuccessModal, showInvalidInput]
  );

  return (
    <section className={classes.Signup}>
      <Card
        title={props.intl.formatMessage({
          id: 'Signup.Signup',
          defaultMessage: 'Sign up'
        })}
        headStyle={{
          fontSize: '1.8em',
          textAlign: 'center'
        }}
        style={{
          boxShadow: '0px 0px 2px rgba(48, 48, 48, 0.3)'
        }}
      >
        <form onSubmit={signupHandler}>
          <Row align="middle" justify="space-between">
            <Col xs={24} md={12}>
              <Input
                size="large"
                required
                placeholder={props.intl.formatMessage({
                  id: 'Signup.Name',
                  defaultMessage: 'Name'
                })}
                prefix={<UserOutlined />}
                style={{ marginTop: '20px' }}
                ref={nameRef}
              />
            </Col>
            <Col xs={24} md={11}>
              <Input
                size="large"
                required
                placeholder={props.intl.formatMessage({
                  id: 'Signup.LastName',
                  defaultMessage: 'Last Name'
                })}
                prefix={<UserOutlined />}
                style={{ marginTop: '20px' }}
                ref={lastNameRef}
              />
            </Col>
          </Row>

          <Input
            size="large"
            required
            type="email"
            placeholder="E-mail"
            prefix={<MailOutlined />}
            style={{ marginTop: '20px' }}
            ref={emailRef}
          />

          <Input.Password
            size="large"
            required
            placeholder={props.intl.formatMessage({
              id: 'Login.Password',
              defaultMessage: 'Password'
            })}
            prefix={<LockOutlined />}
            style={{ marginTop: '20px' }}
            ref={passwordRef}
          />

          <Input.Password
            size="large"
            required
            placeholder={props.intl.formatMessage({
              id: 'Signup.ConfirmPassword',
              defaultMessage: 'Confirm Password'
            })}
            prefix={<LockOutlined />}
            style={{ marginTop: '20px' }}
            ref={confirmPasswordRef}
          />

          <Input
            size="large"
            required
            placeholder={props.intl.formatMessage({
              id: 'Signup.PostalCode',
              defaultMessage: 'Postal Code'
            })}
            prefix={<HomeOutlined />}
            style={{ marginTop: '20px' }}
            ref={postalCodeRef}
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
                style={{ marginTop: '20px' }}
                ref={streetRef}
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
                style={{ marginTop: '20px' }}
                ref={houseNumberRef}
              />
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={classes.LoginButton}
          >
            <FormattedMessage id="Signup.Signup" defaultMessage="Sign Up" />
          </Button>
        </form>
      </Card>

      {isLoading && <Spinner />}
    </section>
  );
};

Signup.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }).isRequired
};

export default injectIntl(Signup);
