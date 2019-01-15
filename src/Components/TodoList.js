import React from "react";

export default ({ todos, deleteTodo, completedToDo }) => {
  const isEmptyArr = todos.length > 0 ? false : true;
  return (
    <div className="todo-list-container">
      <ul>
        {!isEmptyArr &&
          todos.map((todo, index) => (
            <li className="">
              <button className="completed-todo" onClick={() => completedToDo(todo.id)}>&#10004;</button>
              <div>
                  <p className="font18">{todo.title}</p>
                  <p className="font14">{todo.description}</p>
              </div>

              <button className="remove-todo" onClick={() => deleteTodo(todo.id)}>&#10006;</button>
            </li>
          ))}
        {isEmptyArr && <li>No Todos</li>}
      </ul>
    </div>
  );
};
