import React from 'react'
import classes from './Category.module.css'
import { NavLink } from 'react-router-dom'

const Category = props => (
    <NavLink 
        to={props.path}
        className={classes.Category}
        activeClassName={classes.Active}>
        {props.text}
    </NavLink>
)

export default Category;