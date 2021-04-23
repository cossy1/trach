import React, {useEffect, useState} from "react";
import {Button, Col, Row, Spin} from "antd";
import TodoForm from "../todoForm/todo";
import CryImage from "../../../utils/svg/cry";
import {filterCompletedTodos} from "../../../_shared/hooks";
import {connect} from "react-redux";
import './../styles.css'
import {isEmpty} from "lodash";
import {fetchTodos} from "../../../redux/action/todo";


const Completed = (props) => {
    const { todos, fetchTodos, loading } = props;

    const [onFormVisibility, setFormVisibility] = useState({
        visible: false,
        initialValues: null
    });

    useEffect(() => {
        fetchTodos();
    }, []);


    const filterTodos = filterCompletedTodos(todos);


    const handleShow = () => {
        setFormVisibility({
            visible: true
        });
    };

    return(
        <>
            <div>
                <header>
                    <Row gutter={[16, 24]}>
                        <Col span={12}>
                            <span
                                style={{justifyContent: 'left', float: 'left',
                                    fontWeight: '500', fontSize: '1.8em', color: 'green'}}>
                        Completed
                    </span>
                        </Col>

                        <Col span={12}>
                            <span
                                style={{justifyContent: 'left', float: 'right', margin: '10px'}}>
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
                    </span>
                        </Col>
                    </Row>

                </header>
            </div>

            <div style={{padding: '50px'}}>
                {
                    loading ? <Spin  tip={'Loading'} size={'medium'} style={{textAlign: 'center'}} /> : (filterTodos && !isEmpty(filterTodos)) ? filterTodos.map(completed => (
                        <p key={completed._id} id={'pending'} style={{background: 'green', maxWidth: '1200px', minWidth: '150px'}}>
                            <span style={{color: 'black', overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                float: 'left', minWidth: '100px', width: '145px', padding: '2px'}}>
                            {completed.name}
                             </span>
                        </p>
                    )) :  <span>
                        <CryImage/>
                        <h4 style={{marginLeft: 'auto', width: '14em', marginRight: 'auto'}}>You do not have a completed todo yet</h4>
                    </span>
                }

            </div>

            <TodoForm
                visible={onFormVisibility.visible}
                onFormVisibility={setFormVisibility}
            />
        </>
    );
};


const stateProps = state => ({
    todos: state.todo.byList,
    loading: state.ui.loading['fetch-completed-todos']
});

const dispatchProps = {
    fetchTodos
};

export default connect(stateProps, dispatchProps)(Completed);
