import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import LoginPage from './components/LoginPage';
import DashBoard from './components/DashBoard';

import AuthForm from './components/AuthForm';


function App() {
  return (
   <BrowserRouter>
   <Routes>
      {/* <Route path ="/register" element = {<RegPage/>}/> */}
      {/* <Route path ="/login" element = {<LoginPage/>}/> */}

      <Route path ="/auth" element = {<AuthForm/>}/>
      <Route path ="/dashboard" element = {<DashBoard/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
