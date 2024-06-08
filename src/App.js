import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/Login';



function App() {
  return (

    <BrowserRouter> 
      <Routes>
      <Route exact path="/" element={<Signup/>}></Route>
      <Route exact path="/Login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
