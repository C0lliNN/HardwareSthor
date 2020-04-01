import React from 'react'
import classes from './LinkItem.module.css'
import { NavLink } from 'react-router-dom';

const LinkItem = props => (
    <NavLink 
        className={classes.LinkItem} 
        to={props.path}
        activeClassName={classes.Active}>
        <props.icon className={classes.Icon}/>
        <span className={classes.Text}>{props.text}</span>
    </NavLink>
)

export default React.memo(LinkItem);