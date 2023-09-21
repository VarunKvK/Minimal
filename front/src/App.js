import { useContext } from "react";
import {  BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Index from "./pages/Index";
import User from "./pages/User";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import UserContextProvider, { UserContext } from "./UserContext";
import Faq from "./pages/Faq";
import TaskPage from "./pages/TaskPage";

axios.defaults.baseURL="http://localhost:8000"
axios.defaults.withCredentials=true

function App() {
  const {user}=useContext(UserContext)
  return (
    <UserContextProvider>  
      <Router>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route index element={<Index/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={!user ? "/user":null} element={<User/>}/>
            <Route path={"/:username/:id"} element={<User/>}/>
            <Route path={"/create"} element={<CreateTask/>}/>
            <Route path={"/task/:userId/:id"} element={<TaskPage/>}/>
            <Route path={"/editTask/:title/:id"} element={<CreateTask/>}/>
            <Route path={"/faq"} element={<Faq/>}/>
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
