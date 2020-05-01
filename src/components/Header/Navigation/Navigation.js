import React, { useState, useCallback } from 'react';
import classes from './Navigation.module.css';
import LinkList from './LinkList/LinkList';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import SideDrawer from './SideDrawer/SideDrawer';

const Navigation = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const showSideDrawerHandler = useCallback(() => {
    setShowSideDrawer(true);
  }, [setShowSideDrawer]);

  const hideSideDrawerHandler = useCallback(() => {
    setShowSideDrawer(false);
  }, [setShowSideDrawer]);

  return (
    <nav className={classes.Navigation}>
      <div className={classes.HorizontalMenu}>
        <LinkList />
      </div>

      <button onClick={showSideDrawerHandler} className={classes.Hamburger}>
        <MenuOutlined className={classes.Icon} />
      </button>
      <SideDrawer
        show={showSideDrawer}
        closeSideDrawer={hideSideDrawerHandler}
      />
    </nav>
  );
};

export default Navigation;
