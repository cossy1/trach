import React, {useEffect, useState} from "react";
import {Button, Col, Row, Spin} from "antd";
import TodoForm from "../todoForm/todo";
import {connect} from "react-redux";
import {filterInProgressTodos} from "../../../_shared/hooks";
import CryImage from "../../../utils/svg/cry";
import '.././styles.css';
import {isEmpty} from "lodash";
import {fetchTodos} from "../../../redux/action/todo";


const InProgress = (props) => {
    const { todos, fetchTodos, loading } = props;
    const [onFormVisibility, setFormVisibility] = useState({
        visible: false,
        initialValues: null
    });

    const filterTodos = filterInProgressTodos(todos);

    useEffect(() => {
        fetchTodos();
    }, []);

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
                                    fontWeight: '500', fontSize: '1.8em',  color: '#f6c4bc'}}>
                        In Progress...
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
                    loading ? <Spin  tip={'Loading'} size={'medium'} style={{textAlign: 'center'}} /> : (filterTodos && !isEmpty(filterTodos)) ? filterTodos.map(p => (
                        <p key={p._id} id={'pending'} style={{ background: '#f6c4bc', maxWidth: '1200px', minWidth: '150px'}}>
                             <span style={{color: 'black', overflow: 'hidden',
                                 textOverflow: 'ellipsis', whiteSpace: 'nowrap', float: 'left', minWidth: '100px', width: '145px', padding: '2px'}}>
                            {p.name}
                             </span>
                        </p>
                    )) :  <div id={'cry'}>
                        <CryImage/>
                        <h4>You do not have any todo in Progress yet</h4>
                    </div>
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
    loading: state.ui.loading['fetch-inProgress-todos']
});

const dispatchProps = {
    fetchTodos
};

export default connect(stateProps, dispatchProps)(InProgress);