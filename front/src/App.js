import {  Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Index from "./pages/Index";
import User from "./pages/User";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
      <Router>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route index element={<Index/>}/>
            <Route path={"/user"} element={<User/>}/>
            <Route path={"/create"} element={<CreateTask/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
