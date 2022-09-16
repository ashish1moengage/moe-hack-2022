import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Togglebtn from "./Togglebtn";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// {
//   "service_name": "ACTIONABLE_ANALYTICS",
//   "app_key": "MOUOES8NXBLMZ6744ZJEHY4T",
//   "db_name": "sikander_test",
//   "status": "BLOCKED",
//   "last_disable_time": "2020-11-26T10:50:20.632000"
// },

const myNewTheme = {
  rows: {
    fontSize: "25px",
  },
};

function Sentrytable(props) {
  console.log(props.refresh);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterSentry, setFilterSentry] = useState([]);
  const [services, setServices] = useState([]);
  const { dbDetails, active } = props;

  const [user, setUser] = useState(null);

  const columns = [
    {
      name: "Sentry Flags",
      selector: (row) => (
        <p style={{ fontFamily: "Raleway", fontWeight: "bold" }}>
          {row.service_name}
        </p>
      ),
      width: "600px",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => <Togglebtn active={active} row={row} />,
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const fetchServices = (db) => {
    if (db) {
      var config = {
        method: "get",
        url:
          "http://10.66.67.125:32502/v3/campaigns/inapp/sentry_services/" + db,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          setServices(response.data.data);
          setFilterSentry(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchServices(props.db);
  }, [props.db, props.refresh]);

  useEffect(() => {
    const result = services.filter((sentry) => {
      return sentry.service_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterSentry(result);
  }, [search]);

  const paginationComponentOptions = {
    rowsPerPageText: "per page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
    noRowsPerPage: false,
  };

  return (
    <div>
      <DataTable
        title="Sentry Flags"
        columns={columns}
        data={filterSentry}
        customTheme={myNewTheme}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            class="form-control w-25"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            width={50}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        subHeaderAlign="right"
        pagination
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
}

export default Sentrytable;
