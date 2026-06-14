import { useEffect, useState } from "react";

import MainLayout from "../components/MainLayout";

import { getAllTasks } from "../services/taskService";

function Workflow() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const data = await getAllTasks();

      setTasks(data);

    } catch(error){

      console.log(error);

    }

  };

  // FILTER TASKS

  const pendingTasks = tasks.filter(
    (task)=>task.status==="PENDING"
  );

  const progressTasks = tasks.filter(
    (task)=>task.status==="IN_PROGRESS"
  );

  const completedTasks = tasks.filter(
    (task)=>task.status==="COMPLETED"
  );

  return (

    <MainLayout>

      <h1 className="page-title">

        Workflow Board

      </h1>

      <div className="workflow-board">

        {/* TODO */}

        <div className="workflow-column">

          <h2 className="todo-title">

            TODO

          </h2>

          {

            pendingTasks.map((task)=>(

              <div
                className="workflow-card"
                key={task.id}
              >

                <h3>

                  {task.title}

                </h3>

                <p>

                  {task.description}

                </p>

                <br/>

                <span className="pending">

                  {task.priority}

                </span>

              </div>

            ))

          }

        </div>

        {/* IN PROGRESS */}

        <div className="workflow-column">

          <h2 className="progress-title">

            IN PROGRESS

          </h2>

          {

            progressTasks.map((task)=>(

              <div
                className="workflow-card"
                key={task.id}
              >

                <h3>

                  {task.title}

                </h3>

                <p>

                  {task.description}

                </p>

                <br/>

                <span className="progress">

                  {task.priority}

                </span>

              </div>

            ))

          }

        </div>

        {/* COMPLETED */}

        <div className="workflow-column">

          <h2 className="completed-title">

            COMPLETED

          </h2>

          {

            completedTasks.map((task)=>(

              <div
                className="workflow-card"
                key={task.id}
              >

                <h3>

                  {task.title}

                </h3>

                <p>

                  {task.description}

                </p>

                <br/>

                <span className="completed">

                  {task.priority}

                </span>

              </div>

            ))

          }

        </div>

      </div>

    </MainLayout>

  );

}

export default Workflow;