import React, {Suspense, useEffect, useState} from 'react';
import SideNav from "./sideNav";
import './styles.css'
import {Button, Col, Dropdown, Layout, Menu, Row} from "antd";
import {Loader} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import trach from '../../assets/images/trach.png'
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import {logOut} from "../../redux/action/auth";
import {connect} from "react-redux";
import {fetchTodos} from "../../redux/action/todo";
import {RoutesNavs} from "./routes";


const { Content } = Layout;

const Home = (props) => {
    const { fetchTodos, allTodos } = props;
    const {logOut} = props;

    const [color, setColor] = useState({
        theme: 'transparent',
        change: false
    });

    const todos = allTodos;

    useEffect(() => {
        fetchTodos();
    }, []);

    const signOut = () => {
        logOut();
    };

    const menu = (
        <Menu>
            <Menu.Item icon={(<span><i className="ri-logout-box-line"/></span>)}>
                <Button type={'link'} onClick={signOut} style={{width: '20px'}} >
                    Sign Out
                </Button>
            </Menu.Item>
        </Menu>
    );

    const allRoutes =  RoutesNavs?.map(({path, component}) =>
        <Route
            path={path}
            exact
            name={"Dashboard"}
            isPrivate
            component={component}
        />
    );

    return(
        <Layout style={{ minHeight: '100vh', color: color.theme === 'transparent' ? 'black' : 'white'}} >
            <SideNav color={color} setColor={setColor} todos={todos}/>
            <Layout className="site-layout" style={{backgroundColor: color?.theme}}>
                <div style={{borderBottom: '1px solid grey'}}>
                    <Row gutter={[16, 24]}>
                        <Col span={12}>
                            <span style={{position: 'absolute', top: '0', color: 'dodgerblue', fontSize: '0.45em'}}>
                            <img src={trach} height={'80px'} alt={'logo'}/>
                            <small style={{color: color.theme === 'transparent' ? 'black' : 'white'}}>
                             ...keep track of your tasks
                            </small>
                             </span>
                        </Col>

                        <Col span={12}>
                            <div className="header" style={{backgroundColor: color.theme === 'transparent' ? 'transparent' : '#141d26'}}>
                                <Dropdown overlay={menu}>
                                    <a href={'/login'} style={{color: color.theme === 'transparent' ? '#141d26' : 'white'}}>
                                        Settings <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>

                </div>

                <Content style={{ margin: '0 16px', textAlign: 'center', color: color.theme }} >
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {allRoutes}
                        </Switch>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

const stateProps = (state) => ({
    loading: state.ui.loading['logout'],
    allTodos: state.todo.byList
});

const dispatchProps = {
    logOut,
    fetchTodos
};

export default connect(stateProps, dispatchProps)(Home);