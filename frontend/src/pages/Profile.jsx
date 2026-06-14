import MainLayout from "../components/MainLayout";

function Profile() {

  const user =
        JSON.parse(
          localStorage.getItem("user")
        );

  return (

    <MainLayout>

      <h1 className="page-title">

        My Profile

      </h1>

      <div className="card">

        <div
          style={{
            display:"flex",
            alignItems:"center",
            gap:"25px",
            marginBottom:"30px"
          }}
        >

          {/* PROFILE IMAGE */}

          <div
            style={{
              width:"110px",
              height:"110px",
              borderRadius:"50%",
              background:
              "linear-gradient(135deg,#06b6d4,#2563eb)",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              fontSize:"42px",
              fontWeight:"800"
            }}
          >

            {

              user?.email
              ?.charAt(0)
              ?.toUpperCase()

            }

          </div>

          {/* USER DETAILS */}

          <div>

            <h2
              style={{
                fontSize:"32px",
                marginBottom:"10px"
              }}
            >

              {

                user?.email

              }

            </h2>

            <p
              style={{
                color:"#94a3b8",
                fontSize:"18px"
              }}
            >

              TaskFlow System User

            </p>

          </div>

        </div>

        {/* INFO SECTION */}

        <div
          style={{
            display:"grid",
            gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
            gap:"20px"
          }}
        >

          {/* EMAIL */}

          <div className="workflow-card">

            <h3
              style={{
                marginBottom:"15px",
                color:"#22d3ee"
              }}
            >

              Email

            </h3>

            <p>

              {

                user?.email

              }

            </p>

          </div>

          {/* ROLE */}

          <div className="workflow-card">

            <h3
              style={{
                marginBottom:"15px",
                color:"#22d3ee"
              }}
            >

              Role

            </h3>

            <p>

              {

                user?.role

              }

            </p>

          </div>

          {/* STATUS */}

          <div className="workflow-card">

            <h3
              style={{
                marginBottom:"15px",
                color:"#22d3ee"
              }}
            >

              Status

            </h3>

            <p>

              Active User

            </p>

          </div>

        </div>

        {/* LOGOUT BUTTON */}

        <br/><br/>

        <button
          className="delete-btn"
          onClick={()=>{

            localStorage.clear();

            window.location.href="/";

          }}
        >

          Logout

        </button>

      </div>

    </MainLayout>

  );

}

export default Profile;