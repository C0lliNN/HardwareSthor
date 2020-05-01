import PropTypes from "prop-types";
import React, { useEffect } from "react";
import classes from "./Categories.module.css";
import Category from "./Category/Category";
import * as actionCreators from "../../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import { FormattedMessage, injectIntl } from "react-intl";

const Categories = (props) => {
  const { getCategories } = props;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const compare = (a, b) => {
    if (a.text > b.text) {
      return 1;
    }
    if (a.text < b.text) {
      return -1;
    }

    return 0;
  };

  let content = null;

  if (props.isLoading) {
    content = <Spinner />;
  }

  if (props.categories.length) {
    const transformedCategories = props.categories.map((category) => {
      return {
        id: category.id,
        text: props.intl.formatMessage({
          id: category.intlId,
          defaultMessage: category.defaultName,
        }),
        path: "/category/" + category.id,
      };
    });

    transformedCategories.sort(compare);

    content = transformedCategories.map((category) => (
      <Category key={category.id} text={category.text} path={category.path} />
    ));
  }

  if (props.error) {
    content = (
      <div className={classes.ErrorContainer}>
        <FormattedMessage
          id="Signup.AccountFailure"
          defaultMessage="Something unexpected happened"
        />
      </div>
    );
  }

  return <ul className={classes.Categories}>{content}</ul>;
};

Categories.propTypes = {
  categories: PropTypes.array,
  error: PropTypes.any,
  getCategories: PropTypes.func,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.categories.isLoading,
    categories: state.categories.categories,
    error: state.categories.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(actionCreators.getCategories()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Categories));
