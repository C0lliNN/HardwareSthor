import PropTypes from "prop-types";
import React from "react";
import classes from "./MyBreadcrumb.module.css";
import { Breadcrumb } from "antd";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import TagsOutlined from "@ant-design/icons/TagsOutlined";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

const MyBreadcrumb = (props) => {
  const categoryId = props.match.params.category;

  const category = props.categories.find((p) => p.id === categoryId);

  let categoryName = null;

  if (category) {
    categoryName = props.intl.formatMessage({
      id: category.intlId,
      defaultMessage: category.defaultName,
    });
  }

  const routes = [
    {
      path: "/",
      breadcrumbName: "Home",
      icon: HomeOutlined,
    },
    {
      path: "/category/" + categoryId,
      breadcrumbName: categoryName,
      icon: TagsOutlined,
    },
  ];

  const itemRender = (route) => {
    return (
      <div className={classes.NavigationItem}>
        <route.icon className={classes.Icon} />
        &nbsp;
        <NavLink className={classes.Link} to={route.path}>
          {route.breadcrumbName}
        </NavLink>
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb itemRender={itemRender} routes={routes} />
    </div>
  );
};

MyBreadcrumb.propTypes = {
  categories: PropTypes.array,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.any,
    }),
  }),
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps)(injectIntl(withRouter(MyBreadcrumb)));
