

// import { Link } from "react-router-dom";
// import axios from "axios";
// import AuthForm from "./AuthForm";



// function LoginPage(){

// const [userName, setUserName] = useState("");
// const [password, setPassword] = useState("");
// const [responseMessage, setResponseMessage] = useState("");

// const submitHandler = (event) => {
//     event.preventDefault()

//     const formData = {
//         userName,
//         password,
//       };

      
//     // Making a POST request to the server using axios
//     axios.post('http://localhost:5000/user/login', formData) // Replace with your server URL
//     .then(response => {
      
//       setUserName('');
//       setPassword('');
//       setResponseMessage(response.data);
//       window.location = '/dashboard'
//       //This response comes from the server when the request is sent
//     })
//     .catch(error => {
//       console.error(error); // Handle any errors
//     });
// };


//     return(
//         <div>
         
//         {/* <h1>Log in</h1>
//                <form onSubmit={submitHandler}>
//             <input  
//             type="text"
//             name="userName"
//             placeholder="userName"
//              value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             />
//             <input type="text"
//             name="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Submit</button>
//             <button className="btn btn-primary">Click Me</button>
//         </form>

//         <h3>Dont have an account? <Link to ="/register">Log In</Link></h3>

//         <h3>{responseMessage}</h3>
//         <h3>{userName}</h3>
//         <h3>{password}</h3> */}
//         </div>
//     )
// }

// export default LoginPage;


import React, { useState } from "react";
import axios from "axios";

export default function AuthForm() {
  // Setting states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formHeader, setFormHeader] = useState("Login");
  const [toogleText, setToogleText] = useState("First Time User?");
  const [toogleLink, setToogleLink] = useState("Register");
  const [responseMessage, setResponseMessage] = useState("");

  // submitHandler Function
  const submitHandler = async (event) => {
    event.preventDefault();
  
    const formData = {
      username,
      password,
    };
  
    console.log(formData); // Temporary check to see if the form data is correct
  
    try {
      if (isLoginMode) {
        const response = await axios.post('http://localhost:5000/user/login', formData);
        console.log(response.data); // Temporary check for the server response
        setResponseMessage(response.data);
        window.location = '/dashboard';
      } else {
        const response = await axios.post('http://localhost:5000/user/add', formData);
        console.log(response.data); // Temporary check for the server response
        setResponseMessage(response.data);
      }
  
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  // clickHandler Function
  const clickHandler = (e) => {
    e.preventDefault();

    if (isLoginMode) {
      setFormHeader("Register");
      setToogleText("Already Have an Account?");
      setToogleLink("Login");
    } else {
      setFormHeader("Login");
      setToogleText("First Time User?");
      setToogleLink("Register");
    }

    setIsLoginMode((prevMode) => !prevMode);

    // Change the URL when the link is clicked
    const newUrl = isLoginMode ? '/register' : '/login';
    window.history.pushState(null, '', newUrl);
  };

  return (
    <div className="form-container border shadow-lg p-3 mb-5 bg-white rounded">
      <div className="form-header border-bottom">
        <h3>{formHeader}</h3>
      </div>

      <div className="form-content m-4 text-center">
        <form onSubmit={submitHandler}>
          <div>
            <input
              
              name="username"
              type="text"
              placeholder="johndoe@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <input
  
              type="password"
              name="password"
              placeholder="password ********!"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


          </div>
          <div className="toogle-btn mt-3 text-center">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div className="toogle-statement text-center">
        <p>
          {toogleText} <a href="/register" onClick={clickHandler}>{toogleLink}</a>
        </p>
      </div>

      <div className="form-footer border-top">
        <h6>powered by Dev.Akhwale</h6>
        <h3>{responseMessage}</h3>
        <h3>{username}</h3>
      </div>
    </div>
  );
}
