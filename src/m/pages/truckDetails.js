import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import clientService from "../../services/clientService";
import { Card } from "primereact/card";
import tripService from "../../services/tripService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import styled from "styled-components";
import AddTrip from "../journey/AddTrip";
import EditTrip from "../journey/EditTip";
import AppLayout from "../base/Layout";
import ViewTrip from "../journey/ViewTrip";

const StyledDataTable = styled(DataTable)`
  .p-datatable-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const TruckDetails = () => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || "false"
  );
  const [user, setUser] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [trip, setTrip] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [displayAddTrip, setDisplayAddTrip] = useState(false);
  const [displayEditTrip, setDisplayEditTrip] = useState(false);
  const [displayPreviewTrip, setDisplayPreviewTrip] = useState(false);
  const menu = useRef(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const { _userid } = useParams();

  if (isLogged === "false") {
    window.location.hash = "/login";
  }

  const items = [
    {
      label: "Preview",
      icon: "pi pi-eye",
      command: () => {
        onClick("displayPreviewTrip");
      },
    },
    {
      label: "Edit",
      icon: "pi pi-refresh",
      command: () => {
        onClick("displayEditTrip");
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

  const reject = () => {};

  const accept = () => {
    tripService.deleteTrip(trip.tripId).then(() => {
      loadTrips();
    });
  };

  useEffect(() => {
    if (_userid) {
      clientService.getById(_userid).then((data) => {
        setUser(data);
      });
      loadTrips();
    }
  }, []); // eslint-disable-line

  const loadTrips = () => {
    tripService.getByTruckId(_userid).then((data) => {
      setUserTrips(data);
    });
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
            menu.current.toggle(event);
            setTrip(rowData);
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
        <h3 className="p-m-0">Account trips</h3>
        <div>
          <Button
            label="Add new trip"
            style={{ marginBottom: "3px" }}
            onClick={() => onClick("displayAddTrip")}
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

  const endDateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.endDateTime ? rowData.endDateTime : "Not shipped"}</span>
      </React.Fragment>
    );
  };

  const addressBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.street +
            ", " +
            rowData.moreAddress +
            ", " +
            rowData.city +
            ", " +
            rowData.region +
            ", " +
            rowData.country}
        </span>
      </React.Fragment>
    );
  };

  const dialogFuncMap = {
    displayAddTrip: setDisplayAddTrip,
    displayEditTrip: setDisplayEditTrip,
    displayPreviewTrip: setDisplayPreviewTrip,
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
        <Card title={user?.plateNumber}>
          <h4 style={{ textAlign: "left", marginLeft: "10px" }}>
            Account details
          </h4>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ width: "45%", textAlign: "left" }}>
              <div
                className="p-field p-col-12 p-md-3"
                style={{ padding: "5px" }}
              >
                <label style={{ fontWeight: "bold" }} htmlFor="id">
                  Id
                </label>
                <div style={{ marginTop: "2px" }}>
                  <span id="id">{user?.userId}</span>
                </div>
              </div>
              <div
                className="p-field p-col-12 p-md-3"
                style={{ padding: "5px" }}
              >
                <label style={{ fontWeight: "bold" }} htmlFor="username">
                  Username
                </label>
                <div style={{ marginTop: "2px" }}>
                  <span id="username">{user?.userName}</span>
                </div>
              </div>
              <div
                className="p-field p-col-12 p-md-3"
                style={{ padding: "5px" }}
              >
                <label style={{ fontWeight: "bold" }} htmlFor="email">
                  Email
                </label>
                <div style={{ marginTop: "2px" }}>
                  <span id="email">{user?.email} </span>
                </div>
              </div>
            </div>
            <div style={{ width: "45%", textAlign: "left" }}>
              <div
                className="p-field p-col-12 p-md-3"
                style={{ padding: "5px" }}
              >
                <label style={{ fontWeight: "bold" }} htmlFor="phoneNumber">
                  Phone number
                </label>
                <div style={{ marginTop: "2px" }}>
                  <span id="phoneNumber">
                    {user?.phoneNumber === "" ? "---" : user?.phoneNumber}
                  </span>
                </div>
              </div>
              <div
                className="p-field p-col-12 p-md-3"
                style={{ padding: "5px" }}
              >
                <label style={{ fontWeight: "bold" }} htmlFor="plateNumber">
                  Licence plate number
                </label>
                <div style={{ marginTop: "2px" }}>
                  <span id="plateNumber">
                    {user?.plateNumber === "" ? "---" : user?.plateNumber}
                  </span>
                </div>
              </div>
              <div
                className="p-field p-col-12 p-md-3"
                style={{ padding: "5px" }}
              >
                <label style={{ fontWeight: "bold" }} htmlFor="driversNumber">
                  Number of drivers
                </label>
                <div style={{ marginTop: "2px" }}>
                  <span id="driversNumber">
                    {user?.driversNumber ? "---" : user?.driversNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div
        style={{
          width: "76%",
          // minWidth: "760px",
          display: "inline-block",
          // marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Card>
          <StyledDataTable
            value={userTrips}
            paginator
            header={header}
            filters={filters}
            globalFilterFields={[
              "tripId",
              "country",
              "region",
              "city",
              "street",
              "moreAddress",
            ]}
            rows={4}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[4, 7, 10]}
            dataKey="id"
            rowHover
            responsiveLayout="scroll"
            emptyMessage="No trips found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column
              headerStyle={{ width: "4rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={actionBodyTemplate}
            />
            <Column
              field="tripId"
              header="Id"
              sortable
              style={{ minWidth: "5rem" }}
            />
            <Column
              field="startDateTime"
              header="Start date"
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="endDateTime"
              header="End date"
              body={endDateBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="duration"
              header="Duration"
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="address"
              header="Address"
              body={addressBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            />
          </StyledDataTable>
        </Card>
      </div>
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <AddTrip
        visible={displayAddTrip}
        onHide={() => {
          onHide("displayAddTrip");
        }}
        reload={loadTrips}
        userId={user?.userId}
      />
      <EditTrip
        visible={displayEditTrip}
        onHide={() => {
          onHide("displayEditTrip");
        }}
        reload={loadTrips}
        trip={trip}
        showAll={true}
      />
      <ViewTrip
        visible={displayPreviewTrip}
        onHide={() => {
          onHide("displayPreviewTrip");
        }}
      />
    </AppLayout>
  );
};

export default TruckDetails;
