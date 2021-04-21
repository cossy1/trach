import {connect} from "react-redux";
import {Button, Dropdown, Modal} from "antd";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import React, {useState} from "react";
import Menu from "antd/es/menu";
import {deleteTodo, fetchTodos} from "../../../redux/action/todo";
import TodoForm from "../todoForm/todo";
import TaskForm from "../todoForm/task";

const TodoActions = (props) => {
    const {
        deleteTodo,
        fetchTodos,
        todo

    } = props;

    const [onFormVisibility, setFormVisibility] = useState({
        visible: false,
        initialValues: null,
        taskVisibility: false,
        taskValues: null,
        taskId: null,
        showModal: false
    });

    const showTask = () => {
        setFormVisibility({
            taskVisibility: true,
            taskValues: null
        });
    };

    const handleShow = (values) => {
        if(values){
            setFormVisibility(
                {
                    visible: true,
                    initialValues: values,
                }
            );
        }
        else {
            setFormVisibility({
                visible: true,
                initialValues: null
            });
        }
    };

    const handleModalShow = () => {
        setFormVisibility({
            showModal: true
        });
    };

    const handleDelete = () => {
        deleteTodo(todo?._id);
    };

    const handleCancel = () => {
        setFormVisibility({
            showModal: false
        });
        fetchTodos();
    };

    const actions = (
        <Menu>
            <Menu.Item>
                <Button
                    type={'primary'}
                    block
                    icon={
                        <span className={'anticon'}>
                        <i className="ri-add-line" />
                         </span>
                    }
                    onClick={() => showTask()}
                >
                    Add Task
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button
                    block
                    icon={
                        <span className={'anticon'}>
                        <i className="ri-add-line" />
                         </span>
                    }
                    onClick={() => {
                        const data = {
                            name: todo?.name,
                            description: todo?.description,
                            id: todo?._id
                        };
                        handleShow(data)
                    }}
                >
                    Edit Todo
                </Button>

            </Menu.Item>
            <Menu.Item>
                <Button
                    type={'danger'}
                    block
                    onClick={handleModalShow}
                >
                    Delete Todo
                </Button>
            </Menu.Item>
        </Menu>
    );


    return(
        <>
            <Dropdown overlay={actions}>
                <a className="ant-dropdown-link">
                    <b> Actions</b> <DownOutlined />
                </a>
            </Dropdown>

            <Modal
                title="Delete Todo"
                visible={onFormVisibility?.showModal}
                onOk={() => handleDelete(todo?._id)}
                onCancel={handleCancel}
            >
                <p>Sure to delete Todo?</p>
            </Modal>

            <TodoForm
                visible={onFormVisibility?.visible}
                onFormVisibility={setFormVisibility}
                initialValues={onFormVisibility?.initialValues}
            />

            <TaskForm
                id={todo?._id}
                visible={onFormVisibility.taskVisibility}
                onFormVisibility={setFormVisibility}
            />
        </>
    );
};

const dispatchProps = {
    deleteTodo,
    fetchTodos
};

const stateProps = state => ({
    loading: state.ui.loading['TodoActions'],
});

export default connect(stateProps, dispatchProps)(TodoActions);