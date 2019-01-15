import React from "react";

export default ({ todos, deleteTodo, completedToDo }) => {
  const isEmptyArr = todos.length > 0 ? false : true;
  return (
    <div className="todo-list-container">
      <ul>
        {!isEmptyArr &&
          todos.map((todo, index) => (
            <li className="" key={index}>
             {!todo.completed &&  <button className="completed-todo" onClick={() => completedToDo(todo.id)}>&#10004;</button> }
              <div className={`'font18 ${todo.completed ? 'margin-left' : ''}`}>
                  <p className={`'font18 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</p>
                  <p className={`font14 ${todo.completed ? 'line-through' : ''}`}>{todo.description}</p>
              </div>
              <button className="remove-todo" onClick={() => deleteTodo(todo.id)}>&#10006;</button>
            </li>
          ))}
        {isEmptyArr && <li>No Todos</li>}
      </ul>
    </div>
  );
};
