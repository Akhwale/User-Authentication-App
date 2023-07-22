import React, { useState } from "react";
import axios from "axios";

export default function AuthForm(){

    // Setting states

    const [ username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formHeader, setFormHeader] = useState("Login");
    const [toogleText, setToogleText] = useState("First Time User?");
    const [toogleLink, setToogleLink] = useState("Register"); 
    const [responseMessage, setResponseMessage] = useState("");
    
    // submitHandler Function

    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = {
            username, password
        };

// Handle the form submission based on the formMode (signup or login)
if (isLoginMode) {
    
    console.log("isLoggning mode");

       axios.post('http://localhost:5000/user/login', formData) // Replace with your server URL
    .then(response => {
      
      setUsername('');
      setPassword('');
      // setResponseMessage(response.data);
      window.location = `/dashboard?username=${username}`;
      //This response comes from the server when the request is sent
    })
    .catch(error => {
      console.error(error); // Handle any errors
    });



   

  } else {

    console.log("iss submit mode");
    // Perform login logic
    axios.post('http://localhost:5000/user/add', formData)
    .then(response => {
      setUsername('');
      setPassword('');
      setResponseMessage(response.data);
    })
    .catch(error => {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        setResponseMessage(error.response.data);
      } else if (error.request) {
        console.error("No Response:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    });
  
    
   

  }

  // Clear the input fields after submission
  setUsername("");
  setPassword("");



    }
    // clickHandler Function

    const clickHandler = (e)=>{
        e.preventDefault();

        if(isLoginMode){
            setFormHeader("Register");
            setToogleText("Already Have an Account?");
            setToogleLink("Login");
        }
        else{
            setFormHeader("Login");
            setToogleText("First Time User?");
            setToogleLink("Register");
        }

      
       setIsLoginMode((prevMode) => !prevMode);

    }

    return(
        <div className="form-container border shadow-lg p-3 mb-5 bg-white rounded">
            <div className="form-header border-bottom">
                <h3>{formHeader}</h3>
            </div>

            <div className="form-content m-4 text-center">
                <form onSubmit={submitHandler}>
                    <div>
                        <input class="form-control" 
                        type="text" 
                        placeholder="johndoe@gmail.com" 
                        value={username}
                        onChange = {(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className="mt-3">
                    <input class="form-control"
                        type="text"
                        placeholder="password ********!"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="toogle-btn mt-3 text-center">
                    <button type="submit">Submit</button>
                    </div>
                </form>
            </div>

            <div className="toogle-statement text-center">
                <p>{toogleText} <a href="\register" onClick={clickHandler}>{toogleLink}</a></p>
            </div>

            <div className="form-footer border-top">
                <h6>powered by Dev.Akhwale</h6>
               <h3>{responseMessage}</h3> 
               <h3>{username}</h3>
               
            </div>
           
        </div>
    )

}





