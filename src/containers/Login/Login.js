import React from 'react'
import classes from './Login.module.css'
import { Card, Input, Button } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import MailOutlined from '@ant-design/icons/MailOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import { Link } from 'react-router-dom'


const Login = props => {

    return (
        <section className={classes.Login}>
            <Card 
                title={props.intl.formatMessage({
                    id: 'LinkList.Login',
                    defaultMessage: "Login"
                })}
                headStyle={{
                    fontSize: '1.8em'
                }}
                style={{
                    boxShadow: '0px 0px 2px rgba(48, 48, 48, 0.3)'
                }}>

                <form>
                    <Input 
                        type="email"
                        required
                        size="large" 
                        placeholder="E-mail"
                        prefix={<MailOutlined />} />
                    <Input.Password 
                        size="large" 
                        placeholder={props.intl.formatMessage({
                            id: 'Login.Password',
                            defaultMessage: 'Password'
                        })}
                        prefix={<LockOutlined />}
                        style={{marginTop: "30px"}} />

                    <Button 
                        type="primary" 
                        htmlType="submit"
                        size="large"
                        className={classes.LoginButton}>
                        <FormattedMessage               id='LinkList.Login'
                          defaultMessage="Login"/>
                    </Button>
                </form>

                <div style={{marginTop: '20px'}}>
                    <Link to="/signup">
                        <FormattedMessage 
                            id="Login.CreateNewAccount"
                            defaultMessage="Create new Acount"/>
                    </Link>
                </div>

                <div>
                    <Link to="/recover-password">
                        <FormattedMessage 
                            id="Login.ForgotPassword" 
                            defaultMessage="Forgot your password?" />
                    </Link>
                </div>

            </Card>
        </section>
    )
}

export default injectIntl(Login);