import {Modal, Form, Col, message, Input, Button} from "antd";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createTodo, fetchTodo, fetchTodos, updateTodo} from "../../../redux/action/todo";

const todoFormProps = {
    visible: false,
    initialValues: {},
    onFormVisibility: ({
        visible: false,
        initialValues: {}
    })
};


const TodoForm = (props = todoFormProps) => {
    const [form] = Form.useForm();
    const {
        visible,
        onFormVisibility,
        initialValues,
        updatingTodo,
        creatingTodo,
        hasData,
        createTodo,
        updateTodo,
        fetchTodo,
        fetchTodos
    } = props;

    const loading = initialValues ? updatingTodo : creatingTodo;

    useEffect(() => {
        if(!hasData){
            fetchTodos();
            fetchTodo();
        }
    }, []);

    const onCancel = () => {
        form.resetFields();
        onFormVisibility({
            visible: false,
        });
        fetchTodos();
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues)
        }
    }, [initialValues]);

    const title = initialValues ? "Update Todo" : "Create Todo";

    const handleSubmit = (values) => {
        if(initialValues){
            updateTodo(initialValues?.id, values, onCancel());
        }
        else {
            createTodo(values, onCancel);
        }

        if (!initialValues) {
            message.loading({
                content: 'Creating todo...',
                key: 'creating todo',
            });
        }

        if (initialValues) {
            message.loading({
                content: 'Updating todo...',
                key: 'updating todo',
            });
        }
        form.resetFields();
        onFormVisibility({
            visible: false,
        });
        fetchTodos();
        fetchTodo(initialValues?.id);

    };

    const defaultInitialValues = {
        name: undefined,
        description: undefined
    };
    return(
        <div style={{padding: 10}}>
            <Modal
                title={title}
                destroyOnClose={true}
                onCancel={() => onCancel()}
                keyboard={false}
                visible={visible}
                closable={true}
                width={'40%'}
                footer={
                    <div>
                        <Button
                            type="primary"
                            loading={loading}
                            htmlType="submit"
                            block
                            disabled={loading}
                            onClick={form.submit}
                        >
                            {title}
                        </Button>
                    </div>
                }
            >
                <Form
                    layout="vertical"
                    name={'todoForm'}
                    onFinish={handleSubmit}
                    form={form}
                    initialValues={initialValues ? initialValues : defaultInitialValues}
                >

                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Title"
                            required={true}
                            rules={[{ required: true, message: 'Please enter title' }]}
                        >
                            <Input placeholder={'Enter title'} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter description' }]}>
                            <Input.TextArea  autoSize={true} placeholder={'Enter description'} />
                        </Form.Item>
                    </Col>
                </Form>
            </Modal>
        </div>
    );
};

const stateProps = (state) => ({
    creatingTodo: state.ui.loading['creatingTodo'],
    updatingTodo: state.ui.loading['updatingTodo'],
    hasData: state.todo.byList
});

const dispatchProps = {
    createTodo, updateTodo, fetchTodo, fetchTodos
};

export default connect(stateProps, dispatchProps)(TodoForm);