import PropTypes from "prop-types";
import React from "react";
import classes from "./SearchBar.module.css";
import { Input, Button } from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { injectIntl } from "react-intl";

const SearchBar = (props) => (
  <div className={classes.SearchBar}>
    <Input
      placeholder={props.intl.formatMessage({
        id: "SearchBar.placeholder",
        defaultMessage: "Search...",
      })}
      size="large"
      className={classes.Input}
    />

    <Button type="primary" className={classes.SearchButton} size="large">
      <SearchOutlined style={{ fontSize: "25px" }} />
    </Button>
  </div>
);

SearchBar.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(React.memo(SearchBar));
