import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import tripService from "../../services/tripService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { confirmDialog } from "primereact/confirmdialog";
import styled from "styled-components";
import AppLayout from "../base/Layout";
import { getEndDate } from "../utils/util";

const StyledDataTable = styled(DataTable)`
  .p-datatable-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const TripsTruck = () => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || "false"
  );
  const [userTrips, setUserTrips] = useState([]);
  const [trip, setTrip] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const { _userid } = useParams();

  if (isLogged === "false") {
    window.location.hash = "/login";
  }

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

  const startTrip = (data) => {
    let now = new Date();
    data.startDateTime = now.toLocaleString();
    data.endDateTime = getEndDate(now, data.duration).toLocaleString();
    data.isActive = true;
    data.isFinished = false;
    data.isDoneInTime = false;
    tripService.editTrip(data).then(() => loadTrips());
  };

  const endTrip = (data) => {
    data.isActive = false;
    data.isFinished = true;
    data.isDoneInTime = true;
    let now = new Date();
    if (now.getTime() > new Date(data.endDateTime).getTime()) {
      data.isDoneInTime = false;
    }
    data.endDateTime = now.toLocaleString();
    let startDateTime = new Date(data.startDateTime);
    let duration = new Date();
    let durationTime = now.getTime() - startDateTime.getTime();
    duration.setTime(durationTime - 2 * 60 * 60 * 1000);
    data.duration = duration.toLocaleTimeString("it-IT");
    tripService.editTrip(data).then(() => loadTrips());
  };

  const actionBodyTemplate = (rowData) => {
    if (!rowData.isFinished) {
      if (rowData.isActive) {
        return (
          <>
            <Button
              className="p-button-rounded p-button-text"
              icon="pi pi-pause"
              onClick={() => endTrip(rowData)}
            />
          </>
        );
      } else {
        return (
          <>
            <Button
              className="p-button-rounded p-button-text"
              icon="pi pi-play"
              onClick={() => startTrip(rowData)}
            />
          </>
        );
      }
    } else {
      return (
        <>
          <i className="pi pi-check-circle" style={{ color: "green" }}></i>
        </>
      );
    }
  };

  const deleteBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          className="p-button-rounded p-button-text p-button-danger"
          icon="pi pi-trash"
          onClick={() => {
            setTrip(rowData);
            confirmDelete();
          }}
        />
      </>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <h3 className="p-m-0">Account trips</h3>
        <div>
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
              headerStyle={{ width: "4rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={deleteBodyTemplate}
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
    </AppLayout>
  );
};

export default TripsTruck;
