import React, { useState, useCallback } from 'react'
import classes from './Navigation.module.css'
import HorizontalMenu from './HorizontalMenu/HorizontalMenu'
import MenuOutlined from '@ant-design/icons/MenuOutlined'
import SideDrawer from './SideDrawer/SideDrawer'


const Navigation = () => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const showSideDrawerHandler = useCallback(() => {
        setShowSideDrawer(true);
    })


    const hideSideDrawerHandler = useCallback(() => {
        setShowSideDrawer(false);
    })

    return (
        <nav className={classes.Navigation}>
            <HorizontalMenu />
            <button 
                onClick={showSideDrawerHandler}
                className={classes.Hamburger}>
                <MenuOutlined className={classes.Icon}/>
            </button>
            <SideDrawer 
                show={showSideDrawer} 
                closeSideDrawer={hideSideDrawerHandler}/>
        </nav>
    )
}

export default Navigation;