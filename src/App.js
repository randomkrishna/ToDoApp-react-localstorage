import React, { Component } from "react";
import "./App.css";
import ModalView from "./Components/ModalView";
import ModalInnerView from "./Components/ModalInnerView";
import FloatingAddButton from "./Components/FloatingAddButton";
import TodoList from "./Components/TodoList";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      title: "",
      description: "",
      allTodos: JSON.parse(localStorage.getItem("todos")) || []
    };
  }

  onTitleChange = title => {
    this.setState({ title });
  };

  onDescChange = description => {
    this.setState({ description });
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  resetData = () => {
    this.setState({ title: "", description: "" });
  };

  completedToDo = (id) => {
    const { allTodos } = this.state;
    const todoIndex = this.state.allTodos.findIndex(todo => todo.id == id);
    allTodos[todoIndex].completed = true;
    this.updateTodo(allTodos);
    this.updateLocalStorage(allTodos);
  }

  addTodo = () => {
    let todosList = [];
    let todoItem = {};
    const { title, description } = this.state;
    if (!title) return;
    //getting previous stored localstorage
    const previousList = JSON.parse(localStorage.getItem("todos"));
    if (previousList !== "" && Array.isArray(previousList)) {
      todosList = [...previousList];
    }
    //generating id based on milliseconds
    const d = new Date();
    const id = d.valueOf();
    todoItem = { id: id, title, description, completed: false };
    todosList.push(todoItem);
    //setting up local storage
    this.updateLocalStorage(todosList);
    //updating state
    this.updateTodo(todosList);
    //clearing state and hiding modal
    this.toggleModal();
    this.resetData();
  };

  updateTodo = allTodos => {
    this.setState({ allTodos });
  };

  updateLocalStorage = (todoList) => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }

  deleteTodo = id => {
    const newList = this.state.allTodos.filter(todos => todos.id !== id);
    //setting up new list after filtering out
    this.updateLocalStorage(newList);
    this.updateTodo(newList);
  };

  render() {
    const { isModalOpen, title, description, allTodos } = this.state;
    console.log(this.state);

    return (
      <>
        <div className="todo-wrapper">
          <div className="todo-filters">
            <button>
              <span>All</span>
            </button>
            <button>
              <span>Pending</span>
            </button>
            <button>
              <span>Completed</span>
            </button>
          </div>

          <TodoList todos={allTodos} deleteTodo={this.deleteTodo} completedToDo={this.completedToDo}/>

          {!isModalOpen && <FloatingAddButton onClick={this.toggleModal} />}
        </div>

        <ModalView isVisible={isModalOpen}>
          <ModalInnerView
            title={title}
            description={description}
            onTitleChange={this.onTitleChange}
            OnDescChange={this.onDescChange}
            add={this.addTodo}
            reset={this.resetData}
            cancel={this.toggleModal}
          />
        </ModalView>
      </>
    );
  }
}

export default App;
