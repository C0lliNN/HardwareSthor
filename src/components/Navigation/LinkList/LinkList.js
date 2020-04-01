import React from 'react'
import classes from './LinkList.module.css'
import { injectIntl } from 'react-intl'
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined'
import LoginOutlined from '@ant-design/icons/LoginOutlined'
import LinkItem from './LinkItem/LinkItem'

const LinkList = props => {

    const links = [
        {
            text: props.intl.formatMessage({
                id: 'LinkList.Cart',
                defaultMessage: "Cart"
            }),
            icon: ShoppingCartOutlined,
            path: '/cart'
        },
        {
            text: props.intl.formatMessage({
                id: 'LinkList.Login',
                defaultMessage: "Login"
            }),
            icon: LoginOutlined,
            path: '/login'
        }
    ]

    return (
        <ul className={classes.LinkList}>
            {links.map(link => (
                <LinkItem 
                    key={link.text}
                    icon={link.icon} 
                    text={link.text} 
                    path={link.path}/>
            ))}
        </ul>
    )
}

export default injectIntl(LinkList);