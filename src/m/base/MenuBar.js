import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import styled from "styled-components";
import "../../css/menubar.css";

const StyledMenu = styled(Menubar)`
  background-color: rgb(189, 189, 247);
  border: none;
  border-radius: unset;
  box-shadow: 0 4px 6px 0 rgb(0 0 0 / 10%);

  .p-menubar-root-list > .p-menuitem > .p-menuitem-link span {
    color: whitesmoke;
  }
`;

const MenuBar = (props) => {
  const items = [
    {
      label: "Trucks",
      style: {
        display:
          props.isLogged === "false" ||
          localStorage.getItem("isAdmin") === "false"
            ? "none"
            : "unset",
      },
      command: () => {
        window.location.hash = "/trucks";
      },
    },
    {
      label: "My Trips",
      style: {
        display:
          props.isLogged === "false" ||
          localStorage.getItem("isAdmin") !== "false"
            ? "none"
            : "unset",
      },
      command: () => {
        window.location.hash = "/trips-truck/" + props.userId;
      },
    },
    {
      label: "Trips",
      style: {
        display:
          props.isLogged === "false" ||
          localStorage.getItem("isAdmin") === "false"
            ? "none"
            : "unset",
      },
      command: () => {
        window.location.hash = "/trips";
      },
    },
    {
      label: "Statistics",
      style: {
        display:
          props.isLogged === "false" ||
          localStorage.getItem("isAdmin") === "false"
            ? "none"
            : "unset",
      },
      command: () => {
        window.location.hash = "/statistics";
      },
    },
    {
      label: "About",
      command: () => {
        window.location.hash = "/about";
      },
    },
    {
      label: "Contact",
      command: () => {
        window.location.hash = "/contact";
      },
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://www.freepnglogos.com/uploads/a-logo-5.png"
      onError={(e) =>
        (e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
      height="40"
      style={{ marginRight: "20px" }}
      className="mr-2"
    ></img>
  );
  const end = (
    <>
      <Button
        className="p-button-text"
        label="Login"
        style={{
          color: "black",
          display: props.isLogged === "true" ? "none" : "unset",
        }}
        onClick={() => {
          window.location.hash = "/login";
        }}
      />
      <Button
        className="p-button-text"
        label="Register"
        style={{
          color: "black",
          display: props.isLogged === "true" ? "none" : "unset",
        }}
        onClick={() => {
          window.location.hash = "/register";
        }}
      />
      <Button
        className="p-button-text"
        label="Logout"
        style={{
          color: "black",
          display: props.isLogged === "false" ? "none" : "unset",
        }}
        onClick={() => {
          localStorage.setItem("isLogged", "false");
          localStorage.setItem("isAdmin", "false");
          localStorage.removeItem("CurrentUserId");
          window.location.reload();
        }}
      />
      <Button
        icon="pi pi-user"
        className="p-button-rounded p-button-plain p-button-text"
        style={{
          color: "black",
          display: props.isLogged === "false" ? "none" : "unset",
        }}
        onClick={() => {
          window.location.hash = "/profile";
        }}
      />
    </>
  );
  return (
    <>
      <StyledMenu model={items} end={end} start={start} />
    </>
  );
};

export default MenuBar;
