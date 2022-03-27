import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components
import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodo";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, satAllTodos] = useState([]);
  const [todosChange,setTodosChange] = useState(false)
  const [status, setStatus] = useState("");
  
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      satAllTodos(parseData);
      // console.log(parseData)
      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  
  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange,status]);

  


  return (
    <div>
      <div className="d-flex mt-5 justify-content-around"><h2>{name} 's Todo List</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
      </div>
      
      <InputTodo setTodosChange={setTodosChange} status={status} statusChange={setStatus}/>
      <ListTodos setTodosChange={setTodosChange} allTodos={allTodos}  status={status} />
    </div>
  );
};

export default Dashboard;
