import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import Sentrytable from "./components/Sentrytable";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [dbName, setDbName] = useState(null);
  const [dbDetails, setDbDetails] = useState([]);
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    searchByName();
  }, []);

  const searchByName = (value="") => {
    var data = JSON.stringify({
      filter: value,
      page: "1",
    });

    var config = {
      method: "post",
      url: "http://10.66.67.125:32502/v3/campaigns/inapp/sentry_apps_pages",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let resp_data = [];
        response.data.data.map((item) => {
          resp_data.push({ label: item.db_name, value: item._id });
        });
        setDbDetails(resp_data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchServices = (db) => {
    var config = {
      method: "get",
      url: "http://10.66.67.125:32502/v3/campaigns/inapp/sentry_services/" + db,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setServices(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="main">
        <Navbar user={user} />
        <Routes>
          <Route path="login" element={<Login />}></Route>

          <Route
            path="sentry"
            element={
              <div class="row ms-2">
                <div className="col-md-8 card p-3 shadow me-5">
                  <Sentrytable db={dbName} />
                </div>

                <div
                  className="col-md-3 card p-3 shadow ms-4 text-align-center p-4"
                  style={{ height: "300px" }}
                >
                  <h6 className="mb-2">Select DB name</h6>
                  <Select
                    options={dbDetails}
                    onKeyDown={(e) => searchByName(e.target.value)}
                    onChange={(e) => setDbName(e.label)}
                  />

                  <div className="row">
                    <button className="btn btn-primary w-50 m-2 mt-4">
                      {" "}
                      Add Sentry Flag
                    </button>
                  </div>
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
