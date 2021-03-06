import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import styled from "styled-components";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import clientService from "../../services/clientService";
import AppLayout from "../base/Layout";
import { Toast } from "primereact/toast";

const StyledPassword = styled(Password)`
  width: 100%;
  .p-password-input {
    width: 100%;
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);

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

  const RegisterUser = async () => {
    let response = await clientService.registerUser({
      userName: username,
      email: email,
      passwordHash: password,
      userRole: "Admin",
    });
    if (response.succeeded) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Successfully registered!",
        life: 3000,
      });
      setTimeout(() => {
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isAdmin", "true");
        clientService.getByEmail(email).then((result) => {
          localStorage.setItem("CurrentUserId", result.userId);
          window.location.hash = "/trucks";
        });
      }, 3000);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error at register! Please check your informations.",
        life: 3000,
      });
    }
  };

  const cardFooter = (
    <span>
      <Button label="Submit" onClick={RegisterUser} />
    </span>
  );

  return (
    <AppLayout>
      <div
        style={{
          textAlign: "-webkit-center",
          marginTop: "50px",
          height: "calc(100vh - 64px - 58px)",
        }}
      >
        <Card
          title="Register"
          style={{ width: "25rem", marginBottom: "2em" }}
          footer={cardFooter}
        >
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </span>
          <span className="p-float-label" style={{ marginTop: "15px" }}>
            <InputText
              style={{ width: "100%" }}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-float-label" style={{ marginTop: "15px" }}>
            <StyledPassword
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              header={header}
              footer={footer}
              toggleMask
            />
            <label htmlFor="password">Password</label>
          </span>
          <div style={{ marginTop: "15px" }}>
            <Button
              label="I have an account."
              className="p-button-link"
              onClick={() => (window.location.hash = "/login")}
            />
          </div>
        </Card>
      </div>
      <Toast ref={toast} />
    </AppLayout>
  );
};

export default Register;
