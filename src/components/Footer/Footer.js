import PropTypes from 'prop-types';
import React from 'react';
import classes from './Footer.module.css';
import { Typography } from 'antd';
import CopyrightOutlined from '@ant-design/icons/CopyrightOutlined';
import GithubOutlined from '@ant-design/icons/GithubOutlined';

const { Title } = Typography;

const Footer = (props) => {
  const style = {
    position: props.position
  };

  return (
    <footer className={classes.Footer} style={style}>
      <Title level={3}>
        <div>
          Raphael Collin
          <a
            href="https://github.com/C0lliNN/HardwareSthor"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp; <GithubOutlined className={classes.GitIcon} />
          </a>
        </div>
        <CopyrightOutlined /> {new Date().getFullYear()}
      </Title>
    </footer>
  );
};

Footer.propTypes = {
  position: PropTypes.string
};

export default React.memo(Footer);
