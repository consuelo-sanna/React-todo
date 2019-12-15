import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import About from './components/pages/About';
import AddTodo from './components/AddTodo';
import axios from 'axios';

class App extends Component {
  state= {
    todos:[]
  }

  
  componentDidMount(){
    axios.get('https://afternoon-thicket-04912.herokuapp.com/todoData.html')
      .then(res => this.setState({ todos: res.data }))
  }
 
  markComplete = (id) => { 
    axios.put('https://afternoon-thicket-04912.herokuapp.com/todoData.html',{
      data: id
    })
    .then(res => console.log(res.data));
      this.setState ({ todos:this.state.todos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo;
      }) });
  }

  delTodo = (id) => {
    axios.delete(`https://afternoon-thicket-04912.herokuapp.com/todoData.html`, {
      data: id
    })
    .then ( res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }
    
  

  addTodo = (title) => {
    console.log(this.state.todos);
    axios.post('https://afternoon-thicket-04912.herokuapp.com/todoData.html', {
      title: title,
      completed: false
    })
    .then(res => {
      res.data.id = this.state.todos.length + 1;
      this.setState({ todos: [...this.state.todos, res.data] })});
    
  }

 
  
  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                  <AddTodo addTodo={this.addTodo }/>
                  <Todos todo={this.state.todos} 
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
              </React.Fragment>
            )} />
            <Route path="/about" component={About}>

            </Route>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
