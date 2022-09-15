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
  const [newFlagName, setNewFlagName] = useState(null);
  const [newFlagValue, setNewFlagValue] = useState(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    searchByName();
  }, []);

  const searchByName = (value = "") => {
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

  const enableSentry = () => {
    // document.getElementById(row.service_name).click();

    var data = JSON.stringify({
      status: newFlagValue,
      service: newFlagName,
    });

    var config = {
      method: "post",
      url:
        "http://10.66.67.125:32502/v3/campaigns/inapp/sentry_services/" +
        dbName,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const resp = response.data;
        if (resp.code === "200") {
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
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (newFlagValue) {
        enableSentry();
        document.getElementById("sentryFlagCloseBtn").click();
        setNewFlagName(null);
        setNewFlagValue(null);
        setRefresh(!refresh);
      }
      else {
        alert("Sentry Flag value enter karo")
      }
      

  }

  return (
    <div className="App">
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Sentry Detail
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
            <div class="modal-body">
              <div class="col-md-10 mb-3">
                <label for="inputSentry" class="form-label">
                  Sentry Flag Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputSentry"
                  onChange={(e) => setNewFlagName(e.target.value)}
                  required
                ></input>
              </div>

              <div class="col-md-10 mb-3">
                <label for="inputSentryValue" class="form-label">
                  Sentry Flag Value
                </label>
                <select id="inputSentryValue" class="form-select" onChange={(e) => setNewFlagValue(e.target.value)}>
                  <option selected>Choose...</option>
                  <option value={"ALLOWED"}>ALLOWED</option>
                  <option value={"BLOCKED"}>BLOCKED</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                id="sentryFlagCloseBtn"
              >
                Close
              </button>
              <button class="btn btn-primary" type="submit">
                Add Sentry
              </button>
            </div>
            </form>
            
          </div>
        </div>
      </div>
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
                  <Sentrytable db={dbName} refresh={refresh} />
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
                    <button type="button" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" id="sentryModalBtn" style={{"display" : "none"}}></button>
                    
                      {" "}
                     {(user && ["dev", "admin"].includes(user.role)) ? <><button
                      className="btn btn-primary w-50 m-auto mt-4"
                      type="button"
                      onClick={() => {dbName ? document.getElementById("sentryModalBtn").click() : alert("Please select a DB")}}
                    ><i class="fa-solid fa-plus"></i> Add Sentry Flag</button></> : ''}
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
