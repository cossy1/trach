import {Dropdown, Menu} from "antd";
import React, {useEffect} from "react";
import {fetchTodo, fetchTodos, todoStatusUpdate} from "../../../redux/action/todo";
import {connect} from "react-redux";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";

const StatusUpdate = (props) => {
    const {
        todoStatusUpdate,
        fetchTodo,
        fetchTodos,
        todo
    } = props;

    const afterDelete = () => {
        fetchTodo(todo?.id);
        fetchTodos();
    };

    const OnClick = ({ key }) => {
        todoStatusUpdate(key, todo?._id, () => afterDelete(todo?._id));
    };

    const menu = (
        <Menu onClick={OnClick}>
            <Menu.Item style={{backgroundColor: '#00BFFF', color: 'white'}} key="Pending">Pending</Menu.Item>
            <Menu.Item style={{backgroundColor: '#f6c4bc', color: 'white'}} key="Progress">In Progress</Menu.Item>
            <Menu.Item style={{backgroundColor: 'green', color: 'white'}} key="Completed">Completed</Menu.Item>
        </Menu>
    );
    return(
        <>
            <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}>
                    {todo?.status ?? 'Set status'} <DownOutlined />
                </a>
            </Dropdown>
        </>
    );
};

const dispatchProps = {
    fetchTodo,
    fetchTodos,
    todoStatusUpdate
};

const stateProps = state => ({
    loading: state.ui.loading['todoStatusUpdate']
});

export default connect(stateProps, dispatchProps)(StatusUpdate);