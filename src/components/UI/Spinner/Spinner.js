import React from "react";
import classes from "./Spinner.module.css";
import { Spin } from "antd";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { FormattedMessage } from "react-intl";

const spinnerIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const Spinner = () => (
  <div className={classes.Spinner}>
    <Spin indicator={spinnerIcon} size="large" />
    <p>
      <FormattedMessage id="Spinner.Loading" defaultMessage="Loading" />
    </p>
  </div>
);

export default React.memo(Spinner);
