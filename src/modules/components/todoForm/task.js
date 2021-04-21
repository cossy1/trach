import {Modal, Form, Col, Input, Button} from "antd";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createTask, editTask, fetchTodo, fetchTodos} from "../../../redux/action/todo";

const taskFormProps = {
    id: null,
    taskId: null,
    visible: false,
    initialValues: {},
    onFormVisibility: ({
            visible: false,
            initialValues: {}
        }
    )
};


const TaskForm = (props = taskFormProps) => {
    const [form] = Form.useForm();
    const {
        visible,
        fetchTodos,
        fetchTodo,
        hasData,
        onFormVisibility,
        initialValues,
        loading,
        createTask,
        editTask,
        id,
        taskId
    } = props;

    const onCancel = () => {
        form.resetFields();
        onFormVisibility({
            visible: false,
        });
        fetchTodos();
        fetchTodo(id);
    };

    useEffect(() => {
        if(!hasData){
            fetchTodos();
        }
    }, []);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues)
        }
    }, [initialValues]);

    const title = initialValues ? "Update Task" : "Add Task";

    const handleSubmit = (values) => {
        if(initialValues){
            editTask(values, id, taskId, onCancel);
        }
        else {
            createTask(values, id, onCancel);
        }
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
                            onClick={form.submit}
                        >
                            {title}
                        </Button>
                    </div>
                }
            >
                <Form
                    layout="vertical"
                    name={'taskForm'}
                    onFinish={handleSubmit}
                    form={form}
                    initialValues={initialValues ? initialValues : defaultInitialValues}
                >

                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            required={true}
                            rules={[{ required: true, message: 'Please enter description' }]}
                        >
                            <Input placeholder={'Enter description'} />
                        </Form.Item>
                    </Col>

                </Form>
            </Modal>
        </div>
    );
};

const stateProps = (state) => ({
    loading: state.ui.loading['taskForm'],
    hasData: state.todo.byList
});

const dispatchProps = {
    createTask,
    editTask,
    fetchTodos,
    fetchTodo
};

export default connect(stateProps, dispatchProps)(TaskForm);