import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";



export default class TodoList extends React.Component {
  state = {
    todos: [],
    todoToShow: "Kõik",
    toggleAllComplete: true
  };

  addTodo = todo => {
    this.setState(state => ({
      todos: [todo, ...state.todos]
    }));
  };

  toggleComplete = id => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          // suppose to update
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    }));
  };

  updateTodoToShow = s => {
    this.setState({
      todoToShow: s
    });
  };

  handleDeleteTodo = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  removeAllTodosThatAreComplete = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.complete)
    }));
  };

  render() {
    let todos = [];

    if (this.state.todoToShow === "Kõik") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "Tegemata") {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todoToShow === "Tehtud") {
      todos = this.state.todos.filter(todo => todo.complete);
    }

    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map(todo => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
          />
        ))}
        <div>
          <br></br>
          Nimekirjas: {this.state.todos.filter(todo => !todo.complete).length}
          <br></br>
          
        </div>
        <div>
          <button onClick={() => this.updateTodoToShow("Kõik")}>Kõik</button>
          <button onClick={() => this.updateTodoToShow("Tegemata")}>
            Tegemata
          </button>
          <button onClick={() => this.updateTodoToShow("Tehtud")}>
            Tehtud
          </button>
        </div>
        {this.state.todos.some(todo => todo.complete) ? (
          <div>
            <button onClick={this.removeAllTodosThatAreComplete}>
              Kustuta kõik tehtud tegevused
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() =>
              this.setState(state => ({
                todos: state.todos.map(todo => ({
                  ...todo,
                  complete: state.toggleAllComplete
                })),
                toggleAllComplete: !state.toggleAllComplete
              }))
            }
          >
            Näita kõiki tehtud tegevusi: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}