import React, { useState } from "react";
import MenuBar from "../base/MenuBar";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import styled from "styled-components";
import { Button } from "primereact/button";
import clientService from "../../services/clientService";
import Footer from "../base/Footer";

const StyledPassword = styled(Password)`
  width: 100%;
  .p-password-input {
    width: 100%;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || "false"
  );
  if (isLogged === "false") {
    window.location.hash = "/login";
  }

  const LoginUser = async () => {
    let response = await clientService.loginUser({
      email: email,
      passwordHash: password,
    });

    if (response.succeeded) {
      let url;
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("userEmail", email);
      clientService.getUserRoles({ email: email }).then((data) => {
        console.log(data);
        let isAdmin = data.includes("Admin");
        if (isAdmin) {
          url = "/trucks";
        } else {
          url = "/profile";
        }
        console.log(isAdmin);
        localStorage.setItem("isAdmin", isAdmin.toString());

        window.location.hash = url;
      });
    }
  };

  const cardFooter = (
    <span>
      <Button label="Submit" onClick={LoginUser} />
    </span>
  );

  return (
    <>
      <MenuBar isLogged={isLogged} />
      <div
        style={{
          textAlign: "-webkit-center",
          marginTop: "50px",
          height: "calc(100vh - 64px - 58px)",
        }}
      >
        <Card
          title="Login"
          style={{ width: "25rem", marginBottom: "2em" }}
          footer={cardFooter}
        >
          <span className="p-float-label">
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
              feedback={false}
              toggleMask
            />
            <label htmlFor="password">Password</label>
          </span>
          <div style={{ marginTop: "15px" }}>
            <Button
              label="I do not have an account."
              className="p-button-link"
              onClick={() => (window.location.hash = "/register")}
            />
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Login;