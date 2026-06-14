import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

const role = localStorage.getItem("role");

const menus = [
  {
    name:"Dashboard",
    path:"/dashboard"
  },

  {
    name:"Tasks",
    path:"/tasks"
  },

  ...(role === "ADMIN"
    ? [{
        name:"Users",
        path:"/users"
      }]
    : []),

  {
    name:"Workflow",
    path:"/workflow"
  },

  {
    name:"Profile",
    path:"/profile"
  }
];

  return (

    <div className="sidebar">

      <h1 className="logo">

        TaskFlow

      </h1>

      <ul>

        {

          menus.map((menu,index)=>(

            <Link
              to={menu.path}
              key={index}
              className={
                location.pathname===menu.path
                ?
                "active-link"
                :
                "nav-link"
              }
            >

              <li>

                {menu.name}

              </li>

            </Link>

          ))

        }

      </ul>

    </div>

  );

}

export default Sidebar;