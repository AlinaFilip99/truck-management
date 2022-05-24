import React, { useEffect, useState } from "react";
import clientService from "../../services/clientService";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import EditUser from "../user/EditUser";
import AppLayout from "../base/Layout";

const Profile = () => {
  const [user, setUser] = useState();
  const [displayEditUser, setDisplayEditUser] = useState(false);
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || "false"
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") || "false"
  );
  if (isLogged === "false") {
    window.location.hash = "/login";
  }

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    let userEmail = localStorage.getItem("userEmail");

    clientService.getByEmail(userEmail).then((data) => {
      setUser(data);
    });
  };

  const footer = (
    <span style={{ display: "flex", marginLeft: "15px" }}>
      <Button
        label="Edit account"
        icon="pi pi-refresh"
        style={{ marginRight: "10px" }}
        onClick={() => {
          setDisplayEditUser(true);
        }}
      />
      {isAdmin === "true" && (
        <Button
          label="Delete account"
          icon="pi pi-times"
          className="p-button-outlined p-ml-2"
          onClick={() => {
            confirmDelete();
          }}
        />
      )}
    </span>
  );

  const confirmDelete = () => {
    confirmDialog({
      message: "Do you want to delete your account?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  const reject = () => {};

  const accept = () => {
    clientService.deleteUser(user.userId).then((response) => {
      if (response.succeeded) {
        localStorage.setItem("isLogged", "false");
        localStorage.setItem("isAdmin", "false");
        localStorage.removeItem("CurrentUserId");
        window.location.hash = "/login";
      }
    });
  };

  return (
    <AppLayout userId={user?.userId}>
      <div
        style={{
          width: "76%",
          // minWidth: "760px",
          display: "inline-block",
          marginTop: "20px",
        }}
      >
        <Card
          title={isAdmin === "false" ? user?.plateNumber : user?.userName}
          footer={footer}
        >
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
              {isAdmin === "false" && (
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
              )}
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
              {isAdmin === "false" && (
                <>
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
                    <label
                      style={{ fontWeight: "bold" }}
                      htmlFor="driversNumber"
                    >
                      Number of drivers
                    </label>
                    <div style={{ marginTop: "2px" }}>
                      <span id="driversNumber">
                        {user?.driversNumber ? "---" : user?.driversNumber}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
      <EditUser
        visible={displayEditUser}
        onHide={() => {
          setDisplayEditUser(false);
        }}
        reload={load}
        user={user}
        isAdmin={isAdmin === "true"}
      />
    </AppLayout>
  );
};

export default Profile;
