import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../components/MainLayout";

import { getTasks } from "../services/taskService";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {

    fetchTasks();

    const timer = setInterval(() => {

      setTime(
        new Date().toLocaleTimeString()
      );

    },1000);

    return ()=>clearInterval(timer);

  }, []);

  const fetchTasks = async () => {

    try {

      const data = await getTasks();

      setTasks(data);

    } catch(error){

      console.log(error);

    }

  };

  // COUNTS

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task)=>task.status==="PENDING"
  ).length;

  const progressTasks = tasks.filter(
    (task)=>task.status==="IN_PROGRESS"
  ).length;

  const completedTasks = tasks.filter(
    (task)=>task.status==="COMPLETED"
  ).length;

  const completionPercentage =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  return (

    <MainLayout>

      <div style={styles.container}>

        {/* GLOW EFFECTS */}

        <div style={styles.glow1}></div>

        <div style={styles.glow2}></div>

        {/* HERO SECTION */}

        <div style={styles.hero}>

          <div>

            <p style={styles.badge}>
              ⚡ Smart Workflow Analytics
            </p>

            <h1 style={styles.heading}>
              Task Workflow
              <br />
              Portal 🚀
            </h1>

            <p style={styles.subtitle}>
              Manage tasks, monitor productivity,
              and streamline workflows with
              real-time analytics.
            </p>

            {/* BUTTONS */}

            <div style={styles.buttonRow}>

              <button
                style={styles.primaryBtn}

                onClick={()=>
                  navigate("/tasks")
                }
              >
                + Create Task
              </button>

              <button
                style={styles.secondaryBtn}

                onClick={()=>
                  navigate("/users")
                }
              >
                View Reports
              </button>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div style={styles.rightPanel}>

            <div style={styles.liveBox}>
              🟢 System Active
            </div>

            <div style={styles.timeBox}>
              {time}
            </div>

            {/* CIRCLE */}

            <div style={styles.circle}>

              <div style={styles.circleInner}>

                <h1>
                  {completionPercentage}%
                </h1>

                <p>
                  Completed
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div style={styles.cardGrid}>

          <div style={styles.card}>

            <h1 style={styles.number}>
              {totalTasks}
            </h1>

            <p>Total Tasks</p>

          </div>

          <div style={styles.card}>

            <h1 style={styles.number}>
              {pendingTasks}
            </h1>

            <p>Pending</p>

          </div>

          <div style={styles.card}>

            <h1 style={styles.number}>
              {progressTasks}
            </h1>

            <p>In Progress</p>

          </div>

          <div style={styles.card}>

            <h1 style={styles.number}>
              {completedTasks}
            </h1>

            <p>Completed</p>

          </div>

        </div>

        {/* RECENT TASKS */}

        <div style={styles.tableCard}>

          <div style={styles.tableHeader}>

            <h2>
              Recent Tasks
            </h2>

            <span style={styles.analytics}>
              Live Analytics
            </span>

          </div>

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={tableHead}>
                  Task
                </th>

                <th style={tableHead}>
                  Status
                </th>

                <th style={tableHead}>
                  Priority
                </th>

              </tr>

            </thead>

            <tbody>

              {

                tasks.slice(0,5).map((task,index)=>(

                  <tr key={index}>

                    <td style={tableData}>
                      {task.title}
                    </td>

                    <td style={tableData}>

                      <span
                        style={{
                          color:
                            task.status==="COMPLETED"
                            ? "#22c55e"
                            : task.status==="IN_PROGRESS"
                            ? "#06b6d4"
                            : "#facc15"
                        }}
                      >

                        {task.status}

                      </span>

                    </td>

                    <td style={tableData}>

                      <span
                        style={{
                          color:
                            task.priority==="HIGH"
                            ? "#ef4444"
                            : task.priority==="MEDIUM"
                            ? "#facc15"
                            : "#22d3ee"
                        }}
                      >

                        {task.priority}

                      </span>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>

  );

}

// STYLES

const styles = {

  container:{
    minHeight:"100vh",
    background:
      "linear-gradient(to bottom right,#020617,#0f172a,#111827)",
    padding:"40px",
    position:"relative",
    overflow:"hidden",
    color:"#fff"
  },

  glow1:{
    position:"absolute",
    width:"350px",
    height:"350px",
    background:"#7c3aed",
    filter:"blur(140px)",
    top:"-100px",
    left:"-100px",
    opacity:"0.4"
  },

  glow2:{
    position:"absolute",
    width:"300px",
    height:"300px",
    background:"#06b6d4",
    filter:"blur(140px)",
    bottom:"-100px",
    right:"-100px",
    opacity:"0.4"
  },

  hero:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:"50px",
    position:"relative",
    zIndex:"2"
  },

  badge:{
    background:"rgba(255,255,255,0.08)",
    padding:"10px 18px",
    borderRadius:"20px",
    display:"inline-block",
    marginBottom:"25px",
    color:"#22d3ee",
    border:"1px solid rgba(255,255,255,0.08)"
  },

  heading:{
    fontSize:"72px",
    fontWeight:"800",
    lineHeight:"1.1",
    marginBottom:"20px"
  },

  subtitle:{
    color:"#9ca3af",
    fontSize:"18px",
    maxWidth:"600px",
    lineHeight:"1.8"
  },

  buttonRow:{
    display:"flex",
    gap:"20px",
    marginTop:"30px"
  },

  primaryBtn:{
    background:
      "linear-gradient(to right,#7c3aed,#06b6d4)",
    border:"none",
    padding:"15px 30px",
    borderRadius:"15px",
    color:"#fff",
    fontWeight:"700",
    cursor:"pointer",
    fontSize:"16px"
  },

  secondaryBtn:{
    background:"transparent",
    border:"1px solid rgba(255,255,255,0.2)",
    padding:"15px 30px",
    borderRadius:"15px",
    color:"#fff",
    cursor:"pointer",
    fontSize:"16px"
  },

  rightPanel:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:"20px"
  },

  liveBox:{
    background:"rgba(34,197,94,0.15)",
    color:"#22c55e",
    padding:"12px 22px",
    borderRadius:"15px",
    border:"1px solid rgba(34,197,94,0.2)"
  },

  timeBox:{
    background:"rgba(255,255,255,0.06)",
    padding:"15px 30px",
    borderRadius:"20px",
    fontSize:"20px"
  },

  circle:{
    width:"220px",
    height:"220px",
    borderRadius:"50%",
    background:
      `conic-gradient(
        #06b6d4 0% ${75}%,
        rgba(255,255,255,0.08) ${75}% 100%
      )`,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  circleInner:{
    width:"170px",
    height:"170px",
    borderRadius:"50%",
    background:"#0f172a",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },

  cardGrid:{
    display:"grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap:"25px",
    marginBottom:"40px",
    position:"relative",
    zIndex:"2"
  },

  card:{
    background:"rgba(255,255,255,0.05)",
    padding:"35px",
    borderRadius:"25px",
    backdropFilter:"blur(12px)",
    border:"1px solid rgba(255,255,255,0.08)",
    transition:"0.3s",
    boxShadow:"0 0 25px rgba(0,255,255,0.08)"
  },

  number:{
    fontSize:"55px",
    color:"#22d3ee",
    marginBottom:"10px"
  },

  tableCard:{
    background:"rgba(255,255,255,0.05)",
    padding:"30px",
    borderRadius:"25px",
    backdropFilter:"blur(12px)",
    border:"1px solid rgba(255,255,255,0.08)",
    position:"relative",
    zIndex:"2"
  },

  tableHeader:{
    display:"flex",
    justifyContent:"space-between",
    marginBottom:"25px"
  },

  analytics:{
    color:"#22d3ee"
  },

  table:{
    width:"100%",
    borderCollapse:"collapse"
  }

};

const tableHead = {
  textAlign:"left",
  padding:"15px",
  borderBottom:"1px solid #374151",
  color:"#22d3ee"
};

const tableData = {
  padding:"15px",
  borderBottom:"1px solid #1f2937",
  color:"#d1d5db"
};

export default Dashboard;