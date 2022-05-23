import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import styled from "styled-components";
import clientService from "../../services/clientService";

const StyledPassword = styled(Password)`
  width: 100%;
  .p-password-input {
    width: 100%;
  }
`;

const EditUser = ({ visible, onHide, reload, user, isAdmin }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const saveUser = () => {
    clientService
      .editUser({
        userId: isAdmin ? user.userId : user.id,
        userName: userName,
        email: email,
        passwordHash: password === "" ? user.passwordHash : password,
        plateNumber: plateNumber,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        if (response.succeeded) {
          setUserName("");
          setPlateNumber("");
          setEmail("");
          setPassword("");
          onHide();
          reload();
        }
      });
    // let category = { categoryName: name, description: description };
    // if (scope === "Add") {
    //   CategoryService.insertCategory(category);
    // } else if (scope === "Edit") {
    //   category.categoryID = categoryId;
    //   CategoryService.updateCategory(category);
    // }
    // onHide();
    // setRefresh();
  };

  const header = <h6>Pick a password</h6>;
  const footer = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setEmail(user.email);
      setPlateNumber(user.plateNumber ? user.plateNumber : "");
      setPhoneNumber(user.phoneNumber ? user.phoneNumber : "");
    }
  }, [user]);

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={onHide}
          className="p-button-text"
        />
        <Button label="Save" icon="pi pi-check" onClick={saveUser} autoFocus />
      </div>
    );
  };
  return (
    <Dialog
      header="Edit account"
      visible={visible}
      onHide={onHide}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw" }}
      footer={renderFooter}
    >
      <div
        className="p-d-flex p-jc-between"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <div className="col-5" style={{ marginRight: "20px", width: "48%" }}>
          <span className="p-float-label mt-4" style={{ marginBottom: "20px" }}>
            <InputText
              style={{ width: "100%" }}
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="userName">Username</label>
          </span>
          <span className="p-float-label mt-4">
            <InputText
              style={{ width: "100%" }}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-float-label mt-4" style={{ marginTop: "20px" }}>
            <InputText
              style={{ width: "100%" }}
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label htmlFor="phoneNumber">Phone number</label>
          </span>
        </div>
        <div className="col-5" style={{ width: "48%" }}>
          {!isAdmin && (
            <span
              className="p-float-label mt-4"
              style={{ marginBottom: "20px" }}
            >
              <InputText
                style={{ width: "100%" }}
                id="plateNumber"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
              />
              <label htmlFor="plateNumber">Plate number</label>
            </span>
          )}
          <span className="p-float-label mt-4">
            <StyledPassword
              style={{ width: "100%" }}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              header={header}
              footer={footer}
              toggleMask
            />
            <label htmlFor="password">Password</label>
          </span>
        </div>
      </div>
    </Dialog>
  );
};

export default EditUser;
