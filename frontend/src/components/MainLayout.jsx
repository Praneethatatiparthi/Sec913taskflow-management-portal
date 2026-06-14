import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {

  return (

    <div className="main-container">

      <Sidebar />

      <div className="content-section">

        <Navbar />

        <div className="page-content">

          {children}

        </div>

      </div>

    </div>

  );

}

export default MainLayout;