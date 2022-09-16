import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/sentry");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role) {
      localStorage.setItem("user", JSON.stringify({ email, role }));
      toast.success("Success!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "success1",
      });
      window.location.reload();
    } else {
      alert("Please select role");
    }
  };

  return (
    <div
      class="container w-25 shadow"
      style={{
        backgroundColor: "#f5f5f5",
        height: "400px",
        marginTop: "100px",
      }}
    >
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="col-md-12">
            <div class="col-md-12 mb-3">
              <label for="inputEmail4" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control basicAutoComplete"
                id="inputEmail4"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>

            <div class="col-md-12 mb-3">
              <label for="inputPassword4" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>

            <div class="col-md-12 mb-3">
              <label for="inputState" class="form-label">
                Select Role
              </label>
              <select
                id="inputState"
                class="form-select"
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value={null} selected>
                  Choose...
                </option>
                <option value="csm">CSM</option>
                <option value="dev">Developer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div class="col-md-12">
              <button className="btn btn-success col-md-12" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
