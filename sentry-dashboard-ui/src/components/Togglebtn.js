import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Togglebtn(props) {
  const { row } = props;
  const [enable, setEnable] = useState(false);

  const enableSentry = () => {
    // document.getElementById(row.service_name).click();

    var data = JSON.stringify({
      status: enable ? "BLOCKED" : "ALLOWED",
      service: row.service_name,
    });

    var config = {
      method: "post",
      url:
        "http://10.66.67.125:32502/v3/campaigns/inapp/sentry_services/" +
        row.db_name,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const resp = response.data;
        if (resp.code === "200") {
          setEnable(!enable);
          console.log("hello");
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

  const confirmChange = () => {
    setEnable(!enable);
    document.getElementsByClassName("close-modal")[0].click();
  };

  useEffect(() => {
    setEnable(row.status === "BLOCKED" ? false : true);
  }, []);

  return (
    <>
      {/* <div
        class="toast align-items-center text-white bg-primary border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="liveToastBtn"
      >
        <div class="d-flex">
          <div class="toast-body">Hello, world! This is a toast message.</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>

        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          id={row.service_name}
          style={{ display: "none" }}
        >
          Launch demo modal
        </button>

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
                  Please Confirm
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary close-modal"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => confirmChange()}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div class="form-check form-switch mt-2">
        {/* <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button> */}
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckChecked"
          checked={enable}
          onChange={enableSentry}
        />
        <label class="form-check-label" for="flexSwitchCheckChecked">
          {enable ? (
            <p style={{ color: "green", marginTop: "3px" }}>Enabled</p>
          ) : (
            <p style={{ color: "red", marginTop: "3px" }}>Disabled</p>
          )}
        </label>
      </div>
    </>
  );
}

export default Togglebtn;
