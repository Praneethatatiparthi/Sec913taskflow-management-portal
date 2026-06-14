import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Tasks from "./pages/Tasks";

import Users from "./pages/Users";

import Workflow from "./pages/Workflow";

import Login from "./pages/Login";

import Profile from "./pages/Profile";

import Signup from "./pages/Signup";

function App() {

  return (

    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/tasks" element={<Tasks />} />

      <Route path="/users" element={<Users />} />

      <Route path="/workflow" element={<Workflow />} />

      <Route path="/profile" element={<Profile />} />

    </Routes>

  );
}

export default App;