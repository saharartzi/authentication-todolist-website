import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ allTodos, setTodosChange, status }) => {

  console.log(allTodos)

  const [filteredTodos, setFilteredTodos] = useState([]);

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setFilteredTodos(filteredTodos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }
  


  const filterHandler = () => {
    if(status!== "" ){
      setFilteredTodos(filteredTodos.filter(todo => {
        return todo.description.toLowerCase().includes(status.toLowerCase());}));
    }
    else{
      setFilteredTodos(allTodos)
    }
}


  useEffect(() => {
    setFilteredTodos(allTodos);
    filterHandler();
  }, [allTodos,status]);

  
  // console.log(todos);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {filteredTodos.length !== 0 &&
            filteredTodos[0].todo_id !== null &&
            filteredTodos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;