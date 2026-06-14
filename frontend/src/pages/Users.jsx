import { useEffect, useState } from "react";

import MainLayout from "../components/MainLayout";

import {
  getUsers,
  deleteUser
} from "../services/userService";

import API from "../services/api";

function Users() {
  const currentRole = localStorage.getItem("role");

  const [users, setUsers] = useState([]);

  const [fullname, setFullname] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");

  useEffect(() => {

    fetchUsers();

  }, []);

  // FETCH USERS

  const fetchUsers = async () => {

    try {

      const data = await getUsers();

      setUsers(data);

    } catch(error){

      console.log(error);

    }

  };

  // CREATE USER

  const handleCreateUser = async () => {

    if(
      !fullname ||
      !email ||
      !password ||
      !role
    ){
      alert("Please fill all fields");
      return;
    }

    try {

      await API.post("/users", {

        fullname,
        email,
        password,
        role,
        status:"ACTIVE"

      });

      fetchUsers();

      setFullname("");
      setEmail("");
      setPassword("");
      setRole("");

    } catch(error){

      console.log(error);

    }

  };

  // DELETE USER

  const handleDelete = async (id) => {

    try {

      await deleteUser(id);

      fetchUsers();

    } catch(error){

      console.log(error);

    }

  };

  return (

    <MainLayout>
      {
  currentRole !== "ADMIN" && (
    <div
      style={{
        color: "red",
        textAlign: "center",
        fontSize: "28px",
        marginBottom: "20px"
      }}
    >
      Access Denied
    </div>
  )
}

      <h1 className="page-title">

        User Management

      </h1>
      {
  currentRole !== "ADMIN" && (
    <div
      style={{
        color:"red",
        textAlign:"center",
        fontSize:"30px",
        marginBottom:"20px"
      }}
    >
      Access Denied
    </div>
  )
}

      {/* CREATE USER */}
      {currentRole === "ADMIN" && (

      <div className="card">

        <h3 className="section-title">

          Create User

        </h3>

        <div className="form-group">

          <input
            type="text"
            placeholder="Enter full name"
            value={fullname}
            onChange={(e)=>setFullname(e.target.value)}
          />

        </div>

        <div className="form-group">

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>

        <div className="form-row">

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >

            <option value="">

              Select Role

            </option>

            <option value="ADMIN">

              Admin

            </option>

            <option value="DEVELOPER">

              Developer

            </option>

            <option value="TESTER">

              Tester

            </option>

          </select>

        </div>

        <button
          className="primary-btn"
          onClick={handleCreateUser}
        >

          Create User

        </button>

      </div>
      )}

      {/* USERS TABLE */}
      {currentRole === "ADMIN" && (

      <div className="card">

        <h3 className="section-title">

          All Users

        </h3>

        <table className="task-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              users.map((user)=>(

                <tr key={user.id}>

                  <td>{user.id}</td>

                  <td>{user.fullname}</td>

                  <td>{user.email}</td>

                  <td>

                    <span className="progress">

                      {user.role}

                    </span>

                  </td>

                  <td>

                    <span className="completed">

                      {user.status}

                    </span>

                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={()=>handleDelete(user.id)}
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>
      )}

    </MainLayout>

  );

}

export default Users;