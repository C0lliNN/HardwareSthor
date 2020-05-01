import PropTypes from "prop-types";
import React from "react";
import classes from "./Category.module.css";
import { NavLink } from "react-router-dom";

const Category = (props) => (
  <NavLink
    to={props.path}
    className={classes.Category}
    activeClassName={classes.Active}
  >
    {props.text}
  </NavLink>
);

Category.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Category;
