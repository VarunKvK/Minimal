import {  BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Index from "./pages/Index";
import User from "./pages/User";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";

axios.defaults.baseURL="http://localhost:8000"
axios.defaults.withCredentials=true

function App() {
  return (
      <Router>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route index element={<Index/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/user"} element={<User/>}/>
            <Route path={"/create"} element={<CreateTask/>}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
