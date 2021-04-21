import React, {useEffect, useState} from "react";
import {Button, Spin} from "antd";
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
                    <span
                        style={{justifyContent: 'left', float: 'left', fontSize: '40px', fontWeight: '500', color: 'green'}}>
                        Completed
                    </span>
                    <span
                        style={{justifyContent: 'left', float: 'right', margin: '15px'}}>
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
                </header>
            </div>

            <div style={{padding: '100px'}}>
                {
                    loading ? <Spin  tip={'Loading'} size={'medium'} style={{textAlign: 'center', paddingTop: '150px'}} /> : (filterTodos && !isEmpty(filterTodos)) ? filterTodos.map(completed => (
                        <p key={completed._id} id={'pending'} style={{background: 'green'}}>
                             <span style={{float: 'left', paddingLeft: '15px', color: 'black'}}>
                            {completed.name}
                             </span>
                        </p>
                    )) :  <div id={'cry'}>
                        <CryImage/>
                        <h4>You do not have a completed todo yet</h4>
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
    loading: state.ui.loading['fetch-completed-todos']
});

const dispatchProps = {
    fetchTodos
};

export default connect(stateProps, dispatchProps)(Completed);
