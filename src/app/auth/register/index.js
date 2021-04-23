import {Button, Col, Dropdown, Form, Input, Row} from "antd";
import {
    UserOutlined,
    LockOutlined, MailOutlined
} from '@ant-design/icons';
import React from "react";
import './register.css';
import {connect} from "react-redux";
import { register } from "../../../redux/action/auth";
import {Link} from "react-router-dom";
import trach from "../../../assets/images/trach.png";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";


const Register = (props) => {
    const [form] = Form.useForm();
    const {loading, register} = props;

    const onFinish = (values) => {
        register(values);
    };

    return(
        <div id={'sign-up-form'}>
       <span id={'sign-up-head'}>
                SIGN UP
       </span>

            <Form
                layout={"vertical"}
                name="signUp"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item style={{color: 'white'}}
                           label="First Name"
                           name="firstName"
                           rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={'Enter first name'} />
                </Form.Item>
                <Form.Item style={{color: 'white'}}
                           label="Last Name"
                           name="lastName"
                           rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={'Enter last name'} />
                </Form.Item>

                <Form.Item style={{color: 'white'}}
                           label="Email"
                           name="email"
                           rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={'Enter email'} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Choose your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder={'Choose password'}/>
                </Form.Item>

                <Form.Item>
                    <div>
                        <Row gutter={[16, 24]}>
                            <Col span={14}>
                            <Button
                                id={'sign-up'}
                                block
                                loading={loading}
                                style={{color: 'white', fontSize: '0.9em',
                                    overflow: 'hidden', textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap', minWidth: '70px', maxWidth: '800px'
                                }}
                                onClick={form.submit}
                            >
                                SIGN UP
                            </Button>
                            </Col>

                            <Col span={10}>
                                <Button
                                    type={'link'}
                                    style={{overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px',
                                        whiteSpace: 'nowrap', fontSize: '0.7em', minWidth: '50px'}}
                                >
                                    <Link to={'/login'}>
                                        Back To Login
                                    </Link>
                                </Button>
                            </Col>
                        </Row>

                    </div>
                </Form.Item>

            </Form>
        </div>
    );
};

const dispatchProps = {
    register
};

const stateProps = (state) => ({
    loading: state.ui.loading['register']
});


export default connect(stateProps, dispatchProps)(Register);