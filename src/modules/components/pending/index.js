import React, {useEffect, useState} from "react";
import {Button, Spin} from "antd";
import CryImage from "../../../utils/svg/cry";
import {connect} from "react-redux";
import {filterPendingTodos} from "../../../_shared/hooks";
import {isEmpty} from 'lodash';
import './styles.css';
import TodoForm from "../todoForm/todo";
import {fetchTodos} from "../../../redux/action/todo";


const Pending = (props) => {
    const { todos, fetchTodos, loading } = props;

    const filterTodos = filterPendingTodos(todos);

    const [onFormVisibility, setFormVisibility] = useState({
        visible: false,
        initialValues: null
    });

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleShow = () => {
        setFormVisibility({
            visible: true,
            initialValues: null
        });
    };

    return(
        <>
            <div>
                <header>
                    <span
                        style={{justifyContent: 'left', float: 'left', fontWeight: '500', fontSize: '40px', color: '#00BFFF'}}>
                        Pending...
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
                    loading ? <Spin  tip={'Loading'} size={'medium'} style={{textAlign: 'center', paddingTop: '150px'}} />
                        : (filterTodos && !isEmpty(filterTodos)) ? filterTodos.map(pending => (
                            <p key={pending._id} id={'pending'} style={{background: '#00BFFF'}}>
                       <span style={{float: 'left', paddingLeft: '15px', color: 'black'}}>
                            {pending.name}
                       </span>
                            </p>
                        )) :  <div id={'cry'}>
                            <CryImage/>
                            <h4 style={{color: 'black'}}>You do not have a pending todo yet</h4>
                        </div>
                }
            </div>

            <TodoForm
                visible={onFormVisibility?.visible}
                onFormVisibility={setFormVisibility}
            />

        </>
    );
};

Pending.defaultProps = {};

const stateProps = state => ({
    todos: state.todo.byList,
    loading: state.ui.loading['fetch-pending-todos']
});

const dispatchProps = {
    fetchTodos
};

export default connect(stateProps, dispatchProps)(Pending);