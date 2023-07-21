import {Link} from "react-router-dom"

export default function DashBoard(){
    return(
       <div>
            <h3>Welcome To The Dashboard</h3>
            <div className="auth-options mt-5 d-flex justify-content-around">
              <Link to="/register"><button className="btn btn-primary">Sign Up</button></Link>
              <Link to ="/login"><button className="btn btn-success">Sign In</button></Link>
           </div>
       </div>
    )
}