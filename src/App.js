import React, { Component } from "react";
import "./App.css";
import ModalView from "./Components/ModalView";
import ModalInnerView from "./Components/ModalInnerView";
import FloatingAddButton from "./Components/FloatingAddButton";
import TodoList from "./Components/TodoList";
import TodoFilterButton from "./Components/TodoFilterBtn";
import SearchBox from "./Components/SearchBox";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      title: "",
      description: "",
      allTodos: JSON.parse(localStorage.getItem("todos")) || [],
      showTodoType: "all",
      todoTypes: ["all", "pending", "completed"],
      searchTerm: ""
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

  completedToDo = id => {
    const { allTodos } = this.state;
    const todoIndex = this.state.allTodos.findIndex(todo => todo.id == id);
    allTodos[todoIndex].completed = true;
    this.updateTodo(allTodos);
    this.updateLocalStorage(allTodos);
  };

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

  updateLocalStorage = todoList => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  };

  deleteTodo = id => {
    const newList = this.state.allTodos.filter(todos => todos.id !== id);
    //setting up new list after filtering out
    this.updateLocalStorage(newList);
    this.updateTodo(newList);
  };

  todosToShow = type => {
    this.setState({ showTodoType: type });
  };

  fiilerTodosToShow = type => {
    const { allTodos } = this.state;
    switch (type) {
      case "completed":
        return allTodos.filter(todo => todo.completed === true);
      case "pending":
        return allTodos.filter(todo => todo.completed === false);
      default:
        return allTodos;
    }
  };

  searchTodo = e => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
  };

  filterWithSearchTerm = (searchTerm, todoList) => {
    const pattern = new RegExp(`^.*${searchTerm}.*$`);
    return todoList.filter(item => {
      if (pattern.test(item.title) || pattern.test(item.description)) {
        return item;
      }
    });
  };

  render() {
    const {
      isModalOpen,
      title,
      description,
      showTodoType,
      todoTypes,
      searchTerm
    } = this.state;

    const listOfTodos = this.filterWithSearchTerm(
      searchTerm,
      this.fiilerTodosToShow(showTodoType)
    );

    return (
      <>
        <div className="todo-wrapper">
          <TodoFilterButton
            buttonArray={todoTypes}
            onClick={this.todosToShow}
            btnActive={showTodoType}
          />
          {listOfTodos.length > 1 || searchTerm !== "" ? (
            <SearchBox onChange={this.searchTodo} />
          ) : null}
          <TodoList
            todos={listOfTodos}
            deleteTodo={this.deleteTodo}
            completedToDo={this.completedToDo}
          />
          {!isModalOpen && <FloatingAddButton onClick={this.toggleModal} />}
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
        </div>
      </>
    );
  }
}

export default App;
