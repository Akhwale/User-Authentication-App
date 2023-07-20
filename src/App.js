import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import RegPage from './components/regPage';
import LogPage from './components/logPage';
import DashBoard from './components/dashboard';

function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path ="/register" element = {<RegPage/>}/>
      <Route path ="/login" element = {<LogPage/>}/>
      <Route path ="/dashboard" element = {<DashBoard/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
