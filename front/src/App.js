import {  Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Index from "./pages/Index";
import User from "./pages/User";
import CreateTask from "./pages/CreateTask";

function App() {
  return (
      <Router>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route index element={<Index/>}/>
            <Route path={"/user"} element={<User/>}/>
            <Route path={"/create"} element={<CreateTask/>}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
