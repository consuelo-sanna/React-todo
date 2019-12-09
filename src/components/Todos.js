import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';


class Todos extends Component {

    

    render(){
        return this.props.todo.map((todo) => (
            <TodoItem key={todo.id} todo={todo} 
                markComplete = {this.props.markComplete} 
                delTodo = {this.props.delTodo}
            />
        ));
        }
}

//validation to make sure the prop has the right type
Todos.propTypes = {
    todo: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default Todos;
