import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import '../pending/styles.css'
import {Button, Col, Modal, Row, Spin} from "antd";
import {
    deleteTask,
    fetchTodo,
    fetchTodos,
    todoStatusUpdate
} from "../../../redux/action/todo";
import { isEmpty } from 'lodash';
import {navigateTo} from "../../../redux/action";
import StatusUpdate from "../status-update";
import TodoActions from "../todo-actions";
import TaskForm from "../todoForm/task";

const SingleTodo = (props) => {
    const {
        todo,
        deleteTask,
        fetchTodos,
        fetchTodo,
        loading,
        match
    } = props;

    const [onFormVisibility, setFormVisibility] = useState({
        taskVisibility: false,
        taskValues: null,
        taskId: null,
        showModal: false
    });
    const id = match?.params?.todoId;

    useEffect(() => {
        fetchTodo(id)
    }, [fetchTodo, id]);

    const afterDelete = (id) => {
        setFormVisibility({
            showModal: false,
            taskId: null
        });
        fetchTodo(id);
        fetchTodos();
    };

    const handleTaskDelete = () => {
        deleteTask(todo?._id, onFormVisibility.taskId, () => afterDelete(todo?._id))
    };

    const handleCancel = () => {
        setFormVisibility({
            showModal: false,
            taskId: null
        })
    };

    const showModal = (taskId) => {
        setFormVisibility({
            showModal: true,
            taskId: taskId
        })
    };

    const showTask = (values, id) => {
        setFormVisibility({
            taskVisibility: true,
            taskId: id,
            taskValues: values
        });
    };

    return(
        <>
            <Row gutter={[16]} style={{marginTop: '15px'}}>
                <Col span={12}>
                    <div
                        style={{textOverflow: 'ellipsis', overflow: 'hidden',
                            fontWeight: '500', fontSize: '20px',
                            color: '#00BFFF', justifyContent: 'left'
                        }}>
                        {todo?.name}
                    </div>
                </Col>
                <Col span={4}>
                    <span
                        style={{justifyContent: 'left', float: 'left', fontWeight: '500', fontSize: '20px', color: '#00BFFF'}}>
                      <StatusUpdate todo={todo}/>
                    </span>
                </Col>

                <Col span={8}>
                    <TodoActions todo={todo}/>
                </Col>

            </Row>

            <div style={{paddingTop: '30px', color: 'black'}}>
                {
                    loading ? <Spin  tip={'Loading'} size={'medium'} style={{textAlign: 'center', paddingTop: '150px'}} />
                    : (todo && !isEmpty(todo?.tasks)) ? todo?.tasks?.map(task => (
                        <>
                            <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                                <Col span={20}>
                                    <p key={task?._id} id={'pending'} style={{ background: '#00BFFF'}}>
                                     <span style={{float: 'left', paddingLeft: '15px'}}>
                                    {task?.description}
                                     </span>
                                    </p>
                                </Col>

                                <Col>
                                    <p style={{width: '100%', margin: '10px'}}>
                                        <Button size={'small'} onClick={() => {
                                            const data = {
                                                description: task?.description
                                            };
                                            showTask(data, task?._id)

                                        }} type={'primary'}>
                                            Edit
                                        </Button>
                                    </p>
                                </Col>

                                <Col>
                                    <p style={{width: '100%', margin: '10px'}}>
                                        <Button
                                            size={'small'}
                                            onClick={() => showModal(task?._id)}
                                            type={'danger'}>
                                            Delete
                                        </Button>
                                    </p>
                                </Col>
                            </Row>
                        </>
                    )) :  (<div>
                        No task added
                    </div>)
                }
            </div>

            <Modal
                title="Delete Task"
                visible={onFormVisibility?.showModal}
                onOk={handleTaskDelete}
                onCancel={handleCancel}
            >
                <p>Sure to delete Task?</p>
            </Modal>

            <TaskForm
                id={todo?._id}
                taskId={onFormVisibility.taskId}
                visible={onFormVisibility?.taskVisibility}
                initialValues={onFormVisibility?.taskValues}
                onFormVisibility={setFormVisibility}
            />

        </>
    );
};

const dispatchProps = {
    todoStatusUpdate,
    deleteTask,
    fetchTodos,
    fetchTodo,
    navigateTo
};

const stateToProps = state => ({
    loading: state?.ui?.loading['fetchTodo'],
    todo: state?.todo?.current,

});

export default connect(stateToProps, dispatchProps)(SingleTodo);
