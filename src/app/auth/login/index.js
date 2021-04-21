import {Button, Col, Form, Input, Row} from "antd";
import {
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import React from "react";
import './login.css';
import {connect} from "react-redux";
import {login} from "../../../redux/action/auth";
import {Link} from "react-router-dom";

const Login = (props) => {
    const {loading, login} = props;

    const onFinish = (values) => {
        login(values);
    };

    return(
        <div className={'login-form'}>
            <span id={'login-head'}>
                SIGN IN
            </span>
            <Form
                layout={"vertical"}
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={'Enter email'} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder={'Enter password'}/>
                </Form.Item>


                < Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                            <span>
                      <small>Need an Account?</small>
                      <Button
                          style={{color: 'white', padding: '0px', paddingLeft: '2px'}}
                          type={'link'}>
                           <Link to={'/signUp'}>
                          SignUp
                      </Link>
                      </Button>
                  </span>
                    </Col>
                </Row>

                <Form.Item>
                    <Button
                        id={'sign-in'}
                        htmlType="submit"
                        loading={loading}
                        onClick={() => onFinish()}
                    >
                        SIGN IN
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

const dispatchProps = {
    login
};

const stateProps = (state) => ({
    loading: state.ui.loading['login']
});


export default connect(stateProps, dispatchProps)(Login);