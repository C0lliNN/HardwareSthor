import React from 'react'
import classes from './Signup.module.css'
import { Card, Input, Button, Row, Col } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import MailOutlined from '@ant-design/icons/MailOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import HomeOutlined from '@ant-design/icons/HomeOutlined'

const Singup = props => {

    return (
        <section className={classes.Signup}>
            <Card 
                title={props.intl.formatMessage({
                    id: 'Signup.Signup',
                    defaultMessage: "Sign up"
                })}
                headStyle={{
                    fontSize: '1.8em',
                    textAlign: 'center'
                }}
                style={{
                    boxShadow: '0px 0px 2px rgba(48, 48, 48, 0.3)'
                }}>

                <form>

                    <Row align="middle" justify="space-between">
                        <Col xs={24} md={12}>
                            <Input 
                                size="large" 
                                placeholder={props.intl.formatMessage({
                                    id: 'Signup.Name',
                                    defaultMessage: "Name"
                                })}
                                prefix={<UserOutlined />}
                                style={{marginTop: "20px"}}  />
                        </Col>
                        <Col xs={24} md={11}>
                            <Input 
                                size="large" 
                                placeholder={props.intl.formatMessage({
                                    id: 'Signup.LastName',
                                    defaultMessage: "Last Name"
                                })}
                                prefix={<UserOutlined />}
                                style={{marginTop: "20px"}}  />
                        </Col>
                    </Row>

                    <Input 
                        size="large"
                        placeholder="E-mail"
                        prefix={<MailOutlined />}
                        style={{marginTop: '20px'}}/>
                    
                    <Input.Password 
                        size="large" 
                        placeholder={props.intl.formatMessage({
                            id: 'Login.Password',
                            defaultMessage: 'Password'
                        })}
                        prefix={<LockOutlined />}
                        style={{marginTop: "20px"}} />
                    
                    <Input.Password 
                        size="large" 
                        placeholder={props.intl.formatMessage({
                            id: 'Signup.ConfirmPassword',
                            defaultMessage: 'Confirm Password'
                        })}
                        prefix={<LockOutlined />}
                        style={{marginTop: "20px"}} />

                    <Input 
                        size="large"
                        placeholder={props.intl.formatMessage({
                            id: 'Signup.PostalCode',
                            defaultMessage: 'Postal Code'
                        })}
                        prefix={<HomeOutlined />}
                        style={{marginTop: '20px'}}/>
                    
                    <Row justify="space-between">
                        <Col xs={24} md={16}>
                            <Input 
                                size="large"
                                placeholder={props.intl.formatMessage({
                                    id: 'Signup.Street',
                                    defaultMessage: 'Street'
                                })}
                                prefix={<HomeOutlined />}
                                style={{marginTop: '20px'}}/>    
                        </Col>

                        <Col  xs={24} md={7}>
                            <Input 
                                size="large"
                                placeholder={props.intl.formatMessage({
                                    id: 'Signup.Number',
                                    defaultMessage: 'Number'
                                })}
                                prefix={<HomeOutlined />}
                                style={{marginTop: '20px'}}/>
                        </Col>
                    </Row>

                    <Button 
                        type="primary" 
                        size="large"
                        className={classes.LoginButton}>
                        <FormattedMessage 
                            id='Signup.Signup' 
                            defaultMessage="Sign Up"/>
                    </Button>
                </form>
            </Card>
        </section>
    )
}

export default injectIntl(Singup);