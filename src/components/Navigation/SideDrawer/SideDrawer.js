import React from 'react'
import classes from './SideDrawer.module.css'
import { Drawer } from 'antd';
import SearchBar from '../SearchBar/SearchBar';
import LinkList from '../LinkList/LinkList';
import Categories from '../../SideBar/Categories/Categories'

const SideDrawer = props => {

    return (
        
        <Drawer
            className={classes.SideDrawer}
            title="Menu"
            placement="right"
            closable={true}
            keyboard
            onClose={props.closeSideDrawer}
            headerStyle={{
                textAlign: 'center',
                fontSize: '1.5em'
            }}
            visible={props.show}
            >
            <div className={classes.SearchBar}>
                <SearchBar/>
            </div>
            <div style={{color: 'white'}}>
                a
            </div>
            <div 
                onClick={props.closeSideDrawer}>
                <LinkList/>
            </div>
            <div style={{color: 'white'}}>
                a
            </div>
            <hr/>
            <h3>Categories</h3>
            <div onClick={props.closeSideDrawer}>
                <Categories/>
            </div>
            
        </Drawer>
        
    )
    
}



export default SideDrawer;