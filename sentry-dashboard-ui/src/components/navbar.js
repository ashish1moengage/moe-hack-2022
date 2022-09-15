import React from "react";
import logo from "./logo.png";

function Navbar(props) {
  console.log(props.user);
  return (
    <nav
      class="navbar navbar-expand-lg navbar-dark mb-4 ps-5 pe-5"
      style={{ backgroundColor: "#0a2377" }}
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="https://www.moengage.com/" style={{ fontFamily: "Roboto" }}>
          <img src={logo} width={200}></img>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          {props.user ? (
            <div class="d-flex" style={{ marginRight: "200px" }}>
              <ul class="navbar-nav"  style={{"fontSize" : "25px"}}>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fa-solid fa-user text-light"></i>
                  </a>
                  <ul
                    class="dropdown-menu me-5"
                    aria-labelledby="navbarDropdown"
                    style={{"fontSize" : "20px"}}
                  >
                    <li>
                      <a class="dropdown-item" href="#">
                        Role : <b>{props.user.role}</b>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider"></hr>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {localStorage.removeItem("user"); window.location.reload()}}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
