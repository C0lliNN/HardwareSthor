import PropTypes from "prop-types";
import React, { useRef, useCallback, useEffect } from "react";
import classes from "./Login.module.css";
import { Card, Input, Button, message } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import MailOutlined from "@ant-design/icons/MailOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const showInvalidInput = useCallback((errorInfo) => {
    const content = errorInfo.content ? errorInfo.content : "";
    message.error(errorInfo.title + "! " + content);
  }, []);

  const { intl, error } = props;

  useEffect(() => {
    if (error) {
      let errorMessage;

      switch (error) {
        case "INVALID_PASSWORD": {
          errorMessage = intl.formatMessage({
            id: "Login.InvalidPassword",
            defaultMessage: "Invalid Password",
          });
          break;
        }
        case "EMAIL_NOT_FOUND": {
          errorMessage = intl.formatMessage({
            id: "Login.InvalidEmail",
            defaultMessage: "Email Not Founded",
          });
          break;
        }
        default:
          errorMessage = "";
      }

      message.error(
        intl.formatMessage({
          id: "Login.LoginError",
          defaultMessage: "Login Error! ",
        }) + errorMessage
      );
    }
  }, [error, intl]);

  const loginHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.state.value;
    const password = passwordRef.current.input.value;

    if (password.length < 6) {
      const errorInfo = {
        title: intl.formatMessage({
          id: "Signup.InvalidPassword",
          defaultMessage: "Invalid Password",
        }),
        content: intl.formatMessage({
          id: "Signup.PasswordRules",
          defaultMessage: "The password needs to have at least 6 characters",
        }),
      };

      showInvalidInput(errorInfo);
    } else {
      props.loginHandler({ email, password });
    }
  };

  return (
    <section className={classes.Login}>
      {props.isAuth && <Redirect to="/" />}

      <Card
        title={props.intl.formatMessage({
          id: "LinkList.Login",
          defaultMessage: "Login",
        })}
        headStyle={{
          fontSize: "1.8em",
        }}
        style={{
          boxShadow: "0px 0px 2px rgba(48, 48, 48, 0.3)",
        }}
      >
        <form onSubmit={loginHandler}>
          <Input
            type="email"
            ref={emailRef}
            required
            size="large"
            placeholder="E-mail"
            prefix={<MailOutlined />}
          />
          <Input.Password
            size="large"
            required
            placeholder={props.intl.formatMessage({
              id: "Login.Password",
              defaultMessage: "Password",
            })}
            prefix={<LockOutlined />}
            style={{ marginTop: "30px" }}
            ref={passwordRef}
          />

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={classes.LoginButton}
          >
            <FormattedMessage id="LinkList.Login" defaultMessage="Login" />
          </Button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <Link to="/signup">
            <FormattedMessage
              id="Login.CreateNewAccount"
              defaultMessage="Create new Account"
            />
          </Link>
        </div>

        <div>
          <Link to="/recover-password">
            <FormattedMessage
              id="Login.ForgotPassword"
              defaultMessage="Forgot your password?"
            />
          </Link>
        </div>
      </Card>
      {props.isLoading && <Spinner />}
    </section>
  );
};

Login.propTypes = {
  error: PropTypes.any,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
  isAuth: PropTypes.bool,
  isLoading: PropTypes.bool,
  loginHandler: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    isAuth: state.auth.token !== null,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginHandler: (data) => dispatch(actions.loginHandler(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login));
