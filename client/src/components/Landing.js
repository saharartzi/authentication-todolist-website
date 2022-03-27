import React from "react";
import { Link } from "react-router-dom"


const Lending = () => {
    return (
        <div className="jumbotron mt-5">
            <h1>Welcome to Story Hub</h1>
            <p>Sign in and start writing your story</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-primary ml-3">Register</Link>
        </div>
    );
};


export default Lending;