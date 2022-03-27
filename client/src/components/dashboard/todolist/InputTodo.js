import React, {Fragment, useState} from 'react';

const InputTodo = ({setTodosChange,status, statusChange}) => {

    const [description, setdescription] = useState("")
    

    const onSubmitForm = async e =>{
        e.preventDefault();
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt_token", localStorage.token)
            const body = {description};
            const response = await fetch("http://localhost:5000/dashboard/todos", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();
            console.log(parseResponse);

            setTodosChange(true);
            setdescription("");
         // window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }
    function statusHandler(e) {
        statusChange(e.target.value);
    }
    return <Fragment>
        <h1 className="text-center mt-5">Pern Todo List</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input type="text" className="form-control" value={description} 
            onChange={e => setdescription(e.target.value)}/>
            <button className="btn btn-success">Add</button>
            <input type="text" placeholder="Search a Todo" className="form-control mx-3" value={status} 
            onChange={statusHandler}/>
            
            
        </form>
    </Fragment>;
};

export default InputTodo;