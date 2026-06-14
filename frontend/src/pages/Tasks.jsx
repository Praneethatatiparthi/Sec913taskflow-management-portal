import { useEffect, useState } from "react";

import MainLayout from "../components/MainLayout";

import {
  createTask,
  getTasks,
  deleteTask
} from "../services/taskService";

import { getUsers } from "../services/userService";

function Tasks() {
  const currentRole = localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("");

  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {

    fetchTasks();

    fetchUsers();

  }, []);

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const data = await getTasks();

      setTasks(data);

    } catch(error){

      console.log(error);

    }

  };

  // FETCH USERS

  const fetchUsers = async () => {

    try {

      const data = await getUsers();

      setUsers(data);

    } catch(error){

      console.log(error);

    }

  };

  // CREATE TASK

  const handleCreateTask = async () => {

    if(
      !title ||
      !description ||
      !priority ||
      !assignedTo
    ){
      alert("Please fill all fields");
      return;
    }

    const newTask = {

      title,
      description,
      priority,
      assignedTo,
      status:"PENDING"

    };

    try {

      await createTask(newTask);

      fetchTasks();

      setTitle("");
      setDescription("");
      setPriority("");
      setAssignedTo("");

    } catch(error){

      console.log(error);

    }

  };

  // DELETE TASK

  const handleDelete = async (id) => {

    try {

      await deleteTask(id);

      fetchTasks();

    } catch(error){

      console.log(error);

    }

  };

  // UPDATE STATUS

  const handleStatusChange = async (
    id,
    status
  ) => {

    try {

await fetch(
    `http://localhost:8080/api/tasks/${id}/status`,
    {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            status
        })
    }
);

      fetchTasks();

    } catch(error){

      console.log(error);

    }

  };

  return (

    <MainLayout>

      <h1 className="page-title">

        Task Management

      </h1>

      {/* CREATE TASK */}
      {currentRole === "ADMIN" && (

      <div className="card">

        <h3 className="section-title">

          Create Task

        </h3>

        <div className="form-group">

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

        </div>

        <div className="form-group">

          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

        </div>

        <div className="form-row">

          <select
            value={priority}
            onChange={(e)=>setPriority(e.target.value)}
          >

            <option value="">
              Select Priority
            </option>

            <option value="HIGH">
              High
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="LOW">
              Low
            </option>

          </select>

          <select
            value={assignedTo}
            onChange={(e)=>setAssignedTo(e.target.value)}
          >

            <option value="">
              Assign User
            </option>

            {

              users.map((user)=>(

                <option
                  key={user.id}
                  value={user.fullname}
                >

                  {user.fullname}

                </option>

              ))

            }

          </select>

        </div>

        <button
          className="primary-btn"
          onClick={handleCreateTask}
        >

          Create Task

        </button>

      </div>
      )}

      {/* TASK TABLE */}

      <div className="card">

        <h3 className="section-title">

          All Tasks

        </h3>

        <table className="task-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Task</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              tasks.map((task)=>(

                <tr key={task.id}>

                  <td>{task.id}</td>

                  <td>{task.title}</td>

                  <td>

                  <span className={(task.priority || "low").toLowerCase()}>

                      {task.priority}

                    </span>

                  </td>

                  {/* STATUS */}
                  <td>

  <select
    value={task.status}
    onChange={(e)=>
      handleStatusChange(
        task.id,
        e.target.value
      )
    }
  >

    <option value="PENDING">
      PENDING
    </option>

    <option value="IN_PROGRESS">
      IN_PROGRESS
    </option>

    <option value="COMPLETED">
      COMPLETED
    </option>

  </select>

</td>

<td>{task.assignedTo}</td>

<td>

  {currentRole === "ADMIN" && (

    <button
      className="delete-btn"
      onClick={() => handleDelete(task.id)}
    >
      Delete
    </button>

  )}

</td>

                 


                 

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </MainLayout>

  );

}

export default Tasks;