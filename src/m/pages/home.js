import { Card } from "primereact/card";
import React, { useEffect, useState, useRef } from "react";
import clientService from "../../services/clientService";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import AddUser from "../user/AddUser";
import EditUser from "../user/EditUser";
import AppLayout from "../base/Layout";

const StyledDataTable = styled(DataTable)`
  .p-datatable-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Home = () => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || "false"
  );
  const [truckAccounts, setTruckAccounts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [displayAddUser, setDisplayAddUser] = useState(false);
  const [displayEditUser, setDisplayEditUser] = useState(false);
  const [user, setUser] = useState(null);
  const menu = useRef(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  if (isLogged === "false") {
    window.location.hash = "/login";
  }

  if (localStorage.getItem("isAdmin") === "false") {
    window.location.hash = "/profile";
  }

  const items = [
    {
      label: "Details",
      icon: "pi pi-check",
      command: () => {
        let url = "/truck-details/" + user.userId;
        window.location.hash = url;
      },
    },
    {
      label: "Edit",
      icon: "pi pi-refresh",
      command: () => {
        onClick("displayEditUser");
      },
    },
    {
      label: "Delete",
      icon: "pi pi-times",
      command: () => {
        confirmDelete();
      },
    },
  ];

  const confirmDelete = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  const accept = () => {
    clientService.deleteUser(user.id).then((response) => {
      if (response.succeeded) {
        load();
      }
    });
  };

  const reject = () => {};

  useEffect(() => {
    if (isLogged === "true") {
      load();
    }
  }, [isLogged]);

  const load = () => {
    let userId = localStorage.getItem("CurrentUserId");
    if (userId) {
      clientService.getTruckAccounts(userId).then((data) => {
        setTruckAccounts(data);
      });
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          className="p-button-rounded p-button-text"
          icon="pi pi-ellipsis-v"
          onClick={(event) => {
            setUser(rowData);
            menu.current.toggle(event);
          }}
          aria-controls="popup_menu"
          aria-haspopup
        />
      </>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <h3 className="p-m-0">Truck accounts</h3>
        <div>
          <Button
            label="Create new account"
            style={{ marginBottom: "3px" }}
            onClick={() => onClick("displayAddUser")}
          />
          <span className="p-input-icon-left" style={{ marginLeft: "10px" }}>
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </>
    );
  };
  const header = renderHeader();

  const dialogFuncMap = {
    displayAddUser: setDisplayAddUser,
    displayEditUser: setDisplayEditUser,
  };

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  return (
    <AppLayout>
      <div
        style={{
          width: "76%",
          // minWidth: "760px",
          display: "inline-block",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Card>
          <StyledDataTable
            value={truckAccounts}
            paginator
            header={header}
            filters={filters}
            globalFilterFields={[
              "userName",
              "email",
              "plateNumber",
              "phoneNumber",
            ]}
            rows={4}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[4, 7, 10]}
            dataKey="id"
            rowHover
            responsiveLayout="scroll"
            emptyMessage="No accounts found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column
              headerStyle={{ width: "4rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={actionBodyTemplate}
            />
            <Column
              field="userName"
              header="Username"
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="email"
              header="Email"
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="plateNumber"
              header="Plate number"
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="phoneNumber"
              header="Phone number"
              sortable
              style={{ minWidth: "10rem" }}
            />
          </StyledDataTable>
        </Card>
      </div>

      <Menu model={items} popup ref={menu} id="popup_menu" />
      <AddUser
        visible={displayAddUser}
        onHide={() => {
          onHide("displayAddUser");
        }}
        reload={load}
      />
      <EditUser
        visible={displayEditUser}
        onHide={() => {
          onHide("displayEditUser");
        }}
        reload={load}
        user={user}
      />
    </AppLayout>
  );
};

export default Home;
