import {Button, Col, Modal, Row, Space, Spin, Table} from 'antd';
import React, {useEffect, useState} from "react";
import {deleteTodo, fetchTodos} from "../../../redux/action/todo";
import {connect} from "react-redux";
import TodoForm from "../todoForm/todo";
import {navigateTo} from "../../../redux/action";
import {isEmpty} from 'lodash';
import CryImage from "../../../utils/svg/cry";

const AllTodos = (props) => {
    const {
        fetchTodos,
        todos,
        loading,
        navigateTo,
        deleteTodo
    } = props;

    const [onFormVisibility, setFormVisibility] = useState({
        showDelete: false,
        showEdit: false,
        initValues: null,
        todoId: null
    });
    const [show, setShow] = useState({
        visible: false,
        initialValues: null
    });

    useEffect(() => {
        fetchTodos();
    }, []);

    const showEdit = (data) => {
        setFormVisibility({
            showEdit: true,
            initValues: data
        });
    };

    const handleView = (id) => {
        navigateTo(`/dashboard/todos/${id}`);
    };

    const handleDelete = () => {
        deleteTodo(onFormVisibility.todoId, handleCancel);
    };

    const handleShowDelete = (id) => {
        setFormVisibility({
            showDelete: true,
            todoId: id
        });
    };

    const handleCancel = () => {
        setFormVisibility({
            showDelete: false
        })
    };

    const columns  = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'No of Tasks',
            dataIndex: 'taskNo',
            key: 'taskNo',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'action',
            sorter: false,
            render: (todo) => (
                <Space size="middle">
                    <Row gutter={16}>
                        < Col>
                            <Button type={'link'} onClick={() => {
                                const data = {
                                    name: todo.name,
                                    description: todo.description,
                                    id: todo?._id
                                };
                                showEdit(data)
                            }}>
                                <i className="ri-pencil-line"/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type={'link'} onClick={() => handleView(todo?._id)}>
                                <i className="ri-eye-2-line"/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type={'link'} onClick={() => handleShowDelete(todo?._id)}>
                                <i className="ri-delete-bin-line"/>
                            </Button>
                        </Col>
                    </Row>
                </Space>
            ),
        },
    ];

    const dataSource = todos.map(todo => {
        const name = todo?.name;
        const status = todo?.status;
        const description = todo?.description;
        const taskNo = todo?.tasks?.length;

        return{
            ...todo,
            name,
            status,
            description,
            taskNo
        }
    });

    const handleShow = () => {
        setShow({
            visible: true,
            initialValues: null
        });
    };

    return(
        <>
            {
                loading ? <Spin  tip={'Loading'} size={'medium'} style={{textAlign: 'center', paddingTop: '150px'}} /> :
                    (todos && !isEmpty(todos)) ?  <Table columns={columns} dataSource={dataSource} /> :  <div id={'cry'}>
                        <CryImage/>
                        <h4 style={{color: 'black'}}>You do not have any todos</h4>
                        <Button
                            type={'primary'}
                            onClick={() => handleShow()}
                            icon={
                                <span className={'anticon'}>
                                <i className="ri-add-line" />
                              </span>
                            }
                        >
                            Create Todo
                        </Button>
                    </div>

            }

            <TodoForm
                visible={onFormVisibility?.showEdit}
                initialValues={onFormVisibility?.initValues}
                onFormVisibility={setFormVisibility}
            />

            <Modal
                title="Delete Todo"
                visible={onFormVisibility?.showDelete}
                onOk={handleDelete}
                onCancel={handleCancel}
            >
                <p>Sure to delete Task?</p>
            </Modal>

            <TodoForm
                visible={show?.visible}
                onFormVisibility={setShow}
            />
        </>
    );
};

const stateProps = state => ({
    loading: state.ui.loading['allTodos'],
    todos: state.todo.byList
});

const dispatchProps = {
    fetchTodos,
    navigateTo,
    deleteTodo
};

export default connect(stateProps, dispatchProps)(AllTodos);