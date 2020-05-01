import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./PaypalButtons.module.css";

const CLIENT_ID =
  "AX3wyZ8L-_nkK7Fx2glia80YtwaZFVxqI5oYFyv70l9m9V316Y-XMSn94Hamw3QF9zHJv3ZGPyKKXjkw";

let PaypalButton = null;

const PaypalButtons = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  window.React = React;
  window.ReactDOM = ReactDOM;

  const { isScriptLoaded, isScriptLoadSucceed } = props;

  useEffect(() => {
    if (isScriptLoaded) {
      if (isScriptLoadSucceed) {
        PaypalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
      }
      setIsLoading(false);
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);

  return (
    <div className={classes.PaypalButtons}>
      {isLoading ? (
        <Spinner />
      ) : (
        <PaypalButton
          createOrder={props.createOrder}
          onApprove={props.onApprove}
        />
      )}
    </div>
  );
};

PaypalButtons.propTypes = {
  createOrder: PropTypes.func.isRequired,
  isScriptLoadSucceed: PropTypes.bool.isRequired,
  isScriptLoaded: PropTypes.bool.isRequired,
  onApprove: PropTypes.func.isRequired,
};

const currencyCode =
  window.navigator.language.split("-")[0] === "pt" ? "BRL" : "USD";

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=${currencyCode}`
)(PaypalButtons);
