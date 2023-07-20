import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LogPage(){

const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [responseMessage, setResponseMessage] = useState("");

const submitHandler = (event) => {
    event.preventDefault()

    const formData = {
        userName,
        password,
      };

      
    // Making a POST request to the server using axios
    axios.post('http://localhost:5000/user/login', formData) // Replace with your server URL
    .then(response => {
      
      setUserName('');
      setPassword('');
      setResponseMessage(response.data);
      window.location = '/dashboard'
      //This response comes from the server when the request is sent
    })
    .catch(error => {
      console.error(error); // Handle any errors
    });
};


    return(
        <div>

        <h1>Log in</h1>
               <form onSubmit={submitHandler}>
            <input  
            type="text"
            name="userName"
            placeholder="userName"
             value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
            <input type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>

        <h3>Dont have an account? <Link to ="/register">Log In</Link></h3>

        <h3>{responseMessage}</h3>
        <h3>{userName}</h3>
        <h3>{password}</h3>
        </div>
    )
}

export default LogPage;