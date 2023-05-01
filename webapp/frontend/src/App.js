import {BrowserRouter, Routes, Route} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";

import './common/style/style.scss';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/adduser" element={<AddUser />} /> */}
         {/* <Route path="/users/edit/:id" element={<EditUser />} /> */}
         {/* <Route path="/trasa/edit" element={<Edittrasa />} /> */}
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
