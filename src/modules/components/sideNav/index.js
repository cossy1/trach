import {Button, Layout, Menu} from 'antd';
import 'antd/dist/antd.css'
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {fetchTodo} from "../../../redux/action/todo";
import {connect} from "react-redux";
import {navigateTo} from "../../../redux/action";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = ({color, setColor, todos, fetchTodo}) => {
    const [mode, setMode] = useState({
        darkMode: false,
        color: 'black',
        theme: 'light',
        text: 'Dark Mode',
        icon: (<span className={'anticon'}><i className="ri-sun-line"/></span>)
    });
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const onSetMode = () => {
        setMode({
                darkMode: !mode?.darkMode,
                color: mode?.darkMode ? 'black' : 'ghostwhite',
                theme: mode?.darkMode ? 'light' : 'dark',
                text: mode?.darkMode ? 'Dark Mode' : 'Light Mode',
                icon: mode?.darkMode ? (<span className={'anticon'}><i className="ri-moon-line"/></span>)
                    : (<span className={'anticon'}><i className="ri-sun-line"/></span>)
            },
        );
        setColor({
            change: !color?.change,
            theme: color?.change ? 'transparent' : '#141d26'
        })
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme={mode?.theme}>

            <Menu theme={mode?.theme} defaultSelectedKeys={['1']} mode="inline">
                <SubMenu key="sub1" icon= {(<span className={'anticon'}>
                            <i className="ri-time-line"/></span>)} title="TODOS" >
                    {
                        todos?.map(todo => (
                            <Menu.Item key={todo?._id}>
                                <Button
                                    type={'link'}
                                    onClick={() => fetchTodo(todo?._id)}
                                >
                                    {todo?.name}
                                </Button>
                            </Menu.Item>
                        ))
                    }

                </SubMenu>
                <Menu.Item key="2" icon= {(<span className={'anticon'}>
                            <i className="ri-anticlockwise-fill"/></span>)}>
                    <Link to={'/dashboard/todos/pending'} style={{color: mode?.color}}>
                        Pending
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon= {(<span className={'anticon'}>
                           <i className="ri-checkbox-blank-circle-line"/></span>)}>
                    <Link to={'/dashboard/todos/in-progress'} style={{color: mode?.color}}>
                        In Progress
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon= {(<span className={'anticon'}>
                            <i className="ri-checkbox-circle-line"/></span>)}>
                    <Link to={'/dashboard/todos/completed'} style={{color: mode?.color}}>
                        Completed
                    </Link>
                </Menu.Item>
                <Menu.Item key="5" icon= {(<span className={'anticon'}>
                            <i className="ri-file-list-fill"/></span>)}>
                    <Link to={'/dashboard/todos'} style={{color: mode?.color}}>
                        All Todos
                    </Link>
                </Menu.Item>
                <Menu.Item key="mode" icon= {mode.icon} onClick={onSetMode}  >
                    <Button type={'link'} onClick={onSetMode} style={{color: mode?.color}}>
                        {mode?.text}
                    </Button>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

const stateProps = state => ({
    todo: state.todo.byList
});

const dispatchProps = {
    fetchTodo,
    navigateTo
};

export default connect(stateProps, dispatchProps)(SideNav);